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
} from "@chakra-ui/react";
import "../Styles/Tagubilin.css";
import { BiMinus, BiSend } from "react-icons/bi";
import axios from "axios";
import moment from "moment";

function TagubilinForm() {
  const [patientName, setPatient] = useState("");
  const [age, setAge] = useState("");
  const [ward, setWard] = useState("");
  const [hrn, setHrn] = useState("");
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
  const [diet, setDiet] = useState([]);
  const [medications, setMedications] = useState([
    { medicine: "", dosage: "", sched: "" },
  ]);

  useEffect(() => {
    axios
      .get(
        "http://192.168.3.135/referral_local_backend/api/get_patient_info.php"
      )
      .then((response) => {
        setPatient(response.data.patientName);
        setAge(response.data.age);
        setWard(response.data.ward);
        setHrn(response.data.hrn);
        setAdmissionDate(
          moment(response.data.admissionDate.date).format("LLL")
        );
        setDischDiag(
          response.data.dischdiagnosis === ""
            ? response.data.finaldiagnosis
            : response.data.dischdiagnosis
        );
        setDischDate(
          response.data.dischdate === null
            ? ""
            : moment(response.data.dischdate.date).format("ll")
        );
      });
  });

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...medications];
    list[index][name] = value;
    setMedications(list);
  };

  //handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...medications];
    list.splice(index, 1);
    setMedications(list);
  };

  // handle click event of the Add button
  const handleAddClick = (e, index) => {
    setMedications([...medications, { medicine: "", dosage: "", sched: "" }]);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log({
      patientName: patientName,
      age: age,
      ward: ward,
      hrn: hrn,
      admissionDate: admissionDate,
      dischDiag: dischDiag,
      dischDate: dischDate,
      laboratory: laboratory,
      xray: xray,
      ctScan: ctScan,
      mri: mri,
      others: others,
      nurse: nurse,
      resident: resident,
      followUp: followUp,
      needBring: needBring,
      time: time,
      healthOthers: healthOthers,
      medications: medications,
      diet,
    });
  };

  const dietList = [
    {
      value: "Low Salt Diet",
      isChecked: false,
    },
    {
      value: "Low Salt",
      isChecked: false,
    },
    {
      value: "Diabetic Diet",
      isChecked: false,
    },
    {
      value: "Low Protein Diet",
      isChecked: false,
    },
  ];

  const handleCheck = (el, key) => {
    dietList.forEach((key) => {
      if (key === key) {
        el.isChecked = true;
      }
    });
  };

  return (
    <div
      style={{
        width: "1200px",
        margin: "0 auto",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <TableContainer>
        <form onSubmit={submit}>
          <Table variant="unstyled" cellSpacing={0}>
            <Tbody>
              <Tr>
                <Td className="border" width="10%">
                  <Text fontSize="12px" fontWeight="600">
                    Name/Pangalan:
                  </Text>
                </Td>
                <Td className="border" py={2} width="33%">
                  <Text fontSize="14px">{patientName}</Text>
                </Td>
                <Td className="border" py={2} width="16%">
                  <Text fontSize="12px" fontWeight="600">
                    Age/Edad:{" "}
                  </Text>
                  <Text fontSize="14px">{age}</Text>
                </Td>
                <Td className="border" py={2} width="15%">
                  <Text fontSize="12px" fontWeight="600">
                    Ward:
                  </Text>
                  <Text fontSize="14px">{ward}</Text>
                </Td>
                <Td className="border" py={2}>
                  <Text fontSize="12px" fontWeight="600">
                    Hospital Record No.:
                  </Text>
                  <Text fontSize="14px">{hrn}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" py={2} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Admission Date:
                  </Text>
                  <Text fontSize="14px">{admissionDate}</Text>
                </Td>

                <Td className="border" py={2} colSpan="3">
                  <Text fontSize="12px" fontWeight="600">
                    Discharge Date:
                  </Text>
                  <Text fontSize="14px">
                    {dischDate === "" ? (
                      <Input
                        type="date"
                        size="sm"
                        width="250px"
                        border="none "
                        textAlign="center"
                        onChange={(e) => setDischDate(e.target.value)}
                      />
                    ) : (
                      dischDate
                    )}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" py={2} colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    Diagnosis:
                  </Text>
                  <Textarea
                    defaultValue={dischDiag}
                    mt={1}
                    borderRadius="0"
                    border="none"
                    rows={1}
                    fontSize="14px"
                    onChange={(e) => setDischDiag(e.target.value)}
                  ></Textarea>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" py={2} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Operation/Operasyon:
                  </Text>
                </Td>
                <Td className="border" py={2} colSpan="2">
                  <Text fontSize="12px" fontWeight="600">
                    Surgeon:
                  </Text>
                </Td>
                <Td className="border" py={2} colSpan="1">
                  <Text fontSize="12px" fontWeight="600">
                    Petsa ng Operasyon:
                  </Text>
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
                <Td className="border" colSpan="1" py={2}>
                  <Text fontSize="12px" fontWeight="600">
                    Laboratory
                  </Text>
                </Td>
                <Td className="border" colSpan="4" p={0}>
                  <Textarea
                    placeholder="Click to enter text"
                    m={0}
                    borderRadius="0"
                    border="none"
                    rows={2}
                    fontSize="14px"
                    onChange={(e) => setLaboratory(e.target.value)}
                  ></Textarea>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="1" py={0}>
                  <Text fontSize="12px" fontWeight="600">
                    X-Ray
                  </Text>
                </Td>
                <Td className="border" colSpan="4" p={0}>
                  <Textarea
                    placeholder="Click to enter text"
                    m={0}
                    borderRadius="0"
                    border="none"
                    rows={2}
                    fontSize="14px"
                    onChange={(e) => setXray(e.target.value)}
                  ></Textarea>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="1" py={0}>
                  <Text fontSize="12px" fontWeight="600">
                    CT Scan
                  </Text>
                </Td>
                <Td className="border" colSpan="4" p={0}>
                  <Textarea
                    placeholder="Click to enter text"
                    m={0}
                    borderRadius="0"
                    border="none"
                    rows={2}
                    onChange={(e) => setCTScan(e.target.value)}
                    fontSize="14px"
                  ></Textarea>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="1" py={2}>
                  <Text fontSize="12px" fontWeight="600">
                    MRI
                  </Text>
                </Td>
                <Td className="border" colSpan="4" p={0}>
                  <Textarea
                    placeholder="Click to enter text"
                    m={0}
                    borderRadius="0"
                    border="none"
                    rows={2}
                    fontSize="14px"
                    onChange={(e) => setMRI(e.target.value)}
                  ></Textarea>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="1" py={2}>
                  <Text fontSize="12px" fontWeight="600">
                    Others
                  </Text>
                </Td>
                <Td className="border" colSpan="4" p={0}>
                  <Textarea
                    placeholder="Click to enter text"
                    m={0}
                    borderRadius="0"
                    border="none"
                    rows={2}
                    fontSize="14px"
                    onChange={(e) => setOthers(e.target.value)}
                  ></Textarea>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="5" py={1}>
                  <Text fontSize="12px" fontWeight="600">
                    <Checkbox mr={2} mt={0.5}></Checkbox>Home Medications/Gamot
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="2" py={1}>
                  <Text textAlign="center" fontSize="12px" fontWeight="600">
                    Pangalan ng Gamot
                  </Text>
                </Td>
                <Td className="border" colSpan="1" py={1}>
                  <Text textAlign="center" fontSize="12px" fontWeight="600">
                    Dosage
                  </Text>
                </Td>
                <Td className="border" colSpan="2" py={1}>
                  <Text textAlign="center" fontSize="12px" fontWeight="600">
                    Oras ng Pag-iinom
                  </Text>
                </Td>
              </Tr>
              {medications.map((x, i) => {
                return (
                  <>
                    <Tr>
                      <Td className="border" colSpan="2" p={0}>
                        <Textarea
                          m={0}
                          borderRadius="0"
                          border="none"
                          rows={1}
                          value={x.medicine}
                          fontSize="14px"
                          name="medicine"
                          onChange={(e) => handleInputChange(e, i)}
                        ></Textarea>
                      </Td>
                      <Td className="border" colSpan="1" p={0}>
                        <Textarea
                          m={0}
                          textAlign="center"
                          borderRadius="0"
                          border="none"
                          rows={1}
                          value={x.dosage}
                          fontSize="14px"
                          name="dosage"
                          onChange={(e) => handleInputChange(e, i)}
                        ></Textarea>
                      </Td>
                      <Td className="border" p={0} colSpan="2">
                        <Textarea
                          m={0}
                          textAlign="center"
                          borderRadius="0"
                          border="none"
                          rows={1}
                          value={x.sched}
                          fontSize="14px"
                          name="sched"
                          onChange={(e) => handleInputChange(e, i)}
                        ></Textarea>
                      </Td>

                      {medications.length !== 1 && (
                        <button
                          onClick={() => handleRemoveClick(i)}
                          style={{
                            margin: 0,
                            color: "red",
                            marginTop: "10px",
                            fontSize: "18px",
                          }}
                        >
                          <BiMinus />
                        </button>
                      )}
                    </Tr>
                  </>
                );
              })}

              <Button
                style={{ marginTop: "5px", marginBottom: "5px" }}
                colorScheme="blue"
                size="sm"
                onClick={handleAddClick}
              >
                Add medication
              </Button>

              <Tr>
                <Td className="border" colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    Health Teaching/Pangunahing Paalalang Pangkalusugan
                  </Text>
                  <div>
                    <Grid templateColumns="repeat(6, 1fr)" gap={4} mt={3}>
                      {dietList.map((el, key) => {
                        return (
                          <GridItem
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Text fontSize="11px">
                              <Checkbox
                                value={el.value}
                                onChange={() => handleCheck(el, key)}
                                // isChecked={el.isChecked}
                              >
                                <Text fontSize="14px">{el.value}</Text>
                              </Checkbox>
                            </Text>
                          </GridItem>
                        );
                      })}

                      {/* <Text mt={2}>
                          <Checkbox value="Low Salt Diet">
                            <Text fontSize="14px">Low Salt Diet</Text>
                          </Checkbox>
                        </Text> */}

                      {/* <GridItem>
                        <Text fontSize="11px">
                          <Checkbox
                            value="Low Salt Diet"
                            onChange={(e) => console.log(e.target.value)}
                          >
                            <Text fontSize="14px">Low Salt Diet</Text>
                          </Checkbox>
                        </Text>
                        <Text mt={2}>
                          <Checkbox value="Low Salt Diet">
                            <Text fontSize="14px">Low Salt Diet</Text>
                          </Checkbox>
                        </Text>
                      </GridItem>

                      <GridItem>
                        <Text fontSize="11px">
                          <Checkbox value="Diabetes Diet">
                            <Text fontSize="14px">Diabetes Diet</Text>
                          </Checkbox>
                        </Text>
                        <Text mt={2}>
                          <Checkbox value="Low Protein Diet">
                            <Text fontSize="14px">Low Protein Diet</Text>
                          </Checkbox>
                        </Text>
                      </GridItem> */}

                      <GridItem
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Text fontSize="11px" mr={3}>
                          <Checkbox value="Others">
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
                          onChange={(e) => setHealthOthers(e.target.value)}
                        ></Textarea>
                      </GridItem>
                    </Grid>
                  </div>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    Other Instructions/Karagdagang Paalala
                  </Text>
                  <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={3}>
                    <GridItem>
                      <Text fontSize="11px">
                        <Checkbox>
                          <Text fontSize="14px">Repeat Analysis</Text>
                        </Checkbox>
                      </Text>
                      <Text mt={5}>
                        <Checkbox>
                          <Text fontSize="14px">Others: Request for</Text>
                        </Checkbox>
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text fontSize="11px">
                        <Checkbox>
                          <Text fontSize="14px">Repeat Creatinine</Text>
                        </Checkbox>
                      </Text>
                      <Text mt={5}>
                        <Checkbox>
                          <Text fontSize="14px">Medical Certificate</Text>
                        </Checkbox>
                      </Text>
                      <Text mt={2}>
                        <Checkbox>
                          <Text fontSize="14px">
                            Photocopy of Health Records
                          </Text>
                        </Checkbox>
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Checkbox>
                        <Text fontSize="14px">Repeat FBS</Text>
                      </Checkbox>
                    </GridItem>
                    <GridItem>
                      <Text fontSize="11px">
                        <Checkbox>
                          <Text fontSize="14px">Repeat CBC</Text>
                        </Checkbox>
                      </Text>
                    </GridItem>
                  </Grid>
                  <Text mt={5} fontStyle="italic" fontSize="13.5px">
                    Please call the following Hotline Numbers: 09664965480 for
                    Globe and 09533296357 for TM during office hours Monday to
                    Saturday, 8am to 5pm or email us at <br />
                    records@zcmc.doh.gov.ph and we will happy to serve you.
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td className="border" colSpan="5">
                  <Text fontSize="12px" fontWeight="600">
                    I understand the above explanation given, I do hereby agree
                    that I will have follow-up checkup:
                  </Text>
                  <Grid templateColumns="repeat(3, 1fr)" mt={8}>
                    <GridItem>
                      <Box
                        style={{
                          width: "250px",
                          margin: "0 auto",
                        }}
                      >
                        {/* <Input
                        type="date"
                        size="sm"
                        width="150px"
                        border="none "
                        style={{ marginLeft: "50px" }}
                      /> */}
                        <Input
                          type="date"
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                          required
                          onChange={(e) => setFollowUp(e.target.value)}
                        />
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
                          <Input
                            type="time"
                            size="sm"
                            width="250px"
                            border="none "
                            textAlign="center"
                            required
                            onChange={(e) => setTime(e.target.value)}
                          />
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
                        <Input
                          type="text"
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                          placeholder="Click to enter text"
                          onChange={(e) => setNeedBring(e.target.value)}
                          required
                        />
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
                        <Input
                          placeholder="Click to enter text"
                          type="text"
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                          required
                          onChange={(e) => setNurse(e.target.value)}
                        />
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
                        <Input
                          placeholder="Click to enter text"
                          type="text"
                          size="sm"
                          width="250px"
                          border="none "
                          textAlign="center"
                          onChange={(e) => setResident(e.target.value)}
                          required
                        />
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
          <Box style={{ float: "right", margin: "30px 0px" }}>
            <Button
              onClick={submit}
              colorScheme="red"
              variant="outline"
              width="250px"
              mr={3}
            >
              Clear
            </Button>
            <Button
              colorScheme="blue"
              width="250px"
              rightIcon={<BiSend />}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </TableContainer>
    </div>
  );
}

export default TagubilinForm;
