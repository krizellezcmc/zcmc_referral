import { Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import TagubilinForm from "../Components/TagubilinForm";
import { Select } from "chakra-react-select";
import api from "../API/Api";

function NurseHome(props) {
  const refreshPage = () => {
    window.location.href = "/login";
  };

  const [patientList, setPatientList] = useState([]);
  const [selected, setSelected] = useState("");

  const fetchData = async (e) => {
    // e.preventDefault();

    setSelected(e);
    let pat = await api.get("/get_discharged.php");
    setPatientList(pat.data);
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
              <Text fontWeight={500}>Search Patient :</Text>
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

            {!selected ? "" : <TagubilinForm id={selected} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NurseHome;
