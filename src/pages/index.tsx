import { Text, Flex, useTheme, useColorMode } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import HypeLogo from "../components/HypeLogo";

const Index = () => {
  const { colorMode } = useColorMode();

  return (
    <Container height="100vh">
      <Flex w={"100%"} h={"80px"} alignItems={"center"} px={4}>
        <HypeLogo
          fillColor={colorMode === "dark" ? "white" : "black"}
          height={30}
        />
      </Flex>

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
