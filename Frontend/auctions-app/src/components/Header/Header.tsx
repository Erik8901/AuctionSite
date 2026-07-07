import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainMenu from "../MainMenu/MainMenu"
import { toggleMenu } from "../../slices/MainMenuSlice";
import { userStatus } from "../../slices/UserLoggedSlice"
import { useAppDispatch, useAppSelector } from "../../hooks";

import "./Header.css";


function Header() {
	const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const isOpen = useAppSelector((state) => state.menu.isOpen);



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
		dispatch(userStatus(false));
		setEmail("");
		navigate("/login");
	}

	return (
		<div className="header">
			<div className="header-left">
				<button className="hamburger" aria-label="Menu" onClick={() => dispatch(toggleMenu())}>
					<span className={isOpen ? "close" : "open"}></span>
					<span className={isOpen ? "close" : "open"}></span>
					<span className={isOpen ? "close" : "open"}></span>
					<span className={isOpen ? "openX" : "closeX"}>X</span>
				</button>
				<h2 className="header-title" onClick={() => navigate("/auctions")}>Auctions Site</h2>
				{/* <p>Menu is: {isOpen ? "OPEN" : "CLOSED"}</p> */}
			</div>

			{isOpen && (
				<MainMenu />
			)}

			<div className="header-right">
				{email ? (
					<div className="user-info-logout-container">
						<span className="user-logins">
							<span className="logged-in">Logged In as: </span>
							{email}
						</span>

						<button className="btn-logout" onClick={logout}>
							Logout
						</button>
					</div>
				) : (
					<button className="btn-logout" onClick={() => navigate("/login")}>
						Login
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;