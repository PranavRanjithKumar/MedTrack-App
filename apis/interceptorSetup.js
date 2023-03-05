/* eslint-disable no-underscore-dangle */
import { useContext } from 'react';
import axiosClient from './apiClient';
import { AuthContext } from '../store/auth-context';

const useAxiosInterceptors = () => {
  const authCtx = useContext(AuthContext);

  axiosClient.interceptors.request.use((config) => {
    // Check if the API endpoint requires authorization
    if (config.url.endsWith('/login') || config.url.endsWith('/refresh')) {
      // Skip authorization for login and refresh endpoints
      return config;
    }

    // Add the authorization header for all other endpoints
    const token = authCtx.authToken;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (!originalConfig.url.endsWith('/login') && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosClient.post('/users/refresh', {
              refreshToken: authCtx.refreshToken,
            });

            const { accessToken } = rs.data;

            authCtx.relogin(accessToken);

            return axiosClient(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default useAxiosInterceptors;
