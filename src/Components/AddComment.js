import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormLabel,
  Spacer,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import api from "../API/Api";

function AddComment(props) {
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState("");
  const [load, setLoad] = useState(false);
  const [res, setRes] = useState("");
  const [file, setFile] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");

  let toast = useToast();

  const addComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("patientId", props.patientId);
    formData.append("remark", remark);
    formData.append("user", props.user);

    if (file) {
      formData.append("file", file[0]);
    }

    setLoad(true);
    let response = await api.post("/add_comment.php", formData);
    if (response) {
      setLoad(false);
    }
    if (response.data.status === 1) {
      setRemark("");
      setFile("");
      // setFileUploaded("");
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
    <Box bg="gray.100" pt={7} pb={4} px={5} borderRadius={8}>
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
        fontSize={15}
        placeholder="Type here"
        color="gray.900"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        style={{ position: "inherit" }}
      />

      <Flex mt={5} align="center">
        {file ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              bg="blue.100"
              p={1}
              rounded={5}
            >
              <Text fontSize={13} pl={3}>
                {file[0].name}
              </Text>
              <CloseButton
                size="sm"
                ml={2}
                onClick={(e) => {
                  setFile("");
                }}
              />
            </Box>
          </>
        ) : (
          ""
        )}
        <Spacer />

        <FormLabel for="attachment" fontSize={20} p={2}>
          <MdAttachFile cursor="pointer" />
        </FormLabel>
        <input
          type="file"
          id="attachment"
          style={{ display: "none", visibility: "none" }}
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />
        <Button
          onClick={addComment}
          colorScheme="blue"
          isLoading={load}
          loadingText="Posting"
          rightIcon={<BiSend />}
          isDisabled={!remark && !file}
        >
          Post Remark
        </Button>
      </Flex>
    </Box>
  );
}

export default AddComment;
