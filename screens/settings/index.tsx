import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { UserCredential, getAuth } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";
import useImagePicker from "../../utils/useImagePicker";
import { VStack,  Heading, Button, Center, Image, Box, Skeleton } from "native-base";

import useAppStore from "../../store/useAppStore";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
    route: RouteProp<{ params: { user: UserCredential } }, 'params'>
}

const SettingsScreen: React.FC<Props> = ({ route, navigation }) => {
    const auth = getAuth();

    const currentUser = useAppStore((state) => state.currentUser)
    const setCurrentUser = useAppStore((state) => state.setCurrentUser)
    const getImage = useImagePicker()

    console.log(currentUser.profilePicURL)

    const [profilePicURL, setProfilePicURL] = useState<unknown>(currentUser.profilePicURL);

    const handleLogOut = async () => {
        await auth.signOut();
    }

    return (
        <VStack height="full" width="full" alignItems="center" justifyContent="space-around" safeArea >
            <Center>
                <Box>
                    { profilePicURL ? (
                        <Image source={{
                            uri: (profilePicURL as string)
                        }} alt="Alternate Text" size="xl" borderRadius={100} />
                    ): (
                        <>
                            <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="#A24857" size="20" rounded="full" marginY={4} />
                        </>
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