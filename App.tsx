import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SSRProvider } from "react-aria";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import SignInScreen from "./screens/signIn";
import SignUpScreen from "./screens/signUp";
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/settings";
import PersonalInformationScreen from "./screens/settings/personalInformation";

import useAppStore from "./store/useAppStore";
import { db } from "./firebase/firebaseConfig";
import { IUser } from "./utils/interfaces";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

export function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false  }} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
  );
}

export function AuthStackNavigator() {
  return (
    <Stack.Navigator>
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
          </Stack.Navigator>
  )
}

export function TabNavigator() {
  return (
    <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false  }} />
              <Tab.Screen name="Settings" component={SettingsStackNavigator} options={{ headerShown: false  }} />
      </Tab.Navigator>
  )
}

export default function App() {
  const userIsSignedIn = useAppStore((state) => state.userIsSignedIn);
  const setUserIsSignedIn = useAppStore((state) => state.setUserIsSignedIn);

  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if(user) {
      const docRef = doc(db, "users", user.uid);
      const userData = await getDoc(docRef).then((res) => res.data()) as IUser;
      setCurrentUser({...userData})
      setUserIsSignedIn(true)
      return
    }

    setUserIsSignedIn(false)
  })

  return (
    <SSRProvider>
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
      {!userIsSignedIn ? (
            // No token found, user isn't signed in
            <AuthStackNavigator />
          ) : (
            <TabNavigator />
          )}
      </NavigationContainer>
    </NativeBaseProvider>
    </SSRProvider>
  );
}
