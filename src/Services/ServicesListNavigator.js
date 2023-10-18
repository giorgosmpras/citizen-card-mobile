import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ServicesScreen from "../User/ServicesScreen";
import ServiceDetails from "./ServiceDetails";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR THE SERVICE LIST AND THEIR DETAILS
export default function ServicesListNavigator({ navigation }) {
  // function to return the user to the list of services
  const handleBack = () => {
    navigation.navigate("ServicesScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        title: "Υπηρεσίες",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#687089" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      {/* LIST SCREEN */}
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      {/* DETAILS SCREEN */}
      <Stack.Screen
        name="ServicesDetails"
        component={ServiceDetails}
        options={{
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
