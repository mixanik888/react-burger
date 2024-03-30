import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "./store";
import { ApiConfig, refreshToken } from "../utils/burger-api";


export type TwsActionsTypes = {
    wsInitUser:ActionCreatorWithPayload<string>, 
    wsDisconnectUser: ActionCreatorWithoutPayload,
    wsSendMessage?:ActionCreatorWithPayload<any>, 
    onOpenUser:ActionCreatorWithoutPayload, 
    onCloseUser:ActionCreatorWithoutPayload, 
    onErrorUser:ActionCreatorWithPayload<string>, 
    onMessageUser:ActionCreatorWithPayload<any>,
}

//wsInitUser , onOpenUser, onCloseUser, onErrorUser, onMessageUser, wsDisconnectUser

export const socketMiddlewareUser = (
  wsActions: TwsActionsTypes,
  withTokenRefresh: boolean 
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
  
    const {
      wsInitUser , onOpenUser, onCloseUser, onErrorUser, onMessageUser, wsDisconnectUser
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      //const { type, payload } = action;


      if (wsInitUser.match(action)) {
        const url = action.payload;
        socket = new WebSocket(url);
       
        socket.onopen = (event) => {
          dispatch(onOpenUser());
        };

        socket.onerror = (event) => {
          dispatch(onErrorUser(event.type.toString()));
        };

        socket.onmessage = (event) => {
         //console.log(event);
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
            refreshToken().then((refreshData) => {
 
              const token = refreshData.accessToken.replace("Bearer ", "");
              const URL = `${ApiConfig.baseURLWS}?token=${token}`;

              dispatch(wsInitUser(URL));
            });
          } else {
            dispatch(onMessageUser(parsedData));
          }
        };

        socket.onclose = (event) => {
          dispatch(onCloseUser());
        };
      }

      if (wsDisconnectUser && wsDisconnectUser.match(action) && socket) {
        socket.close();
      }
      next(action);
    };
  };
};
