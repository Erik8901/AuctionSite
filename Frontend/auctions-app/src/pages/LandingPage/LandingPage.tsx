import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { allAuctions } from "../../services/auctionsService";

import "./LandingPage.css";

type Auction = {
	id: number;
	title: string;
	isDone: Boolean;
	price: number;
	createdBy: string;
	description: string;
	startDate: string;
	endDate: string;
};

function LandingPage() {
	const navigate = useNavigate();

	const [auctions, setAuctions] = useState<Auction[]>([]);
	const [search, setSearch] = useState("");

	const filteredAuctions = useMemo(() => {
		return auctions.filter((auction) =>
			auction.title.toLowerCase().includes(search.toLowerCase()),
		);
	}, [auctions, search]);

	useEffect(() => {

		async function fetchAuctions() {
			try {
				const data = await allAuctions();

				// const fileredByDone = data.filter((auction: Auction) => auction.isDone == false)
				// const isActive = new Date(fileredByDone.endDate) > new Date();
				// console.log(isActive)
				// if (isActive == true) {
				// 	auction.isDone == true;
				// }
				const activeAuctions = data.filter(
					(auction: Auction) =>
						new Date(auction.endDate) > new Date()
				);

				console.log(activeAuctions);
				setAuctions(activeAuctions);
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

	function toSelectedAuctionPage(auction: Auction) {
		navigate("/auction", {
			state: { auction },
		});
	}

	function searchAuctions(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	return (
		<>
			<input
				className="search"
				type="text"
				placeholder="Search for an Auction..."
				value={search}
				onChange={searchAuctions}
			/>

			<div className="auctions-container">
				<h1>Recent Auctions</h1>

				<div className="auctions-list">
					{filteredAuctions.map((auction) => (
						<div
							className="auction"
							key={auction.id}
							onClick={() => toSelectedAuctionPage(auction)}
						>
							<span>{auction.title}</span>
							<span>Price: {auction.price}</span>
							<span>created by: {auction.createdBy}</span>
							<span>info: {auction.description}</span>

							<img
								src="https://images.blocketcdn.se/dynamic/1280w/item/23497407/063f54cd-8b3c-4a5e-ba1e-c50b0bef784f"
								alt={auction.title}
							/>

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
