import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    bun: null,
    Ingredients:[],
}

export const BurgerSlice = createSlice ({
    name: "Burger",
    initialState,
    reducers: {
        deleteConstructorItem  (state, action)  {
                state.Ingredients = state.Ingredients.filter((element) => element.key !== action.payload);       
            },
        addConstructorBun  (state, action)  {
            state.bun = action.payload;       
            },
        ClearConstructor  (state)  {
                state.bun = null;
                state.Ingredients = [];     
                },    
        addConstructorItem: { 
             reducer: (state, action) => {
                 state.Ingredients.push(action.payload);
             },
             prepare: (Ingredients) => {
                 const key = nanoid();
                 return {payload: {...Ingredients, key}};
             }
             }
         }})

export const reducer = BurgerSlice.reducer;
export const { addConstructorItem, deleteConstructorItem,addConstructorBun, ClearConstructor } = BurgerSlice.actions

