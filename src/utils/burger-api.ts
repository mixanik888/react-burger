import { TIngredientResponse, TApiConfig, TRefreshToken } from "./types";



export const getProjectIngredients = () => {
  return fetch(`${ApiConfig.baseURL}/ingredients`, {
    headers: ApiConfig.headers,

  }).then(res => getResponse<TIngredientResponse>(res));
};

export const ApiConfig:TApiConfig = {
  "baseURL": "https://norma.nomoreparties.space/api",
  "baseURLWS": "wss://norma.nomoreparties.space/orders",
  "headers": {
    "Content-Type": "application/json;charset=utf-8",
    //"authorization": localStorage.getItem("accessToken"),
    "authorization": ""
  },
};

const getResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else return res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return (
    fetch(`${ApiConfig.baseURL}/auth/token`, {
      method: "POST",
      headers: ApiConfig.headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(res => getResponse<TRefreshToken>(res))
      // !! Важно для обновления токена в мидлваре, чтобы запись
      // была тут, а не в fetchWithRefresh
      .then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
      })
  );
};

 export const fetchWithRefresh = async <T> (url: RequestInfo, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await getResponse<T>(res);
  } catch (err) {
 
    if ((err as {message:string}).message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (options.headers) {
        (options.headers as {[key:string]:string}).authorization = refreshData.accessToken;
      }
      const res = await fetch(url, options); //повторяем запрос
      return await getResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};


export const fetchWith = async <T>(url: RequestInfo, options: RequestInit) => {
  // return fetch(url, options)
  //   .then<T>(getResponse)
  //   .then<T>((refreshData) => {

  //     if (!refreshData.success) {
  //       return Promise.reject(refreshData);
  //     }

  //     return refreshData;
  //   });
  try {
    const res = await fetch(url, options);
    return await getResponse<T>(res);

  } catch (err) {
    return Promise.reject(err);
  }
};





