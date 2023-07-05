import { Box, Button, Link, Text } from "@chakra-ui/react";
import React from "react";

function MobileBanner(props) {
  return (
    <div>
      <Box px={5} pt={20}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "2em", sm: "2.3em", md: "3em", lg: "3em" }}
          letterSpacing={{ lg: "wide" }}
          className="header-text"
          mt={8}
          transition="ease-in"
          transitionDuration="2s"
        >
          Patient Navigation
          <br />
          and Referral System
        </Text>

        <Text
          mt={7}
          color="gray.500"
          fontWeight="300"
          letterSpacing="wide"
          fontSize={{ md: 12, lg: 15, sm: 12, xs: 10 }}
        >
          Introducing the Web Based Referral System- a cutting-edge solution
          that revolutionizes the way healthcare facilities refer patients to
          tertiary care hospital.
          <b>“Matching right PATIENT to right FACILITY at the right TIME.” </b>
        </Text>

        <Box display={{ md: "flex" }} mt={10}>
          <Button
            rounded="full"
            px={4}
            fontSize={{ md: "sm", lg: "md", sm: "sm" }}
            colorScheme="green"
            mr={{ base: 2, lg: 3, sm: 2 }}
            // onClick={login}
            shadow="base"
            _hover={{
              paddingLeft: 8,
              paddingRight: 8,
              transition: ".5s ease",
            }}
          >
            Refer a patient
          </Button>

          <Link _hover={{ textDecoration: "none" }} href="#about">
            <Button
              rounded="full"
              colorScheme="green"
              variant="outline"
              shadow="sm"
              _hover={{
                paddingLeft: 5,
                paddingRight: 5,
                transition: ".5s ease",
              }}
            >
              See more
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default MobileBanner;
