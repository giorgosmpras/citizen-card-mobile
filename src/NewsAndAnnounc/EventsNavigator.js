import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import EventsScreen from "./EventsScreen";
import EventsDetailsScreen from "./EventsDetailsScreen";

const Stack = createNativeStackNavigator();

//STACK NAVIGATOR FOR EVENTS AND THEIR DETAILS
export default function EventsNavigator({ navigation }) {
  // function to return the user to the list
  const handleBack = () => {
    navigation.navigate("EventsScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        title: "Εκδηλώσεις",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#687089" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      {/* LIST SCREEN */}
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      {/* DETAILS SCREEN */}
      <Stack.Screen
        name="EventsDetailsScreen"
        component={EventsDetailsScreen}
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
