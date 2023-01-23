import React, { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
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
  Center,
} from "@chakra-ui/react";
import { BiCalendar, BiSend } from "react-icons/bi";
// import localApi from "../API/LocalApi";
import api from "../API/Api";
import Loading from "./Spinner";
import useAuth from "../Hooks/useAuth";

function CovidForm(props) {
  const { user } = useAuth();
  const [load, setLoad] = useState(false);

  const [patient, setPatient] = useState([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [swabDate, setSwabDate] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [covidData, setCovidData] = useState("");
  const [id, setId] = useState("");

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

  const handleChange = (event) => {
    if (event.target.checked) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoad(true);
    let response = await api.post("/post_covid_status.php", {
      status: status,
      swabDate: swabDate,
      resultDate: resultDate,
      patId: id,
      user: user?.firstName + " " + user?.lastName,
    });

    if (response) {
      setLoad(false);
    }

    if (response.data.status === 1) {
      toast({
        position: "top",
        title: "Success!",
        description: "Record successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Error!",
        description: "Failed to update.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchPat = async () => {
    let pat = await api.get("/get_acceptedpats.php");
    setPatient(pat.data);
  };

  const select = async (e) => {
    setSelected(e.value);
    setIsLoading(true);

    let data = e.split("/");
    let selectedId = data[0];
    setId(data[0]);
    // let refDate = data[2];

    let covid = await api.get("/get_covid_status.php", {
      params: {
        patientId: selectedId,
      },
    });
    setCovidData(covid.data);

    if (covid) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    fetchPat();
  }, [id, status]);

  let toast = useToast();

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ width: "700px" }}>
        <Text fontWeight={500}>Search Patient</Text>
        <Select
          options={patient}
          placeholder="Search patient"
          selectedOptionStyle="check"
          closeMenuOnSelect={true}
          focusBorderColor="#058e46"
          onChange={(e) => {
            select(e.value);
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
          {isLoading ? (
            <Center mt={40}>
              <Loading />
            </Center>
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
                              {i.lastname +
                                ", " +
                                i.firstname +
                                " " +
                                i.middleName}
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
                        <Box w={450} bg="#f7f8fb" p={7} borderRadius={10}>
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
                          <Text mt={9}>Posted by:</Text>

                          <Text fontWeight="600" mt={1}>
                            {i.user} ({moment(i.tstamp).format("LLL")})
                          </Text>
                        </Box>
                      </>
                    );
                  })
                ) : (
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
                        isLoading={load}
                        loadingText="Submitting"
                      >
                        Submit
                      </Button>
                    </form>
                  </>
                )}
              </Box>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CovidForm;
