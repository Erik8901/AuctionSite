import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allAuctions } from "../../services/auctionsService";
import Header from "../../components/Header/Header";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import "./LandingPage.css";

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

	function toAddNewAuction() {
		navigate("/add-new-auction");
	}

	function toSelectedAuctionPage(auction: any) {
		navigate("/auction", {
			state: { auction },
		});
	}
	return (
		<>
			<input
				className="search"
				type="text"
				placeholder="Search for an Auction..."
			/>

			<div className="auctions-container">
				<h1>Recent Auctions</h1>
				<div className="auctions-list">
					{auctions.map((auction) => (
						<div
							className="auction"
							key={auction.id}
							onClick={() => toSelectedAuctionPage(auction)}
						>
							<span>{auction.title}</span>
							<span>Price: {auction.price}</span>
							<span>created by: {auction.createdBy}</span>
							<span>info: {auction.description}</span>
							<img src="https://images.blocketcdn.se/dynamic/1280w/item/23497407/063f54cd-8b3c-4a5e-ba1e-c50b0bef784f" />
							<span>Start Date: {auction.startDate}</span>
							<span>End Date: {auction.endDate}</span>
						</div>
					))}
				</div>
			</div>
			<button className="btn-create-new-auction" onClick={toAddNewAuction}>
				Create new Auction
			</button>
		</>
	);
}

export default LandingPage;
