import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import SignInScreen from "./screens/signIn";
import SignUpScreen from "./screens/signUp";
import HomeScreen from "./screens/home";

import useAppStore from "./store/useAppStore";
import { db } from "./firebase/firebaseConfig";
import { IUser } from "./utils/interfaces";

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
  const userIsSignedIn = useAppStore((state) => state.userIsSignedIn);
  const setUserIsSignedIn = useAppStore((state) => state.setUserIsSignedIn);

  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if(user) {
      const docRef = doc(db, "users", user?.uid);
      const userData = await getDoc(docRef).then((res) => res.data()) as IUser;
      setCurrentUser({ name: userData.name, email: userData.email, classification: userData.classification })
      setUserIsSignedIn(true)
      return
    }

    setUserIsSignedIn(false)
  })

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!userIsSignedIn ? (
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
