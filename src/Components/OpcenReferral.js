import React, { useState, useEffect } from "react";
import {
  Text,
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  HStack,
  Button,
  Textarea,
  Select,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import api from "../API/Api";
import moment from "moment";

function OpcenReferral(props) {
  const newDate = moment().format("LLL");
  const [timeStamp, setTimeStamp] = useState(newDate);
  const [opcenUser, setOpcenUserName] = useState("");
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
  const [reason, setReason] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [lmp, setLmp] = useState("");
  const [aog, setAog] = useState("");
  const [edc, setEdc] = useState("");
  const [fht, setFht] = useState("");
  const [fh, setFh] = useState("");
  const [apgar, setApgar] = useState("");
  // const [gp, setGp] = useState(["", "", ""]);
  const [newIe, setNewIe] = useState("");
  const [newBowList, setNewBowList] = useState("");
  const [newGp, setNewGp] = useState("");

  const toast = useToast();

  const refData = async () => {
    let response = await api.get("/get_pending_ref.php", {
      params: { id: props.patientId },
    });
    setUserName(response.data.username);
    setReferringFacility(response.data.refFacility);
    setLastName(response.data.lastname);
    setFirstName(response.data.firstname);
    setMiddleName(response.data.middleName);
    setExtendedName(response.data.extended);
    setSex(response.data.sex);
    setBirthdate(response.data.birthdate);
    setCivilStatus(response.data.civilStatus);
    setNationality(response.data.nationality);
    setReligion(response.data.religion);
    setOccupation(response.data.occupation);
    setPhilhealth(response.data.philhealth);
    setAddress(response.data.address);
    setNextOfKin(response.data.nextOfkin);
    setContact(response.data.contactWatcher);
    setDateAdmitted(response.data.dateAdmitted);
    setReferralType(response.data.refType);
    setDisposition(response.data.disposition);
    setSpecialization(response.data.specialization);
    setTemperature(response.data.latestTemp);
    setBloodPressure(response.data.latestBp);
    setRespiRate(response.data.latestRespi);
    setPulseRate(response.data.latestPulse);
    setOxygen(response.data.latestOxygen);
    setGlasgow(response.data.latestGlasgow);
    setChiefComplaints(response.data.chiefComplaints);
    setDiagnosis(response.data.diagnosis);
    setEndorsement(response.data.endorsement);
    setUserContact(response.data.userContact);
    setReason(response.data.reason);
  };

  const updateData = async () => {
    let response = await api.post("/update_temp_referral.php", {
      timeStamp: timeStamp,
      patientId: props.patientId,
      username: opcenUser,
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
      newGp: newGp,
      lmp: lmp,
      aog: aog,
      edc: edc,
      fht: fht,
      fh: fh,
      apgar: apgar,
      newIe: newIe,
      newBowList: newBowList,
    });
    if (response.data.status === 1) {
      toast({
        position: "top",
        title: "Patient's record updated.",
        description: "Patient succesfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    console.log(response.data);
  };

  useEffect(() => {
    refData();
    const user = JSON.parse(localStorage.getItem("user"));
    setOpcenUserName(user.firstName + "  " + user.lastName);
  }, [props.patientId]);
  return (
    <div>
      <form>
        {props.patientId}
        <Container p={5} maxW="1000px">
          {/* <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={3}> */}
          <Box borderWidth="1px" borderColor="gray.300" borderRadius="lg" p={5}>
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              PATIENT INFORMATION
            </Text>
            <HStack mt={8}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Full Name</FormLabel>
                <HStack>
                  <Input
                    variant="filled"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value.toUpperCase())}
                  />
                  <Input
                    variant="filled"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                  />
                  <Input
                    variant="filled"
                    value={middlename}
                    onChange={(e) =>
                      setMiddleName(e.target.value.toUpperCase())
                    }
                  />
                </HStack>
              </FormControl>
              <FormControl w={150}>
                <FormLabel fontSize={14}>Suffix</FormLabel>
                <Input
                  variant="filled"
                  value={extendedName}
                  onChange={(e) =>
                    setExtendedName(e.target.value.toUpperCase())
                  }
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>Birthday</FormLabel>
                <HStack>
                  <Input
                    type="text"
                    variant="filled"
                    value={moment(birthdate).format("LL")}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Sex</FormLabel>
                <Input
                  variant="filled"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Civil Status</FormLabel>
                <Input
                  variant="filled"
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Nationality</FormLabel>
                <Input
                  variant="filled"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>Religion</FormLabel>
                <Input
                  variant="filled"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Occupation</FormLabel>
                <Input
                  variant="filled"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>PhilHealth</FormLabel>
                <Input
                  variant="filled"
                  value={philhealth}
                  onChange={(e) => setPhilhealth(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <FormLabel fontSize={14}>Address</FormLabel>
              <Textarea
                variant="filled"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            p={5}
            mt={5}
          >
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              SIGNIFICANT WATCHERS
            </Text>
            <HStack mt={8}>
              <FormControl>
                <FormLabel fontSize={14}>Next of Kin</FormLabel>
                <Input
                  variant="filled"
                  value={nextOfKin}
                  onChange={(e) => setNextOfKin(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Landline/Mobile/Email</FormLabel>
                <Input
                  variant="filled"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </FormControl>
            </HStack>
          </Box>

          <Box
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="lg"
            p={5}
            mt={5}
          >
            <Text fontSize="xl" textAlign="center" fontWeight={800}>
              ADMITTING DETAILS
            </Text>
            <HStack mt={8}>
              <FormControl>
                <FormLabel fontSize={14}>Date Admitted</FormLabel>
                <Input
                  type="date"
                  variant="filled"
                  value={dateAdmitted}
                  onChange={(e) => setDateAdmitted(e.target.value)}
                />
              </FormControl>
              <FormControl w={500}>
                <FormLabel fontSize={14}>Referral Type</FormLabel>
                <Input
                  variant="filled"
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                />
              </FormControl>
              <FormControl w={500}>
                <FormLabel fontSize={14}>Disposition</FormLabel>
                <Input
                  variant="filled"
                  value={disposition}
                  onChange={(e) => setDisposition(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Specialization</FormLabel>
                <Input
                  variant="filled"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </FormControl>
            </HStack>
            {specialization === "Obstetrics And Gynecology" ? (
              <>
                <Box mt={5}>
                  <Text fontSize="xl" textAlign="center" fontWeight={800}>
                    OB CASE
                  </Text>
                  <HStack mt={5}>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Gravidity and Parity</FormLabel>
                      <HStack>
                        <Text>G</Text>
                        <Input
                          type="text"
                          borderBottom="1px"
                          w={50}
                          h={8}
                          p={0}
                        />
                        <Text>P</Text>
                        <Input type="text" borderBottom="1px" w={50} h={8} />
                        <Text>(</Text>
                        <Input type="text" borderBottom="1px" w={100} h={8} />
                        <Text>)</Text>
                      </HStack>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Last Menstrual Period</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>AOG</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </HStack>
                  <HStack mt={5}>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>EDC</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Fetal Heart Tones</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Fundal Height</FormLabel>
                      <Input type="text" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Baby APGAR</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </HStack>
                  <HStack mt={5}>
                    <FormControl isRequired>
                      <FormLabel fontSize={14}>Internal Examination</FormLabel>
                      <HStack>
                        <Input type="text" borderBottom="1px" w={80} h={8} />
                        <Text fontSize={14}>cm</Text>
                        <Input type="text" borderBottom="1px" w={80} h={8} />
                        <Text fontSize={14}>station</Text>
                        <Input type="text" borderBottom="1px" h={8} />
                        <Text fontSize={14}>effacement</Text>
                        <Input type="text" borderBottom="1px" h={8} />
                        <Text fontSize={14}>presentation</Text>
                      </HStack>
                    </FormControl>
                  </HStack>
                  <FormControl mt={5}>
                    <FormLabel fontSize={14}>Bow</FormLabel>
                    <Checkbox size="md" ml={5}>
                      Intact
                    </Checkbox>
                    <Checkbox size="md" ml={5}>
                      Ruptured
                    </Checkbox>
                    <Checkbox size="md" ml={5}>
                      Intubated
                    </Checkbox>
                  </FormControl>
                </Box>
              </>
            ) : (
              ""
            )}
            <HStack mt={10}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Temperature</FormLabel>
                <Input
                  variant="filled"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Blood Pressure</FormLabel>
                <Input
                  variant="filled"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Latest V/S-Respiration Rate</FormLabel>
                <Input
                  variant="filled"
                  value={respiRate}
                  onChange={(e) => setRespiRate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Latest V/S-Pulse <br></br>Rate
                </FormLabel>
                <Input
                  variant="filled"
                  value={pulseRate}
                  onChange={(e) => setPulseRate(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize={14}>
                  Latest V/S-Oxygen Saturation
                </FormLabel>
                <Input
                  variant="filled"
                  value={oxygen}
                  onChange={(e) => setOxygen(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl isRequired>
                <FormLabel fontSize={14}>Glasgow coma Scale</FormLabel>
                <Input
                  variant="filled"
                  value={glasgow}
                  onChange={(e) => setGlasgow(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Endorsement/Initial Care</FormLabel>
                <Input
                  variant="filled"
                  value={endorsement}
                  onChange={(e) => setEndorsement(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Resident on Duty/Contact #</FormLabel>
                <Input
                  variant="filled"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack mt={5}>
              <FormControl>
                <FormLabel fontSize={14}>Chief Complaints</FormLabel>
                <Textarea
                  variant="filled"
                  value={chiefComplaints}
                  onChange={(e) => setChiefComplaints(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Diagnosis</FormLabel>
                <Textarea
                  variant="filled"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </FormControl>
            </HStack>
            <FormControl mt={5} isRequired>
              <FormLabel fontSize={14}> Reason for Referral</FormLabel>
              <Select
                variant="filled"
                onChange={(e) => setReason(e.target.value)}
              >
                <option value={reason}>{reason}</option>
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
              </Select>
            </FormControl>
          </Box>
          <Text textAlign="right" fontSize={12} fontStyle="italic">
            Last edited by: {username}
          </Text>
          {/* </Box> */}
          <Button
            colorScheme="teal"
            variant="outline"
            mt={5}
            onClick={updateData}
          >
            Save
          </Button>
        </Container>
      </form>
    </div>
  );
}

export default OpcenReferral;
