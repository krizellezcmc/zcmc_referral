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

const ReferredPatients = () => {
  const [refpatients, setRefPatients] = useState("");
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setHospital(user.name);

    axios
      .get("http://192.168.3.135/zcmc_referral_api/api/get_sheets.php/")
      .then((response) => {
        setRefPatients(response.data);
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
                Name
              </Th>
              <Th className="border" width="30%">
                Timestamp
              </Th>
              <Th className="border" width="15%">
                Date Admitted
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {refpatients.map((ref) => {
              return ref.ReferringFacility === hospital.toUpperCase() ? (
                <>
                  <Tr>
                    <Td className="border">
                      {ref.Firstname +
                        " " +
                        ref.Middlename +
                        " " +
                        ref.Lastname}
                    </Td>
                    <Td className="border">{ref.Timestamp.toLocaleString()}</Td>
                    <Td className="border">{ref.DateAdmitted}</Td>
                  </Tr>
                </>
              ) : (
                ""
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReferredPatients;