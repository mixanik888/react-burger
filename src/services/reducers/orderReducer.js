import { createSlice } from "@reduxjs/toolkit";
import { addOrder } from "../actions/actions";

const initialState = {
  loading: false,
  error: null,
  order: null,
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.error;
        state.order = null;
      });
  },
});

export const reducer = ordersSlice.reducer;
