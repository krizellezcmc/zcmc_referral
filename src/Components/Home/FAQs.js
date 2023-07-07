import {
  Box,
  Container,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import SectionHeader from "./SectionHeader";

const faqs = [
  {
    question: "What is a patient navigation and referral system?",
    answer: `  A patient navigation and referral system is a service that
    helps navigate the patient and access the appropriate care
    at the right time. This include providing information about
    healthcare options, scheduling appointments, finding
    transportation, and communicating with healthcare providers`,
  },
  {
    question: `Is it acceptable for referring facilities to have
    multiple client accounts?`,
    answer: `Each referring facility can only have two accounts.`,
  },
  {
    question: `What will take place in the event that the facility
    that is recommending the patient forgets the password?`,
    answer: `The user can recover their account by clicking the "Forgot Password?" 
    on the login page. The system will require the user to input their email 
    (used in creating an account) for sending of 5-digit verification code. 
    After receiving the verification code, the user must enter the code and 
    then click the "Submit" button. Then, the user will need to enter their 
    new password. A confirmation screen will show that the user's password 
    has changed.`,
  },
  {
    question: `How may a user account be deleted if it is no longer
    connected to the facility where it was originally
    created?`,
    answer: `Only the system administrator can deactivate a user
    account. The facility should contact the system
    administrator if they want a user account under their
    facility to be deactivated.`,
  },
  {
    question: `  In the event that we are unable to log into the
    system, what steps will be taken?`,
    answer: `To login to the system, the user must first create an account. 
    After the system administrator verifies their user account, the user 
    can now log in to the system. The user will receive an email regarding 
    their account verification. The user must make sure that they followed 
    the steps in creating an account and logging in correctly. `,
  },
  {
    question: `If internet connectivity in some areas is unstable,
    how can we refer patients to other healthcare
    providers?`,
    answer: `In the event that the electronic system is unavailable for
    whatever reason, paper-based tools should be used as a
    backup to ensure that the referral quality is not
    compromised in any way.`,
  },
  {
    question: `What is a web-based patient referral system?`,
    answer: `A web based patient referral system is an online tool that
    allows healthcare providers to refer patients to tertiary
    care hospital. It allows for electronic communication and
    tracking of the referral, which can improve communication
    and coordination.`,
  },
];

function FAQs(props) {
  return (
    <div>
      <Box bgColor="white" py={40}>
        <Container maxW="container.xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Have any questions? We're here to help."
          />

          <Accordion mt={20} defaultIndex={[0]} allowMultiple>
            {faqs.map((f) => {
              return (
                <>
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
                                {f.question}
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
                          textAlign="justify"
                        >
                          {f.answer}
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </>
              );
            })}
          </Accordion>
        </Container>
      </Box>
    </div>
  );
}

export default FAQs;
