import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getProjectIngredients,
  fetchWithRefresh,
  ApiConfig,
  fetchWith,
} from "../../utils/burger-api";
import { TApiConfig, TOrderResponse, TRefreshToken, TUserResponse } from "../../utils/types";

export const setName = createAction<string, "setName">("setName");
export const setPassword = createAction<string, "setPassword">("setPassword");
export const setEmail = createAction<string, "setEmail">("setEmail");
export const setToken = createAction<string, "setToken">("setToken");

export const loadIngredient = createAsyncThunk("loadIngredient", async () => {
  return await getProjectIngredients();
});


export const addOrder = createAsyncThunk(
  "loadAddOrder",
  async (ingredients:Array<String>) => {
    let json = JSON.stringify({ ingredients });

    const headers = (ApiConfig as TApiConfig).headers;
    const accessToken = localStorage.getItem("accessToken");
    headers.authorization = accessToken !== null ? accessToken : "";

    return (fetchWithRefresh(`${ApiConfig.baseURL}/orders`, {
      method: "POST",
      headers: headers,
      body: json,
    })) as TOrderResponse
  }
);

export const singIn = createAsyncThunk ("singIn", async (user:string) => {

  const refreshData: TRefreshToken = await fetchWith(
    `${ApiConfig.baseURL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: user,
    }
  );

  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);

  return( refreshData ) as TUserResponse;
});

export const signOut = createAsyncThunk("signOut", async () => {
  let json = JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  });

  const headers = (ApiConfig as TApiConfig).headers;
  const accessToken = localStorage.getItem("accessToken");
  headers.authorization = accessToken !== null ? accessToken : "";

  return await fetchWith(`${ApiConfig.baseURL}/auth/logout`, {
    method: "POST",
    headers: headers,
    body: json,
  });
});

export const commitProfile = createAsyncThunk("commitProfile", async (json:string) => {
  const headers = (ApiConfig as TApiConfig).headers;
  const accessToken = localStorage.getItem("accessToken");
  headers.authorization = accessToken !== null ? accessToken : "";

  return (await fetchWith(`${ApiConfig.baseURL}/auth/user`, {
    method: "PATCH",
    headers: headers,
    body: json,
  })) as TUserResponse;
});

export const setUser = createAsyncThunk("setUser", async () => {
  if (localStorage.getItem("accessToken") !== null) {
    const headers = (ApiConfig as TApiConfig).headers;
    const accessToken = localStorage.getItem("accessToken");
    headers.authorization = accessToken !== null ? accessToken : "";

    return (await fetchWith(`${ApiConfig.baseURL}/auth/user`, {
      method: "GET",
      headers: headers,
    })) as TUserResponse;
  } else return;
});

export const callEmailToForget = createAsyncThunk(
  "callEmailToForget",
  async (json:string) => {
    //let json = JSON.stringify(email);

    return (await fetchWith(`${ApiConfig.baseURL}/password-reset`, {
      method: "POST",
      headers: ApiConfig.headers,
      body: json,
    })) as TUserResponse;
  }
);

export const callResetPassword = createAsyncThunk(
  "callResetPassword",
  async (json:string) => {
    //let json = JSON.stringify(token);

    return await fetchWith(`${ApiConfig.baseURL}/password-reset/reset`, {
      method: "POST",
      headers: ApiConfig.headers,
      body: json,
    });
  }
);

export const userRegister = createAsyncThunk("userRegister", async (json:string) => {
  return (await fetchWith(`${ApiConfig.baseURL}/auth/register`, {
    method: "POST",
    headers: ApiConfig.headers,
    body: json,
  })) as TUserResponse;
});
