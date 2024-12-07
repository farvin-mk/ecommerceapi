import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
          
            const p = state.products.findIndex(product => product._id === action.payload._id && product.size === action.payload.size && product.color === action.payload.color);
            if (p !== -1) {
                if(state.products[p].quantity!== action.payload.quantity){
                    state.products[p].quantity += action.payload.quantity
                    state.total += action.payload.price * action.payload.quantity
                }
               
            } else {
                state.quantity += 1
                state.products.push(action.payload)
                state.total += action.payload.price * action.payload.quantity
            }

        },
        updateProduct: (state, action) => {

            const p = state.products.findIndex(product => product._id === action.payload.id && product.size === action.payload.size && product.color === action.payload.color);

            if (p !== -1) {
                if (action.payload.type === 'dec') {
                   
                    state.products[p].quantity = state.products[p].quantity - 1
                    state.total -= state.products[p].price

                } else if (action.payload.type === 'inc') {
                   
                    state.products[p].quantity = state.products[p].quantity + 1
                    state.total += state.products[p].price
                }
            }


        },
        deleteProduct: (state, action) => {
            const p = state.products.findIndex(product => product._id === action.payload.id && product.size === action.payload.size && product.color === action.payload.color);
            state.total -= state.products[p].price * state.products[p].quantity
            state.products.splice(
                state.products.findIndex(product => product._id === action.payload.id && product.size === action.payload.size && product.color === action.payload.color), 1
              );
               state.quantity -= 1
             
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, updateProduct, clearCart,deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;