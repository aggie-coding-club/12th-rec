import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { UserCredential, getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";

import { View, Text } from "react-native";
import { Button } from "native-base";

import { db } from "../../firebase/firebaseConfig";
import { IUser } from "../../utils/interfaces";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { user: UserCredential } }, 'params'>
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [classification, setClassification] = useState("")

    const auth = getAuth();
    const user = auth.currentUser

    useEffect(() => {
        const getAdditionalUserData = async () => {
            const docRef = doc(db, "users", user!.uid);
            const userData = await getDoc(docRef).then((res) => res.data()) as IUser;
            setName(userData.name);
            setEmail(userData.email);
            setClassification(userData.classification);
        }
      
        getAdditionalUserData();
      }, []);

    const handleLogOut = async () => {
        await auth.signOut();
    }

    return (
        <View>
            <Text>{name}</Text>
            <Text>{email}</Text>
            <Text>{classification}</Text>

            <Button onPress={handleLogOut} >Log Out</Button>
        </View>
    )
}

export default HomeScreen