import {
  Box,
  Circle,
  Container,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";

function DashboardTile(props) {
  return (
    <Box
      bg="green.200"
      width="360px"
      borderRadius={5}
      background="white"
      style={{
        marginRight: "20px",
      }}
    >
      <Stat px={8} pt={7} pb={3}>
        <StatLabel>{props.title}</StatLabel>
        <StatNumber>{props.stat}</StatNumber>
        <StatHelpText style={{ display: "flex", alignItems: "center" }}>
          <Circle size="7px" bg="green" color="white" mr={2} />
          Sep 2022 - {moment().format("MMM YYYY")}
        </StatHelpText>
      </Stat>
      <Box background="white" borderTop="1px solid lightgrey" pl={8} py={3}>
        <Text fontSize="sm" fontWeight="500">
          {props.footer}: {props.subfooter}
        </Text>
      </Box>
    </Box>
  );
}

export default DashboardTile;
