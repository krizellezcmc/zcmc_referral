import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import "../Styles/ReferralForm.css";
import { Button } from "@chakra-ui/react";
import moment from "moment";
import uniqid from "uniqid";

const ReferralForm = () => {
  const newDate = moment().format("LLL");
  const [timeStamp, setTimeStamp] = useState(newDate);
  const [username, setUserName] = useState("");
  const [referringFacility, setReferringFacility] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("N/A");
  const [extendedName, setExtendedName] = useState("N/A");
  const [sex, setSex] = useState("N/A");
  const [birthdate, setBirthdate] = useState("N/A");
  const [age, setAge] = useState("N/A");
  const [civilStatus, setCivilStatus] = useState("N/A");
  const [nationality, setNationality] = useState("N/A");
  const [religion, setReligion] = useState("N/A");
  const [occupation, setOccupation] = useState("N/A");
  const [philhealth, setPhilhealth] = useState("N/A");
  const [address, setAddress] = useState("N/A");
  const [nextOfKin, setNextOfKin] = useState("N/A");
  const [contact, setContact] = useState("N/A");
  const [userContact, setUserContact] = useState("N/A");
  const [dateAdmitted, setDateAdmitted] = useState("N/A");
  const [referralType, setReferralType] = useState("N/A");
  const [disposition, setDisposition] = useState("N/A");
  const [temperature, setTemperature] = useState("N/A");
  const [bloodPressure, setBloodPressure] = useState("N/A");
  const [respiRate, setRespiRate] = useState("N/A");
  const [pulseRate, setPulseRate] = useState("N/A");
  const [oxygen, setOxygen] = useState("N/A");
  const [glasgow, setGlasgow] = useState("N/A");
  const [chiefComplaints, setChiefComplaints] = useState("N/A");
  const [diagnosis, setDiagnosis] = useState("N/A");
  const [endorsement, setEndorsement] = useState("N/A");
  const [reason, setReason] = useState("N/A");

  const toast = useToast();

  const url =
    "https://script.google.com/macros/s/AKfycbyDuFLupqdcyp7z3lbGbfwNX79SZlbm9d84n2uPDijo6cXuO_fw_7PwYSL1tOkxhL-I5g/exec?action=postData";

  const postData = async () => {
    const patientId = uniqid(lastname.toLowerCase() + "_");
    if (
      !lastname ||
      !firstname ||
      !dateAdmitted ||
      !referralType ||
      !disposition ||
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
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          timeStamp,
          patientId,
          username,
          referringFacility,
          lastname,
          firstname,
          middlename,
          extendedName,
          sex,
          birthdate,
          age,
          civilStatus,
          nationality,
          religion,
          occupation,
          philhealth,
          address,
          nextOfKin,
          contact,
          dateAdmitted,
          referralType,
          disposition,
          temperature,
          bloodPressure,
          respiRate,
          pulseRate,
          oxygen,
          glasgow,
          chiefComplaints,
          diagnosis,
          endorsement,
          userContact,
          reason,
        }),
      }).then(async (response) => {
        if (response) {
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
          toast({
            position: "top",
            title: "Record successfully.",
            description: "Patient succesfully added.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReferringFacility(user.name.toUpperCase());
    setUserName(user.firstName + "  " + user.lastName);
  });

  return (
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

        {/* <div className="inline-block-2">
          <div className="input-container-2">
            <label>
              Call back No. <span>*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setUserContact(e.target.value)}
            />
          </div>
          <div className="input-container-2">
            <label>
              Contact No. of Watcher <span>*</span>
            </label>
            <input type="text" />
          </div> 
        </div> */}
      </div>

      <div className="block">
        <h1>Admitting Details</h1>

        <div className="inline-block-2">
          <div className="input-container-3">
            <label>
              Date Admitted <span>*</span>
            </label>
            <input
              value={dateAdmitted}
              type="date"
              onChange={(e) => setDateAdmitted(e.target.value)}
              required
            />
          </div>

          <div className="input-container-3">
            <label>
              Referral Type <span>*</span>
            </label>
            <select
              value={referralType}
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

          <div className="input-container-3">
            <label>
              Disposition <span>*</span>
            </label>
            <select
              value={disposition}
              onChange={(e) => setDisposition(e.target.value)}
              required
            >
              <option value="" disabled selected>
                - Please Select -
              </option>
              <option value="Moderate">Moderate</option>
              <option value="Mild">Mild</option>
              <option value="Severe">Severe</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-5">
            <label>
              Latest V/S-Temperature <span>*</span>
            </label>
            <input
              value={temperature}
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
              value={bloodPressure}
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
              value={respiRate}
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
              value={pulseRate}
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
              value={oxygen}
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
              value={glasgow}
              type="text"
              onChange={(e) => setGlasgow(e.target.value)}
              required
            />
          </div>

          <div className="input-container-3">
            <label>Endorsement/Initial Care</label>
            <input
              value={endorsement}
              type="text"
              onChange={(e) => setEndorsement(e.target.value)}
            />
          </div>

          <div className="input-container-3">
            <label>Resident on Duty/Contact #</label>
            <input
              value={userContact}
              type="text"
              onChange={(e) => setUserContact(e.target.value)}
            />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-2">
            <label>Chief Complaints</label>
            <textarea
              value={chiefComplaints}
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
              value={diagnosis}
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
            <label>Reason for Referral</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              <option value="" disabled selected>
                - Please Select -
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
      </div>

      <div className="resferral-btns">
        <Button variant="solid" colorScheme="green" onClick={postData}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReferralForm;
