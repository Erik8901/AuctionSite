import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isLoggedIn: boolean;
}

const initialState: UserState = {
    isLoggedIn: !!localStorage.getItem("token"),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userStatus(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { userStatus } = userSlice.actions;
export default userSlice.reducer;