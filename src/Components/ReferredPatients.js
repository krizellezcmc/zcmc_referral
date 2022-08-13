import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  GridItem,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import "../Styles/Patients.css";
import moment from "moment";
import { BiCalendarEvent, BiSearch, BiStats, BiUser } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { TbCheckupList } from "react-icons/tb";
import { TbBuildingHospital } from "react-icons/tb";

const ReferredPatients = () => {
  let navigate = useNavigate();

  const [refpatients, setRefPatients] = useState([]);
  const [hospital, setHospital] = useState("");
  const [patients, setPatients] = useState([]);
  const [details, setDetails] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setHospital(user.name);

    // axios
    //   .get("http://192.168.3.135/zcmc_referral_api/api/get_sheets.php/")
    //   .then((response) => {
    //     setRefPatients(response.data);
    //   });

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_patients.php")
      .then(function (response) {
        setPatients(response.data);
      });
  });

  const getDetails = (id) => {
    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_details.php", {
        params: { id: id },
      })
      .then(function (response) {
        setDetails(response.data);
      });
  };
  return (
    <div className="table-container">
      <h1 className="block">Users</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiSearch color="gray.300" />}
          />
          <Input
            fontSize="14px"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User"
            width="400px"
          />
        </InputGroup>
        <Button
          variant="solid"
          colorScheme="green"
          onClick={() => {
            navigate("/home");
          }}
        >
          + Refer patient
        </Button>
      </div>
      {!patients ? (
        <i style={{ alignContent: "center" }}>---No data found---</i>
      ) : (
        <TableContainer>
          <Table cellSpacing={0}>
            <Thead>
              <Tr>
                <Th className="border" width="10%">
                  Patient ID
                </Th>
                <Th className="border" width="30%">
                  Full name
                </Th>
                <Th className="border" width="20%">
                  Referred Date
                </Th>

                <Th className="border" width="20%">
                  Discharge Date
                </Th>
                <Th className="border">Status</Th>
                <Th className="border">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.patientName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((pat) => {
                  return pat.referredFrom.toUpperCase() ===
                    hospital.toUpperCase() ? (
                    <>
                      <Tr>
                        <Td className="border">
                          <b>{pat.patId}</b>
                        </Td>
                        <Td className="border">{pat.patientName}</Td>
                        <Td className="border">
                          {moment(pat.referredDate).format("LLL")}
                        </Td>

                        <Td className="border">
                          {pat.dischDate == null ? (
                            <Badge colorScheme="yellow"> Not applicable</Badge>
                          ) : (
                            moment(pat.dischDate).format("LLL")
                          )}
                        </Td>
                        <Td className="border">
                          {pat.dischDate === null ? (
                            <Badge colorScheme="blue">+ Admitted</Badge>
                          ) : (
                            <Badge colorScheme="red">- Discharged</Badge>
                          )}
                        </Td>
                        <Td paddingTop="0" paddingBottom="0 ">
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => {
                              onOpen();
                              getDetails(pat.PK_patientId);
                            }}
                            leftIcon={<BsEye fontSize="15px" />}
                          >
                            View
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  ) : (
                    ""
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {/* MODAL VIEW DETAILS */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Patient Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {details.map((d) => {
              return (
                <>
                  <Grid templateColumns="repeat(2, 1fr)" mt={3}>
                    <GridItem>
                      <small
                        style={{
                          display: "flex",
                          marginBottom: "4px",
                        }}
                      >
                        <BiUser style={{ marginRight: "5px", marginTop: 2 }} />
                        <Text textTransform="uppercase">Patient name</Text>
                      </small>
                      <Text fontWeight="600">{d.patientName}</Text>
                    </GridItem>

                    <GridItem>
                      <small
                        style={{
                          display: "flex",
                          marginBottom: "4px",
                        }}
                      >
                        <BiStats style={{ marginRight: "5px", marginTop: 2 }} />
                        <Text textTransform="uppercase">Patient status</Text>
                      </small>
                      {d.dischDate === null ? (
                        <Badge colorScheme="blue">Patient is admitted</Badge>
                      ) : (
                        <Badge colorScheme="red">Discharged</Badge>
                      )}
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" mt={10}>
                    <GridItem>
                      <small style={{ display: "flex", marginBottom: 6 }}>
                        <TbBuildingHospital
                          style={{ marginRight: "5px", marginTop: 2 }}
                        />
                        <Text textTransform="uppercase">Referred from</Text>
                      </small>
                      <Text fontSize="15px">{d.referredFrom}</Text>
                    </GridItem>
                    <GridItem>
                      <small style={{ display: "flex", marginBottom: 6 }}>
                        <BiCalendarEvent
                          style={{ marginRight: "5px", marginTop: 2 }}
                        />
                        <Text textTransform="uppercase">Referred date</Text>
                      </small>
                      <Text fontSize="15px">
                        {moment(d.referredDate).format("lll")}
                      </Text>
                    </GridItem>
                  </Grid>

                  <Box mt={10}>
                    <small style={{ display: "flex", marginBottom: 6 }}>
                      <TbCheckupList
                        style={{ marginRight: "5px", marginTop: 2 }}
                      />
                      <Text textTransform="uppercase">Discharge diagnosis</Text>
                    </small>

                    <Box>
                      {d.dischDiagnosis === "" || d.dischDiagnosis === null ? (
                        <Box p={3} bg="gray.50" borderRadius="5px">
                          <Text fontSize="13px">Nothing to show</Text>
                        </Box>
                      ) : (
                        <>
                          <Box p={3} bg="gray.50" borderRadius="5px">
                            <Text fontSize="13px">{d.dischDiagnosis}</Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Box mt={10}>
                    <small style={{ display: "flex", marginBottom: 6 }}>
                      <TbCheckupList
                        style={{ marginRight: "5px", marginTop: 2 }}
                      />
                      <Text textTransform="uppercase">Final diagnosis</Text>
                    </small>

                    <Box>
                      {d.finalDiagnosis === "" || d.finalDiagnosis === null ? (
                        <Box p={3} bg="gray.50" borderRadius="5px">
                          <Text fontSize="13px">Nothing to show</Text>
                        </Box>
                      ) : (
                        <>
                          <Box p={3} bg="gray.50" borderRadius="5px">
                            <Text fontSize="13px">{d.finalDiagnosis}</Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Box mt={10}>
                    <small style={{ display: "flex", marginBottom: 6 }}>
                      <BiCalendarEvent
                        style={{ marginRight: "5px", marginTop: 2 }}
                      />
                      <Text textTransform="uppercase">Discharge date</Text>
                    </small>

                    <Box>
                      {d.dischDate === "" || d.dischDate === null ? (
                        <Box p={3} bg="gray.50" borderRadius="5px">
                          <Text
                            fontSize="13px"
                            fontWeight="600"
                            color="blue.500"
                          >
                            Patient is still admitted
                          </Text>
                        </Box>
                      ) : (
                        <Box p={3} bg="red.50" borderRadius="5px">
                          <Text
                            fontSize=" 14px"
                            color="red.600"
                            fontWeight="600"
                          >
                            {moment(d.dischDate).format("lll")}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReferredPatients;
