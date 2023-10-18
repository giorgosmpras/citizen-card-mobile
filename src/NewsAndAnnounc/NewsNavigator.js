import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import NewsScreen from "./NewsScreen";
import NewsDetailsScreen from "./NewsDetailsScreen";

const Stack = createNativeStackNavigator();

//STACK NAVIGATOR FOR NEWS AND THEIR DETAILS
export default function NewsNavigator({ navigation }) {
  // function to return the user to the list
  const handleBack = () => {
    navigation.navigate("NewsScreen");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        title: "Νέα / Ανακοινώσεις",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#687089" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      {/* LIST SCREEN */}
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      {/* DETAILS SCREEN */}
      <Stack.Screen
        name="NewsDetailsScreen"
        component={NewsDetailsScreen}
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
