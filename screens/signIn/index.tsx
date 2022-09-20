import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { VStack, Text, Center, Input, Button, Image, ZStack, Link } from "native-base";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if(!email[0] || !password[0]) return

        console.log(email, password);
    }

    return (
        <ZStack height="full" backgroundColor="maroon" justifyContent="center" alignItems="center">
            <Image source={{
                    uri: "https://populous.com/wp-content/uploads/2018/01/TEXAFBSTA_0319_ChristyRadecic.jpg"
                }}
                alt="Alternate Text" size="full"
                opacity={0.35}
                blurRadius={1.5}
            />

            <VStack height="full" justifyContent="space-evenly" >
                <Center>
                    <Text fontSize="8xl" fontWeight="bold" color="light.50">12th Rec</Text>
                </Center>  
                
                <VStack>
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

                <Center>
                    <Link onPress={() => navigation.navigate("SignUpSceen")}_text={{ color: "light.50" }} >Don't have an account?</Link>
                </Center>
            </VStack>  
        </ZStack>
    )
}

export default LoginScreen