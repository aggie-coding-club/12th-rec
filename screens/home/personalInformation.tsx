import React, { useState } from "react";
import { getAuth, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useAppStore from "../../store/useAppStore";
import { db } from "../../firebase/firebaseConfig";
import { Button, Heading, Input, InputGroup, InputRightAddon, Text, VStack } from "native-base";
import { Alert } from "react-native";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

const PersonalInformation: React.FC<Props> = ({ navigation }) => {
    const auth = getAuth();
    
    const userInfo = useAppStore((state) => state.currentUser);
    const setCurrentUser = useAppStore((state) => state.setCurrentUser);

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email.replace("@tamu.edu", ""));
    const [classification, setClassification] = useState(userInfo.classification);

    const updatePersonalInfo = async () => {
        if (name === userInfo.name && `${email}@tamu.edu` === userInfo.email && classification === userInfo.classification) { return }


        await Promise.all([updateEmail(auth.currentUser!, `${email}@tamu.edu`), updateDoc(doc(db, "users", userInfo.uid), {
            name,
            classification,
            email: `${email}@tamu.edu`,
        })]).then(async (res) => {
            setCurrentUser({ name, email: `${userInfo.email}`, classification, uid: userInfo.uid })
            Alert.alert("Profile updated successfully")
        })
    }

    return (
        <VStack padding={6} height="1/2" justifyContent="space-between" >
            <VStack>
                <Heading size="xl" color="maroon">Edit Personal Info</Heading>
                <Text>We do not share your personal information with anyone.</Text>
            </VStack>

            <VStack>
                <VStack marginY={2}>
                    <Text color="black" fontWeight="bold" marginY={1}>Name</Text>
                    <Input value={name} type="text" placeholder="john doe" color="black" onChangeText={(name) => setName(name)} />
                </VStack>

                <VStack marginY={2} >
                    <Text color="black" fontWeight="bold" marginY={1}>Email</Text>
                    <InputGroup>
                        <Input value={email} width="full" type="email" placeholder="john.doe" color="black" onChangeText={(email) => setEmail(email)} InputRightElement={<InputRightAddon backgroundColor="light.200" children={"@tamu.edu"} />} />
                    </InputGroup>
                </VStack>

                <VStack marginY={2}>
                    <Text color="black" fontWeight="bold" marginY={1}>Classification</Text>
                    <Input value={classification} type="text" placeholder="sophomore" color="black" onChangeText={(classification) => setClassification(classification)} />
                </VStack>
            </VStack>

            <Button width="75%" colorScheme="light" alignSelf="center" backgroundColor="maroon" onPress={updatePersonalInfo} >Update</Button>
        </VStack>
    )
};

export default PersonalInformation