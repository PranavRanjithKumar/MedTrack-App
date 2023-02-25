import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/auth/LoginScreen";
import { useFonts } from "expo-font";
import SplashScreen from "./screens/overlays/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    ibmPlex100: require("./assets/fonts/IBMPlexMono/IBMPlexMono-Thin.ttf"),
    ibmPlex200: require("./assets/fonts/IBMPlexMono/IBMPlexMono-ExtraLight.ttf"),
    ibmPlex300: require("./assets/fonts/IBMPlexMono/IBMPlexMono-Light.ttf"),
    ibmPlex400: require("./assets/fonts/IBMPlexMono/IBMPlexMono-Regular.ttf"),
    ibmPlex500: require("./assets/fonts/IBMPlexMono/IBMPlexMono-Medium.ttf"),
    ibmPlex600: require("./assets/fonts/IBMPlexMono/IBMPlexMono-SemiBold.ttf"),
    ibmPlex700: require("./assets/fonts/IBMPlexMono/IBMPlexMono-Bold.ttf"),
    roboto100: require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
    roboto300: require("./assets/fonts/Roboto/Roboto-Light.ttf"),
    roboto400: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    roboto500: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    roboto700: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
