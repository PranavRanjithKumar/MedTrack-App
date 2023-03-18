import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `http://192.168.70.244:3000/api/v1`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
