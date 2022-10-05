import React from "react";
import {
  Box,
  HStack,
  Spacer,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../API/Api";

function TransferredRef(props) {
  const [patDetails, setPatDetails] = useState([]);
  const [patId, setPatId] = useState("");
  const [refHospi, setRefHospi] = useState("");
  const [historyDetails, setHistoryDetails] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getList = async () => {
      let response = await api.get("/get_transfer_details.php");
      setPatDetails(response.data);
      setPatId(response.data[0].patientId);
      setRefHospi(response.data[0].refFacility);
    };
    const getHistory = async () => {
      let history = await api.get("/get_transfer_history.php", {
        params: { patientId: patId },
      });
      setHistoryDetails(history.data);
    };
    getList();
    getHistory();
  }, []);
  return (
    <div>
      <Container maxW="80%">
        <Box
          w="100%"
          bg="white"
          borderRadius="lg"
          padding={1}
          border="1px"
          borderColor="gray.300"
          boxShadow="lg"
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
                REFERRED TO
              </Text>
            </Box>
            <Box w="100%" textAlign="center">
              <Text fontWeight="800" fontSize="13.5px">
                REFERRED FROM
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
          borderColor="gray.300"
          boxShadow="base"
          mt={3}
        >
          {patDetails.map((e, k) => {
            return (
              <>
                <Box
                  as="button"
                  w="100%"
                  _hover={{
                    background: "green.50",
                    color: "black",
                    borderTop: "2px",
                    borderColor: "green",
                  }}
                  py={3}
                  onClick={onOpen}
                >
                  <HStack>
                    <Box w="100%" textAlign="center">
                      <Text fontWeight="900" fontSize="13px">
                        {e.lastname + ", " + e.firstname + " " + e.middleName}
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
                        {e.name}
                      </Text>
                    </Box>
                    <Box w="100%" textAlign="center">
                      <Text fontWeight="500" fontSize="13px">
                        {e.refFacility}
                      </Text>
                    </Box>
                    <Box w="100%" textAlign="center">
                      <Badge
                        variant="subtle"
                        fontWeight="bolder"
                        fontSize="13px"
                        colorScheme="green"
                      >
                        {e.status}
                      </Badge>
                    </Box>
                  </HStack>
                </Box>
                <Divider />
              </>
            );
          })}
        </Box>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PATIENT REFERRAL HISTORY</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Referred From</Text>
            <Text>{refHospi}</Text>
            <Text>Zamboanga City Medical Center</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TransferredRef;
