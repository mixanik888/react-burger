import {  PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TElement } from "../../utils/types";

interface TSliceState { 
  actionIngredient: TElement | null;
} 

const initialState = {
  actionIngredient: null,
} satisfies TSliceState as TSliceState

export const actionIngredientSlice = createSlice({
  name: "actIngredient",
  initialState,
  reducers: {
    setActionIngredient(state, action:PayloadAction<TElement>) {
      state.actionIngredient = action.payload;
    },
  },
});

export const reducer = actionIngredientSlice.reducer;

//export type TactionIngredientSlice = typeof actionIngredientSlice.actions;

export const { setActionIngredient } = actionIngredientSlice.actions;

type TActionCreators = typeof actionIngredientSlice.actions;

export type TActionIngredientActions = ReturnType<TActionCreators[keyof TActionCreators]>;
