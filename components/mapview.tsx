import React from "react";

import { Box, Text } from "native-base"
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import { IPost } from "../utils/interfaces";

interface MarkerProps {
    title: string
    description: string
    coordinates: string
}
const CustomMarker: React.FC<MarkerProps> = ({ title, description, coordinates }) => {
    const latitude = Number(coordinates.split(" ")[0])
    const longitude = Number(coordinates.split(" ")[1])
    
    return (
        <Marker coordinate = {{latitude, longitude}}
            pinColor = {"maroon"} // any color
            title={title}
            description={description}/>
    )
}

interface MapViewProps {
    posts?: IPost[]
}

const CustomMapView: React.FC<MapViewProps> = ({ posts }) => {
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
        posts.map((post, index) => (
            <CustomMarker title={post.time} description={post.description} coordinates={post.coordinates} /> 
          ))
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