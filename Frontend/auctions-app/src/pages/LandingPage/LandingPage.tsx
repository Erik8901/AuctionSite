
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { Auction } from "../../types/auction";
import { useAppSelector } from "../../hooks";

import failImg from "../../assets/No-Image-Placeholder.svg";
import "./LandingPage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
	const navigate = useNavigate();

	// i18next language and translations
	const { t, i18n } = useTranslation();

	const language = i18n.resolvedLanguage || "en";
	const isSwedish = language.startsWith("sv");

	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("");

	const isOpen = useAppSelector((state) => state.menu.isOpen);

	// Redux source of truth
	const auctions = useAppSelector((state) => state.auctions.items);

	// API base URL
	const API_BASE = "http://localhost:5153";

	// Get translated auction title
	function getAuctionTitle(auction: Auction) {
		return isSwedish
			? auction.titleSv || auction.title
			: auction.titleEn || auction.title;
	}

	// Get translated auction description
	function getAuctionDescription(auction: Auction) {
		return isSwedish
			? auction.descriptionSv || auction.description
			: auction.descriptionEn || auction.description;
	}

	// Unique categories
	const categories = useMemo(() => {
		return [...new Set(auctions.map(a => a.category))];
	}, [auctions]);

	// Combined filtering (search + category)
	const filteredAuctions = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();

		return auctions.filter(a => {
			const title = getAuctionTitle(a);

			const matchesSearch =
				normalizedSearch === "" ||
				title.toLowerCase().includes(normalizedSearch);

			const matchesCategory =
				filterCategory ? a.category === filterCategory : true;

			return matchesSearch && matchesCategory;
		});
	}, [auctions, search, filterCategory, isSwedish]);

	// Navigate to selected auction
	function toSelectedAuctionPage(auction: Auction) {
		navigate("/auction", {
			state: { auction },
		});
	}

	// Search input
	function searchAuctions(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	// Toggle category filter
	function handleCategoryClick(category: string) {
		setFilterCategory(prev =>
			prev === category ? "" : category
		);
	}

	// Reset category filter
	function resetCategoryClick() {
		setFilterCategory("");
	}

	return (
		<div className={`landing-page ${isOpen ? "disabled" : ""}`}>

			{/* Search */}
			<div className="search-container">
				<div className="search-wrapper">
					<input
						className="search"
						type="text"
						placeholder={t("searchPlaceholder")}
						value={search}
						onChange={searchAuctions}
					/>

					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className="search-icon"
					/>
				</div>
			</div>

			{/* Auctions */}
			<div className="auctions-container">

				{/* Categories */}
				<div className="categories-container">
					<span
						className={`categories ${filterCategory === "" ? "active" : ""}`}
						onClick={resetCategoryClick}
					>
						{t("allCategories")}
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

				{/* Recent auctions heading */}
				<h1 className="recent-auctions">
					{t("recentAuctions")}
				</h1>

				{/* Auction list */}
				<div className="auctions-list">
					{filteredAuctions.map(auction => {
						const translatedTitle = getAuctionTitle(auction);
						const translatedDescription =
							getAuctionDescription(auction);

						return (
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
									alt={translatedTitle}
								/>

								<div className="aution-landing-page-info">
									<span className="auction-title">
										{translatedTitle}
									</span>

									{/* <span className="auction-info">
										{translatedDescription}
									</span> */}

									<span className="auction-price">
										{auction.price} €
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
