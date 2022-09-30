import React, { useState, useEffect }  from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 

import { VStack, Text, Input, Button, Image, ZStack, Box, InputRightAddon, InputGroup, KeyboardAvoidingView, FormControl, WarningOutlineIcon } from "native-base";
import { Platform } from "react-native";
import DismissKeyboardView from "../../components/dismissKeyboardView";

import { app, db } from "../../firebase/firebaseConfig";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [classification, setClassification] = useState("")
    const [isInvalid, setIsInvalid] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        confirmPassword === password ? setIsInvalid(false) : setIsInvalid(true)
    }, [password, confirmPassword])

    const handleSignUp = async() => {
        if(!name || !email || !password || !classification || isInvalid) return 

        const auth = getAuth(app);
        const user  = await createUserWithEmailAndPassword(auth, `${email}@tamu.edu`, password)
            .then(async (userData) => {
                await setDoc(doc(db, "users", userData.user.uid), {
                    name,
                    classification,
                    email: userData.user.email,
                    uid: userData.user.uid 
                });
            })
            .catch((Error) => alert(Error.code))
    }

    return (
        <DismissKeyboardView>
            <ZStack height="full" backgroundColor="maroon">
                <Image source={require("../../assets/pool.jpg")}
                    alt="Alternate Text" size="full"
                    opacity={0.25}
                    blurRadius={1.85}
                />

                <Box width="full" height="3/4" padding={4} alignItems="center" >
                    <Text fontSize="5xl" fontWeight="bold" color="light.50" style={{ "fontFamily": "AlfaSlabOne", "color": "#F2EDDB" }}>Sign Up</Text>

                <KeyboardAvoidingView paddingX={6}  height="full" justifyContent="center"  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <FormControl isRequired>
                            <VStack marginY={2}>
                                <Text color="light.100" fontWeight="bold" marginY={1}>Name</Text>
                                <Input value={name} type="text" placeholder="John Doe" color="white" onChangeText={(name) => setName(name)} />
                            </VStack>
                            
                            <VStack marginY={2}>
                                <Text color="light.100" fontWeight="bold" marginY={1}>Classification</Text>
                                <Input value={classification} type="text" placeholder="Sophomore" color="white" onChangeText={(classification) => setClassification(classification)} />
                            </VStack>

                            <VStack marginY={2} >
                                <Text color="light.100" fontWeight="bold" marginY={1}>Email</Text>
                                <InputGroup>
                                    <Input width="full" value={email} type="email" placeholder="john.doe" color="white" onChangeText={(email) => setEmail(email)} InputRightElement={<InputRightAddon children={"@tamu.edu"} />} />
                                </InputGroup>
                            </VStack>

                            <VStack marginY={2}>
                                <Text color="light.100" fontWeight="bold" marginY={1}>Password</Text>
                                <Input value={password} type="password" placeholder="password" color="white" onChangeText={(password) => setPassword(password)}/>
                            </VStack>

                            <VStack marginY={2}>
                                <Text color="light.100" fontWeight="bold" marginY={1}>Confirm Password</Text>
                                <Input value={confirmPassword} type="password" placeholder="password" color="white" onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}/>
                                <FormControl.ErrorMessage isInvalid={isInvalid} leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Passwords must be the same.
                                </FormControl.ErrorMessage>
                            </VStack>

                            <VStack marginY={2}>
                                <Button onPress={handleSignUp} colorScheme="success">Sign Up</Button>
                            </VStack>
                    </FormControl>
                </KeyboardAvoidingView>
                </Box>
            </ZStack>
        </DismissKeyboardView>
    )
}

export default SignUpScreen;