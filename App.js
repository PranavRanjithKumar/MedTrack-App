/* eslint-disable global-require */
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Image } from 'react-native';
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
import RequestableOrganizationsScreen from './screens/Requesting/RequestableOrganizationsScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import WithAxios from './apis/withAxios';
import store from './store/redux-store';
import RequestDrugsScreen from './screens/Requesting/RequestDrugsScreen';
import ConfirmRequestScreen from './screens/Requesting/ConfirmRequestScreen';
import MyCatalogueScreen from './screens/Creating/MyCatalogueScreen';
import AssetCreationScreen from './screens/Creating/AssetCreationScreen';
import OutSourceAssetsScreen from './screens/Creating/OutSourceAssetsScreen';
import CompositionQuantityFormScreen from './screens/Creating/CompositionQuantityFormScreen';
import RequestQuantityFormScreen from './screens/Requesting/RequestQuantityFormScreen';
import UnFulfilledTransfersScreen from './screens/Transferring/UnFulfilledTransfersScreen';
import InHouseAssetsScreen from './screens/Transferring/InHouseAssetsScreen';
import RequestedItemsScreen from './screens/Transferring/RequestedItemsScreen';
import PreviewTransferItemsScreen from './screens/Transferring/PreviewTransferItemsScreen';
import ConstitutionPreviewScreen from './screens/Creating/ConstitutionPreviewScreen';
import ImportedItemsScreen from './screens/Info/ImportedItemsScreen';
import InventoryScreen from './screens/Info/InventoryScreen';
import ViewQRScreen from './screens/Info/ViewQRScreen';
import AssetHistoryFormScreen from './screens/Info/AssetHistoryFormScreen';
import BarcodeScannerScreen from './screens/Info/BarcodeScannerScreen';
import AssetInfoScreen from './screens/Info/AssetInfoScreen';
import RequestsScreen from './screens/Info/RequestsScreen';
import RequestInfoScreen from './screens/Info/RequestInfoScreen';
import ProfileScreen from './screens/Info/ProfileScreen';
import TransfersScreen from './screens/Info/TransfersScreen';
import MapViewScreen from './screens/Info/MapViewScreen';

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
        name="Add request quantity"
        component={RequestQuantityFormScreen}
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

const CreateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="My Catalogue"
        component={MyCatalogueScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Asset Form"
        component={AssetCreationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View Out Sourced Assets"
        component={OutSourceAssetsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Composition Quantity"
        component={CompositionQuantityFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preview Composition"
        component={ConstitutionPreviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scan QR"
        component={AssetHistoryFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={BarcodeScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View QR"
        component={ViewQRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Asset Info"
        component={AssetInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map View"
        component={MapViewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TransferStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="UnFulfilled Transfers"
        component={UnFulfilledTransfersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Requested Items"
        component={RequestedItemsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View In House Assets"
        component={InHouseAssetsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Preview Transferring Items"
        component={PreviewTransferItemsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scan QR"
        component={AssetHistoryFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={BarcodeScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View QR"
        component={ViewQRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Asset Info"
        component={AssetInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map View"
        component={MapViewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const InfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Requests"
        component={RequestsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transfers"
        component={TransfersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request Info"
        component={RequestInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History Form"
        component={AssetHistoryFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Inventory Stock"
        component={InventoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Asset Info"
        component={AssetInfoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Scanner"
        component={BarcodeScannerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View QR"
        component={ViewQRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map View"
        component={MapViewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Imported Items"
        component={ImportedItemsScreen}
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
  const { user } = useContext(AuthContext);

  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      {(user.organization.type === 'supplier' ||
        user.organization.type === 'manufacturer') && (
        <Bottom.Screen
          name="Lab"
          component={CreateStack}
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: 'roboto500',
            },
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/lab.png')}
                style={{ width: 26, height: 26, tintColor: color }}
              />
            ),
          }}
        />
      )}
      {user.organization.type !== 'supplier' && (
        <Bottom.Screen
          name="Request"
          component={RequestStack}
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: 'roboto500',
            },
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/cart.png')}
                style={{ width: 26, height: 26, tintColor: color }}
              />
            ),
          }}
        />
      )}
      {user.organization.type !== 'retailer' && (
        <Bottom.Screen
          name="Transfer"
          component={TransferStack}
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: 'roboto500',
            },
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/partner_exchange.png')}
                style={{ width: 26, height: 26, tintColor: color }}
              />
            ),
          }}
        />
      )}
      <Bottom.Screen
        name="Info"
        component={InfoStack}
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'roboto500',
          },
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/menu.png')}
              style={{ width: 26, height: 26, tintColor: color }}
            />
          ),
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
