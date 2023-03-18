/* eslint-disable global-require */
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from './screens/auth/LoginScreen';
import RequestableOrganizationsScreen from './screens/RequestableOrganizationsScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import WithAxios from './apis/withAxios';
import RequestDrugsScreen from './screens/RequestDrugsScreen';
import store from './store/redux-store';
import ConfirmRequestScreen from './screens/ConfirmRequestScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

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

const RequestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="RequestableOrganizations"
        component={RequestableOrganizationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestDrugs"
        component={RequestDrugsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmRequest"
        component={ConfirmRequestScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
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
    <Bottom.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Bottom.Screen
        name="Requests"
        component={RequestStack}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'roboto500',
          },
        }}
      />
      <Bottom.Screen
        name="Transfers"
        component={RequestStack}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'roboto500',
          },
        }}
      />
    </Bottom.Navigator>
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
      const userObject = JSON.parse(await SecureStore.getItemAsync('user'));

      if (authToken && refreshToken && userObject) {
        if (refreshTokenIsValid(refreshToken)) {
          authenticate(authToken, refreshToken, userObject);
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
        <Provider store={store}>
          <WithAxios>
            <App />
          </WithAxios>
        </Provider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Root;
