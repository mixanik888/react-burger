import { createReducer } from "@reduxjs/toolkit";
import {
    onClose,
    wsInit,
    onError,
    onOpen,
    onMessage,
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

export const wsReducer = createReducer(initialState, (builder) => {
  builder.addCase(wsInit, (state) => {
    state.status = TWebSocketStatus.CONNECTING;
  });
  builder.addCase(onOpen, (state) => {
    state.status = TWebSocketStatus.ONLINE;
    state.connectingError = "";
  });
  builder.addCase(onError, (state, action) => {
    state.status = TWebSocketStatus.OFFLINE;
    state.connectingError = action.payload;
  });
  builder.addCase(onClose, (state) => {
    state.status = TWebSocketStatus.OFFLINE;
  });
  builder.addCase(onMessage, (state, action) => {
    state.orders      = action.payload.orders;
    state.total       = action.payload.total;
    state.totalToday  = action.payload.totalToday;
  });
});

