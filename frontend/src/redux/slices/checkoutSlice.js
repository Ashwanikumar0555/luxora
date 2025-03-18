

////////////////////////


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a checkout session
export const createCheckoutSession = createAsyncThunk(
    "checkout/createCheckout", // Fixed typo: "createChheckout" -> "createCheckout"
    async (checkoutData, { rejectWithValue }) => { // Renamed parameter for clarity
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                checkoutData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Fixed: Added quotes around "userToken"
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSession.pending, (state) => { // Fixed: Use createCheckoutSession consistently
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => { // Fixed: Use createCheckoutSession consistently
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckoutSession.rejected, (state, action) => { // Fixed: Use createCheckoutSession consistently
                state.loading = false;
                state.error = action.payload?.message || "Checkout failed"; // Added fallback for safety
            });
    },
});

export default checkoutSlice.reducer;

// ////////////////

