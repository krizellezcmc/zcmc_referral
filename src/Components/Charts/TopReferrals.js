import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import api from "../../API/Api";
import "../../Styles/Reports.css";

function TopReferrals(props) {
  const [data, setData] = useState([]);

  const getData = async () => {
    let response = await api.get("/reports/topFacility.php");

    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <TableContainer>
        <Table variant="striped" size="md" width="100%">
          <TableCaption color="teal.600">Top Referrals</TableCaption>
          <Thead>
            <Tr>
              <Th>Referring Facility</Th>
              <Th>Referrals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element) => {
              return (
                <Tr>
                  <Td>
                    <span className="p-refname">
                      <Text
                        fontWeight={500}
                        color="teal.700"
                        fontSize={13}
                        className="refname"
                      >
                        {element.refFacility}
                      </Text>
                    </span>
                  </Td>
                  <Td textAlign="center">
                    <Text fontWeight={600} color="teal.600" fontSize={14}>
                      {element.value}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TopReferrals;
