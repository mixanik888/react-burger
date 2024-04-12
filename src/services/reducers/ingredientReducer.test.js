import fetchMock from "fetch-mock";
import { thunk } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actions from "../actions/actions";
import { initialState, reducer, actionSlice } from "./ingredientReducer";
import { data } from "../../utils/test-constants";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux store load ingredient", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should handle GET_INGREDIENTS_FAILED', () => { 
  
    let errorText = "Error text"

    expect(
       reducer(undefined, {
         type: actions.loadIngredient.rejected.type,
         error: errorText,
       })).toEqual({
          data1: [],
          loading: false,
          error : errorText})
 });  

 test('should handle GET_INGREDIENTS_fulfilled', () => { 
  
  expect(
     reducer(undefined, {
       type: actions.loadIngredient.fulfilled.type,
       payload: { data }
     })).toEqual({
        data1: data,
        loading: false,
        error : null})
});  




  //  test('should handle GET_INGREDIENTS_FAILED', async() => {
  //     let errorText = "Error text";

  //    expect(
  //       reducer(undefined, {
  //         type: actions.loadIngredient.rejected.type,
  //         payload: errorText,
  //       })).toEqual({
  //          data1: [],
  //          loading: false,
  //          error : errorText})
  //  });    

 

});
