import React, { useEffect, useState } from "react";
import "../Styles/ReferralForm.css";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Box,
  HStack,
  useToast,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import "../Styles/Table.css";
import { MdOutlineAdd } from "react-icons/md";
import { BiSave } from "react-icons/bi";

const AddHospiForm = () => {
  const [hospiName, setHospiName] = useState("");
  const [code, setCode] = useState(0);
  const [addHospi, setAddHospi] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setAddHospi({
      code: code,
      hospiName: hospiName,
    });

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_hospitals.php")
      .then(function (response) {
        setHospitals(response.data);
      });
  }, [code, hospiName]);

  const sendHospiData = () => {
    axios
      .post(
        "http://192.168.3.135/zcmc_referral_api/api/add_hospi.php/",
        addHospi
      )
      .then((response) => {
        if (response.data.status === 1) {
          toast({
            position: "top",
            title: "Record successfully.",
            description: "New hospital added.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setHospiName("");
          setCode(0);
        } else {
          toast({
            position: "top",
            title: "Error.",
            description: "Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      ></div>
      <Button
        variant="solid"
        colorScheme="blue"
        leftIcon={<MdOutlineAdd />}
        onClick={onOpen}
      >
        Add new hospital
      </Button>
      <div className="table-hospital">
        <TableContainer>
          <Table cellSpacing={0}>
            <Thead>
              <Tr>
                <Th className="border" width="30%">
                  Access Code
                </Th>
                <Th className="border">Hospital name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hospitals.length != 0 ? (
                hospitals.map((index) => {
                  return (
                    <>
                      <Tr>
                        <Td className="border">
                          <b>{index.code}</b>
                        </Td>
                        <Td className="border">{index.label}</Td>
                      </Tr>
                    </>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={2}>Nothing to show</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Hospital</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex style={{ marginTop: 20 }}>
              <Box width="100%" mr={3}>
                Hospital Name
                <Input
                  type="text"
                  value={hospiName}
                  onChange={(e) => setHospiName(e.target.value)}
                />
              </Box>

              <Box>
                Access Code
                <Input
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Box>
            </Flex>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={() => {
                sendHospiData();
              }}
              style={{ float: "right", margin: "30px 20px 0px" }}
              leftIcon={<BiSave />}
            >
              Save record
            </Button>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddHospiForm;
