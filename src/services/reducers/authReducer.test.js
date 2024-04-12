import fetchMock from "fetch-mock";
import { thunk } from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actions from "../actions/actions";
import { initialState, reducer } from "./authReducer";

import { data } from "../../utils/test-constants";

describe("Redux store autch ", () => {
    afterEach(() => {
        jest.restoreAllMocks();
      });

    
    // test('should handle GET_signOut.rejected', () => {

    //     let errorText = "Error text";

    //  expect(
    //     reducer(undefined, {
    //       type: actions.signOut.rejected.type,
    //       payload: errorText,
    //     })).toEqual({
    //         loading : false,
    //       error : errorText})


    // });  

})