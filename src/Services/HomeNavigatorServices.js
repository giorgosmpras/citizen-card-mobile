import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreenService from "./HomeScreenService";
import ScannerScreenService from "./ScannerScreenService";
import ProfileScreenService from "./ProfileScreenService";
import ReportProblemNavigator from "../User/ReportProblemNavigator";
import MessageHistoryScreen from "../History/MessagesHistoryScreen";
import HistoryScreen from "../Services/HistoryScreen";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR THE SCREENS OF THE SERVICE HOMEPAGE
export default function HomeNavigatorServices({ navigation }) {
  // function to return to the homescreen
  const handleBack = () => {
    navigation.navigate("HomeScreen");
  };
  // function to return to the homescreen
  const handleBack1 = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Homescreen for the SERVICE  */}
      <Stack.Screen name="HomeScreen" component={HomeScreenService} />
      {/* ScannerScreen to scan the user's qrcodes */}
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreenService}
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
      {/* Screen for the service history */}
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerShown: true,
          title: "Ιστορικό Υπηρεσίας",
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
      {/* Navigator for the service profile */}
      <Stack.Screen
        name="ProfileScreenService"
        component={ProfileScreenService}
        options={{
          headerShown: true,
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
    </Stack.Navigator>
  );
}
