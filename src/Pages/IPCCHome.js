import React from "react";
import CovidForm from "../Components/CovidForm";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";
import useAuth from "../Hooks/useAuth";
import { TbUsers, TbVirus } from "react-icons/tb";

function IPCCHome(props) {
  const refreshPage = () => {
    window.location.href = "/login";
  };

  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <Container maxW="container.4xl" p={8}>
            <Flex alignItems="center">
              <Heading
                fontWeight={700}
                fontSize={33}
                color="teal.900"
                mr={3}
                textTransform="uppercase"
              >
                Covid-19 Testing
              </Heading>
              <TbVirus fontSize={30} />

              <Box>
                <Text></Text>
              </Box>
            </Flex>

            <Box mt={8}>
              {" "}
              <CovidForm name={user?.firstName + " " + user?.lastName} />
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default IPCCHome;
