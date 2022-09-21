import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import useAppStore from "./store/useAppStore";

import SignInScreen from "./screens/signIn";
import SignUpScreen from "./screens/signUp";
import HomeScreen from "./screens/home";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: "Inter_100Thin",
      },
      200: {
        normal: "Inter_200ExtraLight",
      },
      300: {
        normal: "Inter_300Light",
      },
      400: {
        normal: "Inter_400Regular",
      },
      500: {
        normal: "Inter_500Medium",
      },
      600: {
        normal: "Inter_600SemiBold",
      },
      700: {
        normal: "Inter_700Bold",
      },
      800: {
        normal: "Inter_800ExtraBold",
      },
      900: {
        normal: "Inter_900Black",
      },
    },

    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "Inter",
    },
  },
});

export default function App() {
  const isSignedIn = useAppStore((state) => state.isSignedIn);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isSignedIn ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false, title: "Sign In" }}
              />
              <Stack.Screen
                name="SignUpSceen"
                component={SignUpScreen}
                options={{
                  presentation: "modal",
                  title: "Sign Up",
                  headerShown: false,
                }}
              />
            </>
          ) : (
            // User is signed in
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: "Home" }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
