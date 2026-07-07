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

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email, password)

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

        alert("User Successfully Registered!");
        navigate('/auctions');
    }


    return (
        <>
            <div className='register-page-container'>
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
        </>
    )
}

export default RegisterPage
