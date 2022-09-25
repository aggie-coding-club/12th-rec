import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { UserCredential, getAuth } from "firebase/auth"

import { Ionicons } from '@expo/vector-icons';
import { VStack,  Heading, Button } from "native-base";

import useAppStore from "../../store/useAppStore";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { user: UserCredential } }, 'params'>
}

const SettingsScreen: React.FC<Props> = ({ route, navigation }) => {
    const currentUser = useAppStore((state) => state.currentUser)

    const auth = getAuth();

    const handleLogOut = async () => {
        await auth.signOut();
    }

    return (
        <VStack height="full" width="full" alignItems="center" justifyContent="space-around" safeArea >
            <VStack>
                <Ionicons name="person-circle-outline" size={150} color="maroon" style={{ "textAlign": "center" }} />
                <Heading fontSize="4xl" color="gray.800">{currentUser.name}</Heading>
            </VStack>

            <VStack justifyContent="space-around" width="75%" >
                <Button width="100%" marginY={4} style={{ "backgroundColor": "maroon" }}>Personal Information</Button>
                <Button width="100%" marginY={4} style={{ "backgroundColor": "maroon" }}>How It Works</Button>
                <Button width="100%"marginY={4} style={{ "backgroundColor": "maroon" }}>Help</Button>
            </VStack>

            <Button width="75%" colorScheme="light" onPress={handleLogOut} >Log Out</Button>
        </VStack>
    )
}

export default SettingsScreen