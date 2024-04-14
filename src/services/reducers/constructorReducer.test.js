import { initialState, reducer, action } from "./constructorReducer";
import { data, bun } from "../../utils/test-constants";

describe("Redux store load constructor", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state constructor", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle Constructor add bun", () => {
    expect(
      reducer(undefined, {
        type: action.addConstructorBun,
        payload: bun,
      })
    ).toEqual({
      bun: bun,
      ingredients: [],
    });
  });

  test("should handle clear Constructor", () => {
    expect(
      reducer(undefined, {
        type: action.clearConstructor,
        payload: bun,
      })
    ).toEqual(initialState);
  });

  test("should handle Constructor delete item", () => {
    let data1 = [
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
        key: "60d3b41abdacab0026a733c7",
      },
    ];

    let state = {
      bun: null,
      ingredients: data,
    };

    expect(
      reducer(state, {
        type: action.deleteConstructorItem,
        payload: "60d3b41abdacab0026a733c8",
      })
    ).toEqual({
      bun: null,
      ingredients: data1,
    });
  });

  test("should handle Constructor add item", () => {
    let data1 = [bun];

    let state = {
      bun: null,
      ingredients: [],
    };

    expect(
      reducer(state, {
        type: action.addConstructorItem,
        payload: bun,
      })
    ).toEqual({
      bun: null,
      ingredients: data1,
    });
  });

  test("should handle Constructor splice", () => {
    const dragIndex = 1;
    const hoverIndex = 0;

    const data1 = Array.from(data);

    data1.push( {
        "dragIndex": 1,
        "hoverIndex": 0,
        })

    let state = {
      bun: null,
      ingredients: data,
    };

    expect(
      reducer(state, {
        type: action.addConstructorItem,
        payload: { dragIndex: dragIndex, hoverIndex: hoverIndex },
      })
    ).toEqual({
      bun: null,
      ingredients: data1,
    });
  });
});
