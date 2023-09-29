import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import api from "../API/Api";
import OpcenReferral from "../Components/OpcenReferral";
import {
  Badge,
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
} from "@chakra-ui/react";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import useAuth from "../Hooks/useAuth";
import Sidebar from "../Components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function ReferralHome(props) {
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { id } = useParams();

  const navigate = useNavigate();

  function homeOpcen() {
    navigate("/home");
  }

  useEffect(() => {
    const getC = async () => {
      let response = await api.get(`/get_comment.php/${id}`);
      setRemarks(response.data);
      // setIsLoading(false);
      console.log(response.data);
    };
    getC();
  }, [id, remarks]);
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="">
          {/* {isLoading ? (
              <Container>
                <Loading />
              </Container>
            ) : ( */}
          <Button
            onClick={homeOpcen}
            colorScheme="green"
            leftIcon={<BiArrowBack />}
            mt={5}
            ml={5}
          >
            Back
          </Button>

          <Container mt={10} maxW="container.xl">
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
                  <Box px={20}>
                    <OpcenReferral patientId={id} />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Container maxW="container.lg" px={20}>
                    <AddComment patientId={id} user={user?.userId} />

                    <Box>
                      {remarks.map((el, key) => {
                        return (
                          <>
                            {el.role === "opcen" ? (
                              <Comment
                                remark={el.remark}
                                date={el.remark_tstamp}
                                user={el.firstName + " " + el.lastName}
                                dept={"Zamboanga City Medical Center (OPCEN)"}
                              />
                            ) : (
                              <Comment
                                remark={el.remark}
                                date={el.remark_tstamp}
                                user={el.firstName + " " + el.lastName}
                                dept={el.name}
                              />
                            )}
                          </>
                        );
                      })}
                    </Box>
                  </Container>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default ReferralHome;
