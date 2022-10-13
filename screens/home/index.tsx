import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { collection, DocumentData, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

import { Text, VStack, Box } from "native-base";
import { IPost } from "../../utils/interfaces";

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
        <VStack height="full" safeArea >
            <Text>Map View</Text> 
            {posts?.map(post => <Text key={post.title}>{post.title}</Text>)} 
        </VStack>
    )
}

export default HomeScreen