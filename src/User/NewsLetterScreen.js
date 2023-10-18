import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NewsNavigator from "../NewsAndAnnounc/NewsNavigator";
import EventsNavigator from "../NewsAndAnnounc/EventsNavigator";

const Tab = createMaterialTopTabNavigator();

// TAB NAVIGATOR FOR NEWSLETTER AND EVENTS SCREENS
export default function NewsLetterScreen() {
  return (
    <>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: "none",
            height: 20,
            color: "#68708A",
          },
          tabBarIndicatorStyle: { backgroundColor: "#68708A" },
        }}
      >
        <Tab.Screen
          name="screen1"
          component={NewsNavigator}
          options={{ title: "Νέα / Ανακοινώσεις" }}
        />
        <Tab.Screen
          name="EventsNavigator"
          component={EventsNavigator}
          options={{ title: "Εκδηλώσεις" }}
        />
      </Tab.Navigator>
    </>
  );
}
