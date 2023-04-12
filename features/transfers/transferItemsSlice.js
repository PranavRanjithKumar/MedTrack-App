/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const transferItemsSlice = createSlice({
  name: 'transferItems',
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const newItem = action.payload;
      const { catalogueId } = newItem;
      const pushableObject = {
        assetId: newItem.id,
        ...(newItem.batchSize && { batchSize: newItem.batchSize }),
        quantity: newItem.quantityProduced,
        quantityType: newItem.quantityType,
      };
      const existingCatalogueItems = state.items.find(
        (item) => catalogueId in item
      );
      if (existingCatalogueItems) {
        const existingAsset = existingCatalogueItems[catalogueId].find(
          (item) => item.assetId === newItem.id
        );
        if (existingAsset) {
          existingCatalogueItems[catalogueId] = existingCatalogueItems[
            catalogueId
          ].filter((item) => item.assetId !== newItem.id);
          if (existingCatalogueItems[catalogueId].length === 0) {
            state.items = state.items.slice(
              state.items.findIndex((item) => catalogueId in item),
              1
            );
          }
        } else {
          existingCatalogueItems[catalogueId].push(pushableObject);
        }
      } else {
        state.items.push({ [catalogueId]: [pushableObject] });
      }
    },
    resetTransferItems: () => initialState,
  },
});

export const { toggleItem, resetTransferItems } = transferItemsSlice.actions;

export const selectTransferItems = (state) => state.transferItems.items;

export const checkItemAvailability = (state, catalogueId, assetId) => {
  const existingCatalogueItems = state.transferItems.items.find(
    (item) => catalogueId in item
  );

  if (!existingCatalogueItems) return false;

  return existingCatalogueItems[catalogueId].some(
    (item) => item.assetId === assetId
  );
};

export const selectTransferItemsForCatalogueId = (state, catalogueId) => {
  const existingCatalogueItems = state.transferItems.items.find(
    (item) => catalogueId in item
  );

  if (!existingCatalogueItems) return [];

  return existingCatalogueItems[catalogueId];
};

export default transferItemsSlice.reducer;
