import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
} from "@chakra-ui/react";

import api from "../API/Api";
import Spinner from "./Spinner";

function CancelledModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetch = async () => {
    setIsLoading(true);
    let response = await api.get("/get_cancelled.php");

    if (response) {
      setList(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Center mt={15}>
          <Spinner />
        </Center>
      ) : (
        <>
          <TableContainer>
            <Table
              cellSpacing={0}
              size="sm"
              variant="striped"
              colorScheme="teal"
            >
              <Thead>
                <Tr>
                  <Th className="border">Full name</Th>
                  <Th className="border">Age</Th>
                  <Th className="border">Diagnosis</Th>
                  <Th className="border">Referred Date</Th>
                  <Th className="border">Referred From</Th>
                  <Th className="border">Reason for Referral</Th>
                  <Th className="border">Reason for Transfer</Th>
                </Tr>
              </Thead>
              <Tbody>
                {list.length === 0 ? (
                  <Td className="border" colSpan={7} textAlign="center">
                    No cancelled referrals
                  </Td>
                ) : (
                  list.map((pat) => {
                    return (
                      <>
                        <Tr>
                          <Td className="border">
                            <b>
                              {pat.lastname +
                                ", " +
                                pat.firstname +
                                " " +
                                pat.middleName}
                            </b>
                          </Td>
                          <Td className="border">{pat.age}</Td>
                          <Td className="border">{pat.diagnosis}</Td>
                          <Td className="border">{pat.tstamp}</Td>
                          <Td className="border">{pat.refFacility}</Td>
                          <Td className="border">{pat.reason}</Td>
                          <Td className="border">{pat.rejectReason}</Td>
                        </Tr>
                      </>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default CancelledModal;
