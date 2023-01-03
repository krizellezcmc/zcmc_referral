import React from "react";
import { Box, HStack, Text, Badge, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function AdmissionTable(props) {
  let navigate = useNavigate();
  const nav = (id) => {
    navigate({ pathname: "/admission/" + id });
  };

  return (
    <div>
      <Box
        as="button"
        w="100%"
        _hover={{
          background: "green.50",
          color: "black",
          borderLeft: "2px",
          borderColor: "green",
          transform: "scale(1.01)",
        }}
        py={3}
        onClick={() => {
          nav(props.value);
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
              colorScheme={props.status === "pending" ? "yellow" : "green"}
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

export default AdmissionTable;
