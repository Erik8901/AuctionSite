import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

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

	const navigate = useNavigate();

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

		// ✅ USE FORM DATA (IMPORTANT)
		const formData = new FormData();

		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("startDate", startDate.toISOString());
		formData.append("endDate", endDate.toISOString());
		formData.append("createdBy", createdBy);

		// ✅ IMAGE FILE
		if (image) {
			formData.append("image", image);
		}

		try {
			const response = await fetch("http://localhost:5153/api/auction", {
				method: "POST",
				body: formData, // ❌ no JSON headers
			});

			if (!response.ok) {
				const errorData = await response.text();
				console.log("ERROR:", errorData);
				throw new Error("Failed to create auction");
			}

			await response.json();

			alert("Auction created");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="add-auction-container">
			<form onSubmit={addNewAuction}>
				<h1 className="h1-title">Add New Auction</h1>

				<div className="login-fields">
					<label>Title</label>
					<input value={title} onChange={(e) => setTitle(e.target.value)} />

					<label>Description</label>
					<input value={description} onChange={(e) => setDescription(e.target.value)} />

					<label>Price</label>
					<input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

					{/* ✅ IMAGE UPLOAD INPUT */}
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
	);
}

export default AddAuctionPage;