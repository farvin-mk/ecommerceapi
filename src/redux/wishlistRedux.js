import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
        quantity: 0,
    },
    reducers: {
        addProductWish: (state, action) => {

            const p = state.products.findIndex(product => product._id === action.payload._id);
            if (p === -1) {
                state.quantity += 1
                state.products.push(action.payload)

            } 
            if (state.products.length === 0) {
                state.quantity += 1
                state.products.push(action.payload);
            }

        },
        
        clearWishlist: (state) => {
            state.products = [];
            state.quantity=0;
        },
    },
});

export const { addProductWish,clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;