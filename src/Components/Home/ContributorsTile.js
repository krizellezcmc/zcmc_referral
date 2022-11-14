import React from "react";
import {
  Text,
  Box,
  Image,
  Icon,
  Link,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { SiFacebook, SiInstagram } from "react-icons/si";

function ContributorsTile(props) {
  return (
    <div>
      <Box
        mr={{ lg: 0, md: 3, xl: 0 }}
        bgColor="white"
        // boxShadow="xl"
      >
        <Box height={props.height} width={props.width}>
          <Image src={props.image} width="100%" />
        </Box>
        <Box mt={10} align="center">
          <Text fontSize={props.nameFontSize} color="gray.700" fontWeight={600}>
            {props.name}
          </Text>
          <Box align="center">
            <Text fontSize={{ lg: 13, md: 11 }} color="gray.700">
              {props.position}
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ContributorsTile;
