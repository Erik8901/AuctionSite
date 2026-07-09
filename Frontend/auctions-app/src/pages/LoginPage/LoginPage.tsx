import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService';
import { userStatus } from "../../slices/UserLoggedSlice"
import { useAppDispatch, useAppSelector } from "../../hooks";
import './LoginPage.css'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [userSuccessfullyLoggedIn, setUserSuccessfullyLoggedIn] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate('/auctions');
        }
    }, [navigate]);

    function toRegister() {
        navigate('/register');
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email == "" || password == "") {
            console.log("Login failed");
            setLoginMessage("Invalid email or password");
            return
        }
        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            dispatch(userStatus(true));
            setUserSuccessfullyLoggedIn(!userSuccessfullyLoggedIn);

            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            console.log("Login failed");
            setLoginMessage("Invalid email or password");
        }
    }

    return (
        <div className="login-component">
            {userSuccessfullyLoggedIn ?
                <div className="success">
                    <div className='success-top'>
                        <span className='success-text'>User <span className='success-text-green'>Successfully </span>Logged In!</span>
                    </div>
                    <span className='success-text'>Redirecting...</span>
                </div> :
                <div className="login-component-inner-container">


                    <h1 className="h1-title">Auctions App</h1>

                    <div className="error-msg">
                        {loginMessage && (
                            <span className="login-fail">
                                {loginMessage}
                            </span>
                        )}
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="login-fields">

                            <label className="login-label">Email</label>
                            <input
                                className="login-inputs"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="user@mail.com"
                            />

                            <label className="login-label">Password</label>
                            <input
                                className="login-inputs"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                            />

                            <button className="login-btn" type="submit">
                                Login
                            </button>
                            <h4 className="register" onClick={toRegister}>
                                Register
                            </h4>
                        </div>

                    </form>

                </div>
            }
        </div>
    )
}

export default LoginPage;