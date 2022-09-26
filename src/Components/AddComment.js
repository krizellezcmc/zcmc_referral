import {
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { BiSend } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";

function AddComment(props) {
  return (
    <Box bg="gray.100" p={7} borderRadius={8}>
      <Textarea
        rows={5}
        p={0}
        border="none"
        _focus={{
          outline: "none",
          borderStyle: "none",
          borderColor: "transparent",
          overflow: "auto",
          boxShadow: "none",
        }}
        color="gray.900"
      />

      <Flex mt={10}>
        <Spacer />
        <IconButton icon={<MdAttachFile />} bg="none" fontSize="20px" mr={2} />
        <Button colorScheme="blue" rightIcon={<BiSend />}>
          Post
        </Button>
      </Flex>
    </Box>
  );
}

export default AddComment;
