import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";
import { ROUTES } from "../constants/constants";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ROUTES.DETAILS_SCREEN}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
