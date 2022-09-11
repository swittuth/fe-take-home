import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect, createContext, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import HypeLogo from "../components/HypeLogo";
import { HyperspaceClient } from "hyperspace-client-js";
import {
  MarketPlaceActionEnum,
  NonMarketPlaceActionEnum,
} from "hyperspace-client-js/dist/sdk";
import { DashboardContainer } from "../components/DashboardContainer";
import { InfoContext } from "../infocontext";

const Index = () => {
  const { colorMode } = useColorMode();
  const [userAddress, setUserAddress] = useState(
    "4ZCiGakZJy5aJsLpMBNBNwyrmNCCSCzukzhaPzzd4d7v"
  );
  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
  );

  // can do basic conditional rendering for charts / loading screen, etc.
  return (
    <Container height="100vh" width="100vw" padding="10px">
      <InfoContext.Provider value={{ userAddress, hyperClient }}>
        <DashboardContainer height="100%" width="100%" />
      </InfoContext.Provider>
    </Container>
  );
};

export default Index;
