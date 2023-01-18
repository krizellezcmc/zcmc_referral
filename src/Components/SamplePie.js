import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";
import api from "../API/Api";

const SamplePie = () => {
  const [pieData, setPieData] = useState([]);

  const getDept = async () => {
    let response = await api.get("/reports/per_specialization.php");
    setPieData(response.data);
  };
  useEffect(() => {
    getDept();
  }, [pieData]);
  return (
    <div style={{ height: 500 }}>
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "greens" }}
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
    </div>
  );
};

export default SamplePie;
