import { useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import "./MainMenu.css";

import { closeMenu } from "../../slices/MainMenuSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";



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
                    <span className="main-menu-link" onClick={toAddNewAuction}>
                        Create new Auction
                    </span>
                    <span className="main-menu-link" onClick={toUserAuctions}>My Auctions</span>
                    <span className="main-menu-link" onClick={toUserProfile}>My Profile</span>
                </div>
            </div>
        </>
    );
}

export default MainMenu;
