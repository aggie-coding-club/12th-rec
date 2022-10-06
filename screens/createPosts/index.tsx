import React from "react";

import { Box, Button, Heading, Input, TextArea, Text, VStack, HStack } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';

import DismissKeyboardView from "../../components/dismissKeyboardView";

const CreatePosts: React.FC = () => {
    return (
        <DismissKeyboardView>
            <Box padding={6} height="1/2" justifyContent="space-between" safeArea >
                <VStack>
                    <Heading size="xl" color="maroon">Create a post</Heading>
                    <Text>Let your peers know when and where to meet you.</Text>
                </VStack>

                <VStack marginY={4}>
                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Title</Text>
                        <Input type="text" placeholder="Southside Rec" color="black" />
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Location</Text>
                        <Input type="text" placeholder="Southside Rec" color="black" />
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Time</Text>
                        <HStack justifyContent="space-between">
                        <DateTimePicker
                                display="compact"
                                mode="datetime"
                                style={{ width: "48%" }}
                                value={new Date()}
                        />
                            <Box> </Box>
                        </HStack>
 
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Number of guests</Text>
                        <Input type="text" placeholder="3" color="black" />
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Description</Text>
                        <TextArea h={40} placeholder="Text Area Placeholder" alignItems="flex-start" />
                    </VStack>

                    <VStack marginY={2}>
                        <Button backgroundColor="maroon" >Create Post</Button>
                    </VStack>
                </VStack>
            </Box>
        </DismissKeyboardView>
    )
};

export default CreatePosts;