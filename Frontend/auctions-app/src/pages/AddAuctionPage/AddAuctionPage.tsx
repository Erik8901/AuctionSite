import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import "./AddAuctionpage.css";
import "react-datepicker/dist/react-datepicker.css";

function AddAuctionPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [createdBy, setCreatedBy] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [manualCategory, setManualCategory] = useState("");
	const [auctionSuccessfullyCreated, setAuctionSuccessfullyCreated] = useState(false);

	const category = manualCategory || selectedCategory;

	const navigate = useNavigate();

	const auctions = useSelector(
		(state: RootState) => state.auctions.items
	);

	const categories = [
		...new Set(auctions.map((auction) => auction.category))
	];


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
			user[
			"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
			];

		setCreatedBy(email);
	}, []);

	const addNewAuction = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();


		const formData = new FormData();

		formData.append("title", title);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("price", price);
		formData.append("startDate", startDate.toISOString());
		formData.append("endDate", endDate.toISOString());
		formData.append("createdBy", createdBy);


		if (image) {
			formData.append("image", image);
		}

		try {
			const response = await fetch("http://localhost:5153/api/auction", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.text();
				console.log("ERROR:", errorData);
				throw new Error("Failed to create auction");
			}

			await response.json();

			setAuctionSuccessfullyCreated(!auctionSuccessfullyCreated);

			setTimeout(() => {
				navigate("/");
			}, 3000);

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="add-auction-container">
			{auctionSuccessfullyCreated ?
				<div className="success">
					<div className='success-top'>
						<span className='success-text'>Auction <span className='success-text-green'>Successfully </span>Created</span>
					</div>
					<span className='success-text'>Redirecting...</span>
				</div> :
				<div className="add-auction-inner-container">

					<form onSubmit={addNewAuction} className="create-new-auction-form">
						<h1 className="h1-title">Add New Auction</h1>

						<div className="create-new-auction-fields">
							<label>Title</label>
							<input value={title} onChange={(e) => setTitle(e.target.value)} />

							<label>Select a Category:</label>
							<select
								value={selectedCategory}
								onChange={(e) => {
									setSelectedCategory(e.target.value);
									setManualCategory(""); // clear manual input
								}}
								disabled={manualCategory !== ""}
							>
								<option value="">All categories</option>

								{categories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>

							<label>Or add Category Manually</label>
							<input
								value={manualCategory}
								onChange={(e) => setManualCategory(e.target.value)}
								disabled={selectedCategory !== ""}
							/>

							<label>Description</label>
							<input value={description} onChange={(e) => setDescription(e.target.value)} />

							<label>Price</label>
							<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />


							<label>Image</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => {
									if (e.target.files?.[0]) {
										setImage(e.target.files[0]);
									}
								}}
							/>

							<div className="select-date">
								<DatePicker selected={startDate} onChange={(d: any) => setStartDate(d)} />
								<DatePicker selected={endDate} onChange={(d: any) => setEndDate(d)} />
							</div>

							<button type="submit">Add new Auction</button>
						</div>
					</form>

				</div>
			}
		</div>
	);
}

export default AddAuctionPage;