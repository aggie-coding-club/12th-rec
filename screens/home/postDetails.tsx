import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import { IPost } from "../../utils/interfaces";

import { Box, VStack, Heading, Text, TextArea } from "native-base";

interface PostDetails {
  post: IPost;
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<{ params: { post: IPost } }, "params">;
}

const PostDetails: React.FC<PostDetails> = ({ route }) => {
  const { post } = route.params;

  return (
    <Box padding={6} height="1/2" safeArea >
      <VStack>
        <Heading size="xl" color="maroon">
          {post.title}
        </Heading>
        <Text>{post.description}</Text>
      </VStack>

      <VStack marginY={4}>
        <VStack marginY={2}>
          <Text color="black" fontWeight="bold" marginY={1}>
            Location
          </Text>
          <Text>{post.location}</Text>
        </VStack>

        <VStack marginY={2}>
          <Text color="black" fontWeight="bold" marginY={1}>
            Date/Time
          </Text>
          <Text>{post.dateTime}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PostDetails;
