import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import DashboardTile from "../Components/DashboardTile";
import Reason from "../Components/Charts/Reason";
import TopReferrals from "../Components/Charts/TopReferrals";
import { VscGraph } from "react-icons/vsc";
import { BiBed, BiBuilding } from "react-icons/bi";

function AdminDashboard(props) {
  return (
    <div>
      <div className="container">
        <Sidebar />

        <div className="content">
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <div
              style={{ backgroundColor: "#F0F8F8", flex: 1 }}
              className="content-wrapper"
            >
              <Flex alignItems="center" mb={7}>
                <Heading fontWeight={700} fontSize={31} color="teal.900" mr={3}>
                  DASHBOARD
                </Heading>
                <VscGraph fontSize={18} />
                <Spacer />{" "}
                <HStack align="center">
                  <Button
                    as={Link}
                    href="https://datastudio.google.com/embed/reporting/022ec084-5a9f-497d-8353-ab6f715bef8b/page/8MeLC"
                    fontSize={14}
                    fontWeight={500}
                    bgColor="blue.600"
                    color="white"
                    _hover={{ textDecoration: "none" }}
                    // shadow="base"
                    target="_blank"
                    rightIcon={<BiBed />}
                  >
                    OHC Bed Monitoring
                  </Button>
                  <Button
                    as={Link}
                    href="https://datastudio.google.com/embed/reporting/022ec084-5a9f-497d-8353-ab6f715bef8b/page/p_58f3p0sqoc"
                    bgColor="green.500"
                    fontSize={14}
                    fontWeight={500}
                    color="white"
                    _hover={{ textDecoration: "none" }}
                    target="_blank"
                    rightIcon={<BiBuilding />}
                  >
                    ZCMC Bed Monitoring
                  </Button>
                </HStack>
              </Flex>

              <DashboardTile />

              <Box
                display={{ xl: "flex" }}
                width="100%"
                // className="content"
              >
                <Box
                  boxShadow="md"
                  borderColor="white"
                  bg="white"
                  borderRadius={5}
                  mr={3}
                >
                  <TopReferrals />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  boxShadow="md"
                  borderColor="white"
                  bg="white"
                  borderRadius={5}
                >
                  <Reason />
                </Box>

                {/* <Box
                bg="white"
                boxShadow="md"
                borderColor="white"
                width="100%"
                borderRadius={5}
              >
                <SamplePie />
              </Box> */}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
