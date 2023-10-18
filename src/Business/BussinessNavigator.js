import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

import NewsLetterScreen from "../User/NewsLetterScreen";
import ServicesListNavigator from "../Services/ServicesListNavigator";
import BussinessListNavigator from "./BussinessListNavigator";
import HomeNavigatorBussiness from "./HomeNavigatorBussiness";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// HERE CONFIGURE THE BOTTOM TABS FOR THE BUSINESS BODY
function AppBottomStack({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return (
              <MaterialCommunityIcons
                name="barcode"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Services") {
            return (
              <MaterialCommunityIcons
                name="star-circle"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Bussiness") {
            return <Foundation name="burst-new" size={size} color={color} />;
          } else if (route.name === "NewsLetter") {
            return <Entypo name="globe" size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarInactiveTintColor: "#69708B",
        tabBarActiveTintColor: "#414759",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigatorBussiness}
        options={{ title: "Προφίλ" }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesListNavigator}
        options={{
          title: "Υπηρεσίες",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Bussiness"
        component={BussinessListNavigator}
        options={{
          title: "Επιχειρήσεις",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NewsLetter"
        component={NewsLetterScreen}
        options={{
          title: "Νέα / Εκδηλώσεις",

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// HERE MAKE A SINGLE STACK AND APPLY THE ABOVE BOTTOM TAB NAVIGATOR
export default function BussinessNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppBottomStack" component={AppBottomStack} />
      </Stack.Navigator>
    </>
  );
}
