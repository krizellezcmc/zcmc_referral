import React, { useState } from "react";
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import ReferralForm from "../Components/ReferralForm";
import SearchPatient from "../Components/SearchPatient";
import { Button, Flex } from "@chakra-ui/react";
import { BiRefresh, BiSearch } from "react-icons/bi";

function Home() {
  const [stat, setStat] = useState("old");

  const addNew = () => {
    setStat("new");
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const old = () => {
    setStat("old");
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="content-wrapper">
          {/* <ReferralForm /> */}
          {stat === "old" ? (
            <>
              <Button
                variant="solid"
                colorScheme="green"
                mb={4}
                m={5}
                onClick={addNew}
              >
                + Refer new patient
              </Button>

              <Button onClick={refreshPage} leftIcon={<BiRefresh />}>
                Refresh
              </Button>
              <SearchPatient />
            </>
          ) : (
            <>
              <Button
                variant="solid"
                colorScheme="green"
                mb={4}
                m={5}
                leftIcon={<BiSearch />}
                onClick={old}
              >
                Search Patient
              </Button>

              <ReferralForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
