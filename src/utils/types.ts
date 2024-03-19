
export type TElement = {
 
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  key: string

}

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TIngredientResponse = TServerResponse<{
  data: Array<TElement>;
}>

export type THeaders = {
  [key:string] : string
}

export type TApiConfig = {
  baseURL : string
  headers: THeaders 
}

export type TRefreshToken = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>
