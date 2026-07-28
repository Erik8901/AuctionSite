import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import failImg from "../../assets/No-Image-Placeholder.svg";

import "./AuctionPage.css";

type Bid = {
	id: number;
	price: number;
	bidder: string;
	createdAt: string;
	auctionId: number;
};

function AuctionPage() {
	const location = useLocation();
	const API_BASE = "http://localhost:5153";
	const [auction, setAuction] = useState(location.state?.auction);
	const [userAuction, setUserAuction] = useState(false);
	const [openNewBidForm, setOpenNewBidForm] = useState(false);
	const [addBid, setAddBid] = useState<number>(0);
	const [bidHigher, setBidhigher] = useState(false);
	const [bidSuccessFullyAdded, setBidSuccessFullyAdded] = useState(false);

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
		user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

	useEffect(() => {
		if (!auction || !email) return;

		setUserAuction(email === auction.createdBy);
	}, [email, auction]);

	const highestBid: Bid | null =
		auction.bids.length > 0
			? auction.bids.reduce((max: Bid, bid: Bid) =>
				bid.price > max.price ? bid : max,
			)
			: null;

	async function AddBid(e: React.FormEvent) {
		e.preventDefault();

		if (addBid <= (highestBid?.price ?? 0)) {
			setBidhigher(!bidHigher)
			return;
		}

		if (addBid <= (auction?.price ?? 0)) {
			setBidhigher(!bidHigher)
			return;
		}

		const newBid = {
			price: addBid,
			bidder: email,
			createdAt: new Date().toISOString(),
		};

		const res = await fetch(
			`http://localhost:5153/api/auction/${auction.id}/bid`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBid),
			},
		);

		if (!res.ok) return;

		const savedBid = await res.json();

		setAuction((prev: any) => ({
			...prev,
			bids: [...prev.bids, savedBid],
		}));

		if (savedBid) {
			setBidSuccessFullyAdded(!bidSuccessFullyAdded)
			setTimeout(() => {
				setOpenNewBidForm(!openNewBidForm)
				setBidSuccessFullyAdded(false)
			}, 3000);
		}
	}

	return (
		<div className="selected-auction">
			<div className="selected-auction-container">
				<img
					className="auction-page-img"
					src={auction.imgUrl ? `${API_BASE}${auction.imgUrl}` : failImg}
					alt={auction.title}
				/>
				<div className="selected-auction-info">
					<span className="title">{auction.title}</span>
					<span className="price"> {auction.price} €</span>
					<div className="selected-auction-user-info">
						<span className="info">Info:</span> <span> {auction.description}</span>
					</div>
					<div className="selected-auction-user-info">
						<span className="date">Start: </span> <span> {auction.startDate.split("T")[0]}</span>
					</div>
					<div className="selected-auction-user-info">
						<span className="date">End: </span> <span> {auction.endDate.split("T")[0]}</span>
					</div>
					<div className="selected-auction-user-info">
						<span className="creator">Created by: </span> <span> {auction.createdBy}</span>
					</div>
					{/* <div className="bids">
						<div className="highest-bidder">
							{highestBid && (
								<div className="highest-bidder-container">
									<span>Highest Bidder: {highestBid.bidder}</span>
									<span>Highest Bid: {highestBid.price}</span>
								</div>
							)}
						</div>
					</div> */}
					{!userAuction && (
						<button
							className="btn-add-bid"
							onClick={() => setOpenNewBidForm(!openNewBidForm)}
						>
							Add New Bid
						</button>
					)}
				</div>

				<div className="selected-auction-bidder-info">
					<div className="bids-list">
						<span> Highest Bidders:</span>
						{auction.bids?.map((bid: any) => (
							<div key={bid.id} className="bidders-info">
								<span className="bidder">{bid.bidder}</span>
								<span className="bidder">{bid.price}</span>
							</div>
						))}
					</div>

				</div>
			</div>

			{openNewBidForm && (
				<div className="overlay">

					<div className="new-bid-form">
						<span className="close-modal" onClick={() => setOpenNewBidForm(!openNewBidForm)}>X</span>
						{bidSuccessFullyAdded ? (
							<h2>Your bid was successfully added</h2>
						) : (
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
									{bidHigher && (
										<span className="error-msg">
											Your bid amount must be higher than the highest bid and higher then the price
											in order to place a bid.
										</span>
									)}
								</div>
							</form>
						)}
					</div>


				</div>
			)}
		</div>
	);
}

export default AuctionPage;
