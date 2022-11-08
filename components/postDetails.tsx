import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { IPost } from "../utils/interfaces";

import { Box, VStack, Heading, Text, Flex } from "native-base";

interface PostDetails {
  post: IPost;
}

const PostDetails: React.FC<PostDetails> = ({ post }) => {
  return (
    <Box paddingRight={6} paddingLeft={6} >
      <VStack>
        <Heading size="xl" color="maroon">
          {post.title}
        </Heading>
        <Text paddingTop={2}>{post.description}</Text>
      </VStack>

      <VStack marginY={4}>
        <Flex marginY={2} flexDirection="row" alignItems="center" >
          <Ionicons name="location-outline" size={24} color="maroon" />
          <Text paddingLeft={2}>{post.location}</Text>
        </Flex>

        <Flex marginY={2} flexDirection="row" alignItems="center" >
          <Ionicons name="time-outline" size={24} color="maroon" />
          <DateTimePicker 
            display="compact"
            mode="datetime"
            style={{ width: "49%" }}
            value={post.dateTime as unknown as Date}
          />
        </Flex>
      </VStack>
    </Box>
  );
};

export default PostDetails;
