import React, { useState }  from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import useAppStore from "../../store/useAppStore";

import { VStack, Text, Input, Button, Image, ZStack, Box } from "native-base";
import { app } from "../../firebase/firebaseConfig";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
    const setIsSignedIn = useAppStore((state) => state.setIsSignedIn);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [classification, setClassification] = useState("")

    const handleSignUp = async() => {
        if(!name || !email || !password || !classification) return 

        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, email, password)
                .then((res) => setIsSignedIn(true))
                .catch((Error) => alert(Error.code))
    }

    return (
        <ZStack height="full" backgroundColor="maroon" >
            <Image source={require("../../assets/pool.jpg")}
                alt="Alternate Text" size="full"
                opacity={0.35}
                blurRadius={1.85}
            />

            <Box width="full" height="3/4" paddingX={6} alignItems="center" justifyContent="space-around" >
                <Text fontSize="5xl" fontWeight="bold" color="light.50" style={{ "fontFamily": "AlfaSlabOne", "color": "#F2EDDB" }}>Sign Up</Text>

                <VStack width="full" >
                        <VStack marginY={2}>
                            <Text color="light.100" fontWeight="bold" marginY={1}>Name</Text>
                            <Input value={name} type="text" placeholder="John Doe" color="white" onChangeText={(name) => setName(name)} />
                        </VStack>
                        
                        <VStack marginY={2}>
                            <Text color="light.100" fontWeight="bold" marginY={1}>Classification</Text>
                            <Input value={classification} type="text" placeholder="Sophomore" color="white" onChangeText={(classification) => setClassification(classification)} />
                        </VStack>

                        <VStack marginY={2}>
                            <Text color="light.100" fontWeight="bold" marginY={1}>Email</Text>
                            <Input value={email} type="email" placeholder="johndoe@gmail.com" color="white" onChangeText={(email) => setEmail(email)} />
                        </VStack>

                        <VStack marginY={2}>
                            <Text color="light.100" fontWeight="bold" marginY={1}>Password</Text>
                            <Input value={password} type="password" placeholder="password" color="white" onChangeText={(password) => setPassword(password)}/>
                        </VStack>

                        <VStack marginY={2}>
                            <Button onPress={handleSignUp} colorScheme="success">Sign Up</Button>
                        </VStack>
                </VStack>  
            </Box>
        </ZStack>
    )
}

export default SignUpScreen;