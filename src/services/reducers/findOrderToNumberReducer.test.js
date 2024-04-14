import * as actions from "../actions/actions";
import { initialState, reducer } from "./findOrderToNumberReducer";
import { ordersData as orders } from "../../utils/test-constants";

describe("Redux store findOrder", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle GET_findOrder_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.findOrderToNumber.rejected.type,
        error: errorText,
      })
    ).toEqual({
      orders: [],
      loading: false,
      error: errorText,
    });
  });

  test("should handle GET_findOrder_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.findOrderToNumber.fulfilled.type,
        payload: {orders},
      })
    ).toEqual({
      orders: orders,
      loading: false,
      error: null,
    });
  });

  test("should handle GET_findOrder_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.findOrderToNumber.pending.type,
      })
    ).toEqual({
      orders: [],
      loading: true,
      error: null,
    });
  });
});
