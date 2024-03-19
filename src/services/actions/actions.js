import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getProjectIngredients,
  fetchWithRefresh,
  ApiConfig,
  fetchWith,
} from "../../utils/burger-api";

export const setName = createAction("setName");
export const setPassword = createAction("setPassword");
export const setEmail = createAction("setEmail");
export const setToken = createAction("setToken");

export const loadIngredient = createAsyncThunk("loadIngredient", async () => {
  return await getProjectIngredients();
});

export const addOrder = createAsyncThunk("loadAddOrder",
  async (ingredients) => {
    let json = JSON.stringify({ ingredients });

    const headers = ApiConfig.headers;
    headers.authorization = localStorage.getItem("accessToken");

    return fetchWithRefresh(`${ApiConfig.baseURL}/orders`, {
      method: "POST",
      headers: headers,
      body: json,
    });
  }
);

export const singIn = createAsyncThunk("singIn", async (user) => {
  const refreshData = await fetchWith(`${ApiConfig.baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);

  return refreshData;
});

export const signOut = createAsyncThunk("signOut", async () => {
  let json = JSON.stringify({
    token: localStorage.getItem("refreshToken"),
  });

  const headers = ApiConfig.headers;
  headers.authorization = localStorage.getItem("accessToken");

  return await fetchWith(`${ApiConfig.baseURL}/auth/logout`, {
    method: "POST",
    headers: headers,
    body: json,
  });
});

export const commitProfile = createAsyncThunk("commitProfile", async (user) => {
  let json = JSON.stringify(user);
  console.log(json)

  const headers = ApiConfig.headers;
  headers.authorization = localStorage.getItem("accessToken");

  return await fetchWith(`${ApiConfig.baseURL}/auth/user`, {
    method: "PATCH",
    headers: headers,
    body: json,
  });
});

export const setUser = createAsyncThunk("setUser", async () => {
  if (localStorage.getItem("accessToken") !== null) {
    const headers = ApiConfig.headers;
    headers.authorization = localStorage.getItem("accessToken");

    return await fetchWith(`${ApiConfig.baseURL}/auth/user`, {
      method: "GET",
      headers: headers,
    });
  } else return;
});

export const callEmailToForget = createAsyncThunk("callEmailToForget",
  async (email) => {
    let json = JSON.stringify(email);

    return await fetchWith(`${ApiConfig.baseURL}/password-reset`, {
      method: "POST",
      headers: ApiConfig.headers,
      body: json,
    });
  }
);

export const callResetPassword = createAsyncThunk("callResetPassword",
  async (token) => {
    let json = JSON.stringify(token);

    return await fetchWith(`${ApiConfig.baseURL}/password-reset/reset`, {
      method: "POST",
      headers: ApiConfig.headers,
      body: json,
    });
  }
);

export const userRegister = createAsyncThunk("userRegister", 
  async (user) => {
  return await fetchWith(`${ApiConfig.baseURL}/auth/register`, {
    method: "POST",
    headers: ApiConfig.headers,
    body: JSON.stringify(user),
  });
});
