import { Avatar, Box, HStack, Text, Stack, Circle } from "@chakra-ui/react";
import React from "react";

function Comment(props) {
  return (
    <div>
      <Box my={7} w="100%">
        <HStack>
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="md"
          />
          <Stack textAlign="start">
            <div>
              <HStack>
                <Text fontSize="14px" fontWeight="600">
                  John Doe
                </Text>
                <Circle size="5px" bg="gray.600" />
                <Text fontSize="12px"> 2 days ago</Text>
              </HStack>

              <Text fontSize="12px" color="gray.600">
                Zamboanga City Medical Center (Internal Medicine)
              </Text>
            </div>
          </Stack>
        </HStack>

        <Box>
          <Text mt={5} ml={14} fontSize="14px" textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>

          <Text
            textAlign="right"
            fontSize="12px"
            fontStyle="italic"
            fontWeight="500"
            color="gray.600"
            mt={5}
          >
            - Jan 5, 2022 10:30 AM
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default Comment;
