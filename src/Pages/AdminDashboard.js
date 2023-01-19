import { AspectRatio, Box, HStack, Link } from "@chakra-ui/react";
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import DashboardTile from "../Components/DashboardTile";
import Reason from "../Components/Charts/Reason";
import SamplePie from "../Components/Charts/SpecializationChart";
import TopReferrals from "../Components/Charts/TopReferrals";

function AdminDashboard(props) {
  return (
    <div>
      <div
        className="container"
        style={{ backgroundColor: "rgb(247, 252, 245)" }}
      >
        <Sidebar />
        <div className="content">
          <Header />
          <Box className="content-wrapper">
            <DashboardTile />

            <Box
              display={{ xl: "flex" }}
              mt={4}

              // className="content"
            >
              <Box width="100%" bg="white" borderRadius={5} mr={3}>
                <TopReferrals />
              </Box>
              <Box
                width="100%"
                // width="50%"
                bg="white"
                borderRadius={5}
                mr={3}
              >
                <Reason />
              </Box>

              <Box bg="white" width="100%" borderRadius={5}>
                <SamplePie />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
