import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    bun: null,
    Ingredients:[],
    dragIndex: null,
    hoverIndex: null,
}

export const BurgerSlice = createSlice ({
    name: "Burger",
    initialState,
    reducers: {
        spliceConstructorItem  (state, action) {
                const { dragIndex, hoverIndex } = action.payload
                state.Ingredients.splice(dragIndex.dragIndex, 0, state.Ingredients.splice(hoverIndex.hoverIndex, 1)[0]);
            },
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
export const { addConstructorItem, deleteConstructorItem,addConstructorBun, ClearConstructor, spliceConstructorItem } = BurgerSlice.actions

