import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
  VStack,
  Text,
  Input,
  Button,
  Image,
  ZStack,
  Box,
  InputRightAddon,
  InputGroup,
  KeyboardAvoidingView,
  FormControl,
  WarningOutlineIcon,
  Select,
  Spinner,
} from "native-base";
import { Platform } from "react-native";
import DismissKeyboardView from "../../components/dismissKeyboardView";

import { db } from "../../firebase/firebaseConfig";
import useAppStore from "../../store/useAppStore";

const SignUpScreen: React.FC = () => {
  const auth = getAuth();

  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classification, setClassification] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    confirmPassword === password ? setIsInvalid(false) : setIsInvalid(true);
  }, [password, confirmPassword]);

  const handleSignUp = async () => {
    if(!name || !email || !password || !classification || !confirmPassword) return

    setIsLoading(true);

    const userCredentials = await createUserWithEmailAndPassword(auth, `${email}@tamu.edu`, password)
  
    await setDoc(doc(db, "users", userCredentials.user.uid), {
      name,
      classification,
      email: userCredentials.user.email,
      uid: userCredentials.user.uid,
      profilePicURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      posts: []
    }).catch(() => setIsLoading(false))

    setCurrentUser({
      name,
      classification,
      email: userCredentials.user.email!,
      uid: userCredentials.user.uid,
      profilePicURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      posts: []
    })
  };

  return (
    <DismissKeyboardView>
      <ZStack height="full" backgroundColor="maroon">
        <Image
          source={require("../../assets/pool.jpg")}
          alt="Alternate Text"
          size="full"
          opacity={0.25}
          blurRadius={1.85}
        />
        
        <Box
          width="full"
          height="3/4"
          padding={4}
          alignItems="center"
          paddingTop={12}
        >
          <Text
            fontSize="5xl"
            fontWeight="bold"
            color="light.50"
            style={{ fontFamily: "AlfaSlabOne", color: "#F2EDDB" }}
          >
            Sign Up
          </Text>

          <KeyboardAvoidingView
            paddingX={6}
            height="full"
            justifyContent="center"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <FormControl isRequired>
              <VStack marginY={2}>
                <Text color="light.100" fontWeight="bold" marginY={1}>
                  Name
                </Text>
                <Input
                  value={name}
                  type="text"
                  placeholder="John Doe"
                  color="white"
                  onChangeText={(name) => setName(name)}
                />
              </VStack>

              <VStack marginY={2}>
                <Text color="light.100" fontWeight="bold" marginY={1}>
                  Classification
                </Text>
                <Select
                  selectedValue={classification}
                  placeholder="classification"
                  mt={1}
                  onValueChange={(classification) =>
                    setClassification(classification)
                  }
                  color="white"
                >
                  <Select.Item label="freshman" value="freshman" />
                  <Select.Item label="sophomore" value="sophomore" />
                  <Select.Item label="junior" value="junior" />
                  <Select.Item label="senior" value="senior" />
                </Select>
              </VStack>

              <VStack marginY={2}>
                <Text color="light.100" fontWeight="bold" marginY={1}>
                  Email
                </Text>
                <InputGroup>
                  <Input
                    width="full"
                    value={email}
                    type="email"
                    placeholder="john.doe"
                    color="white"
                    onChangeText={(email) => setEmail(email)}
                    InputRightElement={
                      <InputRightAddon children={"@tamu.edu"} />
                    }
                  />
                </InputGroup>
              </VStack>

              <VStack marginY={2}>
                <Text color="light.100" fontWeight="bold" marginY={1}>
                  Password
                </Text>
                <Input
                  value={password}
                  type="password"
                  placeholder="password"
                  color="white"
                  onChangeText={(password) => setPassword(password)}
                />
              </VStack>

              <VStack marginY={2}>
                <Text color="light.100" fontWeight="bold" marginY={1}>
                  Confirm Password
                </Text>
                <Input
                  value={confirmPassword}
                  type="password"
                  placeholder="password"
                  color="white"
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                />
                <FormControl.ErrorMessage
                  isInvalid={isInvalid}
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Passwords must be the same.
                </FormControl.ErrorMessage>
              </VStack>
              <VStack marginY={2}>
                <Button onPress={handleSignUp} colorScheme="success">
                  { !isLoading ? "Sign Up" : <Spinner color="white" /> }
                </Button>
              </VStack>
            </FormControl>
          </KeyboardAvoidingView>
        </Box>
      </ZStack>
    </DismissKeyboardView>
  );
};

export default SignUpScreen;
