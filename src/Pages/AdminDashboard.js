import { AspectRatio, Box, HStack, Link } from "@chakra-ui/react";
import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import DashboardTile from "../Components/DashboardTile";
import Reason from "../Components/Charts/Reason";
import SamplePie from "../Components/Charts/SamplePie";

function AdminDashboard(props) {
  return (
    <div>
      <div className="container" style={{ background: "rgb(247, 252, 245)" }}>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper">
            <DashboardTile />

            <HStack mt={4}>
              <Box
                width="50%"
                boxShadow="sm"
                bg="white"
                borderRadius={5}
                mr={3}
              >
                <Reason />
              </Box>

              <Box width="50%" boxShadow="sm" bg="white" borderRadius={5}>
                <SamplePie />
              </Box>
            </HStack>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
