import { createSlice } from "@reduxjs/toolkit";
import {
  singIn,
  userRegister,
  signOut,
  userProfile,
  setName,
  setPassword,
  setEmail,
  callEmailToForget,
  setToken,
  callResetPassword,
  setUser,
} from "../actions/actions";

const initialState = {
  loading: false,
  error: null,
  name: "",
  password: "",
  email: "",
  isSetUser: false,
  callEmailForgot: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.loading = false;
        state.name = "";
        state.password = "";
        state.email = "";
        state.isSetUser = false;

        localStorage.setItem("refreshToken", "");
        localStorage.setItem("accessToken", "");
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.isSetUser = true;
      })
      .addCase(singIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.isSetUser = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        if (localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== "" ) {
          state.loading = false;
          state.name = action.payload.user.name;
          state.password = "";
          state.email = action.payload.user.email;
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
      })
      .addCase(setUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSetUser = false;
      });
  },
});

export const reducer = authSlice.reducer;
