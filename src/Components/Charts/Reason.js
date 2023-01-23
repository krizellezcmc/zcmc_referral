import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { reasons } from "../../Data/Reasons";
import { Box, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import api from "../../API/Api";
import { useEffect } from "react";

const Reason = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    let response = await api("/reports/reason.php");
    setData(response.data);
  };

  useEffect(() => {
    getData();
    // console.log(data);
  }, [data]);

  return (
    <Box h={500} w={780}>
      <Text
        textAlign="center"
        mt={12}
        mb={5}
        textTransform="uppercase"
        fontWeight={700}
        fontSize={20}
        color="teal.600"
      >
        Reason for Referral
      </Text>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 100, left: 60 }}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "blue_green" }}
        borderColor={{
          from: "color",
        }}
        // arcLinkLabelsSkipAngle={10}
        // arcLinkLabelsTextColor="#333333" arcLabel={function(e){return e.id+" ("+e.value+")"}}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        // arcLabelsSkipAngle={4}
        // arcLabelsTextColor={{
        //   from: "color",
        //   modifiers: [["darker", 2]],s
        // }}
        // legends={[
        //   {
        //     anchor: "right",
        //     direction: "column",
        //     justify: false,
        //     translateX: -17,
        //     translateY: -28,
        //     itemWidth: 97,
        //     itemHeight: 23,
        //     itemsSpacing: 4,
        //     symbolSize: 16,
        //     itemDirection: "left-to-right",
        //   },
        // ]}
      />
    </Box>
  );
};

export default Reason;
