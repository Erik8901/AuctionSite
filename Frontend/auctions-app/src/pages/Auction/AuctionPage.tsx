
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

	const { t, i18n } = useTranslation();

	const language = i18n.resolvedLanguage || "en";
	const isSwedish = language.startsWith("sv");

	const [auction, setAuction] = useState(location.state?.auction);
	const [userAuction, setUserAuction] = useState(false);
	const [openNewBidForm, setOpenNewBidForm] = useState(false);
	const [addBid, setAddBid] = useState<number>(0);
	const [bidHigher, setBidhigher] = useState(false);
	const [bidSuccessFullyAdded, setBidSuccessFullyAdded] = useState(false);

	if (!auction) return <div>{t("noAuctionFound")}</div>;

	// Select translated auction content
	const translatedTitle = isSwedish
		? auction.titleSv || auction.title
		: auction.titleEn || auction.title;

	const translatedDescription = isSwedish
		? auction.descriptionSv || auction.description
		: auction.descriptionEn || auction.description;

	const token = localStorage.getItem("token");

	function parseJwt(token: string | null) {
		if (!token) return null;

		try {
			const base64Url = token.split(".")[1];
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split("")
					.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
					.join("")
			);

			return JSON.parse(jsonPayload);
		} catch {
			return null;
		}
	}

	const user = parseJwt(token);

	const email =
		user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? "";

	useEffect(() => {
		if (!auction || !email) return;

		setUserAuction(email === auction.createdBy);
	}, [email, auction]);

	const highestBid: Bid | null =
		auction.bids?.length > 0
			? auction.bids.reduce((max: Bid, bid: Bid) =>
				bid.price > max.price ? bid : max
			)
			: null;

	async function AddBid(e: React.FormEvent) {
		e.preventDefault();

		if (addBid <= (highestBid?.price ?? 0)) {
			setBidhigher(true);
			return;
		}

		if (addBid <= (auction?.price ?? 0)) {
			setBidhigher(true);
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
			}
		);

		if (!res.ok) return;

		const savedBid = await res.json();

		setAuction((prev: any) => ({
			...prev,
			bids: [...(prev.bids ?? []), savedBid],
		}));

		if (savedBid) {
			setBidSuccessFullyAdded(true);

			setTimeout(() => {
				setOpenNewBidForm(false);
				setBidSuccessFullyAdded(false);
			}, 3000);
		}
	}

	return (
		<div className="selected-auction">
			<div className="selected-auction-container">

				<img
					className="auction-page-img"
					src={auction.imgUrl ? `${API_BASE}${auction.imgUrl}` : failImg}
					alt={translatedTitle}
				/>

				<div className="selected-auction-info">

					<span className="title">{translatedTitle}</span>

					<span className="price">
						{auction.price} €
					</span>

					<div className="selected-auction-user-info">
						<span className="info">{t("info")}:</span>
						<span>{translatedDescription}</span>
					</div>

					<div className="selected-auction-user-info">
						<span className="date">{t("start")}:</span>
						<span>{auction.startDate.split("T")[0]}</span>
					</div>

					<div className="selected-auction-user-info">
						<span className="date">{t("end")}:</span>
						<span>{auction.endDate.split("T")[0]}</span>
					</div>

					<div className="selected-auction-user-info">
						<span className="creator">{t("createdBy")}:</span>
						<span>{auction.createdBy}</span>
					</div>

					{!userAuction && (
						<button
							className="btn-add-bid"
							onClick={() => setOpenNewBidForm(!openNewBidForm)}
						>
							{t("addNewBid")}
						</button>
					)}
				</div>

				<div className="selected-auction-bidder-info">
					<div className="bids-list">
						<span>{t("highestBidders")}:</span>

						{auction.bids?.map((bid: Bid) => (
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

						<span
							className="close-modal"
							onClick={() => setOpenNewBidForm(false)}
						>
							X
						</span>

						{bidSuccessFullyAdded ? (
							<h2>{t("bidSuccessfullyAdded")}</h2>
						) : (
							<form onSubmit={AddBid}>
								<div className="bid-fields">

									<label className="bid-label">
										{t("bid")}:
									</label>

									<input
										className="bid-input"
										type="number"
										autoComplete="off"
										value={addBid}
										onChange={(e) => {
											setAddBid(Number(e.target.value));
											setBidhigher(false);
										}}
										placeholder="100"
									/>

									<button
										className="btn-add-bid"
										type="submit"
									>
										{t("addBid")}
									</button>

									{bidHigher && (
										<span className="error-msg">
											{t("bidError")}
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
