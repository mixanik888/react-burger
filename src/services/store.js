import { configureStore as createStore } from "@reduxjs/toolkit";
import { reducer as ingredientsReducer } from "../services/reducers/ingredientReducer";
import { reducer as orderReducer } from "../services/reducers/orderReducer";
import { reducer as actionIngredientReducer } from "../services/reducers/actionIngredientReducer";
import { reducer as burgerReducer } from "../services/reducers/constructorReducer";

export const configureStore = (initialState) => {
  const store = createStore({
    reducer: {
      data: ingredientsReducer,
      acIngredient: actionIngredientReducer,
      burger: burgerReducer,
      order: orderReducer,
    },
    preloadedState: initialState,
  });
  return store;
};
