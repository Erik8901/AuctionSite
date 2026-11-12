
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            searchPlaceholder: "Search for an Auction...",
            allCategories: "All Categories",
            recentAuctions: "Recent Auctions:",
            login: "Login",
            logout: "Logout",
            noAuctionFound: "No auction found",
            info: "Info",
            start: "Start",
            end: "End",
            createdBy: "Created by",
            addNewBid: "Add New Bid",
            highestBidders: "Highest Bidders",
            bidSuccessfullyAdded: "Your bid was successfully added",
            bid: "Bid",
            addBid: "Add Bid",
            bidError: "Your bid must be higher than both the highest bid and the starting price.",
        },
    },
    sv: {
        translation: {
            searchPlaceholder: "Sök efter en auktion...",
            allCategories: "Alla kategorier",
            recentAuctions: "Senaste auktionerna:",
            login: "Logga in",
            logout: "Logga ut",
            noAuctionFound: "Ingen auktion hittades",
            info: "Information",
            start: "Start",
            end: "Slut",
            createdBy: "Skapad av",
            addNewBid: "Lägg ett nytt bud",
            highestBidders: "Högsta budgivare",
            bidSuccessfullyAdded: "Ditt bud har lagts till",
            bid: "Bud",
            addBid: "Lägg bud",
            bidError: "Ditt bud måste vara högre än både det högsta budet och utropspriset.",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
