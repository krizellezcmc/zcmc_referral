import { Box, Icon, Link, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { SiGmail, SiFacebook } from "react-icons/si";
import { BiCopyright } from "react-icons/bi";

function Copyright(props) {
  return (
    <>
      <Box
        display={{ md: "flex", sm: "flex" }}
        alignItems="center"
        bgColor="green.600"
        py={2}
        px={10}
      >
        <Box>
          <Text fontSize={{ lg: 13.5, md: 10, sm: 10 }}>
            <Icon as={BiCopyright} /> Copyright 2022 Zamboanga City Medical
            Center . All Rights reserved
          </Text>
        </Box>
        {/* <Box ml={3}>
          <Text fontSize={{ lg: 12, md: 10, sm: 10 }}>
            Developed by: ZCMC MMS-IT
          </Text>
        </Box> */}

        <Spacer />

        <Box display={{ md: "flex" }}>
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100089036871387&mibextid=LQQJ4d"
            fontSize={{ lg: 13.5, md: 10, sm: 10 }}
          >
            <Icon as={SiFacebook} mr={2} />
            {/* ZCMC HEMS - Operation Center */}
          </Link>
          <Link
            target="_blank"
            href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBnNVZQZrrMxHPmngQhVbGpclTtjJTTmGZbVrJCgxZQHQrCvPtTdhXMTxkkdhgbssKtqPMN"
            fontSize={{ lg: 13.5, md: 10, sm: 10 }}
          >
            <Icon as={SiGmail} ml={5} />
            {/* zcmc.referral@gmail.com */}
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Copyright;
