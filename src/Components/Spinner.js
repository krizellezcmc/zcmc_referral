import { Spinner } from "@chakra-ui/react";
import React from "react";

function Loading(props) {
  return (
    <div>
      <Spinner
        thickness="5px"
        speed="0.55s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      />
    </div>
  );
}

export default Loading;
