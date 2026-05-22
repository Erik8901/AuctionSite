import { useState } from 'react'
import { register } from '../../services/authService';
import './RegisterPage.css'


function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        console.log(confirmedPassword)

        const data = await register(
            email,
            password
        );

        localStorage.setItem(
            "token",
            data.token
        );

        console.log("User Successfully Created!");
    }


    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
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
        </>
    )
}

export default RegisterPage
