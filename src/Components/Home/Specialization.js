import {
  Box,
  Center,
  Container,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import Tile from "./Tile";
import im from "../../Assets/Services/im.png";
import ent from "../../Assets/Services/nasal.png";
import ob from "../../Assets/Services/ob.png";
import opta from "../../Assets/Services/opta.png";
import ortho from "../../Assets/Services/ortho.png";
import pedia from "../../Assets/Services/pedia.png";
import psych from "../../Assets/Services/pysch.png";
import surgery from "../../Assets/Services/surgery.png";
import SectionHeader from "./SectionHeader";

function Specialization(props) {
  const services = [
    {
      image: ent,
      name: "ENT",
      bgColor: "#ffe1c8",
    },
    {
      image: im,
      name: "Internal Medicine",
      bgColor: "#d3efff",
    },
    {
      image: pedia,
      name: "Pediatrics",
      bgColor: "#ffe1c8",
    },
    {
      image: psych,
      name: "Psychiatry",
      bgColor: "#f4def8",
    },
    { image: surgery, name: "Surgery", bgColor: "#fff5d8" },
    {
      image: ob,
      name: "Obgyne",
      bgColor: "#f5d1d1",
    },
    {
      image: ortho,
      name: "Orthopedics",
      bgColor: "#ebd0ff",
    },
    {
      image: opta,
      name: "Opthalmology",
      bgColor: "#ceffce",
    },
  ];
  return (
    <>
      <Box py={40}>
        <Container maxW="container.xl">
          <SectionHeader
            title="Our Specializations"
            description="The Zamboanga City Medical Center specializes in the following
              areas."
          />
          <Wrap justify="center" mt={20} spacingX={10}>
            {services.map((s) => {
              return (
                <>
                  <WrapItem>
                    <Center width={{ lg: 250 }}>
                      <Tile image={s.image} name={s.name} bgColor={s.bgColor} />
                    </Center>
                  </WrapItem>
                </>
              );
            })}
          </Wrap>
        </Container>
      </Box>
    </>
  );
}

export default Specialization;
