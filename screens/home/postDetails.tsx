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
    <Box padding={6} height="1/2" justifyContent="space-between" safeArea>
      <VStack>
        <Heading size="xl" color="maroon">
          Create a post
        </Heading>
        <Text>Let your peers know when and where to meet you.</Text>
      </VStack>

      <VStack marginY={4}>
        <VStack marginY={2}>
          <Text color="black" fontWeight="bold" marginY={1}>
            Title
          </Text>
          <Text>{post.title}</Text>
        </VStack>

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

        <VStack marginY={2}>
          <Text color="black" fontWeight="bold" marginY={1}>
            Number of guests
          </Text>
        </VStack>

        <VStack marginY={2}>
          <Text color="black" fontWeight="bold" marginY={1}>
            Description
          </Text>
          <TextArea
            h={40}
            placeholder="Description"
            alignItems="flex-start"
            value={post.description}
            editable={false}
          />
        </VStack>
      </VStack>
    </Box>
  );
};

export default PostDetails;
