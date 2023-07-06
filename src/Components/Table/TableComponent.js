import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function TableComponent({ header, body }) {
  return (
    <div>
      <Flex
        justifyContent="space-between"
        bgColor="white"
        p={3}
        borderRadius="sm"
        mb={5}
      >
        {header.map((h) => {
          return (
            <>
              <Box>
                <Text color="#B3B3B3" textAlign="center">
                  {h.title}{" "}
                </Text>
              </Box>
            </>
          );
        })}
      </Flex>
      <Flex
        justifyContent="space-between"
        bgColor="white"
        p={3}
        borderRadius="sm"
      >
        {header.map((h) => {
          return (
            <>
              <Box>
                <Text color="#B3B3B3" textAlign="center">
                  {h.title}{" "}
                </Text>
              </Box>
            </>
          );
        })}
      </Flex>
    </div>
  );
}

export default TableComponent;
