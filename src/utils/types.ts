
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
  key?: string

}

export interface TUserKey {
  name?: string;
  password?: string;
  email?: string;
}


export type TUserResponse = TServerResponse<{
  user: TUserKey;
  refreshToken?: string;
  accessToken?: string;
}>

export interface TOrderKey {
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number:number,
  price: number,
  _id: string,
  ingredients: Array<string>;
}

export interface TOrderKeyOwner {
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number:number,
  price: number,
  _id: string,
  owner: string,
  ingredients: Array<string>;
}

export type TOrderResponse = {
  success?: boolean;
  order?: TOrderKey;
  name?: string;
}

export interface TOrderFindResponse {
  success?: boolean;
  orders?: Array<TOrderKeyOwner>;
}

export type TOrderWSResponse = {
  orders: Array<TOrderKey>;
  total: number;
  totalToday: number;
}

export type TIngredientResponse = TServerResponse<{
  data: Array<TElement>;
}>

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type THeaders = {
  [key:string] : string
}

export type TApiConfig = {
  baseURL : string
  baseURLWS : string
  headers: THeaders 
}

export type TRefreshToken = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>
