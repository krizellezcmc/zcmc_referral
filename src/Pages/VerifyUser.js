import React from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import UsersTable from "../Components/UsersTable";
import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";

function VerifyUser() {
  // localStorage.setItem("/verifyuser", window.location.href);

  // const currentPage = localStorage.getItem("/verifyuser");

  // if (currentPage) {
  //   window.location.href = currentPage;
  // } else {
  //   window.location.href = "/";
  // }

  return (
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
            <Flex alignItems="center" mb={10} pt={3} px={10}>
              <Heading fontWeight={700} fontSize={31} color="teal.900" mr={3}>
                Users
              </Heading>
              <TbUsers fontSize={30} />
              <Spacer />{" "}
              <Button
                rightIcon={<BiRefresh />}
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Refresh
              </Button>
            </Flex>

            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
