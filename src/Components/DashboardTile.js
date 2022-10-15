import {
  Box,
  Circle,
  Flex,
  HStack,
  Link,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { BiChevronRightCircle } from "react-icons/bi";
import api from "../API/Api.js";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function DashboardTile(props) {
  const [admitted, setAdmitted] = useState("");
  const [pending, setPending] = useState("");
  const [incoming, setIncoming] = useState("");
  const [transferred, setTransferred] = useState("");
  const [data, setData] = useState([]);

  const COLORS = ["#FFCB42", "#42855B", "#FF7F3F"];

  useEffect(() => {
    const getAdmitted = async () => {
      let admitted = await api.get("/dashboard/admitted.php");
      setAdmitted(admitted.data);
    };
    const getPending = async () => {
      let pending = await api.get("/dashboard/pending.php");
      setPending(pending.data);
    };
    const getIncoming = async () => {
      let incoming = await api.get("/dashboard/incoming.php");
      setIncoming(incoming.data);
    };
    const getTransferred = async () => {
      let transfer = await api.get("/dashboard/transferred.php");
      setTransferred(transfer.data);
    };
    const getData = async () => {
      let pieData = await api.get("/dashboard/covid.php");
      setData(pieData.data);
      console.log(data);
    };
    getData();
    getTransferred();
    getPending();
    getIncoming();
    getAdmitted();
  }, [data]);
  return (
    <>
      <HStack mb={10}>
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="lg" ml={3}>
          <Stat px={8} pt={7} pb={3}>
            <StatLabel>ADMITTED RFERRALS</StatLabel>
            <StatNumber>{admitted}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex
            background="white"
            borderTop="1px solid lightgrey"
            pl={8}
            py={3}
          >
            <BiChevronRightCircle />
            <Link
              href="/patientlist"
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
            >
              See More...
            </Link>
          </Flex>
        </Box>
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="lg">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel>INCOMING RFERRALS</StatLabel>
            <StatNumber>{incoming}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex
            background="white"
            borderTop="1px solid lightgrey"
            pl={8}
            py={3}
          >
            <BiChevronRightCircle />
            <Link href="/opcen" fontSize="sm" fontWeight="500" ml={1} mt={-0.5}>
              See More...
            </Link>
          </Flex>
        </Box>
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="lg">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel>PENDING RFERRALS</StatLabel>
            <StatNumber>{pending}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex
            background="white"
            borderTop="1px solid lightgrey"
            pl={8}
            py={3}
          >
            <BiChevronRightCircle />
            <Link href="/opcen" fontSize="sm" fontWeight="500" ml={1} mt={-0.5}>
              See More...
            </Link>
          </Flex>
        </Box>
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="lg">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel>TRANSFERRED RFERRALS</StatLabel>
            <StatNumber>{transferred}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex
            background="white"
            borderTop="1px solid lightgrey"
            pl={8}
            py={3}
          >
            <BiChevronRightCircle />
            <Link
              href="/transfer"
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
            >
              See More...
            </Link>
          </Flex>
        </Box>
      </HStack>
      {/* <div style={{ width: "100%", height: 300 }}> */}
      <Box
        width="50%"
        height="500"
        border="2px"
        borderColor="yellowgreen"
        borderRadius="lg"
        mt={10}
        ml={3}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
      {/* </div> */}
    </>
  );
}

export default DashboardTile;
