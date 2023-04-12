import axiosClient from './axiosClient';

export const getRequestableOrganizations = async () => {
  try {
    const response = await axiosClient.get('/organizations/requestable-orgs');
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getAllTransfers = async (id) => {
  try {
    const response = await axiosClient.get(`/organizations/${id}/transfers`);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getAllRequests = async (id) => {
  try {
    const response = await axiosClient.get(`/organizations/${id}/demands`);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const placeRequest = async ({
  id,
  transferringOrgId,
  latitude,
  longitude,
  requestedItems,
}) => {
  try {
    const response = await axiosClient.post(
      `/organizations/${id}/demands/`,
      JSON.stringify({
        transferringOrgId,
        latitude,
        longitude,
        requestedItems,
      })
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getCatalogueForOrganization = async (id) => {
  try {
    const response = await axiosClient.get(`/organizations/${id}/catalogue`);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getUnfulfilledTransfers = async (id) => {
  try {
    const response = await axiosClient.get(
      `/organizations/${id}/transfers/unfulfilled`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const makeTransfer = async ({
  id,
  requestId,
  latitude,
  longitude,
  sentItems,
}) => {
  try {
    const response = await axiosClient.post(
      `/organizations/${id}/transfers/`,
      JSON.stringify({
        requestId,
        latitude,
        longitude,
        sentItems,
      })
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
