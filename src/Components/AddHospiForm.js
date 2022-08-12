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
import { MdOutlineAdd } from "react-icons/md";
import { BiSave, BiSearch } from "react-icons/bi";

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
        });
    }
  };

  const [search, setSearch] = useState("");
  return (
    <>
      <div className="table-hospital-container ">
        <div className="add-hospital-btn">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearch color="gray.300" />}
            />
            <Input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospital"
              width="400px"
            />
          </InputGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            leftIcon={<MdOutlineAdd />}
            onClick={onOpen}
            style={{ padding: "0 25px 0 25px" }}
          >
            Add new hospital
          </Button>
        </div>

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
              {hospitals.length !== 0 ? (
                hospitals
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
