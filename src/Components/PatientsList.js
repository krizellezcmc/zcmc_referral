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
  InputLeftElement,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import "../Styles/Patients.css";
import { BiSearch } from "react-icons/bi";

const PatientsList = () => {
  let navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_patients.php")
      .then(function (response) {
        setPatients(response.data);
      });
  });

  return (
    <div className="table-container">
      <h1 className="block">Referred Patients</h1>
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
            placeholder="Search patient"
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
              <Th className="border" width="30%">
                Patient
              </Th>
              <Th className="border" width="30%">
                Name
              </Th>
              <Th className="border" width="20%">
                Referred Date
              </Th>
              <Th className="border" width="15%">
                Referred From
              </Th>
              <Th className="border" width="25%">
                Discharge Date
              </Th>
              <Th className="border" width="5%">
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map((pat) => {
              return (
                <>
                  <Tr>
                    <Td className="border">{pat.patId}</Td>
                    <Td className="border">{pat.patientName}</Td>
                    <Td className="border">{pat.referredDate}</Td>
                    <Td className="border">{pat.referredFrom}</Td>
                    <Td className="border">
                      {pat.dischDate == null ? (
                        <Badge colorScheme="yellow"> Not applicable</Badge>
                      ) : (
                        pat.dischDate
                      )}
                    </Td>
                    <Td className="border">
                      <Badge colorScheme="blue">+ Admitted</Badge>
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientsList;
