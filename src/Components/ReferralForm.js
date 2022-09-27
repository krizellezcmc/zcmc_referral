import React, { useEffect, useState } from "react";
import {
  Text,
  useToast,
  Button,
  Checkbox,
  HStack,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import "../Styles/ReferralForm.css";
import moment from "moment";
import uniqid from "uniqid";
import api from "../API/Api";

const ReferralForm = () => {
  const newDate = moment().format("LLL");
  const [timeStamp, setTimeStamp] = useState(newDate);
  const [username, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [extendedName, setExtendedName] = useState("");
  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");

  const [civilStatus, setCivilStatus] = useState("");
  const [nationality, setNationality] = useState("Filipino");
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
  const [reason, setReason] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [bowList, setBowList] = useState([]);
  // FOR OB CASES
  const [lmp, setLmp] = useState("");
  const [aog, setAog] = useState("");
  const [edc, setEdc] = useState("");
  const [fht, setFht] = useState("");
  const [fh, setFh] = useState("");
  const [apgar, setApgar] = useState("");
  const [gp, setGp] = useState(["", "", ""]);
  const [newIe, setNewIe] = useState("");
  const [newBowList, setNewBowList] = useState("");
  const [newGp, setNewGp] = useState("");
  const [ie, setIe] = useState([
    {
      cm: "",
      station: "",
      effacement: "",
      presentation: "",
    },
  ]);

  const bow = [
    { value: "intact" },
    { value: "ruptured" },
    { value: "intubated" },
  ];

  const toast = useToast();
  // function getAge(dateString) {
  //   var today = new Date();
  //   var birthDate = new Date(dateString);
  //   var age = today.getFullYear() - birthDate.getFullYear();
  //   var m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }

  const handleGap = (e, i) => {
    let temp = [...gp];
    temp[i] = e.target.value;
    setGp(temp);
  };

  const handleSelect = (e, value) => {
    if (e.target.checked) {
      setBowList([...bowList, value]);
    } else {
      setBowList(bowList.filter((val) => val !== value));
    }
  };

  const handleIE = (e) => {
    const { name, value } = e.target;
    let temp = [...ie];
    temp[0][name] = value + " " + name;
    setIe(temp);
  };

  // const url =
  //   "https://script.google.com/macros/s/AKfycbyDuFLupqdcyp7z3lbGbfwNX79SZlbm9d84n2uPDijo6cXuO_fw_7PwYSL1tOkxhL-I5g/exec?action=postData";

  const url = "/temp_referral.php";

  const postData = async () => {
    console.log({ gp, apgar, bow, ie });
    // const data = JSON.stringify(bowList);
    // const data1 = data.replaceAll("[", "");
    // const data2 = data1.replaceAll("]", "");
    // const data3 = data2.replaceAll('"', "");
    // setNewBowList(data3);

    // const ie0 = ie.map(
    //   (index) =>
    //     index.cm +
    //     ", " +
    //     index.station +
    //     ", " +
    //     index.effacement +
    //     ", " +
    //     index.presentation
    // );

    // const ieData = JSON.stringify(ie0);
    // const ieData1 = ieData.replaceAll("[", "");
    // const ieData2 = ieData1.replaceAll("]", "");
    // const ieData3 = ieData2.replaceAll('"', "");
    // setNewIe(ieData3);

    // const gpData = JSON.stringify(gp);
    // const gpData1 = gpData.replaceAll("[", "");
    // const gpData2 = gpData1.replaceAll("]", "");
    // const gpData3 = gpData2.replaceAll('"', "");
    // setNewGp(gpData3);

    const patientId = uniqid(lastname.toLowerCase() + "_");
    if (
      !lastname ||
      !firstname ||
      !dateAdmitted ||
      !referralType ||
      !disposition ||
      !specialization ||
      !temperature ||
      !bloodPressure ||
      !respiRate ||
      !pulseRate ||
      !oxygen ||
      !glasgow ||
      !reason
    ) {
      toast({
        position: "top",
        title: "Input all fields.",
        description: "Kindly input all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      let response = await api.post(url, {
        timeStamp: timeStamp,
        patientId: patientId,
        username: username,
        referringFacility: referringFacility,
        lastname: lastname,
        firstname: firstname,
        middlename: middlename,
        extendedName: extendedName,
        sex: sex,
        birthdate: birthdate,
        age: age,
        civilStatus: civilStatus,
        nationality: nationality,
        religion: religion,
        occupation: occupation,
        philhealth: philhealth,
        address: address,
        nextOfKin: nextOfKin,
        contact: contact,
        dateAdmitted: dateAdmitted,
        referralType: referralType,
        disposition: disposition,
        specialization: specialization,
        temperature: temperature,
        bloodPressure: bloodPressure,
        respiRate: respiRate,
        pulseRate: pulseRate,
        oxygen: oxygen,
        glasgow: glasgow,
        chiefComplaints: chiefComplaints,
        diagnosis: diagnosis,
        endorsement: endorsement,
        userContact: userContact,
        reason: reason,
        newGp: JSON.stringify(gp),
        lmp: lmp,
        aog: aog,
        edc: edc,
        fht: fht,
        fh: fh,
        apgar: apgar,
        newIe: JSON.stringify(ie),
        newBowList: JSON.stringify(bow),
      });
      if (response.data.status === 1) {
        setLastName("");
        setFirstName("");
        setMiddleName("");
        setExtendedName("");
        setSex("");
        setBirthdate("");
        setAge("");
        setCivilStatus("");
        setNationality("");
        setReligion("");
        setOccupation("");
        setPhilhealth("");
        setAddress("");
        setNextOfKin("");
        setContact("");
        setDateAdmitted("");
        setReferralType("");
        setDisposition("");
        setSpecialization("");
        setTemperature("");
        setBloodPressure("");
        setRespiRate("");
        setPulseRate("");
        setOxygen("");
        setGlasgow("");
        setChiefComplaints("");
        setDiagnosis("");
        setEndorsement("");
        setUserContact("");
        setReason("");
        setSpecialization("");
        setGp("");
        setAog("");
        setEdc("");
        setFht("");
        setFh("");
        setNewIe("");
        setNewBowList("");
        toast({
          position: "top",
          title: "Record successfully.",
          description: "Patient succesfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  // POST TO SHEETS

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReferringFacility(user.name.toUpperCase());
    setUserName(user.firstName + "  " + user.lastName);
  });

  return (
    <form>
      <div className="referral-form">
        <div className="block">
          <h1>Patient Information</h1>

          <div className="inline-block">
            <label>
              Full name <span>*</span>
            </label>
            <div className="input-container">
              <input
                style={{ textTransform: "uppercase" }}
                type="text"
                value={lastname}
                className="lastname"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value.toUpperCase())}
                required
              />

              <input
                style={{ textTransform: "uppercase" }}
                type="text"
                value={firstname}
                className="firstname"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                required
              />

              <input
                style={{ textTransform: "uppercase" }}
                type="text"
                className="middlename"
                placeholder="Middle name"
                value={middlename}
                onChange={(e) => setMiddleName(e.target.value.toUpperCase())}
              />

              <input
                style={{ textTransform: "uppercase" }}
                type="text"
                value={extendedName}
                className="suffix"
                placeholder="Suffix"
                onChange={(e) => setExtendedName(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className="inline-block-2">
            <div className="input-container-4">
              <label>Birthday</label>
              <input
                value={birthdate}
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>

            <div className="input-container-4">
              <label>Sex</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="" selected disabled>
                  Please Select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="input-container-4">
              <label>Civil Status</label>
              <select
                value={civilStatus}
                onChange={(e) => setCivilStatus(e.target.value)}
              >
                <option value="" selected disabled>
                  Please Select
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Separated">Separated</option>
                <option value="Widow(er)">Widow(er)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-container-4">
              <label>Nationality</label>
              <input
                value={nationality}
                type="text"
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
          </div>

          <div className="inline-block-2">
            <div className="input-container-3">
              <label>Religion</label>
              <select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              >
                <option value="" selected disabled>
                  Please Select
                </option>
                <option value="Roman Catholic">Roman Catholic</option>
                <option value="Islam">Islam</option>
                <option value="Protestant">Protestant</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-container-3">
              <label>Occupation</label>
              <input
                value={occupation}
                type="text"
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>

            <div className="input-container-3">
              <label>PhilHealth MDR</label>
              <input
                value={philhealth}
                type="text"
                onChange={(e) => setPhilhealth(e.target.value)}
              />
            </div>
          </div>

          <div className="inline-block">
            <label>Address</label>
            <div className="input-container">
              <textarea
                value={address}
                placeholder="Complete full address"
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="block">
            <h1>Significant Watchers</h1>

            <div className="inline-block-2">
              <div className="input-container-2">
                <label>Next of Kin</label>
                <input
                  value={nextOfKin}
                  type="text"
                  onChange={(e) => setNextOfKin(e.target.value)}
                />
              </div>

              <div className="input-container-2">
                <label>Landline/Mobile/Email</label>
                <input
                  value={contact}
                  type="text"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="block">
            <h1>Admitting Details</h1>
            <div className="inline-block-2">
              <div className="input-container-4">
                <label>
                  Date Admitted <span>*</span>
                </label>
                <input
                  type="date"
                  value="2022-09-13"
                  // onChange={(e) => setDateAdmitted(e.target.value)}
                  required
                />
              </div>

              <div className="input-container-4">
                <label>
                  Referral Type <span>*</span>
                </label>
                <select
                  onChange={(e) => setReferralType(e.target.value)}
                  required
                >
                  <option value="" disabled selected>
                    Please Select
                  </option>
                  <option value="COVID">COVID</option>
                  <option value="NON-COVID">NON-COVID</option>
                  <option value="COVID-SUSPECT">COVID-SUSPECT</option>
                </select>
              </div>

              <div className="input-container-4">
                <label>
                  Disposition <span>*</span>
                </label>
                <select
                  onChange={(e) => setDisposition(e.target.value)}
                  required
                >
                  <option value="" disabled selected>
                    Please Select
                  </option>
                  <option value="Moderate">Moderate</option>
                  <option value="Mild">Mild</option>
                  <option value="Severe">Severe</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="input-container-4">
                <label>
                  Specialization <span>*</span>
                </label>
                <select
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                >
                  <option value="" disabled selected>
                    Please Select
                  </option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Obstetrics And Gynecology">
                    Obstetrics And Gynecology
                  </option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>
            </div>

            {specialization === "Obstetrics And Gynecology" ? (
              <>
                <Text mb={3} fontSize="16px" textTransform="uppercase">
                  For OB Cases:
                </Text>
                <div className="inline-block-2">
                  <div className="input-container-3">
                    <label>
                      Gravidity and Parity <span>*</span>
                    </label>

                    <div className="gp">
                      <small>G</small>
                      <input
                        type="text"
                        style={{ width: "50px", textAlign: "center" }}
                        required
                        name="g"
                        onChange={(e) => handleGap(e, 0)}
                      />
                      <small>P</small>
                      <input
                        type="text"
                        name="p"
                        style={{ width: "50px", textAlign: "center" }}
                        required
                        onChange={(e) => handleGap(e, 1)}
                      />
                      <small>(</small>
                      <input
                        type="text"
                        name="gap"
                        style={{ width: "150px", textAlign: "center" }}
                        onChange={(e) => handleGap(e, 2)}
                        required
                      />
                      <small>)</small>
                    </div>
                  </div>

                  <div className="input-container-3">
                    <label>
                      Last Menstrual Period <span>*</span>
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setLmp(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-container-3">
                    <label>
                      AOG <span>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setAog(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="inline-block-2">
                  <div className="input-container-4">
                    <label>
                      EDC <span>*</span>
                    </label>
                    <input
                      onChange={(e) => setEdc(e.target.value)}
                      type="text"
                      required
                    />
                  </div>
                  <div className="input-container-4">
                    <label>
                      Fetal Heart Tones <span>*</span>
                    </label>
                    <input
                      onChange={(e) => setFht(e.target.value)}
                      type="text"
                      required
                    />
                  </div>

                  <div className="input-container-4">
                    <label>
                      Fundal Height <span>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setFh(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-container-4">
                    <label>
                      Baby APGAR <span>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setApgar(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="inline-block-2">
                  <div className="">
                    <label>Internal Examination</label>

                    <div className="ie">
                      <input
                        type="number"
                        name="cm"
                        style={{ width: "60px", textAlign: "center" }}
                        onChange={(e) => handleIE(e)}
                      />
                      <small>cm</small>
                      <input
                        type="text"
                        name="station"
                        style={{ width: "60px", textAlign: "center" }}
                        onChange={(e) => handleIE(e)}
                      />
                      <small>station</small>
                      <input
                        type="text"
                        name="effacement"
                        style={{ width: "90px", textAlign: "center" }}
                        onChange={(e) => handleIE(e)}
                      />
                      <small>effacement</small>
                      <input
                        type="text"
                        name="presentation"
                        style={{ width: "160px", textAlign: "center" }}
                        onChange={(e) => handleIE(e)}
                      />
                      <small>presentation</small>
                    </div>
                  </div>
                  <div className="input-container-bow">
                    <label>Bow</label>
                    <div className="bow">
                      {bow.map((i, k) => {
                        return (
                          <>
                            <input
                              type="checkbox"
                              value={i.value}
                              onChange={(e) => {
                                handleSelect(e, i.value);
                              }}
                            />
                            <small>{i.value}</small>
                          </>
                        );
                      })}
                      {/* <input type="checkbox" /> <small>Ruptured</small>
                  <input type="checkbox" /> <small>Intubated</small> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="inline-block-2" style={{ marginTop: "20px" }}>
              <div className="input-container-5">
                <label>
                  Latest V/S-Temperature <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setTemperature(e.target.value)}
                  required
                />
              </div>

              <div className="input-container-5">
                <label>
                  Latest V/S-Blood Pressure <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setBloodPressure(e.target.value)}
                  required
                />
              </div>

              <div className="input-container-5">
                <label>
                  Latest V/S-Respiration Rate <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setRespiRate(e.target.value)}
                  required
                />
              </div>

              <div className="input-container-5">
                <label>
                  Latest V/S Pulse Rate <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setPulseRate(e.target.value)}
                  required
                />
              </div>

              <div className="input-container-5">
                <label>
                  Latest V/S-Oxygen Saturation <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setOxygen(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="inline-block-2">
              <div className="input-container-3">
                <label>
                  Glasgow Coma Scale <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setGlasgow(e.target.value)}
                  required
                />
              </div>

              <div className="input-container-3">
                <label>Endorsement/Initial Care</label>
                <input
                  type="text"
                  onChange={(e) => setEndorsement(e.target.value)}
                />
              </div>

              <div className="input-container-3">
                <label>Resident on Duty/Contact #</label>
                <input
                  type="text"
                  onChange={(e) => setUserContact(e.target.value)}
                />
              </div>
            </div>

            <div className="inline-block-2">
              <div className="input-container-2">
                <label>Chief Complaints</label>
                <textarea
                  onChange={(e) => setChiefComplaints(e.target.value)}
                  style={{
                    marginTop: "5px",
                    minWidth: "0px",
                    borderRadius: "5px",
                    resize: "none",
                  }}
                ></textarea>
              </div>

              <div className="input-container-2">
                <label>Diagnosis</label>
                <textarea
                  onChange={(e) => setDiagnosis(e.target.value)}
                  style={{
                    marginTop: "5px",
                    minWidth: "0px",
                    borderRadius: "5px",
                    resize: "none",
                  }}
                ></textarea>
              </div>
            </div>

            <div className="inline-block-2">
              <div className="input-container-1">
                <label>
                  Reason for Referral <span>*</span>
                </label>

                <select onChange={(e) => setReason(e.target.value)}>
                  <option value="" disabled selected>
                    Please Select
                  </option>
                  <option value="Medical Center of Choice">
                    Medical Center of Choice
                  </option>
                  <option value="Upgrade of Health Care">
                    Upgrade of Health Care
                  </option>
                  <option value="Financial/Cost of Care">
                    Financial/Cost of Care
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <HStack mt={5}>
              <Checkbox required></Checkbox>
              <p style={{ fontSize: "14px", marginTop: "3px" }}>
                The patient understands and accepts the terms and conditions of
                the
              </p>
              <Link fontSize="14px" color="blue" onClick={onOpen} mt={3}>
                Patient Agreement Form
              </Link>
            </HStack>
            {/* CLOSE */}
          </div>

          <div className="resferral-btns">
            <Button variant="solid" colorScheme="green" onClick={postData}>
              Submit
            </Button>
          </div>
          {/* CLOSING  TAG */}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <p style={{ fontWeight: "500", fontSize: "15px" }}>
              One Hospital Command
            </p>{" "}
            Patient Agreement Form
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              <strong>Introduction and Purpose:</strong> The ZCMC Regional
              Telemedicine Center has been established to provide sound medical
              advice to other healthcare providers through various
              telecommunication systems available. This may involve live two-way
              audio and video, patient pictures, medical images, patient’s
              medical records and other things that may be pertinent to the
              process of telemedicine. It does not have direct physical contact
              with the parties involved and relies solely on the information
              being given by the referring hospital. Electronic systems will
              utilize network and software security protocols to protect patient
              identity, privacy and confidentiality and to safeguard data and
              prevent corruption of data against intentional or unintentional
              corruption. <br />
              <br />
              <strong>Nature of the teleconsultation:</strong> It was explained
              to me by my attending physician that an SMS, phone call, online
              chat or video conferencing technology will be used to conduct the
              telemedicine consultation. I understand that as in the
              face-to-face consultation, my medical history along with my
              laboratory test/s, imaging results and other documents pertinent
              to my concerns will be shared by my attending physician to the
              ZCMC telemedicine specialists. Moreover, I may be asked to show
              certain body parts as may be considered important to form a
              diagnosis. This is in view of the fact that the specialist we will
              be referring to will not be in the same hospital as I am and would
              not be able to perform the necessary physical examination on me.{" "}
              <br />
              <br />
              <strong>Benefits:</strong> Through the use of teleconsultation, my
              attending physicians will be able to concur with certain
              specialists who will in turn aid them in obtaining a medical
              evaluation and impression of my condition. I may receive guidance
              on monitoring my condition and the next steps to do should my
              condition change, specific prescription on what to take,
              instructions on what laboratory and imaging tests to do. <br />
              <br />
              <strong>Potential Risks:</strong> I understand there are potential
              risks in using this technology, including technical difficulties,
              interruptions, poor transmission of images leading to misdiagnosis
              and consequently mistreatment, no access to paper charts/medical
              records, delays and deficiencies due to malfunction of electronic
              equipment and software, unauthorized access leading to breach of
              data privacy and confidentiality. <br />
              <br />
              All consultations are considered confidential but given the nature
              of technology, I understand that despite using appropriate
              measures, the ZCMC Telemedicine Regional Center OPD and other
              related units cannot guarantee the safety of my personal data from
              data hacking. Therefore, I cannot hold them liable for any data
              that may be lost, corrupted, destroyed or intercepted or the
              illegal use of my data arising from a breach in security. <br />
              <br />
              <strong>Data Privacy and Confidentiality:</strong> I agree to
              share my personal data in order to facilitate scheduling of my
              consultation and to be utilized for research purposes. I agree not
              to record in video or audio format nor divulge the details of my
              consultation in compliance with the Data Privacy Act of 2012.{" "}
              <br />
              <br />
              <strong>Rights:</strong> I have the right to: 1. Terminate the
              telemedicine teleconsultation at any time. 2. Be accompanied and
              assisted by a family member or caregiver during the
              teleconsultation. <br />
              <br />
              <strong>Limitations:</strong> The strength of network signal, the
              speed of the internet,audibility of the sound, the presence of
              background noise, clarity of the images, all affect the quality of
              the telemedicine consultation. Physical examination as done in the
              usual face-to-face consultation is not possible and is therefore a
              big limitation to the process of making a diagnosis. <br />
              <br /> <strong>In case of an urgent concern:</strong> It is my
              doctor’s responsibility to refer me to the nearest Emergency Room
              or hospital of my choice in case he/she deems my concern to be
              urgent and would warrant immediate action and management. <br />
              <br />I acknowledge that prior to engaging in such consultation
              platform, I have been made fully aware of its purpose, scopes and
              limitations. <br />
              <br />I further acknowledge that consent was given to share my
              medical history, records and laboratory results for the purpose of
              discussion, in accordance with the RA 10173 Data Privacy Act.{" "}
              <br />
              <br />I further acknowledge that I am aware this virtual encounter
              will be recorded and all details be kept confidential between my
              attending physician and the ZCMC Telemedicine healthcare personnel
              involved. <br />
              <br />
              I further acknowledge given that this is only a virtual consult,
              the ZCMC Regional Telemedicine Center along with its doctors shall
              not be held directly liable for my care or for any other untoward
              events that may occur in between, thus freeing them from any legal
              responsibilities in the future. <br />
              <br />I fully understand the nature, processes, risks and benefits
              of teleconsultation as they were shared in a language that I can
              understand. I was given the opportunity to ask questions and my
              questions were answered.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default ReferralForm;
