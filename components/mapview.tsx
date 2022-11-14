import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import { Box, Text } from "native-base"
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';

import PostDetails from "./postDetails";

import { IPost } from "../utils/interfaces";

interface MapViewProps {
    posts?: IPost[]
    viewPost? : IPost
}

const CustomMapView: React.FC<MapViewProps> = ({ posts, viewPost }) => {
    const refRBSheet = useRef();
    const [displayPost, setDisplayPost] = useState<IPost>()

    const handleMarkerTouched = (post: IPost) => {
        setDisplayPost(post);
        // @ts-ignore
        refRBSheet.current!.open();
    }

    useEffect(() => {
      viewPost ? handleMarkerTouched(viewPost) : ""
    })

    return (
        <>
        <MapView style={styles.map}
            initialRegion={{
            latitude: 30.615619,
            longitude: -96.341099,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0121,
        }}>

            {posts ? (
                posts.map((post, index) => {
                    const latitude = Number(post.coordinates.split(" ")[0])
                    const longitude = Number(post.coordinates.split(" ")[1])
                        
                    return (
                        <Marker key={index} coordinate={{ latitude, longitude }} pinColor = {"maroon"}  onPress={() => handleMarkerTouched(post)} />
                    )
            })
                    ) : <Box></Box>}
        </MapView>

        <RBSheet
        // @ts-ignore
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <PostDetails post={displayPost!} />
      </RBSheet>

        </>
    )
};

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

export default CustomMapView;