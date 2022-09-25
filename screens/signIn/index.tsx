import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { VStack, Text, Center, Input, Button, Image, ZStack, Link } from "native-base";
import { Alert } from "react-native";
import DismissKeyboardView from "../../components/dismissKeyboardView";

import { app } from "../../firebase/firebaseConfig";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if(!email[0] || !password[0]) return

        const auth = getAuth(app);

        await signInWithEmailAndPassword(auth, email, password)
            .catch((error) => Alert.alert("Incorrect username or password"))
    }

    const [fontsLoaded] = useFonts({
        'AlfaSlabOne': require('../../assets/fonts/AlfaSlabOne-Regular.ttf'),
    });

    if(!fontsLoaded) {
        return(
            <Text>Loading...</Text>
        )
    }

    return (
        <DismissKeyboardView>
            <ZStack height="full" backgroundColor="maroon" justifyContent="center" alignItems="center">
                <Image source={require("../../assets/kyle.jpg")}
                    alt="Alternate Text" size="full"
                    opacity={0.35}
                    blurRadius={1.5}
                />

                <VStack height="full" justifyContent="space-evenly" >
                    <VStack>
                        <Text fontSize="7xl" fontWeight="bold" color="light.50" style={{ "fontFamily": "AlfaSlabOne", "color": "#F2EDDB" }}>12th Rec</Text>

                        <VStack marginTop={12}>
                            <VStack marginY={2}>
                                <Text color="light.100" fontWeight="bold" marginY={1}>Email</Text>
                                <Input value={email} type="email" placeholder="johndoe@gmail.com" color="white" onChangeText={(email) => setEmail(email)} />
                            </VStack>

                            <VStack marginY={2}>
                                <Text color="light.100" fontWeight="bold" marginY={1}>Password</Text>
                                <Input value={password} type="password" placeholder="password" color="white" onChangeText={(password) => setPassword(password)}/>
                            </VStack>

                            <VStack marginY={2}>
                                <Button onPress={handleLogin} colorScheme="success">Sign in</Button>
                            </VStack>
                        </VStack> 
                    </VStack>  
                    
                    <Center>
                        <Link onPress={() => navigation.navigate("SignUpSceen")}_text={{ color: "light.50" }} >Don't have an account?</Link>
                    </Center>
                </VStack>  
            </ZStack>
        </DismissKeyboardView>
    )
}

export default LoginScreen