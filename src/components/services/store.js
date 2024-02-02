import { configureStore as createStore } from "@reduxjs/toolkit"
import { reducer as ingredientsReducer } from "./reducers/IngredientReducer"
import { reducer as OrderReducer } from "./reducers/OrderReducer"
import { reducer as AcIngredientReducer } from "./reducers/ActionIngredientReducer"
import { reducer as BurgerReducer } from "./reducers/ConstructorReducer"

export const configureStore = (initialState) => {
    const store = createStore({
        reducer: {
            Data : ingredientsReducer,
            AcIngredient: AcIngredientReducer,
            Burger: BurgerReducer,
            Order: OrderReducer ,
        },
        preloadedState:initialState
    });
    return store;
};