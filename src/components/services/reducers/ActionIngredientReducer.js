import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ActionIngredient: null
}

export const ActionIngredientSlice = createSlice ({
    name: "ActIngredient",
    initialState,
    reducers: {
        SetActionIngredient(state, action) {
            state.ActionIngredient = action.payload;
        }
    }
})

export const reducer = ActionIngredientSlice.reducer;

export const {SetActionIngredient} = ActionIngredientSlice.actions;