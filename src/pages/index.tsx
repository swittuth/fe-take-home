import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { HyperspaceClient } from "hyperspace-client-js";
import { DashboardContainer } from "../components/DashboardContainer";
import { InfoContext } from "../infocontext";
import { SearchBox } from "../components/searchbox/SearchBox";

const Index = () => {
  const { colorMode } = useColorMode();
  const [userAddress, setUserAddress] = useState(
    "FwugPyZWSbUrA6JntH9RvpyLMaCdtwCTVv1sbLxBXW8a"
  );
  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
  );

  // can do basic conditional rendering for charts / loading screen, etc.
  return (
    <Container height="100vh" width="100vw" padding="10px">
      <InfoContext.Provider
        value={{ userAddress, hyperClient, setUserAddress }}
      >
        {userAddress ? (
          <DashboardContainer height="100%" width="100%" />
        ) : (
          <SearchBox />
        )}
      </InfoContext.Provider>
    </Container>
  );
};

export default Index;
