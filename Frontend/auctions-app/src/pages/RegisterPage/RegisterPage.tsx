import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService';
import './RegisterPage.css'


function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

                        <label className="login-label">Confirm Password</label>
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
