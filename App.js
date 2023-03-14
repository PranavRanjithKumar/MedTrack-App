/* eslint-disable global-require */
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from './screens/auth/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import WithAxios from './apis/withAxios';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

const refreshTokenIsValid = (refreshToken) => {
  const decodedToken = jwt_decode(refreshToken);
  const expirationTime = decodedToken.exp;

  // Compare the expiration time to the current time on the device
  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  if (expirationTime < currentTime) {
    return false;
  }
  return true;
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [fetchingTokens, setFetchingTokens] = useState(true);

  const { authenticate, logout, isAuthenticated } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    ibmPlex100: require('./assets/fonts/IBMPlexMono/IBMPlexMono-Thin.ttf'),
    ibmPlex200: require('./assets/fonts/IBMPlexMono/IBMPlexMono-ExtraLight.ttf'),
    ibmPlex300: require('./assets/fonts/IBMPlexMono/IBMPlexMono-Light.ttf'),
    ibmPlex400: require('./assets/fonts/IBMPlexMono/IBMPlexMono-Regular.ttf'),
    ibmPlex500: require('./assets/fonts/IBMPlexMono/IBMPlexMono-Medium.ttf'),
    ibmPlex600: require('./assets/fonts/IBMPlexMono/IBMPlexMono-SemiBold.ttf'),
    ibmPlex700: require('./assets/fonts/IBMPlexMono/IBMPlexMono-Bold.ttf'),
    roboto100: require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
    roboto300: require('./assets/fonts/Roboto/Roboto-Light.ttf'),
    roboto400: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    roboto500: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    roboto700: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    async function fetchToken() {
      const authToken = await SecureStore.getItemAsync('authToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (authToken && refreshToken) {
        if (refreshTokenIsValid(refreshToken)) {
          authenticate(authToken, refreshToken);
        } else {
          logout();
        }
      }

      setFetchingTokens(false);
    }

    fetchToken();
  }, [authenticate, logout]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !fetchingTokens) {
      await SplashScreen.hideAsync();
    }
  }, [fetchingTokens, fontsLoaded]);

  if (!fontsLoaded || fetchingTokens) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <WithAxios>
          <App />
        </WithAxios>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Root;
