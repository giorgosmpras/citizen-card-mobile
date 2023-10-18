import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useLayoutEffect } from "react";

import HistoryScreenBusiness from "./HistoryScreenBusiness";
import HistoryScreenServices from "./HistoryScreenServices";

const Tab = createMaterialTopTabNavigator();

// TOP TAB NAVIGATOR FOR USER HISTORY
export default function HistoryNavigator({ navigation }) {
  // function for returning to the top screen if you go back to the navigator
  useLayoutEffect(() => {
    navigation.addListener("blur", () => {
      navigation.popToTop();
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "none",
          height: 20,
          color: "#68708A",
        },
        tabBarIndicatorStyle: { backgroundColor: "#68708A" },
      }}
    >
      {/* List with the businesses that user was scanned */}
      <Tab.Screen
        component={HistoryScreenBusiness}
        name="HistoryScreenBusiness"
        options={{ title: "Επιχειρήσεις" }}
      />
      {/* List with the services that user was scanned */}
      <Tab.Screen
        component={HistoryScreenServices}
        name="HistoryScreenServices"
        options={{
          title: "Υπηρεσίες",
        }}
      />
    </Tab.Navigator>
  );
}
