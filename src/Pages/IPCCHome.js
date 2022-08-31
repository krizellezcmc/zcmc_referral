import React from "react";
import CovidForm from "../Components/CovidForm";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Button } from "@chakra-ui/react";
import { BiRefresh } from "react-icons/bi";

function IPCCHome(props) {
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-wrapper" style={{ padding: "30px" }}>
            <Button
              variant="solid"
              leftIcon={<BiRefresh />}
              onClick={refreshPage}
              mb={7}
            >
              Refresh Page
            </Button>
            <CovidForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IPCCHome;
