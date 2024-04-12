import { SerializedError, createSlice } from "@reduxjs/toolkit";
import {
  singIn,
  userRegister,
  signOut,
  commitProfile,
  setName,
  setPassword,
  setEmail,
  callEmailToForget,
  setToken,
  callResetPassword,
  setUser,
} from "../actions/actions";

import { TUserKey } from "../../utils/types";

interface TSliceState { 
  loading: boolean;
  isSetUser: boolean;
  callEmailForgot?: boolean;
  error?: null| SerializedError;
  name?: string;
  password?: string;
  email?: string;
  user: TUserKey| null;
  token?: null|string;
} 


const initialState = {
  loading: false,
  error: null,
  name: "",
  password: "",
  email: "",
  user: null,
  isSetUser: false,
  callEmailForgot: false,
  token: "",
} satisfies TSliceState as TSliceState

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder
      .addCase(commitProfile.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.user = action.payload.user;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.loading = false;
        state.name = "";
        state.password = "";
        state.email = "";
        state.user = null;
        state.isSetUser = false;

        localStorage.setItem("refreshToken", "");
        localStorage.setItem("accessToken", "");
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(singIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSetUser = false;
      })
      .addCase(singIn.fulfilled, (state, action) => {
        state.loading = false;
         state.name = action.payload.user.name;
         state.password = "";
         state.email = action.payload.user.email;
        
         state.user = action.payload.user;
        state.isSetUser = true;
      })
      .addCase(singIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.isSetUser = false;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSetUser = false;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
         state.name = action.payload.user.name;
         state.password = "";
         state.email = action.payload.user.email;
        state.user = action.payload.user;
        state.isSetUser = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.isSetUser = false;
      })
      .addCase(setName, (state, action) => {
        state.name = action.payload;
      })
      .addCase(setPassword, (state, action) => {
        state.password = action.payload;
      })
      .addCase(setEmail, (state, action) => {
        state.email = action.payload;
      })
      .addCase(setToken, (state, action) => {
        state.token = action.payload;
      })
      .addCase(callEmailToForget.fulfilled, (state, action) => {
        state.loading = false;
        state.callEmailForgot = true;
      })
      .addCase(callEmailToForget.pending, (state, action) => {
        state.loading = true;
        state.callEmailForgot = false;
      })
      .addCase(callEmailToForget.rejected, (state, action) => {
        state.loading = false;
        state.callEmailForgot = false;
        state.error = action.error
      })
      .addCase(callResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.callEmailForgot = false;
        state.password = "";
      })
      .addCase(callResetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(callResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        if (action.payload !== undefined && localStorage.getItem("accessToken") !== null ) {
          state.loading = false;
          state.name = action.payload.user.name;
          state.password = "";
          state.email = action.payload.user.email;
          state.user = action.payload.user;
          state.isSetUser = true;
        } else {
          state.loading = false;
          state.isSetUser = false;
        }
      })
      .addCase(setUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isSetUser = false;
        state.name = "";
      })
      .addCase(setUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
        state.isSetUser = false;
      });
  },
});

export const reducer = authSlice.reducer;

type TActionCreators = typeof authSlice.actions;

export type TAuthActions = ReturnType<TActionCreators[keyof TActionCreators]>;