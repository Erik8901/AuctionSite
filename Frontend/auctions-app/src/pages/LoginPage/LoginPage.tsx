import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService';
import './LoginPage.css'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            console.log(token)
            navigate('/auctions');
        }
    }, [navigate]);

    function toRegister() {
        navigate('/register');
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);

            alert("User Successfully Logged in!");
            navigate('/');

        } catch (error) {
            console.log("Login failed");
            setLoginMessage("Invalid email or password");
        }




    }

    return (
        <div className="login-component">
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
    )
}

export default LoginPage;