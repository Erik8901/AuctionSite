import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import HeaderTop from "./components/Header-Top/HeaderTop";
import "./App.css";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddAuctionPage from "./pages/AddAuctionPage/AddAuctionPage";
import AuctionPage from "./pages/Auction/AuctionPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<HeaderTop />
				<Header />
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/auctions" element={<LandingPage />} />
					<Route path="/add-new-auction" element={<AddAuctionPage />} />
					<Route path="/auction" element={<AuctionPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
