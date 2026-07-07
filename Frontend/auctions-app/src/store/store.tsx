import { configureStore } from "@reduxjs/toolkit";
import MainMenuSlice from "../slices/MainMenuSlice";
import AuctionsSlace from "../slices/AuctionsSlice"
import UserLoggedInSlice from "../slices/UserLoggedSlice"

export const store = configureStore({
    reducer: {
        menu: MainMenuSlice,
        auctions: AuctionsSlace,
        user: UserLoggedInSlice,
    },
});

// Types (IMPORTANT for useSelector / useDispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;