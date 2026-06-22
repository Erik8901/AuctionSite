import { useNavigate } from "react-router-dom";
import "./MainMenu.css";

import { closeMenu } from "../../slices/MainMenuSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

function MainMenu() {
    const navigate = useNavigate();
    const isOpen = useAppSelector((state) => state.menu.isOpen);
    const dispatch = useAppDispatch();

    function toAddNewAuction() {
        navigate("/add-new-auction");
        dispatch(closeMenu())
    }

    return (
        <>
            <div className={`main-menu ${isOpen ? "open" : ""}`}>
                <div className="main-menu-links">
                    <span className="main-menu-link" onClick={toAddNewAuction}>
                        Create new Auction
                    </span>
                    <span className="main-menu-link">My Auctions</span>
                    <span className="main-menu-link">My Profile</span>
                </div>
            </div>
        </>
    );
}

export default MainMenu;
