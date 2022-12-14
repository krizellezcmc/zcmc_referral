import React from "react";
import { Text, Box, Image, Icon, Link, Spacer } from "@chakra-ui/react";
import { SiFacebook, SiInstagram } from "react-icons/si";

function ProfileTile(props) {
  return (
    <div>
      <Box
        height={{ lg: 260, md: 260, sm: 250 }}
        width={{ lg: 210, md: 170, sm: 170 }}
        mr={props.mr}
        borderRadius="10"
        bgColor="gray.50"
        p={3}
        boxShadow="md"
        mt={{ sm: 5 }}
      >
        <Box
          borderRadius={100}
          bgColor={props.color}
          height={{ lg: 200, md: 180, sm: 180 }}
          width={{ lg: 186, md: 146, sm: 156 }}
          align="center"
        >
          <Image
            src={props.image}
            height={props.height}
            width={props.width}
            borderRadius={80}
          />
        </Box>
        <Box mt={{ sm: 3, md: 5 }} textAlign="center">
          <Text
            fontSize={{ lg: 12, md: 12, sm: 11 }}
            color="gray.700"
            fontWeight={600}
          >
            {props.name}
          </Text>
          <Box>
            <Text fontSize={{ lg: 11, md: 10, sm: 10 }} color="gray.700">
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
