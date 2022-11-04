import {
  Box,
  Container,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
import { BiMinusCircle, BiPlusCircle, BiSearch } from "react-icons/bi";

function FAQs(props) {
  return (
    <div>
      <Box bgColor="white" my={20}>
        <Container maxW="container.lg">
          <Box mb={5}>
            <Text align="center" fontSize={18} fontWeight={700}>
              FAQs
            </Text>
          </Box>
          <Box>
            <Text align="center" fontSize={24} fontWeight={600}>
              Frequently asked questions
            </Text>
            <Text align="center" fontSize={16}>
              Have any questions? We're here to help.
            </Text>
          </Box>
          <Center mt={20}>
            <Input
              fontSize="13px"
              type="text"
              //   onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              width="400px"
              _hover={{ borderColor: "green" }}
              _focus={{
                boxShadow: "none",
                outline: "none",
                borderColor: "green",
              }}
            />
          </Center>
          <Accordion allowMultiple mt={20}>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontSize={14} fontWeight={600}>
                        Is there a free trial?{" "}
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4} fontSize={13}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontSize={14} fontWeight={600}>
                        Is there a free trial?{" "}
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4} fontSize={13}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontSize={14} fontWeight={600}>
                        Is there a free trial?{" "}
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4} fontSize={13}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontSize={14} fontWeight={600}>
                        Is there a free trial?{" "}
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel pb={4} fontSize={13}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Container>
      </Box>
    </div>
  );
}

export default FAQs;
