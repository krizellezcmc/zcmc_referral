import React from "react";
import { Box, Text } from "@chakra-ui/react";

function SectionHeader({ title, description }) {
  return (
    <div>
      <Box p={3} align="center">
        <Text
          fontWeight="bold"
          fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
          letterSpacing="wide"
        >
          {title}
        </Text>

        <Text
          mt={5}
          fontWeight="300"
          letterSpacing="wide"
          w={{ sm: 400, md: 600 }}
          fontSize={{ md: 13, lg: 16, sm: 13 }}
        >
          {description}
        </Text>
      </Box>
    </div>
  );
}

export default SectionHeader;
