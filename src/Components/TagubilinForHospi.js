import React, { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Checkbox,
  Text,
  VStack,
  Spacer,
  GridItem,
  Grid,
  Input,
  Box,
  Textarea,
  Button,
  IconButton,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";
import "../Styles/Tagubilin.css";
import { BiMinus, BiSend } from "react-icons/bi";
import axios from "axios";
import moment from "moment";
import cbc from "../Assets/cbc2.png";
import { Select } from "chakra-react-select";
import {useParams} from "react-router-dom";

function TagubilinForHospi() {
  const [patientName, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [ward, setWard] = useState("");
  const [hrn, setHrn] = useState("");
  const [address, setAddress] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [dischDiag, setDischDiag] = useState("");
  const [dischDate, setDischDate] = useState("");
  const [laboratory, setLaboratory] = useState("");
  const [xray, setXray] = useState("");
  const [ctScan, setCTScan] = useState("");
  const [mri, setMRI] = useState("");
  const [others, setOthers] = useState("");
  const [nurse, setNurse] = useState("");
  const [resident, setResident] = useState();
  const [healthOthers, setHealthOthers] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [time, setTime] = useState("");
  const [needBring, setNeedBring] = useState("");
  const [othersDiet, setOthersDiet] = useState("");
  const [medId, setMedId]=useState("");
  const [medications, setMedications] = useState([]);
  const [obId, setObId]=useState("");
  const [breastfeed, setBreastfeed] = useState([]);

  const {id}=useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost/zcmc_referral_api/api/get_tagubilinhospi.php/${id}`
      )
      .then((response) => {
        setPatient(response.data[0].patientName);
        setAge(response.data[0].age);
        setSex(response.data[0].sex);
        setAddress(response.data[0].address);
        setWard(response.data[0].ward);
        setHrn(response.data[0].hrn);
        // setAdmissionDate(
        //   moment(response.data.admissionDate.date).format("LLL")
        // );
        setDischDiag(response.data[0].disch_diagnosis);
        // setDischDate(
        //   response.data.dischdate === null
        //     ? ""
        //     : moment(response.data.dischdate.date).format("ll")
        // );
        setLaboratory(response.data[0].laboratory);
        setXray(response.data[0].xray);
        setCTScan(response.data[0].ctScan);
        setMRI(response.data[0].mri);
        setOthers(response.data[0].others);
        setFollowUp(response.data[0].followupDate);
        setTime(response.data[0].time);
        setNeedBring(response.data[0].needToBring);
        setNurse(response.data[0].nurse);
        setResident(response.data[0].resident);
        setMedId(response.data[0].FK_medicationId);
        setObId(response.data[0].FK_breastfeedId);
      });

      axios.get("http://localhost/zcmc_referral_api/api/get_medhospi.php/", {params:{mid:medId}})
      .then((response)=>{
        setMedications(response.data);
      })

      axios.get("http://localhost/zcmc_referral_api/api/get_obhospi.php/", {params:{oid:obId}})
      .then((response)=>{
        setBreastfeed(response.data);
      })

  }, [medId,obId]);

  return (
    <div
      style={{
        width: "1300px",
        // margin: "0 auto",
        marginTop: "25px",
        marginBottom: "50px",
      }}
    >
      <p>{id}</p>
      <TableContainer>
          <Table variant="unstyled" cellSpacing={0}>
            <Tbody>
              <Tr>
                <Td className="border" minWidth="500px" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Name/Pangalan:
                  </Text>
                  <Text fontSize="14px">{patientName}</Text>
                </Td>

                <Td className="border" maxWidth="100px" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Age/Edad:
                  </Text>
                  <Text fontSize="14px">{age}</Text>
                </Td>
                <Td className="border" width="10%" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Sex:
                  </Text>
                  <Text fontSize="14px">{sex}</Text>
                </Td>
                <Td className="border" width="40%" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Ward:
                  </Text>
                  <Text fontSize="14px">{ward}</Text>
                </Td>
                <Td className="border" width="40%" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Hospital Record No.:
                  </Text>
                  <Text fontSize="14px">{hrn}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" py={1.5} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Address:
                  </Text>
                  <Text fontSize="14px">{address}</Text>
                </Td>
                <Td className="border" py={1.5} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Admission Date:
                  </Text>
                  {/* <Text fontSize="14px">{admissionDate}</Text> */}
                </Td>

                <Td className="border" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Discharge Date:
                  </Text>
                  <Text fontSize="14px">Date</Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" py={1.5} colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    Diagnosis:
                  </Text>
                  <Text
                    // defaultValue={dischDiag}
                    mt={1}
                    borderRadius="0"
                    border="none"
                    rows={1}
                    fontSize="14px"
                  >{dischDiag}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" py={1.5} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Operation/Operasyon:
                  </Text>
                  <Text fontSize="14px">Operation</Text>
                </Td>
                <Td className="border" py={1.5} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Surgeon:
                  </Text>
                  <Text fontSize="14px">Surgeon</Text>
                </Td>
                <Td className="border" py={1.5}>
                  <Text fontSize="12px" fontWeight="600">
                    Petsa ng Operasyon:
                  </Text>
                  <Text fontSize="14px">Date</Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="5" m={0} py={1}>
                  <Text fontSize="12px" fontWeight="600">
                    Major Diagnostic Results/Pangunahing Resulta ng Pagsusuri
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" width="40%" py={1.5}>
                  <Box height="150px">
                    <Text fontSize="12px" textAlign="center" fontWeight="600">
                      Laboratory
                    </Text>
                    <Text
                      m={0}
                      textAlign="center"
                      borderRadius="0"
                      border="none"
                      rows={6}
                      fontSize="14px"
                    >{laboratory}</Text>
                  </Box>
                </Td>

                <Td className="border" width="30%" py={0} px={0}>
                  <Box height="142px">
                    <Text fontSize="12px" textAlign="center" fontWeight="600">
                      X-Ray
                    </Text>
                    <Text
                      m={0}
                      textAlign="center"
                      borderRadius="0"
                      border="none"
                      rows={6}
                      fontSize="14px"
                    >{xray}</Text>
                  </Box>
                </Td>

                <Td className="border" width="30%" py={0} px={0}>
                  <Box height="142px">
                    <Text fontSize="12px" textAlign="center" fontWeight="600">
                      CT-Scan
                    </Text>
                    <Text
                      m={0}
                      textAlign="center"
                      borderRadius="0"
                      border="none"
                      rows={6}
                      fontSize="14px"
                    >{ctScan}</Text>
                  </Box>
                </Td>

                <Td className="border" width="30%" py={0} px={0}>
                  <Box height="142px">
                    <Text fontSize="12px" textAlign="center" fontWeight="600">
                      MRI
                    </Text>
                    <Text
                      m={0}
                      textAlign="center"
                      borderRadius="0"
                      border="none"
                      rows={6}
                      fontSize="14px"
                    >{mri}</Text>
                  </Box>
                </Td>
                <Td className="border" width="20%" py={0} px={0}>
                  <Box height="142px">
                    <Text fontSize="12px" textAlign="center" fontWeight="600">
                      OTHERS
                    </Text>
                    <Text
                      m={0}
                      textAlign="center"
                      borderRadius="0"
                      border="none"
                      rows={6}
                      fontSize="14px"
                    >{others}</Text>
                  </Box>
                </Td>
              </Tr>

            
              {!medications ? (
                ""
              ) : (
                <>
              <Tr>
                <Td className="border" colSpan="5" py={1}>
                  <Text fontSize="12px" fontWeight="600">
                    <Checkbox
                      mr={2}
                      mt={0.5}
                      isDisabled defaultChecked
                    ></Checkbox>
                    Home Medications/Gamot
                  </Text>
                </Td>
              </Tr>
                  <Tr>
                    <Td className="border" width="200px" colSpan="2" py={1}>
                      <Text textAlign="center" fontSize="12px" fontWeight="600">
                        Pangalan ng Gamot
                      </Text>
                    </Td>

                    <Td className="border" colSpan="1" width="40%" py={1}>
                      <Text textAlign="center" fontSize="12px" fontWeight="600">
                        Dosage
                      </Text>
                    </Td>
                    <Td className="border" py={1} width="30%">
                      <Text textAlign="center" fontSize="12px" fontWeight="600">
                        Prikwensiya at Oras ng Pag-iinom
                      </Text>
                    </Td>
                    <Td className="border" py={1}>
                      <Text textAlign="center" fontSize="12px" fontWeight="600">
                        Quantity
                      </Text>
                    </Td>
                  </Tr>
                  {medications.map((x, i) => {
                    return (
                      <>
                        <Tr>
                          <Td className="border" colSpan="2" p={1}>
                            <Text
                              m={0}
                              borderRadius="0"
                              border="none"
                              rows={1}
                              fontSize="14px"
                              textAlign="center"
                            >{x.medicine}</Text>
                          </Td>

                          <Td className="border" p={1}>
                            <Text
                              m={0}
                              textAlign="center"
                              borderRadius="0"
                              border="none"
                              rows={1}
                              fontSize="14px"
                            >{x.dosage}</Text>
                          </Td>
                          <Td className="border" p={1}>
                            <Text
                              m={0}
                              textAlign="center"
                              borderRadius="0"
                              border="none"
                              rows={1}
                              fontSize="14px"
                            >{x.sched}</Text>
                          </Td>
                          <Td className="border" p={1}>
                            <Text
                              m={0}
                              borderRadius="0"
                              border="none"
                              rows={1}
                              fontSize="14px"
                              textAlign="center"
                            >{x.quantity}</Text>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </>
              )}

              <Tr>
                <Td className="border" colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    Health Teaching/Pangunahing Paalalang Pangkalusugan
                  </Text>
                  {/* <div>
                    <Grid templateColumns="repeat(6, 1fr)" gap={4} mt={3}>
                      {dietList.map((el, key) => {
                        return (
                          <GridItem
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Text fontSize="11px">
                              <Checkbox
                                value={el.value}
                                name={el.value}
                                onChange={(e) => handleCheck(e, key)}
                                // isChecked={el.isChecked}
                              >
                                <Text fontSize="14px">{el.value}</Text>
                              </Checkbox>
                            </Text>
                          </GridItem>
                        );
                      })}

                      <GridItem
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Text fontSize="11px" mr={3}>
                          <Checkbox>
                            <Text fontSize="14px">Others</Text>
                          </Checkbox>
                        </Text>

                        <Textarea
                          placeholder="Click to enter text"
                          m={0}
                          borderRadius="0"
                          borderBottom="1px solid black"
                          rows={1}
                          width="300px"
                          fontSize="14px"
                          onChange={(e) => setOthersDiet(e.target.value)}
                        ></Textarea>
                      </GridItem>
                    </Grid>
                  </div> */}
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    Other Instructions/Karagdagang Paalala
                  </Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={3}>
                    {/* {instructions.map((el, key) => {
                      return (
                        <>
                          <GridItem>
                            <Text fontSize="11px">
                              <Checkbox onChange={(e) => handleInst(e, key)}>
                                <Text fontSize="14px">{el.value}</Text>
                              </Checkbox>
                            </Text>
                          </GridItem>
                        </>
                      );
                    })} */}
                  </Grid>

                  <Text mt={5} fontStyle="italic" fontSize="13.5px">
                    Please call the following Hotline Numbers: 09664965480 for
                    Globe and 09533296357 for TM during office hours Monday to
                    Saturday, 8am to 5pm or email us at <br />
                    records@zcmc.doh.gov.ph and we will happy to serve you.
                  </Text>
                </Td>
              </Tr>
              {!breastfeed ? " "
              :
              (
                  <>
                   <Tr>
                <Td className="border" colSpan="5">
                  <Text mt={3} fontWeight="600">
                    Obstetrics and Gynecology
                  </Text>
                </Td>
              </Tr>
                <Tr>
                  <Td colSpan="5" style={{ padding: 0 }}>
                    <Table variant="unstyled" cellSpacing={0}>
                      <Tr>
                        <Td
                          className="border"
                          style={{ borderTop: "none" }}
                          py={3}
                        >
                          <Text
                            textAlign="center"
                            fontWeight="500"
                            fontSize="12px"
                          >
                            Date
                          </Text>
                        </Td>
                        <Td
                          className="border"
                          style={{ borderTop: "none" }}
                          py={3}
                        >
                          <Text
                            textAlign="center"
                            fontWeight="500"
                            fontSize="12px"
                          >
                            From To
                          </Text>
                        </Td>
                        <Td
                          className="border"
                          style={{ borderTop: "none" }}
                          py={3}
                        >
                          <Text
                            textAlign="center"
                            fontWeight="500"
                            fontSize="12px"
                          >
                            Yes
                          </Text>
                        </Td>

                        <Td
                          className="border"
                          style={{ borderTop: "none" }}
                          py={3}
                        >
                          <Text
                            textAlign="center"
                            fontWeight="500"
                            fontSize="12px"
                          >
                            If no, reason
                          </Text>
                        </Td>

                        <Td
                          className="border"
                          style={{ borderTop: "none" }}
                          py={3}
                        >
                          <Text
                            textAlign="center"
                            fontWeight="500"
                            fontSize="12px"
                          >
                            Management
                          </Text>
                        </Td>
                        <Td
                          className="border"
                          style={{ borderTop: "none" }}
                          py={3}
                        >
                          <Text
                            textAlign="center"
                            fontWeight="500"
                            fontSize="12px"
                          >
                            Attended (Signature)
                          </Text>
                        </Td>
                      </Tr>
                      {breastfeed.map((x, i) => {
                        return (
                          <>
                            <Tr>
                              <Td className="border" p={0}>
                                <Text
                                  m={0}
                                  borderRadius="0"
                                  border="none"
                                  rows={1}
                                  fontSize="14px"
                                  textAlign="center"
                                  padding={2}
                                >{x.date}</Text>
                              </Td>

                              <Td className="border" p={0}>
                                <Text
                                  m={0}
                                  textAlign="center"
                                  borderRadius="0"
                                  border="none"
                                  rows={1}
                                  
                                  fontSize="14px"
                                >{x.fromTo}</Text>
                              </Td>
                              <Td className="border" p={0}>
                                <Text
                                  m={0}
                                  textAlign="center"
                                  borderRadius="0"
                                  border="none"
                                  rows={1}
                                  fontSize="14px"
                                 >{x.yes}</Text>
                              </Td>
                              <Td className="border" p={0}>
                                <Text
                                  m={0}
                                  borderRadius="0"
                                  border="reason"
                                  rows={1}
                                  fontSize="14px"
                                  padding={2}
                                >{x.reason}</Text>
                              </Td>
                              <Td className="border" p={0}>
                                <Text
                                  m={0}
                                  textAlign="center"
                                  borderRadius="0"
                                  border="none"
                                  rows={1}
                                  
                                  fontSize="14px"
                            
                                >{x.management}</Text>
                              </Td>
                              <Td className="border" p={0}>
                                <Text
                                  m={0}
                                  textAlign="center"
                                  borderRadius="0"
                                  border="none"
                                  rows={1}
                                  fontSize="14px"
                                >{x.attended}</Text>
                              </Td>
                            </Tr>
                          </>
                        );
                      })}
                    </Table>
                  </Td>
                </Tr>
                  </>
                )}
              <Tr>
                <Td
                  className="border"
                  colSpan="5"
                  style={{ borderTop: "none" }}
                >
                  <HStack>
                    <Text fontSize="12px" fontWeight="600">
                      I understand the above explanation given, I do hereby
                      agree that I will have follow-up checkup:
                    </Text>
                    <Box
                      style={{
                        width: "350px",
                      }}
                    >
                      <Input
                        type="text"
                        size="sm"
                        width="350px"
                        border="none "
                        textAlign="left"
                        // placeholder="Via: Click to enter text"
                        // required
                        // onChange={(e) => setFollowUp(e.target.value)}
                      />
                    </Box>
                  </HStack>

                  <Grid templateColumns="repeat(3, 1fr)" mt={8}>
                    <GridItem>
                      <Box
                        style={{
                          width: "250px",
                          margin: "0 auto",
                        }}
                      >
                        <Text
                         
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                         
                        >{followUp}</Text>
                        <hr
                          style={{
                            border: "1px solid black",
                            width: "250px",
                            margin: "0 auto",
                          }}
                        />
                        <Text textAlign="center">Date of Follow-up</Text>
                      </Box>
                    </GridItem>
                    <GridItem>
                      <VStack>
                        <Box mb={10}>
                          <Text
                            size="sm"
                            width="250px"
                            border="none "
                            textAlign="center"
                          >{time}</Text>
                          <hr
                            style={{
                              border: "1px solid black",
                              width: "250px",
                            }}
                          />
                          <Text textAlign="center">Time</Text>
                        </Box>

                        <Box>
                          <hr
                            style={{
                              border: "1px solid black",
                              width: "350px",
                            }}
                          />
                          <Text textAlign="center">
                            Signature over Printed <br />
                            Name of Patient/Watcher
                          </Text>
                        </Box>
                      </VStack>
                    </GridItem>
                    <GridItem>
                      <Box
                        style={{
                          width: "250px",
                          margin: "0 auto",
                        }}
                      >
                        <Text
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                        >{needBring}</Text>
                        <hr
                          style={{
                            border: "1px solid black",
                            width: "250px",
                            margin: "0 auto",
                          }}
                        />
                        <Text textAlign="center">Need to Bring</Text>
                      </Box>
                    </GridItem>
                  </Grid>
                </Td>
              </Tr>
              <Tr>
                <Td colSpan="5">
                  <Grid templateColumns="repeat(3, 1fr)" ml={20}>
                    <GridItem>
                      <Box>
                        <Text fontSize="14px">Prepared by:</Text>
                      </Box>
                    </GridItem>

                    <Spacer />
                    <GridItem ml={14}>
                      <Box>
                        <Text fontSize="14px">Noted by:</Text>
                      </Box>
                    </GridItem>
                  </Grid>
                </Td>
              </Tr>
              <Tr>
                <Td colSpan="5">
                  <Grid templateColumns="repeat(3, 1fr)" mt={5}>
                    <GridItem>
                      <Box ml={20}>
                        <Text
                        
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center">{nurse}</Text>
                        <hr
                          style={{
                            border: "1px solid black",
                            width: "250px",
                          }}
                        />
                        <Text fontSize="14px" ml={20}>
                          Nurse on Duty
                        </Text>
                      </Box>
                    </GridItem>
                    <Spacer />
                    <GridItem ml={20}>
                      <Box>
                        <Text
                         
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                       
                        >{resident}</Text>
                        <hr
                          style={{
                            border: "1px solid black",
                            width: "250px",
                          }}
                        />
                        <Text fontSize="14px" ml={20}>
                          Resident on Duty
                        </Text>
                      </Box>
                    </GridItem>
                  </Grid>
                </Td>
              </Tr>
            </Tbody>
          </Table>
      </TableContainer>
    </div>
  );
}

export default TagubilinForHospi;
