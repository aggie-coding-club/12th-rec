import React from "react";

import { Button, Heading, Input, InputGroup, InputRightAddon, Text, VStack } from "native-base";

const PersonalInformation: React.FC = () => {
    return (
        <VStack padding={6} height="1/2" justifyContent="space-between" >
            <VStack>
                <Heading size="xl" color="maroon">Edit Personal Info</Heading>
                <Text>We do not share your personal information with anyone.</Text>
            </VStack>

            <VStack>
                <VStack marginY={2}>
                    <Text color="black" fontWeight="bold" marginY={1}>Name</Text>
                    <Input type="text" placeholder="john doe" color="white" />
                </VStack>

                <VStack marginY={2} >
                    <Text color="black" fontWeight="bold" marginY={1}>Email</Text>
                    <InputGroup>
                        <Input width="full" type="email" placeholder="john.doe" color="white" InputRightElement={<InputRightAddon backgroundColor="light.200" children={"@tamu.edu"} />} />
                    </InputGroup>
                </VStack>

                <VStack marginY={2}>
                    <Text color="black" fontWeight="bold" marginY={1}>Classification</Text>
                    <Input type="text" placeholder="sophomore" color="white" />
                </VStack>
            </VStack>

            <Button width="75%" colorScheme="light" alignSelf="center" backgroundColor="maroon" >Update</Button>
        </VStack>
    )
};

export default PersonalInformation