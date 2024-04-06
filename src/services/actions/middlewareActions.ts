import { createAction } from "@reduxjs/toolkit";
//import { getJSDocReturnType } from "typescript";
import { TOrderWSResponse } from "../../utils/types";

export const wsInit = createAction<
  string,
  "WS_CONNECTION_CONNECT"
>("WS_CONNECTION_CONNECT");

export const wsDisconnect = createAction("WS_CONNECTION_DISCONNECT");

export const onOpen = createAction("WS_CONNECTION_OPEN");

export const onError = createAction<string, "WS_CONNECTION_ERROR">(
  "WS_CONNECTION_ERROR"
);

export const onClose = createAction("WS_CONNECTION_CLOSED");

export const onMessage = createAction<TOrderWSResponse, "WS_GET_MESSAGE">(
  "WS_GET_MESSAGE"
);

export type TwsActions = ReturnType<typeof wsInit>
    | ReturnType<typeof wsDisconnect>
    | ReturnType<typeof onOpen>
    | ReturnType<typeof onError>
    | ReturnType<typeof onClose>
    | ReturnType<typeof onMessage>;


export const wsInitUser = createAction<
    string,
    "WS_CONNECTION_CONNECT_USER"
  >("WS_CONNECTION_CONNECT_USER");
  
  export const wsDisconnectUser = createAction("WS_CONNECTION_DISCONNECT_USER");
  
  export const onOpenUser = createAction("WS_CONNECTION_OPEN_USER");
  
  export const onErrorUser = createAction<string, "WS_CONNECTION_ERROR_USER">(
    "WS_CONNECTION_ERROR_USER"
  );
  
  export const onCloseUser = createAction("WS_CONNECTION_CLOSED_USER");
  
  export const onMessageUser = createAction<TOrderWSResponse, "WS_GET_MESSAGE_USER">(
    "WS_GET_MESSAGE_USER"
  );
  
  export type TwsActionsUser = ReturnType<typeof wsInitUser>
      | ReturnType<typeof wsDisconnectUser>
      | ReturnType<typeof onOpenUser>
      | ReturnType<typeof onErrorUser>
      | ReturnType<typeof onCloseUser>
      | ReturnType<typeof onMessageUser>;
