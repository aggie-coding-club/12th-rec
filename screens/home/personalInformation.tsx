import React, { useState } from "react";

import useAppStore from "../../store/useAppStore";

import { Button, Heading, Input, InputGroup, InputRightAddon, Text, VStack } from "native-base";

const PersonalInformation: React.FC = () => {
    const userInfo = useAppStore((state) => state.currentUser);

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email.replace("@tamu.edu", ""));
    const [classification, setClassification] = useState(userInfo.classification);

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

            <Button width="75%" colorScheme="light" alignSelf="center" backgroundColor="maroon" >Update</Button>
        </VStack>
    )
};

export default PersonalInformation