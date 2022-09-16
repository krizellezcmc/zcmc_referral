import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import "../Styles/Table.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import { BiWrench } from "react-icons/bi";
import api from "../API/Api";

function ChangePassword(props) {
  const [isError, setIsError] = useState(false);
  const [currentError, setCurrentError] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [old, setOld] = useState("");
  const [show, setShow] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState("");
  const handleClick = () => setShow(!show);

  const handleClickOld = () => setShowOld(!showOld);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const toast = useToast();

  const change = async (e) => {
    e.preventDefault();
    if (newPass !== confirm) {
      setIsError(true);
    } else {
      setIsError(false);
      let response = await api.post("/change_pass.php", {
        userId: userId,
        email: email,
        newPass: newPass,
        old: old,
      });

      if (response.data.status === 1) {
        toast({
          position: "top",
          title: "Record successfully.",
          description: "Password has changed.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setNewPass("");
        setConfirm("");
        setOld("");
        setIsError(false);
        setCurrentError(false);
      } else if (response.data.status === 0) {
        setCurrentError(true);
      } else if (response.data.status === 3) {
        toast({
          position: "top",
          title: "Warning.",
          description: response.data.message,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "Failed to update.",
          description: "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.userId);
    setEmail(user.email);
    setRole(user.role);
  }, [userId, email, role]);

  return (
    <div>
      <Box width="2xl" padding={8} className="table-container">
        <h1
          style={{
            display: "flex",
            fontSize: "20px",
            margin: "0px 0px 30px 0",
            fontWeight: "600",
          }}
        >
          <BiWrench style={{ margin: "3px 8px 0px 0" }} />
          <Text>Change password</Text>
        </h1>
        <form onSubmit={change}>
          <FormControl mb={6}>
            <FormLabel fontSize="14px" fontWeight="regular">
              New password
            </FormLabel>

            <InputGroup size="md">
              <Input
                minLength="8"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter new password"
                focusBorderColor="#058e46"
                color="gray.600"
                fontSize="15px"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  bgColor="white"
                  onClick={handleClick}
                  p="0"
                  _hover={{ bgColor: "white" }}
                >
                  {show ? (
                    <VscEye color="gray.400" />
                  ) : (
                    <VscEyeClosed color="gray.400" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={isError} mb={6}>
            <FormLabel fontSize="14px" fontWeight="regular">
              Confirm password
            </FormLabel>
            <InputGroup size="md">
              <Input
                minLength="8"
                pr="4.5rem"
                type={showConfirm ? "text" : "password"}
                placeholder="Enter confirm password"
                focusBorderColor="none"
                color="gray.600"
                fontSize="15px"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  bgColor="white"
                  onClick={handleClickConfirm}
                  p="0"
                  _hover={{ bgColor: "white" }}
                >
                  {showConfirm ? (
                    <VscEye color="gray.400" />
                  ) : (
                    <VscEyeClosed color="gray.400" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isError ? (
              <FormErrorMessage>Password doesn't match. </FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl isInvalid={currentError}>
            <FormLabel fontSize="14px" fontWeight="regular">
              Current password
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showOld ? "text" : "password"}
                placeholder="Enter current password"
                focusBorderColor="none"
                color="gray.600"
                fontSize="15px"
                value={old}
                onChange={(e) => setOld(e.target.value)}
                required
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  bgColor="white"
                  onClick={handleClickOld}
                  p="0"
                  _hover={{ bgColor: "white" }}
                >
                  {showOld ? (
                    <VscEye color="gray.400" />
                  ) : (
                    <VscEyeClosed color="gray.400" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {currentError ? (
              <FormErrorMessage>Wrong current password.</FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>

          <div
            style={{
              marginTop: "35px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button type="submit" variant="solid" colorScheme="green">
              Change password
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default ChangePassword;
