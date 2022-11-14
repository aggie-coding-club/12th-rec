import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';

import MapView from "../../components/mapview";

import { Container } from "native-base";
import useAppStore from "../../store/useAppStore";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<any>
}

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
    const posts = useAppStore((state) => state.posts)

    return (
       <Container>
        {
            <MapView posts={posts} viewPost={route.params?.viewPost} />
        }
       </Container>
    )
}

export default HomeScreen