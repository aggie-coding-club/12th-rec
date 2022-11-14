import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, Entypo } from '@expo/vector-icons';

import { IPost } from "../utils/interfaces";

import { Box, VStack, Heading, Text, Flex, HStack } from "native-base";

import useAppStore from "../store/useAppStore";

interface PostDetails {
  post: IPost;
}

const PostDetails: React.FC<PostDetails> = ({ post }) => {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <Box paddingRight={6} paddingLeft={6} >
      <HStack justifyContent="space-between">
        <Heading size="xl" color="maroon">
          {post.title}
        </Heading>

      { currentUser.uid === post.userID ? (
        <Box paddingTop={0.5}>
          <Ionicons name="trash" size={24} color="maroon" />
        </Box>
      ) : "" }

      </HStack>

      <VStack marginY={4}>
        <Flex marginY={2} flexDirection="row" alignItems="center" >
          <Entypo name="text" size={24} color="maroon" />
          <Text paddingLeft={2}>{post.description}</Text>
        </Flex>

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
            value={new Date(post.dateTime as unknown as Date)}
          />
        </Flex>
      </VStack>
    </Box>
  );
};

export default PostDetails;
