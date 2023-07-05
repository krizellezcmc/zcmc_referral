import {
  Box,
  Container,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SiGmail, SiFacebook } from "react-icons/si";
import { BiCopyright } from "react-icons/bi";

function MobileCopyright(props) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor="green.600"
        py={1}
        px={4}
      >
        <Box>
          <Text fontSize={8}>
            <Icon as={BiCopyright} /> Copyright 2022 Zamboanga City Medical
            Center . All Rights reserved
          </Text>
        </Box>

        <Box display={{ md: "flex" }}>
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100089036871387&mibextid=LQQJ4d"
            fontSize={10}
          >
            <Icon as={SiFacebook} />
            {/* ZCMC HEMS - Operation Center */}
          </Link>
          <Link
            target="_blank"
            href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBnNVZQZrrMxHPmngQhVbGpclTtjJTTmGZbVrJCgxZQHQrCvPtTdhXMTxkkdhgbssKtqPMN"
            fontSize={10}
          >
            <Icon as={SiGmail} ml={2} />
            {/* zcmc.referral@gmail.com */}
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default MobileCopyright;
