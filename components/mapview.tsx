import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Box } from "native-base"
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import { IPost } from "../utils/interfaces";

interface MapViewProps {
    posts?: IPost[]
    navigation: NativeStackNavigationProp<any, any>;
}

const CustomMapView: React.FC<MapViewProps> = ({ posts, navigation }) => {
    const openDetails = (post: IPost) => {
        navigation.navigate("PostDetails", { post })
    }

    return (
        <MapView style={styles.map}
            initialRegion={{
            latitude: 30.615619,
            longitude: -96.341099,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0121,
        }}>

{
    posts ? (
        posts.map((post, index) => {
            const latitude = Number(post.coordinates.split(" ")[0])
            const longitude = Number(post.coordinates.split(" ")[1])
            
            return (
                <Marker coordinate={{ latitude, longitude }} pinColor = {"maroon"}  onPress={() => openDetails(post)} />
            )
        })
    ) : <Box></Box>
}

        </MapView>
    )
};

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

export default CustomMapView;