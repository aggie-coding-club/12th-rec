import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { collection, DocumentData, getDocs } from "firebase/firestore";

import useAppStore from "../../store/useAppStore";
import { db } from "../../firebase/firebaseConfig";
import MapView from "../../components/mapview";

import { Dimensions, StyleSheet } from "react-native";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<any>
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    const [posts, setPosts] = useState<DocumentData[]>();

    useEffect(() => {
        getDocs(collection(db, "posts")).then((res) => {
            const data = res.docs.map((doc) => doc.data())
            setPosts(data);
        })
    }, [])

    return (
       <MapView />
    )
}

export default HomeScreen