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
  useToast,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import "../Styles/Table.css";
import api from "../API/Api";
import { BiSave, BiSearch } from "react-icons/bi";

const AddHospiForm = () => {
  const [hospiName, setHospiName] = useState("");
  const [code, setCode] = useState(0);
  const [addHospi, setAddHospi] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetch = async () => {
    let response = await api.get("/get_hospitals.php");
    setHospitals(response.data);
  };

  useEffect(() => {
    setAddHospi({
      code: code,
      hospiName: hospiName,
    });

    fetch();
  }, [code, hospiName, hospitals]);

  const sendHospiData = async () => {
    if (!hospiName || !code || code === 0) {
      toast({
        position: "top",
        title: "Warning",
        description: "Kindly input all fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      let response = await api.post("/add_hospi.php", addHospi);

      if (response.data.status === 1) {
        toast({
          position: "top",
          title: "Record successfully.",
          description: "New hospital added.",
          status: "success",
          variant: "subtle",
          duration: 2000,
          isClosable: true,
        });
        setHospiName("");
        setCode(0);
      } else if (response.data.status === 3) {
        toast({
          position: "top",
          title: "Hospital or code exist.",
          description: "Please try again.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
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
    }
  };

  const [search, setSearch] = useState("");
  return (
    <>
      <div className="table-container ">
        <h1 className="block">List of Hospitals</h1>
        <div className="add-hospital-btn" style={{ marginBottom: "25px" }}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearch color="gray.300" />}
            />
            <Input
              fontSize="13px"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospital"
              width="400px"
            />
          </InputGroup>
        </div>
        {!hospitals ? (
          <i style={{ alignContent: "center" }}>---No data found---</i>
        ) : (
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
                {hospitals
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.label.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((index) => {
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
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
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
              onClick={sendHospiData}
              style={{ float: "right", margin: "30px 0px 20px" }}
              leftIcon={<BiSave />}
            >
              Save record
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddHospiForm;
