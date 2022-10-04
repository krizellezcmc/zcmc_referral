import {
  Center,
  VStack,
  Image,
  Text,
  Container,
  Link,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import successImg from "../Assets/success.png";

function Success(props) {
  return (
    <div style={{ height: "auto" }}>
      <Container marginTop="200px">
        <VStack>
          <Image src={successImg} h="350px" />
          <Text fontSize="5xl" fontWeight="700" color="green.600">
            Success!
          </Text>
          <Spacer />
          <Text fontSize="xl" fontWeight="300" textAlign="center">
            You successfully changed your password and recovered your account.
            You can login{" "}
            <Link href="/" color="green.600" fontWeight={600}>
              here.
            </Link>
          </Text>
        </VStack>
      </Container>
    </div>
  );
}

export default Success;
