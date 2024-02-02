
const ApiConfig = {

  baseURL: 'https://norma.nomoreparties.space/api',
  headers: {
    "Content-Type": "application/json",
  },

};

const getResponse = (res) => {
  if (res.ok){
    return res.json();
  }
}


export const getProjectIngredients = () => {

  return fetch(
    `${ApiConfig.baseURL}/ingredients`,{
    headers: ApiConfig.headers
  }).then(getResponse);

 }

 export const addProjectOrder = (ingredients) => {

  console.log({ingredients});
  console.log(JSON.stringify({ingredients}));

  return fetch(
    `${ApiConfig.baseURL}/orders`,{
    method: "POST",
    headers: ApiConfig.headers,
    body: JSON.stringify({ingredients}),

  }).then(getResponse);

 }