import React, { useState } from "react";
import { getAuth, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useAppStore from "../../store/useAppStore";
import { db } from "../../firebase/firebaseConfig";
import { Button, Heading, Input, InputGroup, InputRightAddon, Text, VStack, Modal, Box } from "native-base";
import { Alert } from "react-native";
import DismissKeyboardView from "../../components/dismissKeyboardView";

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
    const [password, setPassword] = useState("");

    const [showModal, setShowModal] = useState(false);

    const updateUserProfile = async () => {
        const userCredentials = EmailAuthProvider.credential(userInfo.email, password)

        await reauthenticateWithCredential(auth.currentUser!, userCredentials)

        await Promise.all([updateEmail(auth.currentUser!, `${email}@tamu.edu`), updateDoc(doc(db, "users", userInfo.uid), {
            name,
            classification,
            email: `${email}@tamu.edu`,
        })]).then(async (res) => {
            setCurrentUser({ name, email: `${email}@tamu.edu`, classification, uid: userInfo.uid })
            Alert.alert("Profile updated successfully")
        })
    }

    return (
        <DismissKeyboardView>
            <Box height="full" >
                <VStack padding={6} height="1/2" justifyContent="space-between" safeArea >
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

                    <Button width="75%" colorScheme="light" alignSelf="center" backgroundColor="maroon" onPress={() => name === userInfo.name && `${email}@tamu.edu` === userInfo.email && classification === userInfo.classification ? "" : setShowModal(true)} >Update</Button>
                </VStack>

                <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard >
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Text color="maroon" bold fontSize="md" >Please re-enter your password</Text></Modal.Header>
                    <Modal.Body>
                        <Input value={password} type="password" onChangeText={(password) => setPassword(password)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                        <Button backgroundColor="maroon"  onPress={() => {
                        setShowModal(false);
                        updateUserProfile()
                        }}>
                            Update
                        </Button>
                        </Button.Group>
                    </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Box>
        </DismissKeyboardView>
    )
};

export default PersonalInformation