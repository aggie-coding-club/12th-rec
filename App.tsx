import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider, extendTheme } from "native-base";
import { SSRProvider } from "react-aria";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

import SignInScreen from "./screens/auth/signInScreen";
import SignUpScreen from "./screens/auth/signUpScreen";
import HomeScreen from "./screens/home";
import SettingsScreen from "./screens/settings";
import PersonalInformationScreen from "./screens/settings/personalInformation";
import CreatePostsScreen from "./screens/home/createPosts";

import useAppStore from "./store/useAppStore";
import { db } from "./firebase/firebaseConfig";
import { IPost, IUser } from "./utils/interfaces";

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="PersonalInformationScreen"
        component={PersonalInformationScreen}
      />
    </Stack.Navigator>
  );
}

export function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpSceen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SettingsStackNavigator") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "maroon",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <Tab.Screen
        name="SettingsStackNavigator"
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const userIsSignedIn = useAppStore((state) => state.userIsSignedIn);
  const setUserIsSignedIn = useAppStore((state) => state.setUserIsSignedIn);

  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const setPosts = useAppStore((state) => state.setPosts);

  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userData = (await getDoc(userRef).then((res) =>
        res.data()
      )) as IUser;

      getDocs(collection(db, "posts")).then((res) => {
        const data = res.docs.map((doc) => doc.data());
        setPosts(data as IPost[]);
      });

      setCurrentUser({ ...userData });
      setUserIsSignedIn(true);
      return;
    }

    setUserIsSignedIn(false);
  });

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
