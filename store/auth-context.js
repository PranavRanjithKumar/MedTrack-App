import React, { createContext, useMemo, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext({
  authToken: '',
  refreshToken: '',
  user: {},
  isAuthenticated: false,
  authenticate: (authToken, refreshToken) => {},
  setUser: (user) => {},
  relogin: (authToken) => {},
  logout: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case 'set-tokens':
      return {
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        user: state.user,
      };
    case 'set-user':
      return {
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        user: action.payload.user,
      };
    case 'refresh-authToken':
      return {
        authToken: action.payload.authToken,
        refreshToken: state.refreshToken,
        user: state.user,
      };
    case 'clear-tokens':
      return {
        authToken: null,
        refreshToken: null,
        user: null,
      };

    default:
      return { authToken: '', refreshToken: '', user: {} };
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    authToken: '',
    refreshToken: '',
    user: {},
  });

  function authenticate(authToken, refreshToken) {
    dispatch({
      type: 'set-tokens',
      payload: { authToken, refreshToken },
    });
    SecureStore.setItemAsync('authToken', authToken);
    SecureStore.setItemAsync('refreshToken', refreshToken);
  }

  function setUser(user) {
    dispatch({
      type: 'set-user',
      payload: { user },
    });
  }

  function relogin(authToken) {
    dispatch({
      type: 'refresh-authToken',
      payload: { authToken },
    });
    SecureStore.setItemAsync('authToken', authToken);
  }

  function logout() {
    dispatch({ type: 'clear-tokens' });
    SecureStore.deleteItemAsync('authToken');
    SecureStore.deleteItemAsync('refreshToken');
  }

  const value = useMemo(
    () => ({
      authToken: state.authToken,
      refreshToken: state.refreshToken,
      user: state.user,
      isAuthenticated: !!state.refreshToken,
      authenticate,
      setUser,
      relogin,
      logout,
    }),
    [state.authToken, state.refreshToken, state.user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
