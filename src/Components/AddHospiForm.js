import React, { useEffect, useState } from "react";
import "../Styles/ReferralForm.css";
import {
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
  Center,
  Text,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import "../Styles/Table.css";
import api from "../API/Api";
import { BiRefresh, BiSave, BiSearch } from "react-icons/bi";
import Loading from "./Spinner";
import { TbBuildingHospital } from "react-icons/tb";

const header = [
  {
    title: "Access Code",
  },
  {
    title: "Hospital",
  },
];

const AddHospiForm = () => {
  const [hospiName, setHospiName] = useState("");
  const [code, setCode] = useState(0);
  const [addHospi, setAddHospi] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    setIsLoading(true);
    let response = await api.get("/get_hospitals.php");

    if (response) {
      setHospitals(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAddHospi({
      code: code,
      hospiName: hospiName,
    });

    fetch();
  }, []);

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
      <div className="">
        <Flex alignItems="center" mb={10} p={3}>
          <Heading fontWeight={700} fontSize={31} color="teal.900" mr={3}>
            Hospitals
          </Heading>
          <TbBuildingHospital fontSize={30} />
          <Spacer />{" "}
          <Button
            rightIcon={<BiRefresh />}
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Refresh
          </Button>
        </Flex>

        <Box px={10}>
          <Input
            fontSize="13px"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hospital"
            width="400px"
            _hover={{ borderColor: "green" }}
            _focus={{
              boxShadow: "none",
              outline: "none",
              borderColor: "green",
            }}
            bgColor="white"
          />
        </Box>
        {isLoading ? (
          <Center my={20}>
            <Loading />
          </Center>
        ) : (
          <>
            <Box p={10}>
              <Flex borderRadius="sm" mb={5}>
                {header.map((h) => {
                  return (
                    <>
                      <Box bgColor="white" width="full" p={3}>
                        <Text color="#B3B3B3" textAlign="center">
                          {h.title}{" "}
                        </Text>
                      </Box>
                    </>
                  );
                })}
              </Flex>

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
                .map((index, i) => {
                  const isEven = i % 2 === 0;
                  const backgroundColor = isEven ? "white" : "#e9ffff";
                  return (
                    <>
                      <Flex
                        bgColor={backgroundColor}
                        color="#3E9393"
                        fontWeight={600}
                        fontSize={14}
                        alignItems="center"
                      >
                        <Box width="full" p={2} textAlign="center">
                          <Text>{index.code}</Text>
                        </Box>
                        <Box width="full" p={2} textAlign="center">
                          <Text>{index.label}</Text>
                        </Box>
                      </Flex>
                    </>
                  );
                })}
            </Box>
          </>
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
