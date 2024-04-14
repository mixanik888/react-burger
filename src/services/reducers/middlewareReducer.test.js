import * as actions from "../actions/middlewareActions";
import {
  initialState,
  wsReducer as reducer,
  TWebSocketStatus,
} from "./middlewareReducer";
import { ordersData as orders } from "../../utils/test-constants";

describe("Redux store middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle CONNECTING", () => {
    expect(
      reducer(undefined, {
        type: actions.wsInit.type,
      })
    ).toEqual({
      ...initialState,
      status: TWebSocketStatus.CONNECTING,
    });
  });

  test("should handle Open", () => {
    expect(
      reducer(undefined, {
        type: actions.onOpen.type,
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
        type: actions.onError.type,
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
        type: actions.onClose.type,
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
        type: actions.onMessage.type,
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
