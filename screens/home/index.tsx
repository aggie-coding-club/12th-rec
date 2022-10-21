import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { collection, DocumentData, getDocs } from "firebase/firestore";
import MapView from 'react-native-maps';

import { db } from "../../firebase/firebaseConfig";

import { Text, VStack, Box } from "native-base";
import { IPost } from "../../utils/interfaces";
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
       <MapView style={styles.map}
            initialRegion={{
            latitude: 30.615619,
            longitude: -96.341099,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0121,
            }}
        />
    )
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default HomeScreen