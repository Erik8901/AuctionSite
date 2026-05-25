import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import Header from '../../components/Header/Header'

import './datepicker.css'



function AddAuctionPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());



    useEffect(() => {
        const token = localStorage.getItem("token");

        function parseJwt(token: any) {
            if (!token) return null;

            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );

            return JSON.parse(jsonPayload);
        }

        const user = parseJwt(token);
        const email =
            user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

        console.log("Email:", email);
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <>
            <Header />
            <div className="add-auction-container">
                <h1 className="h1-title">Add New Auction</h1>


                <form onSubmit={handleLogin}>
                    <div className="login-fields">

                        <label className="login-label">Title</label>
                        <input
                            className="login-inputs"
                            type="text"
                            autoComplete="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title"
                        />

                        <label className="login-label">Description</label>
                        <input
                            className="login-inputs"
                            type="text"
                            autoComplete="current-password"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="description"
                        />
                        <label className="login-label">Price</label>
                        <input
                            className="login-inputs"
                            type="number"
                            autoComplete="current-password"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="price in €"
                        />
                        <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date: any) => setEndDate(date)} />

                        <button className="login-btn" type="submit">
                            Add new Auction
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AddAuctionPage;