import { useEffect, useMemo, useState } from "react";
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
    const [filterCategory, setFilterCategory] = useState("");
    const isLoggedIn = useSelector(
        (state: RootState) => state.user.isLoggedIn
    );

    const auctions = useSelector((state: RootState) => state.auctions.items);

    // Unique categories
    const categories = useMemo(() => {
        return [...new Set(auctions.map(a => a.category))];
    }, [auctions]);

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

    function handleCategoryClick(category: string) {
        // toggle behavior (click same category = reset filter)
        setFilterCategory(prev =>
            prev === category ? "" : category
        );
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
                <span className="all-categories">All Categories</span>
                <div className="categories-container-main-menu">
                    {/* <span className="categories-title">Categories: </span> */}
                    {categories.map(category => (
                        <span
                            className={`categories ${filterCategory === category ? "active" : ""
                                }`}
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MainMenu;
