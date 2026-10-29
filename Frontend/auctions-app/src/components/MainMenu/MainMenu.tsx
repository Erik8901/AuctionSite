import { useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import "./MainMenu.css";

import { closeMenu } from "../../slices/MainMenuSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function MainMenu() {
    const navigate = useNavigate();
    const isOpen = useAppSelector((state) => state.menu.isOpen);
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(
        (state: RootState) => state.user.isLoggedIn
    );

    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "";
    //     }

    //     return () => {
    //         document.body.style.overflow = "";
    //     };
    // }, [isOpen]);


    function toAddNewAuction() {

        if (isLoggedIn === false) {
            navigate("/login")
            return
        }

        navigate("/add-new-auction");
        dispatch(closeMenu())
    }

    function toUserAuctions() {
        if (isLoggedIn === false) {
            navigate("/login")
            return
        }
        console.log("no href")
    }

    function toUserProfile() {
        if (isLoggedIn === false) {
            navigate("/login")
            return
        }
        console.log("no href")
    }

    return (
        <>
            <div className={`main-menu ${isOpen ? "open" : ""}`}>
                <div className="main-menu-links">
                    <div className="link-wrapper">
                        <FontAwesomeIcon
                            icon={faGavel}
                            className="link-icon"
                        /><span className="main-menu-link" onClick={toUserAuctions}>My Auctions</span>
                    </div>
                    <div className="link-wrapper">
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="link-icon"
                        />
                        <span className="main-menu-link" onClick={toAddNewAuction}>
                            Create new Auction
                        </span>
                    </div>
                    <div className="link-wrapper">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="link-icon"
                        />
                        <span className="main-menu-link" onClick={toUserProfile}>My Profile</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainMenu;
