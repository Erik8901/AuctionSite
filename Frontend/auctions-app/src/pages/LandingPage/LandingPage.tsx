import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { allAuctions } from '../../services/auctionsService';

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const data = allAuctions;

            console.log(data)

        } catch (error) {
            console.log("Login failed");

        }

    }, [allAuctions]);

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (<>
        <h1>All Auctions</h1>
        <button onClick={logout}>Logout</button>
    </>
    )
}

export default LandingPage;