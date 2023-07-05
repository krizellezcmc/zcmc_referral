import React from "react";
import { Text, Box, Image } from "@chakra-ui/react";

function ProfileTile(props) {
  return (
    <div>
      <Box>
        <Image src={props.image} width={props.width} />

        <Box mt={{ sm: 3, md: 5 }} textAlign="center">
          <Text
            fontSize={{ lg: 13, md: 12, sm: 11 }}
            color="gray.700"
            fontWeight={600}
          >
            {props.name}
          </Text>
          <Box>
            <Text fontSize={{ lg: 12, md: 10, sm: 10 }} color="gray.700">
              {props.position}
            </Text>
            {/* <Spacer />
            <Link>
              <Icon as={SiFacebook} mr={2} boxSize={{ sm: 3 }} />
            </Link>
            <Link>
              <Icon as={SiLinkedin} boxSize={{ sm: 3 }} />
            </Link> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ProfileTile;
