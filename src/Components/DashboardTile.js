import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Link,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { BiChevronRightCircle } from "react-icons/bi";
import api from "../API/Api.js";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import SamplePie from "./SamplePie.js";

function DashboardTile(props) {
  const [admitted, setAdmitted] = useState(0);
  const [pending, setPending] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [arrived, setArrived] = useState(0);
  const [transferred, setTransferred] = useState(0);
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
    const getArrived = async () => {
      let arrived = await api.get("/dashboard/arrived.php");
      setArrived(arrived.data);
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
    };
    getData();
    getTransferred();
    getPending();
    getIncoming();
    getArrived();
    getAdmitted();
  }, [data]);
  return (
    <>
      <HStack mb={10}>
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="base">
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
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="base">
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
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="base">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel>ARRIVED RFERRALS</StatLabel>
            <StatNumber>{arrived}</StatNumber>
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
        <Box
          bg="green.100"
          width="25%"
          borderRadius={5}
          boxShadow="base"
          ml={3}
        >
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
        <Box bg="green.100" width="25%" borderRadius={5} boxShadow="base">
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
      <HStack align="center">
        <Link
          href="https://datastudio.google.com/embed/reporting/022ec084-5a9f-497d-8353-ab6f715bef8b/page/8MeLC"
          bgColor="blue.500"
          py={2}
          px={4}
          borderRadius={8}
          fontSize={14}
          fontWeight={500}
          color="white"
          _hover={{ textDecoration: "none" }}
          shadow="base"
          target="_blank"
        >
          OHC Bed Monitoring
        </Link>
        <Link
          href="https://datastudio.google.com/embed/reporting/022ec084-5a9f-497d-8353-ab6f715bef8b/page/p_58f3p0sqoc"
          bgColor="green.500"
          py={2}
          px={4}
          borderRadius={8}
          fontSize={14}
          fontWeight={500}
          color="white"
          _hover={{ textDecoration: "none" }}
          shadow="base"
          target="_blank"
        >
          ZCMC Bed Monitoring
        </Link>
      </HStack>

      {/* <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer> */}
      <SamplePie />

      {/* </div> */}
    </>
  );
}

export default DashboardTile;
