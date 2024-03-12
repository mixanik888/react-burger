export const ApiConfig = {
  baseURL: "https://norma.nomoreparties.space/api",
  headers: {
     "Content-Type": 'application/json;charset=utf-8',
     "authorization": localStorage.getItem('accessToken')
  },
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else return res.json().then((err) => Promise.reject(err));
};



export const fetchWith = (url, options) => {

   return fetch(url, options)
     .then(getResponse)
     .then((refreshData) => {
       if (!refreshData.success) {
        return (err) => Promise.reject(err);
       } 

       return refreshData;
     });

} 

export const refreshToken = () => {
  return (
    fetch(`${ApiConfig.baseURL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(getResponse)
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

export const fetchWithRefresh = async (url, options) => {

  try {
    const res = await fetch(url, options);
    return await getResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await getResponse(res);
    } else {
      return (err) => Promise.reject(err);
    }
  }
};

export const getProjectIngredients = () => {
  return fetch(`${ApiConfig.baseURL}/ingredients`, {
    headers: ApiConfig.headers,
  }).then(getResponse);
};

