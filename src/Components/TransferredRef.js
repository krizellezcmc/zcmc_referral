import React from "react";
import {
  Box,
  HStack,
  Text,
  Container,
  Badge,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../API/Api";
import { BiClinic, BiSearch } from "react-icons/bi";
import { Select } from "chakra-react-select";
import useAuth from "../Hooks/useAuth";
import Spinner from "../Components/Spinner";
import { TbTransferIn, TbTransferOut } from "react-icons/tb";

function TransferredRef(props) {
  const [patDetails, setPatDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [patId, setPatId] = useState("");
  const [refHospi, setRefHospi] = useState("");
  const [historyDetails, setHistoryDetails] = useState([]);
  const [status, setStatus] = useState("");
  // const [reason, setReason] = useState([]);

  const [refReason, setRefReason] = useState("");
  const [selectRef, setSelectedRef] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const [search, setSearch] = useState("");

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const {
    isOpen: isTransferOpen,
    onOpen: onTransferOpen,
    onClose: onTransferClose,
  } = useDisclosure();

  let toast = useToast();
  const { user } = useAuth();

  const getHistory = async (patId) => {
    onViewOpen();
    let history = await api.get("/get_transfer_history.php", {
      params: { patientId: patId },
    });
    setHistoryDetails(history.data);
    setStatus(history.data[0].status);
    setRefHospi(history.data[0].refFacility);
    // setRefHospi(history.data[0].name);

    let res = await api.get("/get_pending_details.php", {
      params: { pid: patId },
    });
    setRefHospi(res.data[0].refFacility);
  };

  const getList = async () => {
    setIsLoading(true);
    let response = await api.get("/get_transfer_details.php");
    setPatDetails(response.data);

    if (response) {
      setIsLoading(false);
    }
  };

  const getHospitals = async () => {
    let response = await api.get("/get_local_hospitals.php");
    setHospitals(response.data);
  };

  useEffect(() => {
    getList();
    getHospitals();
  }, []);

  const submit = async () => {
    let decline = await api.post("/transfer.php", {
      patientId: patId,
      referredTo: selectRef,
      reason: refReason,
    });
    if (decline.data.status === 1) {
      toast({
        position: "top",
        title: decline.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setRefReason("");
      onTransferClose();
    }
  };
  return (
    <div>
      <Container maxW="92%" mt={5}>
        <Flex alignItems="center" mb={7}>
          <Heading
            fontWeight={700}
            fontSize={33}
            color="teal.900"
            mr={3}
            textTransform="uppercase"
          >
            Transferred
          </Heading>
          <TbTransferIn fontSize={30} />
        </Flex>
        <Box pb={5} pt={6}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearch color="gray.300" />}
            />
            <Input
              fontSize="13px"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient"
              width="400px"
              _hover={{ borderColor: "green" }}
              _focus={{
                boxShadow: "none",
                outline: "none",
                borderColor: "green",
              }}
              backgroundColor="white"
            />
          </InputGroup>
        </Box>
        <Box
          w="100%"
          bg="white"
          borderRadius="lg"
          border="1px"
          borderColor="gray.100"
          boxShadow="md"
          py={3}
        >
          <HStack>
            <Box w="100%" textAlign="center">
              <Text fontWeight="800" fontSize="13.5px">
                PATIENT
              </Text>
            </Box>

            <Box w="100%" textAlign="center">
              <Text fontWeight="800" fontSize="13.5px">
                REFERRED FROM
              </Text>
            </Box>
            <Box w="100%" textAlign="center">
              <Text fontWeight="800" fontSize="13.5px">
                REFERRED TO
              </Text>
            </Box>
            <Box w="100%" textAlign="center">
              <Text fontWeight="800" fontSize="13.5px">
                STATUS
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box
          w="100%"
          bg="white"
          borderRadius="md"
          border="1px"
          borderColor="gray.100"
          boxShadow="base"
          mt={2}
        >
          {isLoading ? (
            <Center my={20}>
              <Spinner />
            </Center>
          ) : (
            <>
              {patDetails.length === 0 ? (
                <Text textAlign="center" fontSize={13}>
                  ---Nothing to Show---
                </Text>
              ) : (
                <>
                  {patDetails
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.lastname
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val.refFacility
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val.status.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((e, k) => {
                      return (
                        <>
                          <Box
                            as="button"
                            w="100%"
                            _hover={{
                              background: "green.50",
                              color: "black",
                              borderLeft: "2px",
                              borderColor: "green",
                              transform: "scale(1.01)",
                            }}
                            py={3}
                            onClick={() => {
                              getHistory(e.patientId);
                            }}
                          >
                            <HStack>
                              <Box w="100%" textAlign="center">
                                <Text fontWeight="900" fontSize="13px">
                                  {e.lastname +
                                    ", " +
                                    e.firstname +
                                    " " +
                                    e.middleName}
                                </Text>
                                <Text fontSize="12px" fontWeight={500}>
                                  Gender: {e.sex}
                                </Text>
                                <Text fontSize="12px" fontWeight={500}>
                                  Specialization: {e.specialization}
                                </Text>
                              </Box>
                              <Box w="100%" textAlign="center">
                                <Text fontWeight="500" fontSize="13px">
                                  {e.refFacility}
                                </Text>
                              </Box>{" "}
                              <Box w="100%" textAlign="center">
                                <Text fontWeight="500" fontSize="13px">
                                  {e.name}
                                </Text>
                              </Box>
                              <Box w="100%" textAlign="center">
                                <Badge
                                  variant="subtle"
                                  fontWeight="bolder"
                                  fontSize="13px"
                                  colorScheme="green"
                                >
                                  {e.r_status}
                                </Badge>
                              </Box>
                            </HStack>
                          </Box>
                          <Divider />
                        </>
                      );
                    })}
                </>
              )}
            </>
          )}
        </Box>
      </Container>
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PATIENT REFERRAL HISTORY</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg="green.100" borderRadius="lg" p={3} mb={5}>
              {status === "accepted" ? (
                <>
                  <Box>
                    <Text fontWeight={500} fontSize="14px">
                      Accepted!
                    </Text>
                  </Box>
                </>
              ) : (
                <>
                  {historyDetails.map((r, k) => {
                    return (
                      <>
                        {r.status === "waiting" ? (
                          <>
                            <Box>
                              <Text fontWeight={500} fontSize="14px">
                                Reason for referring:
                              </Text>
                              <Text
                                mx={3}
                                mt={3}
                                align="justify"
                                fontSize="13px"
                                fontWeight={600}
                              >
                                Zamboanga City Medical Center
                              </Text>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box mt={5}>
                              <Text
                                fontWeight={500}
                                fontSize="14px"
                                color="red.500"
                              >
                                Reason for not accepting
                              </Text>
                              <Text
                                mx={3}
                                mt={2}
                                align="justify"
                                fontSize="13px"
                                fontWeight={600}
                              >
                                {r.name}
                              </Text>
                            </Box>
                          </>
                        )}
                        <Text mx={3} align="justify" fontSize="13px">
                          {r.reason}
                        </Text>
                      </>
                    );
                  })}
                </>
              )}
            </Box>
            {/* <Text>Referred From</Text> */}

            {historyDetails.map((e, k) => {
              return (
                <>
                  <Flex align="center" justify="center">
                    <BiClinic color="green" />
                    <Text ml={2} fontSize="13px">
                      {e.name}
                    </Text>
                  </Flex>
                  <Stack direction="row" h="100px" p={1} justify="center">
                    <Box borderLeft="2px" borderColor="green"></Box>
                  </Stack>
                </>
              );
            })}

            <Flex align="center" justify="center">
              <BiClinic color="green" />
              <Text ml={2} fontSize="13px">
                Zamboanga City Medical Center
              </Text>
            </Flex>
            <Stack direction="row" h="100px" p={1} justify="center">
              <Box borderLeft="2px" borderColor="green"></Box>
            </Stack>
            <Flex align="center" justify="center">
              <BiClinic color="red" />
              <Text ml={2} fontSize="13px">
                {refHospi}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {status === "waititng" || status === "accepted" ? (
              ""
            ) : (
              <>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    onViewClose();
                    onTransferOpen();
                  }}
                  size="sm"
                >
                  Transfer
                </Button>
              </>
            )}

            <Button colorScheme="teal" mr={3} onClick={onViewClose} size="sm">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isTransferOpen}
        onClose={onTransferClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer Referral</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Reason</FormLabel>
              <Textarea
                type="text"
                value={refReason}
                onChange={(e) => setRefReason(e.target.value)}
              />
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel>Refer to</FormLabel>
              <Select
                options={hospitals}
                placeholder="Select Hospital"
                variant="flushed"
                selectedOptionStyle="check"
                closeMenuOnSelect={true}
                focusBorderColor="#058e46"
                onChange={(e) => {
                  setSelectedRef(e.value);
                }}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" size="sm" onClick={submit}>
              Submit
            </Button>
            <Button
              colorScheme="blue"
              size="sm"
              ml={3}
              onClick={onTransferClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TransferredRef;
