import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { Text } from "native-base"
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import { db } from "../firebase/firebaseConfig";

interface MarkerProps {
    title: string
    description: string
    latitude: number
    longitude: number
}
const CustomMarker: React.FC<MarkerProps> = ({ title, description, latitude, longitude }) => {
    return (
        <Marker coordinate = {{latitude, longitude}}
            pinColor = {"maroon"} // any color
            title={title}
            description={description}/>
    )
}

const CustomMapView: React.FC = () => {
    const [coordinates, setCoordinates] = useState<any[]>([]);

    return (
        <MapView style={styles.map}
            initialRegion={{
            latitude: 30.615619,
            longitude: -96.341099,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0121,
            }}>
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