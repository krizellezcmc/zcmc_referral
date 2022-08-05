import React, { useState } from "react";
import "../Styles/ReferralForm.css";

const ReferralForm = () => {
  const [timeStamp, setTimeStamp] = useState("2022/01/01");
  const [username, setUserName] = useState("username");
  const [referringFacility, setReferringFacility] = useState("Hospital name");
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

  const url =
    "https://script.google.com/macros/s/AKfycbx4ujI9wCE1PY6OM-dM18SB9HyVjM1JtJEa4UPSacpFA5SWpIp1SFQ8m5bFxeEvYn9-ZQ/exec";

  const postData = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        timeStamp,
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
    }).then((response) => {
      console.log(response);
    });
  };

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
              type="text"
              className="lastname"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              className="firstname"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="middlename"
              placeholder="Middle name"
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <input
              type="text"
              className="suffix"
              placeholder="Suffix"
              onChange={(e) => setExtendedName(e.target.value)}
            />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-4">
            <label>Birthday</label>
            <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
          </div>

          <div className="input-container-4">
            <label>Sex</label>
            <select onChange={(e) => setSex(e.target.value)}>
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
            <select onChange={(e) => setCivilStatus(e.target.value)}>
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
              type="text"
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-3">
            <label>Religion</label>
            <select onChange={(e) => setReligion(e.target.value)}>
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
              type="text"
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>

          <div className="input-container-3">
            <label>PhilHealth MDR</label>
            <input
              type="text"
              onChange={(e) => setPhilhealth(e.target.value)}
            />
          </div>
        </div>

        <div className="inline-block">
          <label>Address</label>
          <div className="input-container">
            <textarea
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
            <input type="text" onChange={(e) => setNextOfKin(e.target.value)} />
          </div>

          <div className="input-container-2">
            <label>Landline/Mobile/Email</label>
            <input type="text" onChange={(e) => setContact(e.target.value)} />
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
              type="date"
              onChange={(e) => setDateAdmitted(e.target.value)}
            />
          </div>

          <div className="input-container-3">
            <label>
              Referral Type <span>*</span>
            </label>
            <select onChange={(e) => setReferralType(e.target.value)}>
              <option value="" disabled selected>
                - Please Select -
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
            <select onChange={(e) => setDisposition(e.target.value)}>
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
              type="text"
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S-Blood Pressure <span>*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setBloodPressure(e.target.value)}
            />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S-Respiration Rate <span>*</span>
            </label>
            <input type="text" onChange={(e) => setRespiRate(e.target.value)} />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S Pulse Rate <span>*</span>
            </label>
            <input type="text" onChange={(e) => setPulseRate(e.target.value)} />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S-Oxygen Saturation <span>*</span>
            </label>
            <input type="text" onChange={(e) => setOxygen(e.target.value)} />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-3">
            <label>
              Glasgow Coma Scale <span>*</span>
            </label>
            <input type="text" onChange={(e) => setGlasgow(e.target.value)} />
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
            <label>Reason for Referral</label>
            <select onChange={(e) => setReason(e.target.value)}>
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

      <div className="referral-btns">
        <button className="primary-cta" onClick={postData}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReferralForm;
