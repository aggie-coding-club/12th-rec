import React, { useState } from "react";

import { Box, Button, Heading, Input, TextArea, Text, VStack, HStack, Select } from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';

import DismissKeyboardView from "../../components/dismissKeyboardView";

const CreatePosts: React.FC = () => {
    const [title, setTitle] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [numGuests, setNumGuests] = useState<number>();
    const [description, setDescription] = useState<string>();

    const changeDateTime = (event: unknown, selectedDate: unknown) => {
        const currentDate = selectedDate;
        setDateTime(currentDate as Date);
      };
    

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
                        <Input value={title} onChangeText={title => setTitle(title)} type="text" placeholder="Southside Rec" color="black" />
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Location</Text>
                        <Select selectedValue={location} placeholder="freshman" mt={1} color="white" onValueChange={location => setLocation(location)}>
                                    <Select.Item label="Student Rec Center" value="Student Recreation Center" />
                                    <Select.Item label="Southside Rec Center" value="Southside Recreation Center" />
                                    <Select.Item label="Polo Road Rec Center" value="Polo Road Rec Center" />
                                    <Select.Item label="Natatorium" value="Texas A&M Natatorium" />
                                    <Select.Item label="Outdoor Adventures" value="Outdoor Adventures" />
                                    <Select.Item label="Indoor Climbing Faucility" value="Indoor Climbing Faucility" />
                                    <Select.Item label="PEAP" value="Physical Education Activity Program Building (PEAP)" />
                                    <Select.Item label="Penberthy" value="Penberthy Rec Sports Complex" />
                                    <Select.Item label="Tennis Center" value="Omar Smith Instructional Tennis Center" />
                        </Select>
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Date/Time</Text>
                        <HStack justifyContent="space-between">
                        <DateTimePicker
                                display="compact"
                                mode="datetime"
                                style={{ width: "48%" }}
                                value={dateTime}
                                onChange={changeDateTime}
                        />
                            <Box> </Box>
                        </HStack>
 
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Number of guests</Text>
                        <Input
                            keyboardType="numeric"
                            placeholder="3"
                            value={numGuests}
                            onChangeText={numGuests => setNumGuests(Number(numGuests))}
                        />
                    </VStack>

                    <VStack marginY={2}>
                        <Text color="black" fontWeight="bold" marginY={1}>Description</Text>
                        <TextArea h={40} placeholder="Text Area Placeholder" alignItems="flex-start" value={description} onChangeText={(description: string) => setDescription(description)} />
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