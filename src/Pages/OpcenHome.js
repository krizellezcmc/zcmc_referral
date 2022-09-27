import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import OpcenReferral from "../Components/OpcenReferral";
import {
  Badge,
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Select } from "chakra-react-select";

function OpcenHome() {
  const [showContent, setShowContent] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [user, setUser] = useState(125);

  const select = (e) => {
    setSelected(e);
    setShowContent(true);
  };

  const fetchPatients = async (e) => {
    let pat = await api.get("/get_list.php");
    setList(pat.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <Header />
        <div className="">
          <Box w="700px" p={5}>
            <Select
              style={{ position: "fixed", zIndex: "50" }}
              options={list}
              placeholder="Search patient"
              selectedOptionStyle="check"
              closeMenuOnSelect={true}
              focusBorderColor="#058e46"
              onChange={(e) => {
                select(e.value);
              }}
              width="70%"
              required
              useBasicStyles
            />
          </Box>

          {showContent ? (
            <Center>
              <Tabs>
                <Box
                  bg="white"
                  w="76%"
                  style={{
                    position: "fixed",
                    zIndex: "0",
                    paddingTop: "20px",
                  }}
                >
                  <TabList>
                    <Tab>Patient Referral</Tab>
                    <Tab>
                      <Text fontWeight="bold">
                        Remarks
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
                        <OpcenReferral patientId={selected} />
                      </Box>
                    </Center>
                  </TabPanel>
                  <TabPanel>
                    <Center mt={20} w="1400px">
                      <Box px={20}>
                        <AddComment patientId={selected} user={user} />
                        <Box mx={5} p={3}>
                          <Comment patientId={selected} />
                        </Box>
                      </Box>
                    </Center>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Center>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default OpcenHome;
