import {  configureStore as createStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as ingredientsReducer } from "./reducers/ingredientReducer";
import { reducer as orderReducer } from "./reducers/orderReducer";
import { reducer as actionIngredientReducer } from "./reducers/actionIngredientReducer";
import { reducer as burgerReducer} from "./reducers/constructorReducer";
import { reducer as authReducer } from "./reducers/authReducer";
import { reducer as findOrderReducer } from "./reducers/findOrderToNumberReducer";
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
import { wsReducer } from "./reducers/middlewareReducer";
import { wsReducerUser } from "./reducers/middlewareReducerUser";
import { TwsActions } from "./actions/middlewareActions";
import { TwsActionsUser } from "./actions/middlewareActions";
import { socketMiddleware } from "./socket-Middleware";

import { wsInit, onOpen, onClose, onError, onMessage, wsDisconnect, wsInitUser, onOpenUser, onCloseUser, onErrorUser, onMessageUser, wsDisconnectUser  } from "./actions/middlewareActions";
import { socketMiddlewareUser } from "./socket-MiddlewareUser";

const wsActions = {

  wsInit, onOpen, onClose, onError, onMessage, wsDisconnect

}

const wsActionsUser = {
  wsInitUser , onOpenUser, onCloseUser, onErrorUser, onMessageUser, wsDisconnectUser

}


export type AppActions =
  | TActionIngredientActions
  | TAuthActions
  | TBurgerActions
  | TIngredientsActions
  | TOrdersActions
  | TwsActions
  | TwsActionsUser
  ;

 const RootReducer = combineReducers({
  data: ingredientsReducer,
  acIngredient: actionIngredientReducer,
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer, 
  wsOder: wsReducer,
  wsOderUser: wsReducerUser,
  findOrder: findOrderReducer,
 }
 )

 export type RootState = ReturnType<typeof RootReducer>;

 
  const store = createStore({
     reducer:RootReducer,
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(socketMiddleware(wsActions),socketMiddlewareUser(wsActionsUser, true))
   });
 
   export default store;
 
  export type AppDispatch = typeof store.dispatch;
  export const useDispatch: () => AppDispatch = dispatchHook;
  export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;