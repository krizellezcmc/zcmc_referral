import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { BiBed, BiBuilding, BiChevronRightCircle } from "react-icons/bi";
import api from "../API/Api.js";

function DashboardTile(props) {
  const [admitted, setAdmitted] = useState(0);
  const [pending, setPending] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [transferred, setTransferred] = useState(0);
  const [data, setData] = useState([]);

  // const COLORS = ["#FFCB42", "#42855B", "#FF7F3F"];

  useEffect(() => {
    const getAdmitted = async () => {
      let admitted = await api.get("/dashboard/admitted.php");
      setAdmitted(admitted.data);
    };
    const getPending = async () => {
      let pending = await api.get("/dashboard/pending.php");
      setPending(pending.data);
    };
    const getCancelled = async () => {
      let cancelled = await api.get("/dashboard/cancelled.php");
      setCancelled(cancelled.data);
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
    getCancelled();
    getAdmitted();
  }, [data]);
  return (
    <>
      <HStack mb={5}>
        <Box bg="teal.50" width="25%" borderRadius={8} boxShadow="base">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel color="teal.900" fontWeight={700}>
              PENDING RFERRALS
            </StatLabel>
            <StatNumber>{pending}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex bg="teal.100" pl={8} py={3} px={6} alignItems="center">
            <Link
              href="/opcen"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
              color="teal.900"
            >
              See More
            </Link>
            <Spacer />
            <BiChevronRightCircle />
          </Flex>
        </Box>
        <Box bg="teal.50" width="25%" borderRadius={8} boxShadow="base">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel color="teal.900" fontWeight={700}>
              INCOMING RFERRALS
            </StatLabel>
            <StatNumber>{incoming}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex background="teal.100" pl={8} py={3} px={6} alignItems="center">
            <Link
              href="/opcen"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
              color="teal.900"
            >
              See More
            </Link>
            <Spacer />
            <BiChevronRightCircle />
          </Flex>
        </Box>

        <Box bg="teal.50" width="25%" borderRadius={8} boxShadow="base" ml={3}>
          <Stat px={8} pt={7} pb={3}>
            <StatLabel color="teal.900" fontWeight={700}>
              ADMITTED RFERRALS
            </StatLabel>
            <StatNumber>{admitted}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex bg="teal.100" pl={8} py={3} px={6} alignItems="center">
            <Link
              href="/opcen"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
              color="teal.900"
            >
              See More
            </Link>
            <Spacer />
            <BiChevronRightCircle />
          </Flex>
        </Box>

        <Box bg="teal.50" width="25%" borderRadius={8} boxShadow="base">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel color="teal.900" fontWeight={700}>
              CANCELLED RFERRALS
            </StatLabel>
            <StatNumber>{cancelled}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex background="teal.100" pl={8} py={3} px={6} alignItems="center">
            <Link
              href="/opcen"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
              color="teal.900"
            >
              See More
            </Link>
            <Spacer />
            <BiChevronRightCircle />
          </Flex>
        </Box>

        <Box bg="teal.50" width="25%" borderRadius={8} boxShadow="base">
          <Stat px={8} pt={7} pb={3}>
            <StatLabel color="teal.900" fontWeight={700}>
              TRANSFERRED RFERRALS
            </StatLabel>
            <StatNumber>{transferred}</StatNumber>
            <StatHelpText style={{ display: "flex", alignItems: "center" }}>
              <Circle size="7px" bg="green" color="white" mr={2} />
              Sep 2022 - {moment().format("MMM YYYY")}
            </StatHelpText>
          </Stat>

          <Flex bg="teal.100" pl={8} py={3} px={6} alignItems="center">
            <Link
              href="/opcen"
              _hover={{ textDecoration: "none" }}
              fontSize="sm"
              fontWeight="500"
              ml={1}
              mt={-0.5}
              color="teal.900"
            >
              See More
            </Link>
            <Spacer />
            <BiChevronRightCircle />
          </Flex>
        </Box>
      </HStack>
    </>
  );
}

export default DashboardTile;
