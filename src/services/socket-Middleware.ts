import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "./store";


export type TwsActionsTypes = {
    wsInit:ActionCreatorWithPayload<string>, 
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?:ActionCreatorWithPayload<any>, 
    onOpen:ActionCreatorWithoutPayload, 
    onClose:ActionCreatorWithoutPayload, 
    onError:ActionCreatorWithPayload<string>, 
    onMessage:ActionCreatorWithPayload<any>,
}


export const socketMiddleware = ( wsActions: TwsActionsTypes): Middleware<{}, RootState> => {
    return (store) => {
      let socket: WebSocket | null = null;
  
      return next => (action) => {
        const { dispatch } = store;
        //const { type } = action;
        const { wsInit, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

        if (wsInit.match(action)) {
           const url = action.payload;
           socket = new WebSocket(url);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch(onOpen());
          };
  
          socket.onerror = event => {
            dispatch(onError(event.type.toString()));
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          };
  
          socket.onclose = event => {
            dispatch(onClose());
          };

          if (wsDisconnect.match(action)){
            socket.close();
            dispatch(onClose());
          }
  
        }
  
        next(action);
      };
    }
  };
