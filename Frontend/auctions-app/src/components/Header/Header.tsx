import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Header.css'



function App() {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <>
            <div className='header'>
                <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default App
