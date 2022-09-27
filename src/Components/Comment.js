import { Avatar, Box, HStack, Text, Stack, Circle } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

function Comment(props) {
  return (
    <div>
      <Box my={7} w="100%">
        <HStack>
          <Avatar
            name={props.user}
            src="https://bit.ly/broken-link"
            size="md"
          />
          <Stack textAlign="start">
            <div>
              <HStack>
                <Text fontSize="14px" fontWeight="600">
                  {props.user}
                </Text>
                <Circle size="5px" bg="gray.600" />
                <Text fontSize="12px">
                  {moment(props.date).startOf().fromNow()}
                </Text>
              </HStack>

              <Text fontSize="12px" color="gray.600">
                Zamboanga City Medical Center ({props.dept})
              </Text>
            </div>
          </Stack>
        </HStack>

        <Box>
          <Text mt={5} ml={14} fontSize="14px" textAlign="justify">
            {props.remark}
          </Text>

          <Text
            textAlign="right"
            fontSize="12px"
            fontStyle="italic"
            fontWeight="500"
            color="gray.600"
            mt={3}
          >
            {moment(props.date).format("LLL")}
          </Text>
        </Box>
      </Box>
      <hr />
    </div>
  );
}

export default Comment;
