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
} from "@chakra-ui/react";
import { BiDialpad, BiError, BiLinkExternal } from "react-icons/bi";

function Blocked() {
  return (
    <div className="body" style={{ background: "#f3f6f4", height: "100vh" }}>
      <Center>
        <Flex
          alignItems="center"
          justify="center"
          height="400px"
          width="auto"
          boxShadow="lg"
          rounded="lg"
          background="white"
        >
          <Flex direction="column" p="14" rounded="md" width="680px">
            <HStack>
              <Text fontSize="4xl" fontWeight="500" color="gray.700">
                Account suspened
              </Text>
              <BiError style={{ fontSize: "30px" }} />
            </HStack>

            <Text fontSize="15px" fontWeight="400" color="gray.700" mt={3}>
              You have reached the maximum login attempts. For account recovery,
              kindly contact the administrator.
            </Text>
            <Box>
              <Button
                type="submit"
                h="2.7rem"
                size="sm"
                bgColor="teal.500"
                width="auto"
                color="white"
                mt={10}
                p="4"
                rounded="lg"
                _hover={{
                  bgColor: "teal.600",
                }}
                fontWeight="500"
                rightIcon={<BiLinkExternal />}
              >
                Contact Administrator
              </Button>

              <Box mt={10}>
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
