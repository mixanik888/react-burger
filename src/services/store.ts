import {  configureStore as createStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as ingredientsReducer } from "./reducers/ingredientReducer";
import { reducer as orderReducer } from "./reducers/orderReducer";
import { reducer as actionIngredientReducer } from "./reducers/actionIngredientReducer";
import { reducer as burgerReducer} from "./reducers/constructorReducer";
import { reducer as authReducer } from "./reducers/authReducer";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { TActionIngredientActions } from "./reducers/actionIngredientReducer";
import { TAuthActions } from "./reducers/authReducer";
import { TBurgerActions } from "./reducers/constructorReducer";
import { TIngredientsActions } from "./reducers/ingredientReducer";
import { TOrdersActions } from "./reducers/orderReducer";
//import type {} from "redux-thunk/extend-redux";

export type AppActions =
  | TActionIngredientActions
  | TAuthActions
  | TBurgerActions
  | TIngredientsActions
  | TOrdersActions
  ;

 const RootReducer = combineReducers({
  data: ingredientsReducer,
  acIngredient: actionIngredientReducer,
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer, 
 }
 )

 export type RootState = ReturnType<typeof RootReducer>;

 
  const store = createStore({
     reducer:RootReducer,

   });
 
   export default store;
 


// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     AppActions
//     >;
    

//   type AppDispatch<TReturnType = void> = (
//    action: AppActions | AppThunk<TReturnType>
//  ) => TReturnType;

//  export const useDispatch: () => AppDispatch = dispatchHook;
//  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

 export type AppDispatch = typeof store.dispatch;
 export const useDispatch: () => AppDispatch = dispatchHook;
 export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;