import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLayoutEffect } from "react";

import ProfileScreenBussiness from "./ProfileScreenBussiness";
import BusinessProfileAddNewImage from "./BusinessProfileAddNewImage";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR BUSINESS PROFILE
export default function BusinessProfileScreenNavigator({ navigation }) {
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
    navigation.navigate("ProfileScreenBussiness");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ProfileScreenBussiness"
        component={ProfileScreenBussiness}
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
        name="BusinessProfileAddNewImage"
        component={BusinessProfileAddNewImage}
        options={{
          headerShown: true,
          title: "Διαλεξτε Φωτογραφία",
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
