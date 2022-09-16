import React, { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import axios from "axios";
import moment from "moment";
import {
  Text,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  HStack,
  Spacer,
  useToast,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import { BiCalendar, BiSend } from "react-icons/bi";
import api from "../API/Api";
function CovidForm(props) {
  const [patient, setPatient] = useState([]);
  const [selected, setSelected] = useState("");

  const [status, setStatus] = useState(1);
  const [swabDate, setSwabDate] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [covidData, setCovidData] = useState("");

  patient.forEach((element, key) => {
    patient[key]["label"] =
      element.lastname +
      ", " +
      element.firstname +
      " " +
      element.middleName +
      " " +
      "(" +
      element.tstamp +
      ")";

    patient[key]["value"] =
      element.patientId +
      "/" +
      element.lastname +
      ", " +
      element.firstname +
      " " +
      element.middleName +
      " " +
      "/" +
      element.tstamp;
  });

  let data = selected.split("/");
  // let name = data[1];
  let id = data[0];
  // let refDate = data[2];

  const handleChange = (event) => {
    if (event.target.checked) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    let response = await api.post("/post_covid_status.php", {
      status: status,
      swabDate: swabDate,
      resultDate: resultDate,
      patId: id,
    });

    if (response) {
      toast({
        position: "top",
        title: "Success!",
        description: "Record successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchCovidData = async () => {
    let pat = await api.get("/get_acceptedpats.php");
    setPatient(pat.data);

    let covid = await api.get("/get_covid_status.php");
    setCovidData(covid.data);
  };

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    fetchCovidData();
  }, [patient, covidData]);

  let toast = useToast();

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ width: "700px" }}>
        <Text mb={2}>Search Patient</Text>
        <Select
          options={patient}
          placeholder="Search patient"
          selectedOptionStyle="check"
          closeMenuOnSelect={true}
          focusBorderColor="#058e46"
          onChange={(e) => {
            setSelected(e.value);
          }}
          width="100%"
          required
          useBasicStyles
        />
      </div>

      {selected === "" ? (
        ""
      ) : (
        <>
          <Box pt={7}>
            {patient
              .filter((pat) => pat.patientId === id)
              .map((i, k) => {
                return (
                  <>
                    <HStack
                      p={8}
                      mb={10}
                      style={{
                        borderRadius: "4px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.20) 0px 1px 3px, rgba(0, 0, 0, 0.15) 0px 0px 0px",
                      }}
                      w="1000px"
                    >
                      <Box>
                        <Text fontSize="14px">Patient name: </Text>
                        <Text fontWeight="500" fontSize="17px">
                          {i.lastname + ", " + i.firstname + " " + i.middleName}
                        </Text>
                      </Box>

                      <Spacer />

                      <Box>
                        <Text fontSize="14px">Referred From: </Text>
                        <Text fontWeight="500" fontSize="17px">
                          {i.refFacility}
                        </Text>
                      </Box>

                      <Spacer />

                      <Box>
                        <Text fontSize="14px">Referral Date: </Text>
                        <Text fontWeight="500" fontSize="17px">
                          {i.tstamp}
                        </Text>
                      </Box>
                    </HStack>
                  </>
                );
              })}

            {covidData.length !== 0 ? (
              covidData.map((i, k) => {
                return (
                  <>
                    <Box w={350} bg="#f7f8fb" p={7} borderRadius={10}>
                      <Text mb={1}>Result:</Text>

                      <Badge
                        fontSize="15px"
                        variant="subtle"
                        colorScheme={i.result === 1 ? "red" : "green"}
                      >
                        {i.result === 1 ? "Positive +" : "Negative -"}
                      </Badge>

                      <Text mt={9}>Swab Date:</Text>

                      <Text fontWeight="600" mt={1}>
                        {moment(i.swab_date).format("LLL")}
                      </Text>

                      <Text mt={9}>Result Date:</Text>

                      <Text fontWeight="600" mt={1}>
                        {moment(i.result_date).format("LLL")}
                      </Text>
                    </Box>
                  </>
                );
              })
            ) : (
              /* {covidData.map((i, k) => {
                  return (
                    <>
                      <Box w={350} bg="#f7f8fb" p={7} borderRadius={10}>
                        <Text mb={1}>Result:</Text>

                        <Badge
                          fontSize="15px"
                          variant="subtle"
                          colorScheme={i.result === 1 ? "red" : "green"}
                        >
                          {i.result === 1 ? "Positive +" : "Negative -"}
                        </Badge>

                        <Text mt={9}>Swab Date:</Text>

                        <Text fontWeight="600" mt={1}>
                          {moment(i.swab_date).format("LLL")}
                        </Text>

                        <Text mt={9}>Result Date:</Text>

                        <Text fontWeight="600" mt={1}>
                          {moment(i.result_date).format("LLL")}
                        </Text>
                      </Box>
                    </>
                  );
                })} */

              <>
                <form onSubmit={submit}>
                  <Box w={350}>
                    <Text fontWeight="600" mb={3}>
                      Swab result:
                    </Text>

                    <Checkbox
                      size="lg"
                      colorScheme="red"
                      value={status}
                      onChange={handleChange}
                    >
                      Positive
                    </Checkbox>

                    <Text fontWeight="600" mt={6}>
                      Swab Date:
                    </Text>

                    <InputGroup mt={1}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiCalendar color="gray.300" />}
                      />
                      <Input
                        type="datetime-local"
                        onChange={(e) => setSwabDate(e.target.value)}
                        required
                      />
                    </InputGroup>

                    <Text fontWeight="600" mt={6}>
                      Result Date:
                    </Text>

                    <InputGroup mt={1}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<BiCalendar color="gray.300" />}
                      />
                      <Input
                        type="datetime-local"
                        onChange={(e) => setResultDate(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Box>

                  <Button
                    mt={10}
                    w={150}
                    type="submit"
                    variant="solid"
                    colorScheme="green"
                    rightIcon={<BiSend />}
                  >
                    Submit
                  </Button>
                </form>
              </>
            )}
          </Box>
        </>
      )}
    </div>
  );
}

export default CovidForm;
