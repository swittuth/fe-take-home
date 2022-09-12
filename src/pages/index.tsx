import { useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { HyperspaceClient } from "hyperspace-client-js";
import { DashboardContainer } from "../components/DashboardContainer";
import { InfoContext } from "../infocontext";
import { SearchBox } from "../components/searchbox/SearchBox";

const Index = () => {
  // creating props from top level to be shared with hook context
  const containerColor = useColorModeValue("#fbf9fa", "#171A2799");
  const cardColor = useColorModeValue("#cde8f6", "#1A365D");
  const cardTextColor = useColorModeValue("#393e6f", "#bdf9f7");
  const [userAddress, setUserAddress] = useState("");

  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
  );

  return (
    <Container height="100vh" width="100vw" padding="10px">
      <InfoContext.Provider
        value={{
          userAddress,
          hyperClient,
          setUserAddress,
          containerColor,
          cardColor,
          cardTextColor,
        }}
      >
        {/* conditional rendering between dashboard and landing page w search box */}
        {userAddress ? (
          <DashboardContainer height="100%" width="100%" />
        ) : (
          <>
            <DarkModeSwitch position="fixed" right={4} top={4}></DarkModeSwitch>
            <SearchBox />
          </>
        )}
      </InfoContext.Provider>
    </Container>
  );
};

export default Index;
