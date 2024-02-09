import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actionIngredient: null,
};

export const actionIngredientSlice = createSlice({
  name: "actIngredient",
  initialState,
  reducers: {
    setActionIngredient(state, action) {
      state.actionIngredient = action.payload;
    },
  },
});

export const reducer = actionIngredientSlice.reducer;

export const { setActionIngredient } = actionIngredientSlice.actions;
