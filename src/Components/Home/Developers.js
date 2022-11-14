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
import ProfileTile from "./ProfileTile";

function Developers(props) {
  var dog1 = require("../../Assets/dog-alyana.png");
  var dog2 = require("../../Assets/dog-krizelle.png");
  return (
    <div>
      <Box mt={{ lg: 20, md: 10, sm: 0 }} mb={10} display={{ md: "flex" }}>
        <Box
          mt={{ base: 5, lg: 20, md: 20 }}
          mr={{ lg: 10, md: 10, sm: 5 }}
          p={5}
          width={{ md: 500 }}
        >
          <Text
            fontWeight={700}
            fontSize={{ md: "3xl", lg: "5xl", sm: "4xl" }}
            color="white"
            letterSpacing="wide"
          >
            Meet the <br />
            Team.
          </Text>

          <Text
            mt={3}
            align="justify"
            color="white"
            fontWeight={400}
            fontSize={{ sm: 14 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore..
          </Text>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 5, md: 10 }}
          mb={{ lg: 10, md: 5 }}
          display={{ sm: "flex" }}
        >
          <ProfileTile
            image={dog1}
            name="John Mary C. Sta Teresa"
            color="#A1CDDE"
            position="Statistician II"
          />
          <ProfileTile
            image={dog1}
            name="Alyana Claire C. Barretto"
            color="#B8C294"
            position="Software Developer"
          />
          <ProfileTile
            image={dog1}
            name="Krizelle Mae B. Falcasantos"
            color="#F0CAC7"
            position="Software Developer"
          />
        </Box>
      </Box>
    </div>
  );
}

export default Developers;
