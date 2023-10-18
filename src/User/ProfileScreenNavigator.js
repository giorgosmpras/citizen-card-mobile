import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

import ProfileScreen from "./ProfileScreen";
import ProfileScreenAddNewImage from "./ProfileScreenAddNewImage";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR USER PROFILE
export default function ProfileScreenNavigator({ navigation }) {
  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  // function to return to homescreen
  const handleBack = () => {
    navigation.navigate("HomeScreen");
  };

  // function to return to the profile screen
  const handleBack1 = () => {
    navigation.navigate("ProfileScreen1");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ProfileScreen1"
        component={ProfileScreen}
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
                onPress={handleBack}
              />
            );
          },
        }}
      />

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
                onPress={handleBack1}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
