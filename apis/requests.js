import axiosClient from './axiosClient';

const getRequestableOrganizations = async () => {
  try {
    const response = await axiosClient.get('/organizations/requestable-orgs');
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export default getRequestableOrganizations;
