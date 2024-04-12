import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { loadIngredient } from "../actions/actions";
import { TElement } from "../../utils/types";

export interface TIngredientsSlice { 
   loading: boolean;
   error?: null| SerializedError;
   data1: Array<TElement>;
 } 

export const initialState = {
  data1: [],
  loading: false,
  error: null,
} satisfies TIngredientsSlice as TIngredientsSlice

const ingredientsSlice = createSlice({
  name: "task",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredient.fulfilled, (state, action) => {
        state.loading = false;
        state.data1 = action.payload.data;
      })
      .addCase(loadIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const reducer = ingredientsSlice.reducer;

type TActionCreators = typeof ingredientsSlice.actions;

export const actionSlice = ingredientsSlice.actions;

export type TIngredientsActions = ReturnType<TActionCreators[keyof TActionCreators]>;