import { Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import TagubilinForm from "../Components/TagubilinForm";
import { Select } from "chakra-react-select";
import axios from "axios";
import api from "../API/Api";
import { pick } from "@reach/router/lib/utils";

function NurseHome(props) {
  const refreshPage = () => {
    window.location.reload(false);
  };

  const [patientList, setPatientList] = useState([]);
  const [selected, setSelected] = useState("");

  const fetchData = async (e) => {
    setSelected(e);
    let response = await api.get("/get_patientList.php");
    setPatientList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper" style={{ padding: "30px" }}>
            <HStack mb={7}>
              <Text>Search Patient</Text>
              <div style={{ width: "500px" }}>
                <Select
                  options={patientList}
                  placeholder="Search patient"
                  selectedOptionStyle="check"
                  closeMenuOnSelect={true}
                  focusBorderColor="#058e46"
                  onChange={(e) => {
                    fetchData(e.value);
                  }}
                  width="100%"
                  required
                  useBasicStyles
                />
              </div>
              <Button
                variant="solid"
                leftIcon={<BiRefresh />}
                onClick={refreshPage}
                mb={7}
              >
                Refresh Page
              </Button>
            </HStack>

            <TagubilinForm id={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NurseHome;
