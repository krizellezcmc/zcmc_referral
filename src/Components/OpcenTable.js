import React from "react";
import {
  Box,
  HStack,
  Spacer,
  Text,
  Container,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function OpcenTable(props) {
  let navigate = useNavigate();
  const naviOpcenH2 = (id) => {
    navigate({ pathname: "/opcenhome/" + id });
  };

  return (
    <div>
      <Box
        as="button"
        w="100%"
        _hover={{
          background: "green.50",
          color: "black",
          borderTop: "2px",
          borderColor: "green",
        }}
        py={3}
        onClick={() => {
          naviOpcenH2(props.value);
        }}
      >
        <HStack>
          <Box w="100%" textAlign="center">
            <Text fontWeight="900" fontSize="13px">
              {props.name}
            </Text>
            <Text fontSize="12px" fontWeight={500}>
              Age: {props.age}
            </Text>
            <Text fontSize="12px" fontWeight={500}>
              Gender: {props.gender}
            </Text>
            <Text fontSize="12px" fontWeight={500}>
              Specialization: {props.service}
            </Text>
          </Box>

          <Box w="100%" textAlign="center">
            <Text fontWeight="500" fontSize="13px">
              {props.facility}
            </Text>
          </Box>
          <Box w="100%" textAlign="center">
            <Text fontWeight="500" fontSize="13px">
              {moment(props.date).format("LLL")}
            </Text>
          </Box>
          <Box w="100%" textAlign="center">
            <Badge
              variant="subtle"
              fontWeight="bolder"
              fontSize="13px"
              colorScheme="green"
            >
              {props.status}
            </Badge>
          </Box>
        </HStack>
      </Box>
      <Divider />
    </div>
  );
}

export default OpcenTable;
