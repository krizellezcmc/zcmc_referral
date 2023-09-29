import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import OpcenReferral from "../Components/OpcenReferral";
import {
  Badge,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Center,
  Flex,
} from "@chakra-ui/react";
import Spinner from "../Components/Spinner";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Select } from "chakra-react-select";
import useAuth from "../Hooks/useAuth";

import Sidebar from "../Components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack, BiDownload } from "react-icons/bi";
import { GoArrowUp, GoCheck } from "react-icons/go";
import Swal from "sweetalert2";
import moment from "moment";
import ReferralDownload from "../Components/ReferralDownload";

import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
function OpcenHome2(props) {
  const [patientStat, setPatientStat] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isDeclinedOpen,
    onOpen: onDeclinedOpen,
    onClose: onDeclinedClose,
  } = useDisclosure();

  const [reason, setReason] = useState("");
  const [selectRef, setSelectedRef] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [arrivalTime, setArrivalTime] = useState("");

  const [opcenUser, setOpcenUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [extendedName, setExtendedName] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");

  const [civilStatus, setCivilStatus] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [philhealth, setPhilhealth] = useState("");
  const [address, setAddress] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");
  const [contact, setContact] = useState("");
  const [userContact, setUserContact] = useState("");
  const [dateAdmitted, setDateAdmitted] = useState("");
  const [referralType, setReferralType] = useState("");
  const [disposition, setDisposition] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respiRate, setRespiRate] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [glasgow, setGlasgow] = useState("");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [endorsement, setEndorsement] = useState("");
  const [refReason, setRefReason] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [lmp, setLmp] = useState("");
  const [aog, setAog] = useState("");
  const [edc, setEdc] = useState("");
  const [fht, setFht] = useState("");
  const [fh, setFh] = useState("");
  const [apgar, setApgar] = useState("");
  const [bowList, setBowList] = useState([]);
  const [gp, setGp] = useState(["", "", ""]);
  const [getGp, setGetGP] = useState(["", "", ""]);
  const [ie, setIe] = useState([
    {
      cm: "",
      station: "",
      effacement: "",
      presentation: "",
    },
  ]);
  const [hpi, setHPI] = useState("");
  const [ppf, setPPF] = useState("");
  const [ivf, setIVF] = useState("");
  const [meds, setMeds] = useState("");
  const [lab, setLab] = useState("");

  const [status, setCovidStatus] = useState("");
  const [swab_date, setSwabDate] = useState("");
  const [result_date, setResultDate] = useState("");

  const [timestamp, setTimestamp] = useState("");

  const { user } = useAuth();
  const { id } = useParams();
  let toast = useToast();

  const navigate = useNavigate();

  function homeOpcen() {
    navigate("/opcen");
  }
  const handleAcceptPatient = async (patId) => {
    const result = await Swal.fire({
      text: "Are you sure you want to accept this patient?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    });
    if (result.isConfirmed) {
      try {
        const response = await api.post("/accept_referred_patient.php", {
          patId: patId,
        });

        if (response.data.status === 1) {
          Swal.fire("Accepted!", "Patient referral accepted.", "success");
        } else {
          Swal.fire("Error!", "Something went wrong. Try again!", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong. Try again!", "error");
      }
    }
  };

  const submit = async () => {
    if (selectRef === "") {
      toast({
        position: "top",
        title: "Kindly select hospital to proceed.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      let decline = await api.post("/transfer.php", {
        patientId: id,
        referredTo: selectRef,
        reason: reason,
      });
      if (decline.data.status === 1) {
        toast({
          position: "top",
          title: decline.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setReason("");
        onDeclinedClose();
      }
    }
  };

  const getDetails = async () => {
    let details = await api.get("/get_pending_ref.php", {
      params: { id: id },
    });
    if (details) {
      setPatientStat(details.data.status);
      setArrivalTime(details.data.arrival_time);
      setUserName(details.data.username);
      setReferringFacility(details.data.refFacility);
      setLastName(details.data.lastname);
      setFirstName(details.data.firstname);
      setMiddleName(details.data.middleName);
      setExtendedName(details.data.extended);
      setSex(details.data.sex);
      setAge(details.data.age);
      setBirthdate(details.data.birthdate);
      setCivilStatus(details.data.civilStatus);
      setNationality(details.data.nationality);
      setReligion(details.data.religion);
      setOccupation(details.data.occupation);
      setPhilhealth(details.data.philhealth);
      setAddress(details.data.address);
      setNextOfKin(details.data.nextOfkin);
      setContact(details.data.contactWatcher);
      setDateAdmitted(details.data.dateAdmitted);
      setReferralType(details.data.refType);
      setDisposition(details.data.disposition);
      setSpecialization(details.data.specialization);
      setTemperature(details.data.latestTemp);
      setBloodPressure(details.data.latestBp);
      setRespiRate(details.data.latestRespi);
      setPulseRate(details.data.latestPulse);
      setOxygen(details.data.latestOxygen);
      setGlasgow(details.data.latestGlasgow);
      setChiefComplaints(details.data.chiefComplaints);
      setDiagnosis(details.data.diagnosis);
      setEndorsement(details.data.endorsement);
      setUserContact(details.data.userContact);
      setRefReason(details.data.reason);
      setGetGP(details.data.GP);
      setLmp(details.data.LMP);
      setAog(details.data.AOG);
      setEdc(details.data.EDC);
      setFht(details.data.FHT);
      setFh(details.data.FH);
      setApgar(details.data.APGAR);
      setIe(details.data.IE);
      setBowList(details.data.bow);
      setHPI(details.data.HPI);
      setPPF(details.data.PPF);
      setIVF(details.data.IVF);
      setMeds(details.data.MEDS);
      setLab(details.data.LAB);
      setTimestamp(details.data.timestamp);
    }

    let response = await api.get("/get_covid_status.php", {
      params: { id: id },
    });
    if (response) {
      setCovidStatus(response.data.result);
      setSwabDate(response.data.swab_date);
      setResultDate(response.data.result_date);
    }
  };

  const comments = async () => {
    // setIsLoading(true);
    let comment = await api.get(`/get_comment.php/${id}`);
    if (comment) {
      setRemarks(comment.data);
      setIsLoading(false);
    }
  };

  const cancelReferral = async (id) => {
    const result = await Swal.fire({
      text: "Please indicate reason for cancelling the referral",
      icon: "warning",
      input: "textarea",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
      preConfirm: (data) => {
        if (!data) {
          Swal.showValidationMessage(`Request failed`);
        }
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await api.post("/cancel_referred_patient.php", {
          id: id,
          reason: result.value,
        });

        if (res.data.status === 1) {
          Swal.fire(
            "Cancelled!",
            "You successfully cancelled the referral.",
            "success"
          ).then(() => {
            navigate("/opcen");
          });
        } else {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  useEffect(() => {
    const getHospitals = async () => {
      let response = await api.get("/get_local_hospitals.php");
      setHospitals(response.data);
    };
    comments();
    getHospitals();
    getDetails();
  }, [id, remarks]);

  const exportPDF = () => {
    let element = (
      <div>
        <ReferralDownload
          username={userName}
          refFacility={referringFacility}
          lastname={lastname}
          firstName={firstname}
          middleName={middlename}
          extended={extendedName}
          sex={sex}
          age={age}
          address={address}
          contact={contact}
          referralType={referralType}
          disposition={disposition}
          specialization={specialization}
          chiefComplaints={chiefComplaints}
          diagnosis={diagnosis}
          temp={temperature}
          bp={bloodPressure}
          pr={pulseRate}
          rr={respiRate}
          oxygen={oxygen}
          gcs={glasgow}
          rod={userContact}
          reason={refReason}
          gp={getGp}
          lmp={lmp}
          aog={aog}
          edc={edc}
          fht={fht}
          fh={fh}
          ie={ie}
          bow={bowList}
          HPI={hpi}
          PPF={ppf}
          ivf={ivf}
          meds={meds}
          lab={lab}
          timestamp={timestamp}
          status={status}
          swab={swab_date}
          result={result_date}
        />
      </div>
    );

    // let content = element;

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [215.9, 330.2],
    });

    doc.page = 1;

    function footer() {
      doc.setFont("Times-Roman");
      doc.setFontSize(8);
      doc.text(
        25,
        327,
        "ZCMC-F-OCMPS-05" +
          "                                " +
          "Rev. 1" +
          "                                              " +
          "       Effectivity Date: April 1, 2022" +
          "                       " +
          "  Page" +
          " " +
          doc.page +
          " " +
          " of " +
          doc.page++
      );
      doc.page++;
    }

    doc.html(ReactDOMServer.renderToString(element), {
      width: 215.9,
      height: 330.2,
      windowWidth: 900,
      windowHeight: 1800,
      margin: [5, 10, 14, 8],

      callback: function (doc) {
        footer();
        window.open(doc.output("bloburl"));
      },
    });
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* </Box> */}
          <div
            style={{ backgroundColor: "#F0F8F8", flex: 1 }}
            className="content-wrapper"
          >
            {/* {isLoading ? (
              <Container>
                <Loading />
              </Container>
            ) : ( */}
            <Flex px={40} pt={10} justifyContent="space-between">
              <Button
                onClick={homeOpcen}
                variant="outline"
                colorScheme="green"
                leftIcon={<BiArrowBack />}
              >
                Back
              </Button>
              {/* <Box float="right" p={10}> */}

              <Box>
                {patientStat === "pending" ? (
                  <>
                    <Button
                      colorScheme="green"
                      mr={3}
                      leftIcon={<GoCheck fontSize="20px" />}
                      onClick={() => {
                        handleAcceptPatient(id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      colorScheme="red"
                      leftIcon={<GoArrowUp fontSize="20px" />}
                      onClick={onDeclinedOpen}
                    >
                      Transfer
                    </Button>
                  </>
                ) : patientStat === "arrived" ? (
                  <>
                    <HStack>
                      <Button
                        colorScheme="green"
                        variant="ghost"
                        rightIcon={<BiDownload />}
                        onClick={exportPDF}
                      >
                        Download
                      </Button>
                      <Box
                        width="100%"
                        padding={3}
                        borderRadius="lg"
                        border="1px"
                        borderColor="green.500"
                      >
                        <HStack>
                          <Text fontSize="13px">Status:</Text>
                          <Text color="green" fontSize="13px" fontWeight={500}>
                            ARRIVED
                          </Text>
                        </HStack>
                        <HStack>
                          <Text fontSize="13px">Date and Time:</Text>
                          <Text fontSize="13px" color="green" fontWeight={400}>
                            {moment(arrivalTime).format("LLL")}
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                  </>
                ) : patientStat === "accepted" ? (
                  <Button
                    // size="sm"
                    colorScheme="red"
                    variant="solid"
                    onClick={() => cancelReferral(id)}
                  >
                    Cancel Referral
                  </Button>
                ) : (
                  ""
                )}
              </Box>
            </Flex>
            <Box py={5} px={40}>
              <Tabs variant="enclosed">
                <TabList mb="1em">
                  <Tab>
                    <Text>Patient Referral</Text>
                  </Tab>
                  <Tab>
                    <Text>
                      Remarks
                      <Badge ml="1.5" colorScheme="blue">
                        {remarks.length}
                      </Badge>
                    </Text>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Box>
                      <OpcenReferral patientId={id} status={patientStat} />
                      {/* <ReferralDownload patientId={id} /> */}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box px={40}>
                      {isLoading ? (
                        <Center>
                          <Spinner />
                        </Center>
                      ) : (
                        <>
                          <AddComment patientId={id} user={user?.userId} />

                          {remarks
                            ? remarks.map((el, key) => {
                                return (
                                  <>
                                    {el.role === "opcen" ? (
                                      <Comment
                                        remark={el.remark}
                                        date={el.remark_tstamp}
                                        user={el.firstName + " " + el.lastName}
                                        dept={
                                          "Zamboanga City Medical Center (OPCEN)"
                                        }
                                        file={el.path}
                                        filename={el.fileName}
                                      />
                                    ) : (
                                      <Comment
                                        remark={el.remark}
                                        date={el.remark_tstamp}
                                        user={el.firstName + " " + el.lastName}
                                        dept={el.name}
                                        file={el.path}
                                        filename={el.fileName}
                                      />
                                    )}
                                  </>
                                );
                              })
                            : ""}
                        </>
                      )}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            <Modal
              closeOnOverlayClick={false}
              isOpen={isDeclinedOpen}
              onClose={onDeclinedClose}
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
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </FormControl>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Refer to</FormLabel>
                    <Select
                      options={hospitals}
                      placeholder="Select Hospital"
                      variant="outline"
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
                    onClick={onDeclinedClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpcenHome2;
