import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { TElement } from "../../utils/types";

interface TSliceState { 
  bun: TElement | null;
  ingredients: Array<TElement>;
  dragIndex?: null | number;
  hoverIndex?: null | number;
} 

const initialState = {
  bun: null,
  ingredients: [],
  dragIndex: null,
  hoverIndex: null,
} satisfies TSliceState as TSliceState

export const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    spliceConstructorItem(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      state.ingredients.splice(
        dragIndex.dragIndex,
        0,
        state.ingredients.splice(hoverIndex.hoverIndex, 1)[0]
      );
    },
    deleteConstructorItem(state, action) {
      state.ingredients = state.ingredients.filter(
        (element) => element.key !== action.payload
      );
    },
    addConstructorBun(state, action:PayloadAction<TElement>) {
      state.bun = action.payload;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    addConstructorItem: {
      reducer: (state, action:PayloadAction<TElement>) => {
        state.ingredients.push(action.payload);
      },
      prepare (ingredients: TElement)  {
        const key:string = nanoid();
        return { payload: { ...ingredients, key } };
      },
    },
  },
});

export const reducer = burgerSlice.reducer;
export const {
  addConstructorItem,
  deleteConstructorItem,
  addConstructorBun,
  clearConstructor,
  spliceConstructorItem,
} = burgerSlice.actions;

type TActionCreators = typeof burgerSlice.actions;

export type TBurgerActions = ReturnType<TActionCreators[keyof TActionCreators]>;
