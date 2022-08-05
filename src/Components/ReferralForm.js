import React, { useState } from "react";
import "../Styles/ReferralForm.css";

const ReferralForm = () => {
  return (
    <div className="referral-form">
      <div className="block">
        <h1>Patient Information</h1>
        <div className="inline-block">
          <label>
            Full name <span>*</span>
          </label>
          <div className="input-container">
            <input type="text" className="lastname" placeholder="Last name" />
            <input type="text" className="firstname" placeholder="First name" />
            <input
              type="text"
              className="middlename"
              placeholder="Middle name"
            />
            <input type="text" className="suffix" placeholder="Suffix" />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-4">
            <label>Birthday</label>
            <input type="date" />
          </div>

          <div className="input-container-4">
            <label>Sex</label>
            <select>
              <option value="" selected disabled>
                - Please Select -
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className="input-container-4">
            <label>Civil Status</label>
            <select>
              <option value="" selected disabled>
                - Please Select -
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
            <input type="text" />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-3">
            <label>Religion</label>
            <select>
              <option value="" selected disabled>
                - Please Select -
              </option>
              <option value="Roman Catholic">Roman Catholic</option>
              <option value="Islam">Islam</option>
              <option value="Protestant">Protestant</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-container-3">
            <label>Occupation</label>
            <input type="text" />
          </div>

          <div className="input-container-3">
            <label>PhilHealth MDR</label>
            <input type="text" />
          </div>
        </div>

        <div className="inline-block">
          <label>Address</label>
          <div className="input-container">
            <textarea placeholder="Complete full address"></textarea>
          </div>
        </div>
      </div>

      <div className="block">
        <h1>Significant Watchers</h1>

        <div className="inline-block-2">
          <div className="input-container-2">
            <label>Next of Kin</label>
            <input type="text" />
          </div>

          <div className="input-container-2">
            <label>Landline/Mobile/Email</label>
            <input type="text" />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-2">
            <label>
              Call back No. <span>*</span>
            </label>
            <input type="text" />
          </div>
          <div className="input-container-2">
            <label>
              Contact No. of Watcher <span>*</span>
            </label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div className="block">
        <h1>Admitting Details</h1>

        <div className="inline-block-2">
          <div className="input-container-3">
            <label>
              Date Admitted <span>*</span>
            </label>
            <input type="date" />
          </div>

          <div className="input-container-3">
            <label>
              Referral Type <span>*</span>
            </label>
            <select>
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
            <select>
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
            <input type="text" />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S-Blood Pressure <span>*</span>
            </label>
            <input type="text" />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S-Respiration Rate <span>*</span>
            </label>
            <input type="text" />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S Pulse Rate <span>*</span>
            </label>
            <input type="text" />
          </div>

          <div className="input-container-5">
            <label>
              Latest V/S-Oxygen Saturation <span>*</span>
            </label>
            <input type="text" />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-3">
            <label>
              Glasgow Coma Scale <span>*</span>
            </label>
            <input type="text" />
          </div>

          <div className="input-container-3">
            <label>Endorsement/Initial Care</label>
            <input type="text" />
          </div>

          <div className="input-container-3">
            <label>Resident on Duty/Contact #</label>
            <input type="text" />
          </div>
        </div>

        <div className="inline-block-2">
          <div className="input-container-2">
            <label>Chief Complaints</label>
            <textarea
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
            <select>
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
        <button className="primary-cta">Submit</button>
      </div>
    </div>
  );
};

export default ReferralForm;
