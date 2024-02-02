import { createSlice } from "@reduxjs/toolkit";
import { AddOrder } from "../actions/actions";


const initialState = {
    loading: false,
    error: null,
    order: null,
}

const OrdersSlice = createSlice({
    name: "Order",
    initialState,
    extraReducers:(builder) => {
        builder
            .addCase(AddOrder.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddOrder.fulfilled,(state, action)=>{
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(AddOrder.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const reducer = OrdersSlice.reducer;