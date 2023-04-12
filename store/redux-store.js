import { configureStore } from '@reduxjs/toolkit';
import requestDrugCartReducer from '../features/requests/requestDrugCartSlice';
import requestOrganizationReducer from '../features/requests/requestOrganizationSlice';
import transferItemsReducer from '../features/transfers/transferItemsSlice';
import drugCompositionReducer from '../features/composition/drugCompositionSlice';

const store = configureStore({
  reducer: {
    requestDrugCart: requestDrugCartReducer,
    requestOrganization: requestOrganizationReducer,
    transferItems: transferItemsReducer,
    drugComposition: drugCompositionReducer,
  },
});

export default store;
