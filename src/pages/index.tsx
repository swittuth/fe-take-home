import { Flex, useColorMode } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import HypeLogo from "../components/HypeLogo";
import { HyperspaceClient } from "hyperspace-client-js";

const clientApiKey = process.env.NEXT_PUBLIC_API_KEY;

const Index = () => {
  const { colorMode } = useColorMode();

  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(clientApiKey);

  return (
    <Container height="100vh">
      <Flex w={"100%"} h={"80px"} alignItems={"center"} px={4}>
        <HypeLogo
          fillColor={colorMode === "dark" ? "white" : "black"}
          height={30}
        />
      </Flex>

      {/* Using our Hyperspace data, build out something cool for us to review together! */}

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
