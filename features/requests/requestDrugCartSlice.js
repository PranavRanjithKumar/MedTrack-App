/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const requestDrugCartSlice = createSlice({
  name: 'requestDrugCart',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.catalogueId === newItem.code
      );
      if (!existingItem) {
        state.items.push({
          name: newItem.name,
          unitQuantity: newItem.unitQuantity,
          unitQuantityType: newItem.unitQuantityType,
          catalogueId: newItem.code,
          quantity: newItem.quantity,
          quantityType: 'units',
        });
        state.totalQuantity += newItem.quantity;
      } else {
        state.totalQuantity += newItem.quantity - existingItem.quantity;
        existingItem.quantity = newItem.quantity;
      }
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.catalogueId === id);
      state.totalQuantity -= existingItem.quantity;
      state.items = state.items.filter((item) => item.catalogueId !== id);
    },
    resetBasketState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, resetBasketState } =
  requestDrugCartSlice.actions;

export const selectBasketItems = (state) => state.requestDrugCart.items;

export const selectBasketItemCountForId = (state, id) => {
  const curItem = state.requestDrugCart.items.find(
    (item) => item.catalogueId === id
  );
  if (!curItem) return 0;
  return curItem.quantity;
};

export const selectCartItemsQuantity = (state) =>
  state.requestDrugCart.items.reduce(
    (total, item) => (total += item.quantity),
    0
  );

export default requestDrugCartSlice.reducer;
