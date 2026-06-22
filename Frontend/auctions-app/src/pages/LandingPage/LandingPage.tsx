import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { allAuctions } from "../../services/auctionsService";
import failImg from "../../assets/No-Image-Placeholder.svg";

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
	imgUrl: string
};

function LandingPage() {
	const navigate = useNavigate();

	const [auctions, setAuctions] = useState<Auction[]>([]);
	const [search, setSearch] = useState("");

	const API_BASE = "http://localhost:5153";

	const filteredAuctions = useMemo(() => {
		return auctions.filter((auction) =>
			auction.title.toLowerCase().includes(search.toLowerCase()),
		);


	}, [auctions, search]);

	useEffect(() => {
		async function fetchAuctions() {
			try {
				const data = await allAuctions();

				const now = new Date();

				const activeAuctions = data.filter(
					(auction: Auction) => new Date(auction.endDate) > now,
				);

				setAuctions(activeAuctions);
			} catch (error) {
				console.log("Failed to load auctions");
				console.error(error);
			}
		}

		fetchAuctions();
	}, []);



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
			<div className="search-container">
				<input
					className="search"
					type="text"
					placeholder="Search for an Auction..."
					value={search}
					onChange={searchAuctions}
				/>
			</div>

			<div className="auctions-container">
				{/* <h1>Recent Auctions</h1> */}

				<div className="auctions-list">
					{filteredAuctions.map((auction) => (
						<div
							className="auction"
							key={auction.id}
							onClick={() => toSelectedAuctionPage(auction)}
						>
							<img
								className="auction-img"
								src={auction.imgUrl ? `${API_BASE}${auction.imgUrl}` : failImg}
								alt={auction.title}
							/>
							<div className="aution-landing-page-info">
								<span className="auction-title">{auction.title}</span>
								<span className="auction-info">{auction.description}</span>
								<span className="auction-price">{auction.price} €</span>
							</div>
						</div>
					))}
				</div>
			</div>


		</>
	);
}

export default LandingPage;
