import React, { useEffect, useState } from "react";

import {
  Text,
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useToast,
  Link,
  Center,
  Stack,
  HStack,
  Kbd,
} from "@chakra-ui/react";
import { BiError, BiLinkExternal, BiRefresh } from "react-icons/bi";

function Blocked() {
  const next = async () => {
    window.location.href = "/recover";
  };
  return (
    <div className="body" style={{ background: "#f3f6f4", height: "100vh" }}>
      <Center>
        <Flex
          alignItems="center"
          justify="center"
          height="400px"
          boxShadow="lg"
          rounded="lg"
          background="white"
        >
          <Flex direction="column" p="14" rounded="md" width="680px">
            <HStack>
              <Text fontSize="4xl" fontWeight="500" color="gray.700">
                Account Suspended
              </Text>
              <BiError style={{ fontSize: "30px" }} />
            </HStack>

            <Text fontSize="14.4px" fontWeight="400" color="gray.600" mt={3}>
              You have reached the maximum login attempts. For account recovery,
              click{" "}
              <span>
                <Kbd>Recover Account</Kbd>
              </span>{" "}
              or kindly contact the administrator.
            </Text>
            <Box mt={2}>
              <Button
                type="submit"
                h="2.45rem"
                size="sm"
                bgColor="teal.500"
                width="auto"
                color="white"
                mt={10}
                p="4"
                rounded="lg"
                onClick={next}
                _hover={{
                  bgColor: "teal.600",
                }}
                fontWeight="500"
                rightIcon={<BiRefresh />}
              >
                Recover Account
              </Button>
              <Button
                h="2.45rem"
                size="sm"
                variant={"outline"}
                mt={10}
                p="4"
                ml={2}
                rounded="lg"
                fontWeight="400"
                rightIcon={<BiLinkExternal />}
              >
                Contact Administrator
              </Button>

              <Box mt={7}>
                <Text fontSize="13px" fontWeight="400">
                  For more info, you can contact us at{" "}
                  <Link href="#" color="blue.500">
                    zcmc.referral@gmail.com.
                  </Link>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
}

export default Blocked;
