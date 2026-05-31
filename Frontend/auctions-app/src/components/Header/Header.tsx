import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";

function Header() {
	const navigate = useNavigate();
	const location = useLocation();

	const [email, setEmail] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");

		function parseJwt(token: string | null) {
			if (!token) return null;

			try {
				const base64Url = token.split(".")[1];
				const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

				const jsonPayload = decodeURIComponent(
					atob(base64)
						.split("")
						.map(
							(c) =>
								"%" +
								("00" + c.charCodeAt(0).toString(16)).slice(-2)
						)
						.join("")
				);

				return JSON.parse(jsonPayload);
			} catch {
				return null;
			}
		}

		const user = parseJwt(token);

		if (user) {
			setEmail(
				user[
				"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
				] ?? ""
			);
		} else {
			setEmail("");
		}
	}, [location.pathname]);

	function logout() {
		localStorage.removeItem("token");
		setEmail("");
		navigate("/login");
	}

	return (
		<div className="header">
			<h2>Auctions Site</h2>
			{email &&
				<div className="user-info-logout-container">

					<span className="user-logins"><span className="logged-in">Logged In as: </span>{email}</span>

					<button className="btn-logout" onClick={logout}>
						Logout
					</button>
				</div>
			}
		</div>
	);
}

export default Header;