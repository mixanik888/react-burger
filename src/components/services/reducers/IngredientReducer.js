import { createSlice } from "@reduxjs/toolkit";
import { loadIngredient } from "../actions/actions";

const initialState = {
    data1: [],
    loading: false,
    error: null,
}



const ingredientsSlice = createSlice({
    name: "task",
    initialState,
    extraReducers:(builder) => {
        builder
            .addCase(loadIngredient.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredient.fulfilled,(state, action)=>{
                state.loading = false;
                state.data1 = action.payload;
            })
            .addCase(loadIngredient.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export const reducer = ingredientsSlice.reducer;
