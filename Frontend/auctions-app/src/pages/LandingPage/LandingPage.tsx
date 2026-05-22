import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allAuctions } from '../../services/auctionsService';

function LandingPage() {
    const navigate = useNavigate();

    const [auctions, setAuctions] = useState<any[]>([]);

    useEffect(() => {
        async function fetchAuctions() {
            try {
                const data = await allAuctions();
                console.log(data);
                setAuctions(data);
            } catch (error) {
                console.log("Failed to load auctions");
                console.error(error);
            }
        }

        fetchAuctions();
    }, []);

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <h1>All Auctions</h1>
            <div className='auctions-container'>
                {auctions.map((auction) => (
                    <div className='auction' key={auction.id}>
                        <span>Price: {auction.price}</span>
                        <span>created by: {auction.createdBy}</span>
                        <h3>{auction.title}</h3>
                        <p>info: {auction.description}</p>
                        <span>Start Date: {auction.startDate}</span>
                        <span>End Date: {auction.endDate}</span>
                    </div>
                ))}
            </div>
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default LandingPage;