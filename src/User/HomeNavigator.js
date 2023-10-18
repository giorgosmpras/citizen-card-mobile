import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./HomeScreen";
import ProfileScreenNavigator from "./ProfileScreenNavigator";
import ScannerScreenHome from "./ScannerScreenHome";
import ReportProblemNavigator from "./ReportProblemNavigator";
import ProfileScreenAddNewImage from "./ProfileScreenAddNewImage";
import MessageHistoryScreen from "../History/MessagesHistoryScreen";
import HistoryNavigator from "./HistoryNavigator";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR THE SCREENS OF THE USER HOMEPAGE
export default function HomeNavigator({ navigation }) {
  // function to return to the homescreen from all the return arrows
  const handleBack = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Homescreen for the user */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* ScannerScreen for future purposes */}
      <Stack.Screen
        name="ScannerScreenHome"
        component={ScannerScreenHome}
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
      {/* Navigator for the user history */}
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryNavigator}
        options={{
          headerShown: true,
          title: "Ιστορικό Χρήστη",
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
      {/* Navigator for the user profile */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreenNavigator} />
      {/* Screen to immediately navigate to change the user image */}
      <Stack.Screen
        name="ProfileScreenAddNewImage"
        component={ProfileScreenAddNewImage}
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
