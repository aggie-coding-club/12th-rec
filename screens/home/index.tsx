import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { UserCredential, getAuth } from "firebase/auth"
import { View, Text } from "react-native";
import { Button } from "native-base";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { user: UserCredential } }, 'params'>
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {

    const auth = getAuth();
    const user = auth.currentUser

    const handleLogOut = async () => {
        await auth.signOut();
    }

    return (
        <View>
            <Text>{user?.email}</Text>

            <Button onPress={handleLogOut} >Log Out</Button>
        </View>
    )
}

export default HomeScreen