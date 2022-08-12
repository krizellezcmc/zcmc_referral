import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import "../Styles/Patients.css";
import moment from "moment";

const ReferredPatients = () => {
  let navigate = useNavigate();

  const [refpatients, setRefPatients] = useState([]);
  const [hospital, setHospital] = useState("");
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setHospital(user.name);

    // axios
    //   .get("http://192.168.3.135/zcmc_referral_api/api/get_sheets.php/")
    //   .then((response) => {
    //     setRefPatients(response.data);
    //   });

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_patients.php")
      .then(function (response) {
        setPatients(response.data);
      });
  });

  return (
    <div className="table-container">
      <h1 className="block">Users</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiSearch color="gray.300" />}
          />
          <Input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search User"
            width="400px"
          />
        </InputGroup>
        <Button
          variant="solid"
          colorScheme="green"
          onClick={() => {
            navigate("/home");
          }}
        >
          + Refer patient
        </Button>
      </div>
      <TableContainer>
        <Table cellSpacing={0}>
          <Thead>
            <Tr>
              <Th className="border" width="10%">
                Patient ID
              </Th>
              <Th className="border" width="30%">
                Full name
              </Th>
              <Th className="border" width="10%">
                Referred Date
              </Th>

              <Th className="border" width="10%">
                Discharge Date
              </Th>
              <Th className="border" width="10%">
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.length !== 0 ? (
              patients
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.patientName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((pat) => {
                  return pat.referredFrom.toUpperCase() ===
                    hospital.toUpperCase() ? (
                    <>
                      <Tr>
                        <Td className="border">
                          <b>{pat.patId}</b>
                        </Td>
                        <Td className="border">{pat.patientName}</Td>
                        <Td className="border">
                          {moment(pat.referredDate).format("LLL")}
                        </Td>

                        <Td className="border">
                          {pat.dischDate == null ? (
                            <Badge colorScheme="yellow"> Not applicable</Badge>
                          ) : (
                            moment(pat.dischDate).format("LLL")
                          )}
                        </Td>
                        <Td className="border">
                          {pat.dischDate === null ? (
                            <Badge colorScheme="blue">+ Admitted</Badge>
                          ) : (
                            <Badge colorScheme="red">- Discharged</Badge>
                          )}
                        </Td>
                      </Tr>
                    </>
                  ) : (
                    ""
                  );
                })
            ) : (
              <Tr>
                <Td className="border" colSpan={7}>
                  <i>No data available</i>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReferredPatients;
