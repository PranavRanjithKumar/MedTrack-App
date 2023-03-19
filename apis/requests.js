import axiosClient from './axiosClient';

export const getRequestableOrganizations = async () => {
  try {
    const response = await axiosClient.get('/organizations/requestable-orgs');
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
