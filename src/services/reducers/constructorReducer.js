import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
  dragIndex: null,
  hoverIndex: null,
};

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
    addConstructorBun(state, action) {
      state.bun = action.payload;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    addConstructorItem: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredients) => {
        const key = nanoid();
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
