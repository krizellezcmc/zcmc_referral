import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import "../Styles/Patients.css";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/referral_api/api/get_patients.php")
      .then(function (response) {
        setPatients(response.data);
      });
  });

  return (
    <div className="table-container">
      <div className="block">
        <h1>Referred Patients</h1>
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
                    <Td className="border">{pat.dischDate}</Td>
                    <Td className="border">
                      <Badge colorScheme="green">Verified</Badge>
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
