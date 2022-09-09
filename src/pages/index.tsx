import { Flex, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import HypeLogo from "../components/HypeLogo";
import { HyperspaceClient } from "hyperspace-client-js";

const Index = () => {
  const { colorMode } = useColorMode();

  // API client for accessing Hyperspace data
  const hyperClient = new HyperspaceClient(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRSBJbnRlcnZpZXciLCJuYW1lIjoiSHlwZXJzcGFjZSIsImlhdCI6MTUxNjIzOTAyMn0.HDfB97Y1pgQqQ6GshXsh5nz7fA1_ban9MTZDAbgobJk"
  );

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // get wallet stats - overall stats specified with the timePeriod attribute value
    const walletStats = await hyperClient.getWalletStats({
      condition: {
        searchAddress: "4ZCiGakZJy5aJsLpMBNBNwyrmNCCSCzukzhaPzzd4d7v",
        includeUserRank: true,
        timePeriod: "ALL",
      },
    });
    // can display loading screen while fetch is being made
    const resultWallStats = await walletStats.getWalletStats;
    console.log("res wall stats", resultWallStats);

    // get wallet stat history
    const result = await hyperClient
      .getWalletStatsHist({
        condition: {
          searchAddress: "4ZCiGakZJy5aJsLpMBNBNwyrmNCCSCzukzhaPzzd4d7v",
        },
      })
      .then((response) => response.getWalletStatsHist);

    console.log(result);
  }

  return (
    <Container height="100vh">
      <Flex gap="10px" w={"100%"} h={"80px"} alignItems={"center"} px={4}>
        <HypeLogo
          fillColor={colorMode === "dark" ? "white" : "black"}
          height={30}
        />
        <p>Take home assessment</p>
      </Flex>

      {/* Using our Hyperspace data, build out something cool for us to review together! */}

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
