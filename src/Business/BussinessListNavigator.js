import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import BussinessScreen from "../User/BussinessScreen";
import BussinessDetails from "./BussinessDetails";

const Stack = createNativeStackNavigator();

// STACK NAVIGATOR FOR THE BUSINESS LIST AND THEIR DETAILS
export default function BussinessNavigator({ navigation }) {
  // function to return the user to the list of businesses
  const handleBack = () => {
    navigation.navigate("BussinessScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        title: "Επιχειρήσεις",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#687089" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      {/* LIST SCREEN */}
      <Stack.Screen name="BussinessScreen" component={BussinessScreen} />
      {/* DETAILS SCREEN */}
      <Stack.Screen
        name="BussinessDetails"
        component={BussinessDetails}
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
