import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { Text, Box, ZStack, Image, Link } from "native-base";
import { FontAwesome } from '@expo/vector-icons';

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { uploadImage: () => Promise<void> } }, 'params'>
}

const AddProfilePic: React.FC<Props> = ({ navigation, route }) => {
    const { uploadImage } = route.params;

    return (
        <ZStack height="full" backgroundColor="maroon">
                <Image source={require("../../assets/pool.jpg")}
                    alt="Alternate Text" size="full"
                    opacity={0.25}
                    blurRadius={1.85}
                />

                <Box width="full" height="3/4" padding={4} alignItems="center" justifyContent="space-between" >
                    <Text fontSize="5xl" fontWeight="bold" color="light.50" style={{ "fontFamily": "AlfaSlabOne", "color": "#F2EDDB" }}>Profile Pic</Text>

                    <Box height="full" justifyContent="center" onTouchEnd={uploadImage}>
                        <Box padding={8} borderWidth={5} borderColor="white" borderRadius={100} onTouchEnd={uploadImage} > 
                            <FontAwesome name="camera" size={100} color="white" />
                        </Box>
                    </Box>
                </Box>
            </ZStack>
    )
};

export default AddProfilePic;