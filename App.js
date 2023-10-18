import "react-native-gesture-handler"; // always on top
import registerNNPushToken from "native-notify";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";
import { PaperProvider } from "react-native-paper";

import LoginScreen from "./src/auth/LoginScreen";
import PinScreen from "./src/auth/PinScreen";
import UserNavigator from "./src/User/UserNavigator";
import BussinessNavigator from "./src/Business/BussinessNavigator";
import { MyContextProvider } from "./src/Globals/MyContext";
import ServicesNavigator from "./src/Services/ServicesNavigator";

const Stack = createNativeStackNavigator();

// THE HEART OF THE APP
export default function App() {
  // token for expo push notifications
  registerNNPushToken(9354, "otlwXpckPUzWzsV6B4uj67");
  return (
    // react-native-paper provider
    <PaperProvider>
      {/* custom context provider */}
      <MyContextProvider>
        {/* provider for toast messages */}
        <ToastProvider>
          {/* the navigation container */}
          <NavigationContainer>
            {/* status bar style */}
            <StatusBar style="light" />
            <Stack.Navigator
              screenOptions={{
                contentStyle: { backgroundColor: "white" },
                animation: "none",
              }}
            >
              {/* User Login Screen; Skipped if user has already logged in */}
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: "Είσοδος Δημότη",
                  headerStyle: { backgroundColor: "#687089" },
                  headerTitleAlign: "center",
                  headerTintColor: "white",
                  headerBackVisible: false,
                }}
              />
              {/* User Confirmation Screen */}
              <Stack.Screen
                name="Pin"
                component={PinScreen}
                options={{
                  title: "Είσοδος Δημότη",
                  headerStyle: { backgroundColor: "#687089" },
                  headerTitleAlign: "center",
                  headerTintColor: "white",
                  headerBackVisible: false,
                }}
              />
              {/* The User Body  */}
              <Stack.Screen
                name="Body"
                component={UserNavigator}
                options={{ headerShown: false }}
              />
              {/* The Business Body; available to those in charge of a business */}
              <Stack.Screen
                name="BodyBussiness"
                component={BussinessNavigator}
                options={{ headerShown: false }}
              />
              {/* The Service Body; available to those in charge of a service */}
              <Stack.Screen
                name="BodyService"
                component={ServicesNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </MyContextProvider>
    </PaperProvider>
  );
}
