/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const drugCompositionSlice = createSlice({
  name: 'drugComposition',
  initialState,
  reducers: {
    addAsConstituent: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.assetId === newItem.id
      );
      if (!existingItem) {
        state.items.push({
          name: newItem.name,
          assetId: newItem.id,
          catalogueId: newItem.code,
          quantity: newItem.quantity,
          quantityType: newItem.quantityType,
        });
      } else {
        existingItem.quantity = newItem.quantity;
      }
    },
    removeFromConstituents: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.assetId !== id);
    },
    resetConstituents: () => initialState,
  },
});

export const { addAsConstituent, removeFromConstituents, resetConstituents } =
  drugCompositionSlice.actions;

export const selectDrugConstituents = (state) => state.drugComposition.items;

export const selectConstituentQuantity = (state, id) => {
  const curItem = state.drugComposition.items.find(
    (item) => item.assetId === id
  );
  if (!curItem) return 0;
  return curItem.quantity;
};

export default drugCompositionSlice.reducer;
