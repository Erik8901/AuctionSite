import { useLocation } from "react-router-dom";

import "./AuctionPage.css";

function AuctionPage() {
	const location = useLocation();

	const auction = location.state?.auction;

	console.log(auction);

	async function AddBid() {
		await fetch(`http://localhost:5153/api/auction/${auction.id}/bid`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				price: 250,
				bidder: "test@mail.com",
				createdAt: new Date().toISOString(),
			}),
		});
	}

	return (
		<div className="selected-auction-container">
			<div className="selected-auction-info">
				<span>{auction.title}</span>
				<span>{auction.description}</span>
				<span>{auction.price} €</span>
				<span>{auction.startDate}</span>
				<span>{auction.endDate}</span>
				<span>{auction.createdBy}</span>
			</div>
			<button className="btn-add-bid" onClick={AddBid}>
				Add Bid
			</button>
		</div>
	);
}

export default AuctionPage;
