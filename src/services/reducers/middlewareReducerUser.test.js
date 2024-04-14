import * as actions from "../actions/middlewareActions";
import {
  initialState,
  wsReducerUser as reducer,
  TWebSocketStatus,
} from "./middlewareReducerUser";
import { ordersData as orders } from "../../utils/test-constants";

describe("Redux store middleware User", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle CONNECTING", () => {
    expect(
      reducer(undefined, {
        type: actions.wsInitUser.type,
      })
    ).toEqual({
      ...initialState,
      status: TWebSocketStatus.CONNECTING,
    });
  });

  test("should handle Open", () => {
    expect(
      reducer(undefined, {
        type: actions.onOpenUser.type,
      })
    ).toEqual({
      ...initialState,
      status: TWebSocketStatus.ONLINE,
      connectingError: "",
    });
  });

  test("should handle Error", () => {
    const errorText = "error Text";

    expect(
      reducer(undefined, {
        type: actions.onErrorUser.type,
        payload: errorText,
      })
    ).toEqual({
      ...initialState,
      status: TWebSocketStatus.OFFLINE,
      connectingError: errorText,
    });
  });

  test("should handle Close", () => {
    expect(
      reducer(undefined, {
        type: actions.onCloseUser.type,
      })
    ).toEqual({
      ...initialState,
      status: TWebSocketStatus.OFFLINE,
    });
  });

  test("should handle Message", () => {
    const Message = {
      success: true,
      orders: orders,
      total: 2,
      totalToday: 1,
    };

    expect(
      reducer(undefined, {
        type: actions.onMessageUser.type,
        payload: Message,
      })
    ).toEqual({
      ...initialState,
      orders: Message.orders,
      total: Message.total,
      totalToday: Message.totalToday,
    });
  });
});