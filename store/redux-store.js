import { configureStore } from '@reduxjs/toolkit';
import requestDrugCartReducer from '../features/requests/requestDrugCartSlice';
import requestOrganizationReducer from '../features/requests/requestOrganizationSlice';

const store = configureStore({
  reducer: {
    requestDrugCart: requestDrugCartReducer,
    requestOrganization: requestOrganizationReducer,
  },
});

export default store;
