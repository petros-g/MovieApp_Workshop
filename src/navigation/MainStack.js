import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ROUTES } from "../constants/constants";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";

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
