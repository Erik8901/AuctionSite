import { configureStore } from "@reduxjs/toolkit";
import MainMenuSlice from "../slices/MainMenuSlice";

export const store = configureStore({
    reducer: {
        menu: MainMenuSlice,
    },
});

// Types (IMPORTANT for useSelector / useDispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;