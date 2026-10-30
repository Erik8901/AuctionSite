import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import type { Auction } from "../../types/auction";

import failImg from "../../assets/No-Image-Placeholder.svg";
import "./LandingPage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	// Redux source of truth
	const auctions = useSelector((state: RootState) => state.auctions.items);

	// Unique categories
	const categories = useMemo(() => {
		return [...new Set(auctions.map(a => a.category))];
	}, [auctions]);

	const API_BASE = "http://localhost:5153";

	// Combined filtering (search + category)
	const filteredAuctions = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();

		return auctions.filter(a => {
			const matchesSearch =
				normalizedSearch === "" ||
				a.title.toLowerCase().includes(normalizedSearch);

			const matchesCategory =
				filterCategory ? a.category === filterCategory : true;

			return matchesSearch && matchesCategory;
		});
	}, [auctions, search, filterCategory]);

	function toSelectedAuctionPage(auction: Auction) {
		navigate("/auction", {
			state: { auction },
		});
	}

	function searchAuctions(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	function handleCategoryClick(category: string) {
		// toggle behavior (click same category = reset filter)

		console.log(category)
		setFilterCategory(prev =>
			prev === category ? "" : category
		);
	}

	function ResetCategoryClick() {
		setFilterCategory("");
	}

	return (
		<>
			<div className="search-container">
				<div className="search-wrapper">
					<input
						className="search"
						type="text"
						placeholder="Search for an Auction..."
						value={search}
						onChange={searchAuctions}
					/>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="search-icon"
					/>
				</div>
			</div>

			<div className="auctions-container">
				<div className="categories-container">
					<span
						className={`categories ${filterCategory === "" ? "active" : ""}`}
						onClick={ResetCategoryClick}
					>
						All Categories
					</span>
					{categories.map(category => (
						<span
							className={`categories ${filterCategory === category ? "active" : ""
								}`}
							key={category}
							onClick={() => handleCategoryClick(category)}
						>
							{category}
						</span>
					))}
				</div>

				<h1 className="recent-auctions">Recent Auctions:</h1>

				<div className="auctions-list">
					{filteredAuctions.map(auction => (
						<div
							className="auction"
							key={auction.id}
							onClick={() => toSelectedAuctionPage(auction)}
						>
							<img
								className="auction-img"
								src={
									auction.imgUrl
										? `${API_BASE}${auction.imgUrl}`
										: failImg
								}
								alt={auction.title}
							/>

							<div className="aution-landing-page-info">
								<span className="auction-title">
									{auction.title}
								</span>
								<span className="auction-info">
									{auction.description}
								</span>
								<span className="auction-price">
									{auction.price} €
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default LandingPage;