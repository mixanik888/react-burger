import * as actions from "../actions/actions";
import { initialState, reducer } from "./ingredientReducer";
import { data } from "../../utils/test-constants";

describe("Redux store load ingredient", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle GET_INGREDIENTS_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.loadIngredient.rejected.type,
        error: errorText,
      })
    ).toEqual({
      data1: [],
      loading: false,
      error: errorText,
    });
  });

  test("should handle GET_INGREDIENTS_fulfilled", () => {
    expect(
      reducer(undefined, {
        type: actions.loadIngredient.fulfilled.type,
        payload: { data },
      })
    ).toEqual({
      data1: data,
      loading: false,
      error: null,
    });
  });

  test("should handle GET_INGREDIENTS_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.loadIngredient.pending.type,
      })
    ).toEqual({
      data1: [],
      loading: true,
      error: null,
    });
  });
});
