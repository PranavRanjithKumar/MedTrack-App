import axiosClient from './axiosClient';

const login = async (email, password) => {
  try {
    const response = await axiosClient.post('/users/login', email, password);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export default login;
