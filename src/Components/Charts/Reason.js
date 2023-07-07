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
    <div style={{ height: 400, width: 1000 }}>
      <Text
        textAlign="center"
        mt={5}
        mb={5}
        textTransform="uppercase"
        fontWeight={700}
        fontSize={17}
        color="teal.600"
      >
        Reason for Referral
      </Text>

      <ResponsivePie
        data={data}
        margin={{ top: 5, right: 0, bottom: 100, left: 0 }}
        sortByValue={true}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "blue_green" }}
        borderColor={{
          from: "color",
        }}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
      />
    </div>
  );
};

export default Reason;
