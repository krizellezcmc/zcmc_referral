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

  const [search, setSearch] = useState("");

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
              <Th className="border" width="15%">
                Referred Date
              </Th>
              <Th className="border" width="30%">
                Name
              </Th>

              <Th className="border" width="15%">
                Date Admitted
              </Th>
              <Th className="border" width="15%">
                Referral Type
              </Th>
              <Th className="border" width="15%">
                Disposition
              </Th>
              <Th className="border" width="20%">
                Resident on Duty
              </Th>
              <Th className="border" width="15%">
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {refpatients
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.Firstname.toLowerCase().includes(search.toLowerCase()) ||
                  val.Lastname.toLowerCase().includes(search.toLowerCase()) ||
                  val.Middlename.toLowerCase().includes(search.toLowerCase()) ||
                  val.ReferralType.toLowerCase().includes(
                    search.toLowerCase()
                  ) ||
                  val.Disposition.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((ref) => {
                return ref.ReferringFacility === hospital.toUpperCase() ? (
                  <>
                    <Tr>
                      <Td className="border">
                        {moment(ref.Timestamp).format("LLL")}
                      </Td>
                      <Td className="border">
                        {ref.Firstname +
                          " " +
                          ref.Middlename +
                          " " +
                          ref.Lastname}
                      </Td>

                      <Td className="border">
                        {moment(ref.DateAdmitted).format("LL")}
                      </Td>
                      <Td className="border">{ref.ReferralType}</Td>
                      <Td className="border">
                        <Badge colorScheme="purple">{ref.Disposition}</Badge>
                      </Td>
                      <Td className="border">{ref.UserContactNo}</Td>
                      <Td className="border">
                        <Badge colorScheme="red">Pending</Badge>
                      </Td>
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
