import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ReferralForm from "../Components/ReferralForm";
import {
  Badge,
  Box,
  Center,
  Circle,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";

function OpcenHome() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="">
          <Center>
            <Tabs>
              <Box
                bg="white"
                w="76%"
                style={{
                  position: "fixed",
                  zIndex: "50",
                  paddingTop: "30px",
                }}
              >
                <TabList>
                  <Tab>Patient Referral</Tab>
                  <Tab>
                    <Text fontWeight="bold">
                      Comments
                      <Badge ml="1.5" colorScheme="blue">
                        0
                      </Badge>
                    </Text>
                  </Tab>
                </TabList>
              </Box>

              <TabPanels>
                <TabPanel>
                  <Center mt={20} w="1400px">
                    <Box px={20}>
                      {" "}
                      <ReferralForm />
                    </Box>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center mt={20} w="1400px">
                    <Box px={20}>
                      <AddComment />
                      <Box mx={5} p={3}>
                        <Comment />
                        <hr />
                        <Comment />
                      </Box>
                    </Box>
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Center>
        </div>
      </div>
    </div>
  );
}

export default OpcenHome;
