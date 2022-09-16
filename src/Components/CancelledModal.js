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
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import axios from "axios";
import api from "../API/Api";

function CancelledModal(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/get_cancelled.php").then((response) => {
      setList(response.data);
    });
  }, [list]);

  return (
    <div>
      <TableContainer>
        <Table cellSpacing={0}>
          <Thead>
            <Tr>
              <Th className="border" width="30%">
                Full name
              </Th>
              <Th className="border" width="20%">
                Referred Date
              </Th>

              <Th className="border" width="20%">
                Referred From
              </Th>
              <Th className="border">Reason</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((pat) => {
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

                    <Td className="border">{pat.tstamp}</Td>
                    <Td className="border">{pat.refFacility}</Td>
                    <Td className="border">{pat.rejectReason}</Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CancelledModal;
