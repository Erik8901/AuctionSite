import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function Header() {
	const navigate = useNavigate();
	function logout() {
		localStorage.removeItem("token");
		navigate("/login");
	}
	return (
		<>
			<div className="header">
				<h2>Auctions Site</h2>
				<button className="btn-logout" onClick={logout}>
					Logout
				</button>
			</div>
		</>
	);
}

export default Header;
