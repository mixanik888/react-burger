import { createSlice } from "@reduxjs/toolkit";
import { findOrderToNumber } from "../actions/actions";
import { TOrderKeyOwner } from "../../utils/types";

interface TSliceState { 
  loading: boolean;
  error?: null|string;
  orders?: Array<TOrderKeyOwner>;
} 

const initialState = {
  loading: false,
  error: null,
  orders: [],

} satisfies TSliceState as TSliceState

const findOrdersSlice = createSlice({
  name: "findOrder",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(findOrderToNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findOrderToNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(findOrderToNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const reducer = findOrdersSlice.reducer;

type TActionCreators = typeof findOrdersSlice.actions;

export type TOrdersActions = ReturnType<TActionCreators[keyof TActionCreators]>;