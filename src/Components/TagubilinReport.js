import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import "../Styles/Report.css";
import "../Styles/DisplayReport.css";
import "../Styles/Prescription.css";
import {
  Button,
  Image,
  Box,
  Container,
  Text,
  Heading,
  TableContainer,
  Table,
  Tr,
  Td,
  VStack,
  Checkbox,
  Flex,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Prescription from "./Prescription";
import { useParams } from "react-router-dom";
import moment from "moment";
import api from "../API/Api";
import { BiArrowBack } from "react-icons/bi";
import TagubilinDownload from "./TagubilinDownload";
import zcmcLogo from "../Assets/zcmc-logo.png";
import dohLogo from "../Assets/doh-logo.png";

function TagubilinReport() {
  const [refName, setRefName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [ward, setWard] = useState("");
  const [hrn, setHrn] = useState("");
  const [address, setAddress] = useState("");
  const [admit, setAdmit] = useState("");
  const [discharge, setDischarge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [lab, setLab] = useState("");
  const [xray, setXray] = useState("");
  const [ctscan, setCTScan] = useState("");
  const [mri, setMRI] = useState("");
  const [others, setOthers] = useState("");
  const [homemed, setHomeMed] = useState("");
<<<<<<< Updated upstream
  const [healthOthers, setHealthOthers] = useState("");
=======
>>>>>>> Stashed changes
  const [med, setMed] = useState([]);
  const [followup, setFollowUp] = useState("");
  const [time, setTime] = useState("");
  const [need, setNeedBring] = useState("");
  const [nurse, setNurse] = useState("");
  const [resident, setResident] = useState("");
  const [dietList, setDietList] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [breastfeed, setBreastfeed] = useState([]);
  const [obId, setObId] = useState("");
  const [medId, setMedId] = useState("");

  let navigate = useNavigate();

<<<<<<< Updated upstream
  const { id } = useParams("id");

  const fetchData = async () => {
    let response = await api.get("/get_nursetagu.php", {
      params: { id: id },
    });

    setRefName(response.data[0].patientName);
    setAge(response.data[0].age);
    setSex(response.data[0].sex);
    setAddress(response.data[0].address);
    setWard(response.data[0].ward);
    setHrn(response.data[0].hrn);
    setAdmit(moment(response.data[0].admissionDate).format("LLL"));
    setDiagnosis(response.data[0].disch_diagnosis);
    setDischarge(
      response.data.dischdate === null
        ? ""
        : moment(response.data[0].dischDate).format("LLL")
    );
    setLab(response.data[0].laboratory);
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
    setDietList(JSON.parse(response.data[0].health));
    setHealthOthers(response.data[0].healthOthers);
    setInstructions(JSON.parse(response.data[0].instructions));

    let meds = await api.get("/get_medhospi.php", {
      params: { mid: medId },
    });
    setMed(meds.data);

    let bfeed = await api.get("/get_obhospi.php", {
      params: { oid: obId },
    });
    setBreastfeed(bfeed.data);
  };
  useEffect(() => {
    fetchData();
  }, [medId, obId]);
=======
  useEffect(() => {
    let refpatient = JSON.parse(localStorage.getItem("refpatient"));
    setRefName(refpatient.patientName);
    setAge(refpatient.age);
    setSex(refpatient.sex);
    setWard(refpatient.ward);
    setHrn(refpatient.hrn);
    setAddress(refpatient.address);
    setAdmit(refpatient.admissionDate);
    setDischarge(refpatient.dischDate);
    setDiagnosis(refpatient.dischDiag);
    setLab(refpatient.laboratory);
    setXray(refpatient.xray);
    setCTScan(refpatient.ctScan);
    setMRI(refpatient.mri);
    setOthers(refpatient.others);
    setHomeMed(refpatient.homemed);
    setMed(refpatient.medications);
    setFollowUp(refpatient.followUp);
    setTime(refpatient.time);
    setNeedBring(refpatient.needBring);
    setNurse(refpatient.nurse);
    setResident(refpatient.resident);
    setDietList(refpatient.diet);
    setInstructions(refpatient.instructions);
  }, []);
>>>>>>> Stashed changes

  // let followTime = moment(time, [moment.ISO_8601, "HH:mm"]);

  const exportPDF = () => {
    let element = (
      <div>
<<<<<<< Updated upstream
        <TagubilinDownload
          zcmcLogo={zcmcLogo}
          dohLogo={dohLogo}
          refName={refName}
          age={age}
          sex={sex}
          ward={ward}
          hrn={hrn}
          address={address}
          admit={admit}
          discharge={discharge}
          diagnosis={diagnosis}
          lab={lab}
          xray={xray}
          ctscan={ctscan}
          mri={mri}
          others={others}
          medId={medId}
          med={med}
          dietList={dietList}
          healthOthers={healthOthers}
          instructions={instructions}
          breastfeed={breastfeed}
          followup={followup}
          time={time}
          need={need}
          nurse={nurse}
          resident={resident}
        />
=======
        <div className="rheader">
          <img src={zcmcLogo} className="rlogo1" alt="ZCMC Logo" />
          <div className="rhead-data">
            <p>Republic of the Philippines</p>
            <p>Department of Health</p>
            <p>ZAMBOANGA CITY MEDICAL CENTER</p>
            <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
            <h2>ALAGANG PINOY TAGUBILIN</h2>
          </div>
          <img src={dohLogo} className="rlogo2" alt="DOH Logo" />
        </div>

        <table className="rtable">
          <tr>
            <td className="cell" style={{ width: "23%" }}>
              Name/Pangalan:<p>{refName}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0", width: "10%" }}>
              Age/Edad:<p>{age}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0", width: "15%" }}>
              Sex: <p>{sex}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0", width: "10%" }}>
              Ward:<p>{ward}</p>
            </td>
            <td className="cell" style={{ borderLeft: "0", width: "15%" }}>
              Hospital Record No.: <p>{hrn}</p>
            </td>
          </tr>
          <tr>
            <td className="cell">
              Address: <p>{address}</p>
            </td>
            <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
              Admission/Petsa ng Pagpasok: <p>{admit}</p>
            </td>
            <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
              Discharge/Petsa ng Paglabas: <p>{discharge}</p>
            </td>
          </tr>
          <tr>
            <td className="cell" colSpan="5">
              Diagnosis/Sakit:
              <p style={{ display: "inline-block" }}>{diagnosis}</p>
            </td>
          </tr>
          <tr>
            <td className="cell">Operation/Operasyon:</td>
            <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
              Surgeon:
            </td>
            <td className="cell" colSpan="2" style={{ borderLeft: "0" }}>
              Petsa ng Operasyon:
            </td>
          </tr>
          <tr>
            <td className="major-label" colSpan="5">
              Major diagnostic Results/Panguanhing Resulta ng Pasusuri
            </td>
          </tr>
          <tr>
            <td className="diagnosis" style={{ borderLeft: "0" }}>
              Laboratory
              <div style={{ width: "100%", height: "80px" }}>
                <div className="image">
                  <img
                    src={cbc}
                    style={{ width: "200px", height: "80px" }}
                    alt="cbc"
                  />
                </div>
              </div>
            </td>

            <td className="diagnosis" style={{ borderLeft: "0" }}>
              X-ray
              <div style={{ width: "100%", height: "80px" }}>
                <p className="diagnosis-con">{xray}</p>
              </div>
            </td>

            <td className="diagnosis" style={{ borderLeft: "0" }}>
              CT Scan
              <div style={{ width: "100%", height: "80px" }}>
                <p className="diagnosis-con">{ctscan}</p>
              </div>
            </td>

            <td className="diagnosis" style={{ borderLeft: "0" }}>
              MRI
              <div style={{ width: "100%", height: "80px" }}>
                <p className="diagnosis-con">{mri}</p>
              </div>
            </td>
            <td className="diagnosis" style={{ borderLeft: "0" }}>
              Others
              <div style={{ width: "100%", height: "80px" }}>
                <p className="diagnosis-con">{others}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className="med-header" colSpan="5">
              {!homemed ? (
                <div className="med-box">
                  <div className="med-data">
                    <div className="checkbox"></div>
                  </div>
                  <div className="med-label">
                    <p>Home Medication/Gamot</p>
                  </div>
                </div>
              ) : (
                <div className="med-box">
                  <div className="med-data">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      style={{ marginLeft: "5px" }}
                    />
                  </div>
                  <div className="med-label">
                    <p>Home Medication/Gamot</p>
                  </div>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className="med" colSpan="1" style={{ borderRight: "0" }}>
              Pangalan ng Gamot
            </td>
            <td className="med" colSpan="2" style={{ borderRight: "0" }}>
              Dosage
            </td>
            <td className="med" colSpan="2">
              Oras ng Pag-inom
            </td>
          </tr>
          {med.map((m, k) => {
            return (
              <tr>
                <td
                  className="med-cell"
                  colSpan="1"
                  style={{ borderRight: "0" }}
                >
                  {m.medicine}
                </td>
                <td
                  className="med-cell"
                  colSpan="2"
                  style={{ borderRight: "0" }}
                >
                  {m.dosage}
                </td>
                <td className="med-cell" colSpan="2">
                  {m.sched}
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="diagnosis" colSpan="5">
              <b className="rb">
                Health Teaching/Pangunahing Paalalang Pangkalusugan
              </b>
              <div style={{ display: "flex" }}>
                {dietList
                  .filter((el) => el.isChecked === true)
                  .map((i, k) => {
                    return (
                      <>
                        <div className="med-box">
                          <div className="med-data">
                            <input type="checkbox" checked={i.isChecked} />
                          </div>
                          <div className="med-label">
                            <p>{i.value}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </td>
          </tr>
          <tr>
            <td
              className="diagnosis"
              colSpan="5"
              style={{ borderBottom: "1px solid black" }}
            >
              <b className="rb">Other Instructions/Karagdagang Paalala</b>
              <div style={{ display: "flex" }}>
                {instructions
                  .filter((el) => el.isChecked === true)
                  .map((i, k) => {
                    return (
                      <>
                        <div className="med-box">
                          <div className="med-data">
                            <input type="checkbox" checked={i.isChecked} />
                          </div>
                          <div className="med-label">
                            <p>{i.value}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              <p id="para">
                Please call the following Hotline Numbers: 09664965480 for Globe
                and 09533296457 for TM during office hours Monday to Saturday,
                8am to 5pm or email us at
                <p id="email"> records@zcmc.doh.gov.ph</p> and we will happy to
                serve you.
              </p>
            </td>
          </tr>
          <tr className="border1">
            <td colSpan="5">
              <b className="rb">
                I understand the above explanation given, I do hereby agree that
                I will have follow-up check-up:
              </b>
            </td>
          </tr>
          <tr className="border2">
            <td>
              <p>{followup}</p>
              <p className="hr-date">Date of Follow-Up</p>
            </td>
            <td colSpan="2">
              <p>{time}</p>
              <p className="hr-followup">Time</p>
            </td>
            <td colSpan="2">
              <p>{need}</p>
              <p className="hr-followup">Need to Bring</p>
            </td>
          </tr>

          <tr className="borders">
            <td colSpan="5">
              <div style={{ textAlign: "center" }}>
                <p className="hr-watcher">
                  Signature over Printed Name of Patient/Watcher
                </p>
              </div>
            </td>
          </tr>
        </table>
        <div className="float-container">
          <div className="float-child1">
            <label>Prepared by:</label>
            <p className="rname">{nurse} RN</p>
            <p className="hr-sign">Nurse on Duty</p>
          </div>
          <div className="float-child2">
            <label>Noted by:</label>
            <p className="rname">{resident} MD</p>
            <p className="hr-sign">Resident-in-Charge</p>
          </div>
        </div>
>>>>>>> Stashed changes
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
      windowWidth: 800,
      windowHeight: 1600,
      margin: [5, 10, 14, 10],

      callback: function (doc) {
        footer();
        window.open(doc.output("bloburl"));
      },
    });
  };

  const back = () => {
    localStorage.removeItem("refpatient");
    navigate("/tagubilin");
  };
  return (
    <div>
      <div style={{ float: "left" }}>
        <Button
          variant="solid"
          colorScheme="green"
          size="md"
          leftIcon={<BiArrowBack />}
          onClick={() => back()}
        >
          Back
        </Button>
        <br></br>
        <Button
          onClick={exportPDF}
          variant="outline"
          colorScheme="red"
          size="sm"
          mt={10}
        >
          Generate Tagubilin Report
        </Button>
<<<<<<< Updated upstream
        <Container
          maxW="850px"
          margin="40px"
          boxShadow="base"
          p={30}
          borderRadius="5px"
        >
          <VStack>
            <Box>
              <Image src={zcmcLogo} w="60px" float="left" marginLeft="30px" />
              <Box
                w="500px"
                marginLeft="25px"
                align="center"
                float="left"
                fontFamily="times"
                fontSize={12}
                lineHeight="13px"
              >
                <Text>Republic of the Philippines</Text>
                <Text>Department of Health</Text>
                <Text>ZAMBOANGA CITY MEDICAL CENTER</Text>
                <Text>
                  Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000
                </Text>
                <Heading fontFamily="times" fontSize={25} mt={5}>
                  ALAGANG PINOY TAGUBILIN
                </Heading>
              </Box>
              <Image src={dohLogo} w="60px" float="right" marginRight="30px" />
            </Box>
            <Box>
              <table width="780px" style={{ fontFamily: "times" }}>
                <Table size="sm" variant="unstyled">
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      width="30%"
                    >
                      Name/Pangalan:
                      <Text fontWeight={400}>{refName}</Text>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      width="15%"
                    >
                      Age/Edad:
                      <Text fontWeight={400}>{age}</Text>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                    >
                      Sex:
                      <Text fontWeight={400}>{sex}</Text>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      width="15%"
                    >
                      Ward:
                      <Text fontWeight={400}>{ward}</Text>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                    >
                      Hospital Record No.:
                      <Text fontWeight={400}>{hrn}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                    >
                      Address:
                      <Text fontWeight={400}>{address}</Text>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="2"
                    >
                      Admission/Petsa ng Pagpasok:
                      <Text fontWeight={400}>{admit}</Text>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="2"
                    >
                      Discharge/Petsa ng Paglabas:
                      <Text fontWeight={400}>{discharge}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="5"
                    >
                      Diagnosis/Sakit:
                      <Text display="inline" marginLeft={1} fontWeight={400}>
                        {diagnosis}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                    >
                      Operation/Operasyon:
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="2"
                    >
                      Surgeon:
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="2"
                    >
                      Petsa ng Operasyon:
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="5"
                      paddingBottom={0}
                    >
                      Major Diagnostic Results/Pangunahing Resulta ng Pagsusuri
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      textAlign="center"
                    >
                      Laboratory
                      <Box height="80px" p={2}>
                        <Text fontWeight={400}>{lab}</Text>
                      </Box>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      textAlign="center"
                    >
                      X-ray
                      <Box height="80px" p={2}>
                        <Text fontWeight={400}>{xray}</Text>
                      </Box>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      textAlign="center"
                    >
                      CT
                      <Box height="80px" p={2}>
                        <Text fontWeight={400}>{ctscan}</Text>
                      </Box>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      textAlign="center"
                    >
                      MRI
                      <Box height="80px" p={2}>
                        <Text fontWeight={400}>{mri}</Text>
                      </Box>
                    </Td>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      textAlign="center"
                    >
                      Others
                      <Box height="80px" p={2}>
                        <Text fontWeight={400}>{others}</Text>
                      </Box>
                    </Td>
                  </Tr>
                  {!medId ? (
                    <>
                      <Tr>
                        <Td
                          borderWidth="1px"
                          borderColor={"blackAlpha.600"}
                          fontSize={12}
                          fontWeight={600}
                          colSpan="5"
                          paddingBottom={0}
                        >
                          <Checkbox mr={1}></Checkbox>
                          Home Medications/Gamot
                        </Td>
                      </Tr>
                    </>
                  ) : (
                    <>
                      <Tr>
                        <Td
                          borderWidth="1px"
                          borderColor={"blackAlpha.600"}
                          fontSize={12}
                          fontWeight={600}
                          colSpan="5"
                          p={1}
                        >
                          <Checkbox mr={1} isChecked={true}></Checkbox>
                          Home Medication/Gamot
                        </Td>
                      </Tr>
                      <Tr>
                        <Td
                          borderWidth="1px"
                          borderColor={"blackAlpha.600"}
                          fontSize={12}
                          fontWeight={600}
                          textAlign="center"
                          p={0}
                          colSpan="2"
                        >
                          Pangalan ng Gamot
                        </Td>
                        <Td
                          borderWidth="1px"
                          borderColor={"blackAlpha.600"}
                          fontSize={12}
                          fontWeight={600}
                          textAlign="center"
                          p={0}
                        >
                          Dosage
                        </Td>
                        <Td
                          borderWidth="1px"
                          borderColor={"blackAlpha.600"}
                          fontSize={12}
                          fontWeight={600}
                          colSpan="2"
                          textAlign="center"
                          p={0}
                        >
                          Prikwensiya at Oras ng Pag-iinom
                        </Td>
                      </Tr>
                      {med.map((m, k) => {
                        return (
                          <Tr>
                            <Td
                              borderWidth="1px"
                              borderColor={"blackAlpha.600"}
                              fontSize={12}
                              fontWeight={400}
                              colSpan="2"
                              textAlign="center"
                            >
                              {m.medicine}
                            </Td>
                            <Td
                              borderWidth="1px"
                              borderColor={"blackAlpha.600"}
                              fontSize={12}
                              fontWeight={400}
                              textAlign="center"
                            >
                              {m.dosage}
                            </Td>
                            <Td
                              borderWidth="1px"
                              borderColor={"blackAlpha.600"}
                              fontSize={12}
                              fontWeight={400}
                              colSpan="2"
                              textAlign="center"
                            >
                              {m.sched}
                            </Td>
                          </Tr>
                        );
                      })}
                    </>
                  )}
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="5"
                      p={1}
                    >
                      Health Teaching/Pangunahing Paalalang Pangkalusugan
                      <Box display="flex" mt={2}>
                        {dietList.map((i, k) => {
                          return (
                            <>
                              <Text mr={3} fontSize={12} fontWeight={400}>
                                <Checkbox isChecked={true} mr={1}></Checkbox>
                                {i}
                              </Text>
                            </>
                          );
                        })}
                        {!healthOthers ? (
                          ""
                        ) : (
                          <>
                            <Text fontSize={12} fontWeight={600} mr={1}>
                              Others:
                            </Text>
                            <Text fontSize={12} fontWeight={400}>
                              {healthOthers}
                            </Text>
                          </>
                        )}
                      </Box>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      fontSize={12}
                      fontWeight={600}
                      colSpan="5"
                      p={1}
                    >
                      Other Instructions/Karagdagang Paalala
                      <Box display="flex" mt={2}>
                        {instructions.map((i, k) => {
                          return (
                            <>
                              <Text mr={3} fontSize={12} fontWeight={400}>
                                <Checkbox isChecked={true} mr={1}></Checkbox>
                                {i}
                              </Text>
                            </>
                          );
                        })}
                      </Box>
                      <Box mt={2}>
                        <Text fontWeight={400}>
                          Please call the following Hotline Numbers: 09664965480
                          for Globe and 09533296457 for TM during office hours
                          Monday to Saturday, 8am to 5pm or
                          <br />
                          email us at records@zcmc.doh.gov.ph and we will happy
                          to serve you.
                        </Text>
                      </Box>
                    </Td>
                  </Tr>
=======
        <div className="report-form">
          <div className="dheader">
            <img src={zcmcLogo} className="logo1" alt="ZCMC Logo" />
            <div className="dhead-data">
              <p>Republic of the Philippines</p>
              <p>Department of Health</p>
              <p>ZAMBOANGA CITY MEDICAL CENTER</p>
              <p>Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000</p>
              <h2 className="dh2">ALAGANG PINOY TAGUBILIN</h2>
            </div>
            <img src={dohLogo} className="logo2" alt="DOH Logo" />
          </div>
          <table>
            <tr>
              <td className="dcell" style={{ width: "23%" }}>
                Name/Pangalan:<p>{refName}</p>
              </td>
              <td className="dcell" style={{ width: "5%" }}>
                Age/Edad:<p>{age}</p>
              </td>
              <td className="dcell" style={{ width: "10%" }}>
                Sex :<p>{sex}</p>
              </td>
              <td className="dcell" style={{ width: "10%" }}>
                Ward:<p>{ward}</p>
              </td>
              <td className="dcell" style={{ width: "15%" }}>
                Hospital Record No.<p>{hrn}</p>
              </td>
            </tr>
            <tr>
              <td className="dcell" colSpan="1">
                Address:
                <p>{address}</p>
              </td>
              <td className="dcell" colSpan="2">
                Admission/Petsa ng Pagpasok: <p>{admit}</p>
              </td>
              <td className="dcell" colSpan="2">
                Discharge/Petsa ng Paglabas: <p>{discharge}</p>
              </td>
            </tr>
            <tr>
              <td className="dcell" colSpan="5">
                Diagnosis/Sakit:{" "}
                <p style={{ display: "inline" }}>{diagnosis}</p>
              </td>
            </tr>
            <tr>
              <td className="dcell">Operation/Operasyon:</td>
              <td className="dcell" colSpan="2">
                Surgeon:
              </td>
              <td className="dcell" colSpan="2">
                Petsa ng Operasyon:
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis" colSpan="5">
                Major diagnostic Results/Panguanhing Resulta ng Pasusuri
              </td>
            </tr>
            <tr>
              <td className="ddiagnosis">
                Laboratory
                <div style={{ width: "100%", height: "80px" }}>
                  <div className="image">
                    <img
                      src={cbc}
                      style={{ width: "200px", height: "80px" }}
                      alt="cbc"
                    />
                  </div>
                </div>
              </td>
>>>>>>> Stashed changes

                  {/* OB */}

                  {breastfeed.length === 0 ? (
                    ""
                  ) : (
                    <>
                      <Tr>
                        <Td
                          borderWidth="1px"
                          borderColor={"blackAlpha.600"}
                          borderBottom="none"
                          fontSize={12}
                          fontWeight={600}
                          textAlign="center"
                          colSpan="5"
                          p={1}
                        >
                          REFERRAL UNIT BREASTFEED
                        </Td>
                      </Tr>
                      <Tr>
                        <Td colSpan="5" p={0}>
                          <Table size="sm">
                            <Tr>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                fontSize={12}
                                fontWeight={600}
                                textAlign="center"
                                p={1}
                              >
                                Date
                              </Td>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                fontSize={12}
                                fontWeight={600}
                                textAlign="center"
                                p={1}
                              >
                                From To
                              </Td>

                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                fontSize={12}
                                fontWeight={600}
                                textAlign="center"
                                p={1}
                              >
                                Yes
                              </Td>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                fontSize={12}
                                fontWeight={600}
                                textAlign="center"
                                p={1}
                              >
                                If no, reason
                              </Td>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                fontSize={12}
                                fontWeight={600}
                                textAlign="center"
                                p={1}
                              >
                                Management
                              </Td>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                fontSize={12}
                                fontWeight={600}
                                textAlign="center"
                                p={1}
                              >
                                Attended
                              </Td>
                            </Tr>
                            {breastfeed.map((b, i) => {
                              return (
                                <>
                                  <Tr>
                                    <Td
                                      borderWidth="1px"
                                      borderColor={"blackAlpha.600"}
                                      fontSize={12}
                                      fontWeight={600}
                                      textAlign="center"
                                      p={1}
                                    >
                                      {b.date}
                                    </Td>
                                    <Td
                                      borderWidth="1px"
                                      borderColor={"blackAlpha.600"}
                                      fontSize={12}
                                      fontWeight={600}
                                      textAlign="center"
                                      p={1}
                                    >
                                      {b.fromTo}
                                    </Td>
                                    <Td
                                      borderWidth="1px"
                                      borderColor={"blackAlpha.600"}
                                      fontSize={12}
                                      fontWeight={600}
                                      textAlign="center"
                                      p={1}
                                    >
                                      {b.yes}
                                    </Td>
                                    <Td
                                      borderWidth="1px"
                                      borderColor={"blackAlpha.600"}
                                      fontSize={12}
                                      fontWeight={600}
                                      textAlign="center"
                                      p={1}
                                    >
                                      {b.reason}
                                    </Td>
                                    <Td
                                      borderWidth="1px"
                                      borderColor={"blackAlpha.600"}
                                      fontSize={12}
                                      fontWeight={600}
                                      textAlign="center"
                                      p={1}
                                    >
                                      {b.management}
                                    </Td>
                                    <Td
                                      borderWidth="1px"
                                      borderColor={"blackAlpha.600"}
                                      fontSize={12}
                                      fontWeight={600}
                                      textAlign="center"
                                      p={1}
                                    >
                                      {b.attended}
                                    </Td>
                                  </Tr>
                                </>
                              );
                            })}
                            <Tr>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                borderBottom={0}
                                fontSize={12}
                                p={1}
                                colSpan="6"
                              >
                                <Text fontWeight={600} textAlign="center">
                                  REMINDER
                                </Text>

<<<<<<< Updated upstream
                                <Box
                                  float="left"
                                  display="block"
                                  width="50%"
                                  mt={1}
                                >
                                  <Text fontWeight={400}>
                                    1. Breastfeed your baby
                                    <br />
                                    2. Allow your baby to suck freely at breast
                                    without any fixed time table
                                    <br />
                                    3. Do not give prelacteal feeds such as
                                    sterile water, glucose water, honey,
                                    <br />
                                    ampalaya juice, etc.
                                    <br />
                                    4. No feeding bottles, milk substitutes
                                    artificial, teats and pacifiers.
                                  </Text>
                                </Box>
                                <Box
                                  float="right"
                                  display="block"
                                  width="50%"
                                  mt={1}
                                >
                                  <Text fontWeight={400}>
                                    6. There is no to stop breastfeeding if the
                                    baby wants to continue even after <br />
                                    3 years.
                                    <br />
                                    7. Start solid foods when your baby is 4-6
                                    months old.
                                    <br />
                                    8. Eat a good and well balance diet
                                    <br />
                                    9. Visit any halth centers for advice.
                                  </Text>
                                </Box>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                borderWidth="1px"
                                borderColor={"blackAlpha.600"}
                                borderTop={0}
                                fontSize={12}
                                p={1}
                                colSpan="6"
                              >
                                <Box display="flex">
                                  <Text mr={1}>
                                    For assistance, kindly approach ZCMC Public
                                    Affairs & Customer Care Unit (PACCU) or call
                                  </Text>
                                  <Text fontWeight={600}>
                                    {" "}
                                    GLOBE: 097585750/ 09262435850/ 09359284701
                                    <br />
                                  </Text>
                                </Box>
                                <Text fontWeight={600}>
                                  SMART: 09474951217/ 09474963439
                                </Text>
                              </Td>
                            </Tr>
                          </Table>
                        </Td>
                      </Tr>
                    </>
                  )}
                  <Tr>
                    <Td
                      borderWidth="1px"
                      borderColor={"blackAlpha.600"}
                      borderTop={0}
                      borderBottom={0}
                      fontSize={12}
                      fontWeight={600}
                      p={1}
                      colSpan="5"
                    >
                      I understand the above explanation given, I do hereby
                      agree that I will have follow-up check-up:
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      borderLeft="1px"
                      borderColor={"blackAlpha.600"}
                      textAlign="center"
                      fontSize={12}
                    >
                      {followup}
                      <Divider orientation="horizontal" />
                      Date of Follow-Up
                    </Td>
                    <Td
                      borderColor={"blackAlpha.600"}
                      borderRight={0}
                      textAlign="center"
                      fontSize={12}
                      colSpan="2"
                    >
                      {time}
                      <Divider orientation="horizontal" />
                      Time
                    </Td>
                    <Td
                      borderRight="1px"
                      borderColor={"blackAlpha.600"}
                      textAlign="center"
                      fontSize={12}
                      colSpan="2"
                    >
                      {need}
                      <Divider orientation="horizontal" />
                      Need to Bring
                    </Td>
                  </Tr>
=======
            <tr>
              <td className="dmed-header" colSpan="5">
                {!homemed ? (
                  <div className="dmed-box">
                    <div className="dmed-data">
                      <div className="checkbox"></div>
                    </div>
                    <div className="dmed-label">
                      <p>Home Medication/Gamot</p>
                    </div>
                  </div>
                ) : (
                  <div className="dmed-box">
                    <div className="dmed-data">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        style={{ marginLeft: "5px" }}
                      ></input>
                    </div>
                    <div className="dmed-label">
                      <p>Home Medication/Gamot</p>
                    </div>
                  </div>
                )}
              </td>
            </tr>
>>>>>>> Stashed changes

                  <Tr>
                    <Td
                      borderLeft="1px"
                      borderBottom="1px"
                      borderColor={"blackAlpha.600"}
                    ></Td>
                    <Td
                      borderBottom="1px"
                      borderColor={"blackAlpha.600"}
                      borderRight={0}
                      textAlign="center"
                      fontSize={12}
                      colSpan="2"
                    >
                      <Divider orientation="horizontal" mt={10} />
                      Signature over Printed Name <br />
                      of Patient/Watcher
                    </Td>
                    <Td
                      borderRight="1px"
                      borderBottom="1px"
                      borderColor={"blackAlpha.600"}
                      colSpan="2"
                    ></Td>
                  </Tr>
                  <Tr>
                    <Td colSpan="5">
                      <Box float="left" width="50%">
                        <Box ml="15px" mb={2}>
                          <Text>Prepared by:</Text>
                        </Box>
                        <Box align="center">
                          {nurse} RN
                          <Divider
                            orientation="horizontal"
                            borderColor={"blackAlpha.600"}
                            width="250px"
                          />
                        </Box>
                        <Text textAlign="center">Nurse on Duty</Text>
                      </Box>
                      <Box float="right" width="50%">
                        <Box ml="15px" mb={2}>
                          <Text>Noted by:</Text>
                        </Box>
                        <Box align="center">
                          {resident} MD
                          <Divider
                            orientation="horizontal"
                            borderColor={"blackAlpha.600"}
                            width="250px"
                          />
                        </Box>
                        <Text textAlign="center">Resident-in-Charge</Text>
                      </Box>
                    </Td>
                  </Tr>
                </Table>
              </table>
            </Box>
          </VStack>
        </Container>
      </div>

      {/* //PRESCRIPTION */}

      <Prescription
        name={refName}
        age={age}
        sex={sex}
        ward={ward}
        medId={medId}
        resident={resident}
      />
    </div>
  );
}

export default TagubilinReport;
