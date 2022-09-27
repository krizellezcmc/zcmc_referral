import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import OpcenReferral from "../Components/OpcenReferral";
import {
  Badge,
  Box,
  Center,
  Container,
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
import useAuth from "../Hooks/useAuth";

function OpcenHome() {
  const [showContent, setShowContent] = useState(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [remarks, setRemarks] = useState([]);

  const { user } = useAuth();

  const select = (e) => {
    setSelected(e);
    setShowContent(true);
  };

  const fetchComments = async () => {
    let response = await api.get("/get_comment.php", {
      params: { patientId: selected },
    });

    setRemarks(response.data);
  };

  const fetchPatients = async (e) => {
    let pat = await api.get("/get_list.php");
    setList(pat.data);
  };

  useEffect(() => {
    fetchPatients();
    fetchComments();
  }, [selected]);

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
            <Container mt={10} maxW="container.lg">
              <Tabs variant="enclosed">
                <TabList mb="1em">
                  <Tab>
                    <Text>Patient Referral</Text>
                  </Tab>
                  <Tab>
                    <Text>
                      Remarks
                      <Badge ml="1.5" colorScheme="blue">
                        {remarks.length}
                      </Badge>
                    </Text>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Center mt={20} w="1400px">
                      <Box px={20}>
                        <OpcenReferral patientId={selected} />
                      </Box>
                    </Center>
                  </TabPanel>
                  <TabPanel>
                    <Box>
                      <AddComment patientId={selected} user={user?.userId} />

                      <Box>
                        {remarks.map((el, key) => {
                          return (
                            <>
                              <Comment
                                remark={el.remark}
                                date={el.tstamp}
                                user={el.firstName + " " + el.lastName}
                                dept={el.department}
                              />
                            </>
                          );
                        })}
                      </Box>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Container>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default OpcenHome;
