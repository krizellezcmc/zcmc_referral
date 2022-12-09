import {
  Avatar,
  Box,
  HStack,
  Text,
  Stack,
  Circle,
  Spacer,
  Link,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";

function Comment(props) {
  return (
    <div>
      <Box my={8} w="100%">
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
                {props.dept}
              </Text>
            </div>
          </Stack>
          <Spacer />
          <Text
            fontSize="12px"
            fontStyle="italic"
            fontWeight="500"
            color="gray.600"
          >
            {/* {props.date} */}
            {moment(props.date).format("LLL")}
          </Text>
        </HStack>

        <Box>
          <span style={{ whiteSpace: "pre-wrap" }}>
            <Text mt={5} ml={14} fontSize="14px" textAlign="justify">
              {props.remark}
            </Text>
          </span>
        </Box>

        {/* {props.file !== null ? (
          <Box
            ml={14}
            mt={5}
            display="flex"
            alignItems="center"
            bg="blue.100"
            w="fit-content"
            p={1.5}
            pr={4}
            rounded="3"
            shadow="sm"
          >
            <Link
              fontSize={13}
              pl={3}
              href={props.file}
              target="_blank"
              _hover={{ textDecoration: "none" }}
              fontWeight={600}
            >
              View attachment
            </Link>
          </Box>
        ) : (
          ""
        )} */}
      </Box>
      <hr />
    </div>
  );
}

export default Comment;
