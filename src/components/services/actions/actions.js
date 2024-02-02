import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectIngredients, addProjectOrder } from "../../utils/burger-api";

export const loadIngredient = createAsyncThunk(
    "loadIngredient",
    async() => {
        return await getProjectIngredients();
    }
)

export const AddOrder = createAsyncThunk(
    "loadAddOrder",
    async(order) => {
        return await addProjectOrder(order);
    }
)
