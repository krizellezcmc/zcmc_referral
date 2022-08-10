import React, { useEffect, useState } from "react";
import "../Styles/ReferralForm.css";
import axios from "axios";

const AddHospiForm = () => {
  const [hospiName, setHospiName] = useState("");
  const [code, setCode] = useState(0);
  const [addHospi, setAddHospi] = useState({});

  useEffect(() => {
    setAddHospi({
      code: code,
      hospiName: hospiName,
    });
  }, [code, hospiName]);

  const sendHospiData = () => {
    axios
      .post("http://localhost/referral_api/api/add_hospi.php/", addHospi)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="referral-form">
      <div className="block">
        <h1>Add Hospital</h1>
        <div className="inline-block-2">
          <div className="input-container-2">
            <label>
              Hospital Name <span>*</span>
            </label>
            <input
              type="text"
              value={hospiName}
              onChange={(e) => setHospiName(e.target.value)}
            />
          </div>

          <div className="input-container-2">
            <label>
              Code <span>*</span>
            </label>

            <input
              style={{ width: "50%" }}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="referral-btns">
        <button
          className="primary-cta"
          onClick={() => {
            sendHospiData();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddHospiForm;
