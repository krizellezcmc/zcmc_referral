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
        height={{ lg: 350, md: 300, sm: 250 }}
        width={{ lg: 250, md: 170, sm: 180 }}
        mr={{ lg: 5, md: 3 }}
        borderRadius="16"
        bgColor="white"
        p={3}
        boxShadow="xl"
        mt={{ sm: 5 }}
      >
        <Box
          borderRadius={{ sm: 5, md: 16 }}
          bgColor={props.color}
          height={{ lg: 270, md: 180, sm: 180 }}
          width={{ lg: 225, md: 146, sm: 156 }}
          align="center"
        >
          <Image src={props.image} height={props.height} width={props.width} />
        </Box>
        <Box mt={{ sm: 3, md: 5 }}>
          <Text
            fontSize={{ lg: 14, md: 12, sm: 11 }}
            color="gray.700"
            fontWeight={600}
          >
            {props.name}
          </Text>
          <Box display={{ sm: "flex", md: "flex" }}>
            <Text fontSize={{ lg: 13, md: 10, sm: 10 }} color="gray.700">
              {props.position}
            </Text>
            <Spacer />
            <Link>
              <Icon as={SiFacebook} mr={2} boxSize={{ sm: 3 }} />
            </Link>
            <Link>
              <Icon as={SiInstagram} boxSize={{ sm: 3 }} />
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProfileTile;
