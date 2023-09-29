import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Badge,
  Heading,
  IconButton,
  TableCaption,
  Flex,
  Spacer,
  Button,
  Box,
} from "@chakra-ui/react";

import moment from "moment";
import React, { useState, useEffect } from "react";
import { BiCheck, BiLock, BiRefresh } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";
import api from "../API/Api";

function RequestTable(props) {
  const [list, setList] = useState([]);
  const [lockList, setLockList] = useState([]);

  const getList = async () => {
    let response = await api.get("/getAllRequests.php");

    setList(response.data);
  };

  const getLockList = async () => {
    let response = await api.get("/getAllRequestTime.php");

    setLockList(response.data);
  };

  const acceptRequest = async (value) => {
    Swal.fire({
      text: "Are you sure you want to give EDIT ACCESS to the user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/editable.php", {
          patId: value,
        });

        if (res) {
          if (res.data.status === 1) {
            Swal.fire("Success!", "Record Updated.", "success");
          } else {
            Swal.fire("Error!", "Something went wrong.", "error");
          }
        } else {
          console.log("Something went wrong!");
        }
      }
    });
  };

  const lockEdit = async (value) => {
    Swal.fire({
      text: "Are you sure you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await api.post("/lock_edit.php", {
          patId: value,
        });

        if (res) {
          if (res.data.status === 1) {
            Swal.fire(
              "Success!",
              "The user can no longer edit the form.",
              "success"
            );
          } else {
            Swal.fire("Error!", "NOTE: Something went wrong.", "error");
          }
        } else {
          console.log("Something went wrong!");
        }
      }
    });
  };

  useEffect(() => {
    getList();
    getLockList();
  }, [list, lockList]);
  return (
    <>
      <Flex alignItems="center" mb={10} pt={3} px={10}>
        <Heading fontWeight={700} fontSize={31} color="teal.900" mr={3}>
          Edit Requests
        </Heading>
        <TbEdit fontSize={30} />
        <Spacer />{" "}
        <Button
          rightIcon={<BiRefresh />}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Refresh
        </Button>
      </Flex>
      <Box p={10}>
        <TableContainer bgColor="white">
          <Table variant="striped" size="sm">
            <TableCaption>Request to edit Patient Referral Form</TableCaption>
            <Thead border="1px solid #eee">
              <Th py={4}>Request Date</Th>
              <Th>Patient Name</Th>
              <Th>Patient Status</Th>
              <Th>Action </Th>
            </Thead>
            <Tbody border="1px solid #eee">
              {list.length !== 0 ? (
                <>
                  {list.map((val) => {
                    return (
                      <Tr>
                        <Td py={0}> {moment(val.requestTime).format("LLL")}</Td>
                        <Td>{val.firstname + "  " + val.lastname}</Td>
                        <Td>
                          <Badge colorScheme="blue">{val.status}</Badge>
                        </Td>
                        <Td>
                          {val.requestTime !== null && val.requestEdit === 0 ? (
                            <>
                              <IconButton
                                colorScheme="blue"
                                icon={<BiCheck />}
                                onClick={() => {
                                  acceptRequest(val.patientId);
                                }}
                              ></IconButton>
                              <IconButton
                                colorScheme="blue"
                                icon={<BiCheck />}
                                onClick={() => {
                                  acceptRequest(val.patientId);
                                }}
                              ></IconButton>
                            </>
                          ) : (
                            <IconButton
                              colorScheme="blue"
                              icon={<BiCheck />}
                              onClick={() => {
                                acceptRequest(val.patientId);
                              }}
                            ></IconButton>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </>
              ) : (
                <Tr>
                  <Td py={4} colSpan={4} textAlign="center" fontStyle="italic">
                    -- No data available --
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <TableContainer mt={20} bgColor="white">
          <Table variant="striped" size="sm">
            <TableCaption>Lock Patient Referral Form</TableCaption>
            <Thead border="1px solid #eee">
              <Th py={4}>Request Date</Th>
              <Th>Patient Name</Th>
              <Th>Editable</Th>
              <Th>Action </Th>
            </Thead>
            <Tbody border="1px solid #eee">
              {!lockList.length !== 0 ? (
                <>
                  {lockList.map((val) => {
                    return (
                      <Tr>
                        <Td py={0}> {moment(val.requestTime).format("LLL")}</Td>
                        <Td>{val.firstname + "  " + val.lastname}</Td>
                        <Td>
                          <Badge
                            colorScheme={val.editable === 1 ? "green" : "red"}
                          >
                            {val.editable === 1 ? "YES" : "NO"}
                          </Badge>
                        </Td>
                        <Td>
                          {val.editable === 1 ? (
                            <IconButton
                              colorScheme="orange"
                              icon={<BiLock />}
                              size="sm"
                              onClick={() => {
                                // acceptRequest();
                                lockEdit(val.patientId);
                              }}
                            />
                          ) : (
                            "---"
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </>
              ) : (
                <Tr>
                  <Td py={4} colSpan={4} textAlign="center" fontStyle="italic">
                    -- No data available --
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default RequestTable;
