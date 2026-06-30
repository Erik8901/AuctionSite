import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allAuctions } from "../services/auctionsService";
import type { Auction } from "../types/auction";

export const fetchAuctions = createAsyncThunk(
    "auctions/fetchAuctions",
    async () => {
        const data = await allAuctions();
        return data;
    }
);

type AuctionsState = {
    items: Auction[];
    loading: boolean;
    error: string | null;
};

const initialState: AuctionsState = {
    items: [],
    loading: false,
    error: null,
};

const auctionsSlice = createSlice({
    name: "auctions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuctions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuctions.fulfilled, (state, action) => {
                state.loading = false;

                const now = new Date();

                state.items = action.payload.filter(
                    (a: Auction) => new Date(a.endDate) > now
                );
            })
            .addCase(fetchAuctions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch auctions";
            });
    },
});

export default auctionsSlice.reducer;