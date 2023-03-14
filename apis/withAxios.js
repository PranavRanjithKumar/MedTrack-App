/* eslint-disable no-underscore-dangle */
import { useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../store/auth-context';
import axiosClient from './axiosClient';

const WithAxios = ({ children }) => {
  const { authToken, refreshToken, relogin } = useContext(AuthContext);

  useEffect(() => {
    axiosClient.interceptors.request.use(async (config) => {
      // add token to request headers
      // Check if the API endpoint requires authorization
      if (
        config.url.endsWith('/login') ||
        config.url.endsWith('/refreshToken')
      ) {
        // Skip authorization for login and refresh endpoints
        return config;
      }

      // Add the authorization header for all other endpoints
      const token = await SecureStore.getItemAsync('authToken');
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
              const rs = await axiosClient.post('/users/refreshToken', {
                refreshToken: await SecureStore.getItemAsync('refreshToken'),
              });

              const { accessToken } = rs.data;

              relogin(accessToken);

              return axiosClient(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }

        return Promise.reject(err);
      }
    );
  }, [authToken, refreshToken, relogin]);

  return children;
};

export default WithAxios;
