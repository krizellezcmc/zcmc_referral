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

function ProfileTile(props) {
  return (
    <div>
      <Box
        height={{ lg: 350, md: 300 }}
        width={{ lg: 250, md: 170 }}
        mr={{ lg: 5, md: 3 }}
        borderRadius="16"
        bgColor="white"
        p={3}
        boxShadow="xl"
      >
        <Box
          borderRadius="16"
          bgColor={props.color}
          height={{ lg: 260, md: 180 }}
          width={{ lg: 225, md: 146 }}
          align="center"
        >
          <Image
            src={props.image}
            height={{ lg: 260, md: 180 }}
            width={{ lg: 200, md: 160 }}
          />
        </Box>
        <Box mt={5}>
          <Text fontSize={{ lg: 14, md: 12 }} color="gray.700" fontWeight={600}>
            {props.name}
          </Text>
          <Box display={{ md: "flex" }}>
            <Text fontSize={{ lg: 13, md: 10 }} color="gray.700">
              {props.position}
            </Text>
            <Spacer />
            <Link>
              <Icon as={SiFacebook} mr={2} />
            </Link>
            <Link>
              <Icon as={SiInstagram} />
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProfileTile;
