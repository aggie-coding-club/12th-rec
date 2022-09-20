import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NativeBaseProvider } from "native-base";

import SignInScreen from "./screens/signIn";
import SignUpScreen from "./screens/signUp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false, title: "Sign In" }} />
          <Stack.Screen name="SignUpSceen" component={SignUpScreen} options={{ presentation: "modal", title: "Sign Up" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
