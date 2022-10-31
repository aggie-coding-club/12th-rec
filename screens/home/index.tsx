import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { collection, DocumentData, getDocs } from "firebase/firestore";

import useAppStore from "../../store/useAppStore";
import { db } from "../../firebase/firebaseConfig";
import MapView from "../../components/mapview";
import { IPost } from "../../utils/interfaces"

import { Dimensions, StyleSheet } from "react-native";
import { Container, Text } from "native-base";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<any>
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    const [posts, setPosts] = useState<IPost[]>();

    useEffect(() => {
        getDocs(collection(db, "posts")).then((res) => {
            const data = res.docs.map((doc) => doc.data())
            setPosts(data as IPost[]);
        })
    }, [])

    return (
       <Container>
        {
            <MapView posts={posts} />
        }
       </Container>
    )
}

export default HomeScreen