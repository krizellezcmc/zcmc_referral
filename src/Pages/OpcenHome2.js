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
  HStack,
  Divider,
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import AddComment from "../Components/AddComment";
import Comment from "../Components/Comment";
import { Select } from "chakra-react-select";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Spinner";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function OpcenHome2(props) {
  const [selected, setSelected] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { id } = useParams();

  const navigate = useNavigate();

  function homeOpcen() {
    navigate("/opcen");
  }

  useEffect(() => {
    axios
      .get(`http://192.168.3.121/zcmc_referral_api/api/get_comment.php/${id}`)
      .then((response) => {
        setRemarks(response.data);
        // setIsLoading(false);
        console.log(response.data);
      });
  }, [id]);
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

export default OpcenHome2;
