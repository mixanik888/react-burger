import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "./store";
import { ApiConfig, refreshToken } from "../utils/burger-api";


export type TwsActionsTypes = {
    wsInit:ActionCreatorWithPayload<string>, 
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?:ActionCreatorWithPayload<any>, 
    onOpen:ActionCreatorWithoutPayload, 
    onClose:ActionCreatorWithoutPayload, 
    onError:ActionCreatorWithPayload<string>, 
    onMessage:ActionCreatorWithPayload<any>,
}

//wsInitUser , onOpenUser, onCloseUser, onErrorUser, onMessageUser, wsDisconnectUser

export const socketMiddleware = (
  wsActions: TwsActionsTypes,
  withTokenRefresh: boolean 
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
  
    const {
      wsInit , onOpen, onClose, onError, onMessage, wsDisconnect
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      //const { type, payload } = action;

      if (wsInit.match(action)) {
        const url = action.payload;
        socket = new WebSocket(url);
       
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type.toString()));
        };

        socket.onmessage = (event) => {
         //console.log(event);
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
            refreshToken().then((refreshData) => {
 
              const token = refreshData.accessToken.replace("Bearer ", "");
              const URL = `${ApiConfig.baseURLWS}?token=${token}`;

              dispatch(wsInit(URL));
            });
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };
      }

      if (wsDisconnect && wsDisconnect.match(action) && socket) {
        socket.close();
      }
      next(action);
    };
  };
};
