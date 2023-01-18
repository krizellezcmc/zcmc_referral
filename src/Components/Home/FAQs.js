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
  Icon,
} from "@chakra-ui/react";
import React from "react";
import {
  BiMinusCircle,
  BiPlusCircle,
  BiQuestionMark,
  BiSearch,
} from "react-icons/bi";
import {
  HiOutlineQuestionMarkCircle,
  HiQuestionMarkCircle,
} from "react-icons/hi";

function FAQs(props) {
  return (
    <div>
      <Box bgColor="white" my={40}>
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
          {/* <Center mt={20}>
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
          </Center> */}
          <Accordion mt={20} defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={600}
                        >
                          What is a patient navigation and referral system?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    A patient navigation and referral system is a service that
                    helps navigate the patient and access the appropriate care
                    at the right time. This include providing information about
                    healthcare options, scheduling appointments, finding
                    transportation, and communicating with healthcare providers
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={500}
                        >
                          Is it acceptable for referring facilities to have
                          multiple client accounts?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    Yes. Given that each referring facilities must have only two
                    accounts.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={500}
                        >
                          What will take place in the event that the facility
                          that is recommending the patient forgets the password?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    The user can recover their account by clicking the{" "}
                    <b>"Forgot Password?"</b> in the log in page. The system
                    will require the user to input their email (used in creating
                    an account) for sending of 5-digit verification code. After
                    receiving the verification code, the user must enter the
                    code then click "Submit". Then, the user is asked to enter
                    their new password. A confirmation screen will show that the
                    user's password has been changed.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={500}
                        >
                          How may a user account be deleted if it is no longer
                          connected to the facility where it vwas originally
                          created?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    Only the system administrator can <b>deactivate</b> a user
                    account. The facility should contact the system
                    administrator if they want a user account under their
                    facility to be <b>deactivated</b>.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={500}
                        >
                          In the event that we are unable to log into the
                          system, what steps will be taken?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    To log in into the system, the user must create an account
                    and be verified by the system administrator. The user will
                    receive an email regarding their account verification.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={500}
                        >
                          If internet connectivity in some areas is unstable,
                          how can we refer patients to other healthcare
                          providers?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    In the event that the electronic system is unavailable for
                    whatever reason, paper-based tools should be used as a
                    backup to ensure that the referral quality is not
                    compromised in any way.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Box display="flex" alignItems="center">
                        <Icon
                          as={HiOutlineQuestionMarkCircle}
                          mr={2}
                          boxSize={4}
                        />
                        <Text
                          fontSize={{ sm: 12, md: 13, lg: 15 }}
                          fontWeight={500}
                        >
                          What is a web-based patient referral system?
                        </Text>
                      </Box>
                    </Box>
                    {isExpanded ? (
                      <BiMinusCircle fontSize={16} />
                    ) : (
                      <BiPlusCircle fontSize={16} />
                    )}
                  </AccordionButton>

                  <AccordionPanel
                    pb={4}
                    fontSize={{ sm: 12, md: 13, lg: 15 }}
                    color="gray.600"
                    px={10}
                  >
                    A web based patient referral system is an online tool that
                    allows healthcare providers to refer patients to tertiary
                    care hospital. It allows for electronic communication and
                    tracking of the referral, which can improve communication
                    and coordination.
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
