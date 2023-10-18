import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreenBussiness from "./HomeScreenBussiness";
import BusinessProfileScreenNavigator from "./BusinessProfileScreenNavigator";
import ScannerScreen from "./ScannerScreen";
import ReportProblemNavigator from "../User/ReportProblemNavigator";
import BusinessProfileAddNewImage from "./BusinessProfileAddNewImage";
import MessageHistoryScreen from "../History/MessagesHistoryScreen";
import HistoryScreen from "../Business/HistoryScreen";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR THE SCREENS OF THE BUSINESS HOMEPAGE
export default function HomeNavigatorBussiness({ navigation }) {
  // function to return to the homescreen
  const handleBack = () => {
    navigation.navigate("HomeScreen");
  };

  // function to return to the homescreen from all the return arrows
  const handleBack1 = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Homescreen for the BUSINESS  */}
      <Stack.Screen name="HomeScreen" component={HomeScreenBussiness} />
      {/* ScannerScreen to scan the user's qrcodes */}
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          headerShown: true,
          title: "Σκάναρε ένα Qr Code",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#687089" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={handleBack}
              />
            );
          },
        }}
      />
      {/* Navigator for the report problem screens */}
      <Stack.Screen
        name="ReportProblemNavigator"
        component={ReportProblemNavigator}
        options={{
          headerShown: false,
          title: "Αναφορά Βλάβης",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#687089" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={handleBack}
              />
            );
          },
        }}
      />
      {/* Screen to show all the push notifications */}
      <Stack.Screen
        name="MessageHistoryScreen"
        component={MessageHistoryScreen}
        options={{
          headerShown: true,
          title: "Ιστορικό Μηνυμάτων",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#687089" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={handleBack}
              />
            );
          },
        }}
      />
      {/* Screen for the business history */}
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerShown: true,
          title: "Ιστορικό Επιχείρησης",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#687089" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={handleBack}
              />
            );
          },
        }}
      />
      {/* Navigator for the business profile */}
      <Stack.Screen
        name="BusinessProfileScreenNavigator"
        component={BusinessProfileScreenNavigator}
        options={{
          headerShown: false,
          title: "Το προφίλ μου",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#687089" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={handleBack1}
              />
            );
          },
        }}
      />
      {/* Screen to immediately navigate to change the business image */}
      <Stack.Screen
        name="BusinessProfileAddNewImage"
        component={BusinessProfileAddNewImage}
        options={{
          headerShown: true,
          title: "Αλλαγη φωτογραφίας",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#687089" },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <Ionicons
                name="chevron-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
                onPress={handleBack}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
