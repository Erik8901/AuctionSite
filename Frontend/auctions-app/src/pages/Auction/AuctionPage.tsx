import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import "./AuctionPage.css";
import { add } from "date-fns";

type Bid = {
	id: number;
	price: number;
	bidder: string;
	createdAt: string;
	auctionId: number;
};

function AuctionPage() {
	const location = useLocation();

	const [auction, setAuction] = useState(location.state?.auction);
	const [userAuction, setUserAuction] = useState(false);
	const [openNewBidForm, setOpenNewBidForm] = useState(false);
	const [addBid, setAddBid] = useState<number>(0);

	if (!auction) return <div>No auction found</div>;

	const token = localStorage.getItem("token");

	function parseJwt(token: any) {
		if (!token) return null;

		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join(""),
		);

		return JSON.parse(jsonPayload);
	}

	const user = parseJwt(token);
	const email =
		user[
		"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
		];


	useEffect(() => {
		if (!auction || !email) return;

		setUserAuction(email === auction.createdBy);
	}, [email, auction]);



	const highestBid: Bid | null =
		auction.bids.length > 0
			? auction.bids.reduce((max: Bid, bid: Bid) =>
				bid.price > max.price ? bid : max
			)
			: null;


	async function AddBid(e: React.FormEvent) {
		e.preventDefault();
		console.log("bid " + addBid)
		console.log("highestBid " + highestBid?.price)

		if (addBid <= (highestBid?.price ?? 0)) {
			alert("Your bid some must be higher then the highest in order to bid")
			return;
		}


		const newBid = {
			price: addBid,
			bidder: email,
			createdAt: new Date().toISOString(),
		};



		const res = await fetch(`http://localhost:5153/api/auction/${auction.id}/bid`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBid),
		});

		if (!res.ok) return;

		const savedBid = await res.json();

		setAuction((prev: any) => ({
			...prev,
			bids: [...prev.bids, savedBid],
		}));
	}

	return (
		<div className="selected-auction">
			<div className="selected-auction-container">
				<div className="selected-auction-info">
					<span className="title">{auction.title}</span>
					<span className="price">Price: {auction.price} €</span>
					<span className="info">About: {auction.description}</span>
					<span className="date">Start: {auction.startDate.split('T')[0]}</span>
					<span className="date" >End: {auction.endDate.split('T')[0]}</span>
					<span className="creator">Created by: {auction.createdBy}</span>
					<div className="bids">
						<div className="highest-bidder">
							{highestBid && (
								<div className="highest-bidder-container">
									<span>Highest Bidder: {highestBid.bidder}</span>
									<span>Highest Bid: {highestBid.price}</span>
								</div>
							)}
						</div>

					</div>

				</div>

				<div className="selected-auction-bidder-info">
					<div className="bids-list">
						<span>Bidders:</span>
						{auction.bids?.map((bid: any) => (
							<div key={bid.id} className="bidders-info">
								<span>Bidder: {bid.bidder}</span>
								<span>Price: {bid.price}</span>
							</div>
						))}
					</div>
				</div>



			</div>
			{
				!userAuction && <button className="btn-add-bid" onClick={() => setOpenNewBidForm(!openNewBidForm)}>
					Add New Bid
				</button>
			}
			{
				openNewBidForm &&

				<div className="new-bid-form">
					<form onSubmit={AddBid}>
						<div className="bid-fields">
							<label className="bid-label">Bid:</label>
							<input
								className="bid-input"
								type="number"
								autoComplete="bid"
								value={addBid}
								onChange={(e) => setAddBid(Number(e.target.value))}
								placeholder="100"
							/>
							<button className="btn-add-bid" type="submit">
								Add Bid
							</button>
						</div>
					</form>
				</div>
			}
		</div>
	);
}

export default AuctionPage;
