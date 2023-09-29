import React from "react";
import { Box, Text, Badge, Divider, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BsFillCircleFill, BsFlag, BsFlagFill } from "react-icons/bs";
import api from "../API/Api";

function OpcenTable(props) {
  let navigate = useNavigate();
  const naviOpcenH2 = async (id) => {
    let response = await api.post("/remove_flag.php", { id: id });
    if (response.data.status === 1) {
      navigate({ pathname: "/opcenhome/" + id });
    } else {
      console.log(response.data);
    }
  };

  return (
    <div>
      <Flex
        as="button"
        w="100%"
        _hover={{
          background: "green.50",
          color: "black",
          borderLeft: "2px",
          borderColor: "green",
          transform: "scale(1.01)",
        }}
        justifyContent="space-between"
        alignItems="center"
        onClick={() => {
          naviOpcenH2(props.value);
        }}
        py={3}
        backgroundColor={props.isFlag === 1 ? "green.50" : "white"}
      >
        {props.isFlag === 1 ? (
          <Box pl={5}>
            <BsFillCircleFill color="green" size={15} />
          </Box>
        ) : (
          ""
        )}

        <Box w="full" textAlign="center">
          <Text fontWeight="900" fontSize="13px">
            {props.name}
          </Text>
          <Text fontSize="12px" fontWeight={400}>
            {props.age} yrs old, {props.gender}
          </Text>

          <Text fontSize="12px" fontWeight={500} fontStyle="italic">
            {props.service}
          </Text>
        </Box>

        <Box w="full" textAlign="center">
          <Text fontWeight="500" fontSize="13px">
            {props.facility}
          </Text>
        </Box>
        <Box w="full" textAlign="center">
          <Text fontWeight="500" fontSize="13px">
            {moment(props.date).format("LLL")}
          </Text>
        </Box>
        <Box w="full" textAlign="center">
          <Badge
            variant="subtle"
            fontWeight="bolder"
            fontSize="13px"
            px={2}
            colorScheme={props.status === "pending" ? "yellow" : "green"}
          >
            {props.status}
          </Badge>
        </Box>
      </Flex>
      <Divider />
    </div>
  );
}

export default OpcenTable;
