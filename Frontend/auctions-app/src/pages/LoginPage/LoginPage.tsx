import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './LoginPage.css'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate()

    function toRegister() {
        navigate('/register')
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }


    return (
        <div className="login-component">
            <h1 className="h1-title">Auctions App</h1 >
            <div className="error-msg">
                {loginMessage && <span className="login-fail">{loginMessage}</span>}
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
                </div>
            </form>
            <h4 className="register" onClick={toRegister}>Register</h4>
        </div >
    )
}

export default LoginPage
