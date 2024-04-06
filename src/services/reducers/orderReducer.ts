import { createSlice } from "@reduxjs/toolkit";
import { addOrder } from "../actions/actions";
import { TOrderKey } from "../../utils/types";

interface TSliceState { 
  loading: boolean;
  error?: null|string;
  order?: TOrderKey | null;
} 

const initialState = {
  loading: false,
  error: null,
  order: null,
} satisfies TSliceState as TSliceState

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.error.message;
        state.order = null;
      });
  },
});

export const reducer = ordersSlice.reducer;

type TActionCreators = typeof ordersSlice.actions;

export type TOrdersActions = ReturnType<TActionCreators[keyof TActionCreators]>;