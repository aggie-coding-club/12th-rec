import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { UserCredential, getAuth } from "firebase/auth"

import { Text, VStack } from "native-base";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { user: UserCredential } }, 'params'>
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    const auth = getAuth();

    const handleLogOut = async () => {
        await auth.signOut();
    }

    return (
        <VStack height="full" safeArea >
            <Text>Map View</Text>            
        </VStack>
    )
}

export default HomeScreen