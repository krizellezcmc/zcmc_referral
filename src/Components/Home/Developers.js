import React from "react";
import { Text, Box, Center, Image, Spacer } from "@chakra-ui/react";
import ProfileTile from "./ProfileTile";
import ContributorsTile from "./ContributorsTile";

function Developers(props) {
  var doc2 = require("../../Assets/Profile/doc_kath.png");
  var doc3 = require("../../Assets/Profile/doc_ori_new.png");

  return (
    <div>
      <Box>
        <Box width="100%" mt={10}>
          <Text fontSize={20} letterSpacing="wide" textAlign="center" mt={5}>
            Contributors
          </Text>

          <Text mt={2} color="alpha.900" fontWeight={400} fontSize={{ sm: 12 }}>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. */}
          </Text>
        </Box>
        <Center>
          <Box flexShrink={0} display={{ lg: "flex" }} align="center">
            <Box
              mr={{ lg: 50 }}
              // boxShadow="xl"
            >
              <Box height={{ sm: 180, lg: 180 }} width={{ sm: 180, lg: 180 }}>
                <Image src={doc3} width="100%" />
              </Box>
              <Box mt={5} align="center">
                <Text
                  fontSize={{ lg: 12, md: 12, sm: 11.5 }}
                  color="gray.700"
                  fontWeight={600}
                >
                  Dr. Orissa Alpuerto
                </Text>
                <Box align="center">
                  <Text fontSize={{ lg: 11, md: 11, sm: 10 }} color="gray.700">
                    Medical Officer III
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box
              ml={{ lg: 50 }}
              // boxShadow="xl"
            >
              <Box height={{ sm: 180, lg: 180 }} width={{ sm: 180, lg: 180 }}>
                <Image src={doc2} width="100%" />
              </Box>
              <Box mt={5} align="center">
                <Text
                  fontSize={{ lg: 12, md: 11, sm: 11.5 }}
                  color="gray.700"
                  fontWeight={600}
                >
                  Dr. Katherine Lim-Eisma
                </Text>
                <Box align="center">
                  <Text fontSize={{ lg: 11, md: 11, sm: 10 }} color="gray.700">
                    Medical Officer III
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Center>
      </Box>
    </div>
  );
}

export default Developers;
