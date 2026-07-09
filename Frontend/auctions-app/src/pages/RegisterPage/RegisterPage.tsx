import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService';
import './RegisterPage.css'


function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorMessagePasswordMatch, setErrorMessagePasswordMatch] = useState("");
    const [userSuccessfullyCreated, setUserSuccessfullyCreated] = useState(false);


    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === "") {
            setErrorMessageEmail("Please enter e valid email address to register");
            return
        }

        if (password === "") {
            setErrorMessagePassword("Please enter e valid password to register");
            return
        }

        if (password !== confirmedPassword) {
            setErrorMessagePasswordMatch("Passwords must Match");
            return
        }

        const data = await register(
            email,
            password
        );

        localStorage.setItem(
            "token",
            data.token
        );

        setUserSuccessfullyCreated(!userSuccessfullyCreated);

        setTimeout(() => {
            navigate('/auctions');
        }, 3000);

    }

    return (
        <>
            <div className='register-page-container'>
                {userSuccessfullyCreated ?
                    <div className="success">
                        <div className='success-top'>
                            <span className='success-text'>User <span className='success-text-green'>Successfully </span>Registered!</span>
                        </div>
                        <span className='success-text'>Redirecting...</span>
                    </div> :
                    <div className='register-page-inner-container'>

                        <h1 className='register-page-title'>Register</h1>
                        <form className="register-form" onSubmit={handleRegister}>
                            <div className="login-fields">
                                <div className='errors-msgs'>
                                    <label className="login-label">Email</label>
                                    {errorMessageEmail && (
                                        <span className="msg-email">
                                            {errorMessageEmail}
                                        </span>
                                    )}
                                </div>
                                <input
                                    className="login-inputs"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@mail.com"
                                />
                                <div className='errors-msgs'>
                                    <label className="login-label">Password</label>
                                    {errorMessagePassword && (
                                        <span className="msg-password">
                                            {errorMessagePassword}
                                        </span>
                                    )}
                                </div>
                                <input
                                    className="login-inputs"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                />
                                <div className='errors-msgs'>
                                    <label className="login-label">Confirm Password</label>
                                    {errorMessagePasswordMatch && (
                                        <span className="msg-password">
                                            {errorMessagePasswordMatch}
                                        </span>
                                    )}
                                </div>
                                <input
                                    className="login-inputs"
                                    type="password"
                                    autoComplete="current-password"
                                    value={confirmedPassword}
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                    placeholder="password"
                                />

                                <button className="login-btn" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div >
        </>
    )
}

export default RegisterPage
