import {
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import api from "../API/Api";

function AddComment(props) {
  const [remark, setRemark] = useState("");

  let toast = useToast();

  const addComment = async () => {
    if (remark === "") {
      toast({
        position: "top",
        variant: "solid",
        title: "Empty field!",
        status: "warning",
        duration: 500,
        isClosable: true,
      });
    }

    let response = await api.post("/add_comment.php", {
      patientId: props.patientId,
      remark: remark,
      user: props.user,
    });

    if (response.data.status === 1) {
      setRemark("");
      toast({
        title: "Posted.",
        description: "The remark has been posted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error.",
        description: response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.100" p={7} borderRadius={8}>
      <Textarea
        rows={4}
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
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        style={{ position: "inherit" }}
      />

      <Flex mt={5}>
        <Spacer />
        {/* <IconButton icon={<MdAttachFile />} bg="none" fontSize="20px" mr={2} /> */}
        <Button onClick={addComment} colorScheme="blue" rightIcon={<BiSend />}>
          Post Remark
        </Button>
      </Flex>
    </Box>
  );
}

export default AddComment;
