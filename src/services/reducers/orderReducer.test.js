import * as actions from "../actions/actions";
import { initialState, reducer } from "./orderReducer";
import { orderData as order } from "../../utils/test-constants";

describe("Redux store orders", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle GET_orders_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.addOrder.rejected.type,
        error: errorText,
      })
    ).toEqual({
      order: null,
      loading: false,
      error: errorText,
    });
  });

  test("should handle GET_orders_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.addOrder.fulfilled.type,
        payload: {order},
      })
    ).toEqual({
      order: order,
      loading: false,
      error: null,
    });
  });

  test("should handle GET_orders_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.addOrder.pending.type,
      })
    ).toEqual({
      order: null,
      loading: true,
      error: null,
    });
  });
});