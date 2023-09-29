import React from "react";
import { Box, Center, Container, Wrap, WrapItem } from "@chakra-ui/react";
import ProfileTile from "./ProfileTile";
import sir_john from "../../Assets/Profile/sir_john.png";
import yana from "../../Assets/Profile/yana.png";
import kriz from "../../Assets/Profile/kriz.png";

const profile = [
  {
    image: sir_john,
    name: "John Mary C. Sta Teresa",
    posiiton: "Statistician II",
  },
  {
    image: yana,
    name: "Alyana Claire C. Barretto",
    posiiton: "Software Developer",
  },
  {
    image: kriz,
    name: "Krizelle Mae B. Falcasantos",
    posiiton: "Software Developer",
  },
  // {
  //   image: doc_ori,
  //   name: "Dr. Orissa Alpuerto",
  //   posiiton: "Medical Officer III",
  // },
  // {
  //   image: doc_kathy,
  //   name: "Dr. Katherine Lim-Eisma",
  //   posiiton: "Medical Officer III",
  // },
];

function Contributors(props) {
  return (
    <Box>
      <Container maxWidth="container.xl">
        <Wrap justify="center">
          {profile.map((p) => {
            return (
              <>
                <WrapItem alignItems="flex-end">
                  <Center width={220}>
                    <ProfileTile
                      image={p.image}
                      name={p.name}
                      position={p.posiiton}
                      width={{ lg: 170, md: 160, sm: 130 }}
                    />
                  </Center>
                </WrapItem>
              </>
            );
          })}
        </Wrap>
      </Container>
    </Box>
  );
}

export default Contributors;
