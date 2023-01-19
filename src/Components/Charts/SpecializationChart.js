import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";
import api from "../../API/Api";
import { Box, Text } from "@chakra-ui/react";

const SamplePie = () => {
  const [pieData, setPieData] = useState([]);

  const getDept = async () => {
    let response = await api.get("/reports/per_specialization.php");
    setPieData(response.data);
  };
  useEffect(() => {
    getDept();
    // console.log(pieData);
  }, [pieData]);
  return (
    <Box h={500} w={500}>
      <Text
        textAlign="center"
        mt={12}
        ml={20}
        mb={5}
        textTransform="uppercase"
        fontWeight={700}
        fontSize={20}
        color="teal.600"
      >
        Specializations
      </Text>
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, bottom: 100, left: 80, right: 30 }}
        innerRadius={0.5}
        sortByValue={true}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "blue_green" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
      />
    </Box>
  );
};

export default SamplePie;
