import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReportProblemScreen from "./ReportProblemScreen";
import ReportProblemAddPhotoScreen from "./ReportProblemAddPhotoScreen";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR THE REPORT PROBLEM ACTION
export default function ReportProblemNavigator({ navigation }) {
  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // const to navigate user to homescreen
  const handleBack = () => {
    navigation.navigate("HomeScreen");
  };

  // const to navigate user to add a photo
  const handleBack1 = () => {
    navigation.navigate("ReportProblemAddPhoto");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="ReportProblemAddPhoto"
        component={ReportProblemAddPhotoScreen}
        options={{
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
      <Stack.Screen
        name="ReportProblemScreen"
        component={ReportProblemScreen}
        options={{
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
                onPress={handleBack1}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
