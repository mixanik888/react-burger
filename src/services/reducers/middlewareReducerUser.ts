import { createReducer } from "@reduxjs/toolkit";
import {
    onCloseUser,
    wsInitUser,
    onErrorUser,
    onOpenUser,
    onMessageUser,
} from "../actions/middlewareActions";
import { TOrderKey } from "../../utils/types";

export enum TWebSocketStatus {
    ONLINE,
    OFFLINE,
    CONNECTING,
}

export interface TWSSlice {
  status: TWebSocketStatus;
  connectingError: string;
  orders: Array<TOrderKey>;
  total: number;
  totalToday: number;
}

export const initialState:TWSSlice = {
  status: TWebSocketStatus.OFFLINE,
  connectingError: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducerUser = createReducer(initialState, (builder) => {
  builder.addCase(wsInitUser, (state) => {
    state.status = TWebSocketStatus.CONNECTING;
  });
  builder.addCase(onOpenUser, (state) => {
    state.status = TWebSocketStatus.ONLINE;
    state.connectingError = "";
  });
  builder.addCase(onErrorUser, (state, action) => {
    state.status = TWebSocketStatus.OFFLINE;
    state.connectingError = action.payload;
  });
  builder.addCase(onCloseUser, (state) => {
    state.status = TWebSocketStatus.OFFLINE;
  });
  builder.addCase(onMessageUser, (state, action) => {
    state.orders      = action.payload.orders;
    state.total       = action.payload.total;
    state.totalToday  = action.payload.totalToday;
  });
});

