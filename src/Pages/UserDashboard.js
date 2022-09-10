import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardTile from "../Components/DashboardTile";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import Graphs from "../Components/Graphs";
import LineChart from "../Components/LineChart";

function UserDashboard(props) {
  let navigate = useNavigate();

  const navigation = (id) => {
    navigate({ pathname: "changepass/" + id });
  };
  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div
            className="content-wrapper"
            style={{
              backgroundColor: "#eeef",

              padding: "35px",
            }}
          >
            <Button colorScheme="green" onClick={() => navigation(123)}>
              Navidate to user
            </Button>
            <HStack mb={8}>
              <DashboardTile
                title="Referred Patients"
                footer="Daily Referrals"
                stat="100"
                subfooter="35"
                hospital
              />

              <DashboardTile
                title="Discharged Patients"
                footer="Daily Discharges"
                stat="87"
                subfooter="0"
                hospital
              />
              <DashboardTile
                title="Pending Requests"
                footer="Today"
                stat="2"
                subfooter="3"
                hospital
              />
              <DashboardTile
                title="Referring Hospitals"
                footer="Active Hospitals"
                subfooter="2"
                stat="40"
                hospital
              />
            </HStack>

            <HStack>
              <Graphs />
              <LineChart />
            </HStack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
