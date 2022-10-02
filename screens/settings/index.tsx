import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { UserCredential, getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';
import { VStack,  Heading, Button, Center, Image, Box } from "native-base";

import useAppStore from "../../store/useAppStore";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { user: UserCredential } }, 'params'>
}

const SettingsScreen: React.FC<Props> = ({ route, navigation }) => {
    const auth = getAuth();
    const storage = getStorage();

    const currentUser = useAppStore((state) => state.currentUser)
    const [profilePicURL, setProfilePic] = useState(`https://firebasestorage.googleapis.com/v0/b/threc-e1518.appspot.com/o/${currentUser.uid}?alt=media&token=`);

    const handleLogOut = async () => {
        await auth.signOut();
    }

    const uploadImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if(!image["cancelled"]) {
            const response = await fetch(image["uri"]);
            const blob = await response.blob();
            const storageRef = ref(storage, currentUser.uid);

            uploadBytes(storageRef, blob).then((snapshot) => {
                setProfilePic(`https://firebasestorage.googleapis.com/v0/b/threc-e1518.appspot.com/o/${currentUser.uid}?alt=media&token=`)
            })
        }
    }

    return (
        <VStack height="full" width="full" alignItems="center" justifyContent="space-around" safeArea >
            <Center>
                <Box onTouchEnd={uploadImage} >
                    { profilePicURL ? (
                        <Image source={{
                            uri: profilePicURL
                        }} alt="Alternate Text" size="xl" />
                    ): (
                        <Ionicons name="person-circle-outline" size={150} />
                    )  }
                </Box>
                <Heading fontSize="4xl" color="maroon">{currentUser.name}</Heading>
            </Center>

            <VStack justifyContent="space-around" width="75%" >
                <Button width="100%" marginY={4} backgroundColor="maroon"onPress={() => navigation.navigate("PersonalInformation")}>Personal Information</Button>
                <Button width="100%" marginY={4} backgroundColor="maroon">How It Works</Button>
                <Button width="100%"marginY={4} backgroundColor="maroon">Help</Button>
            </VStack>

            <Button width="75%" colorScheme="light" onPress={handleLogOut} >Log Out</Button>
        </VStack>
    )
}

export default SettingsScreen