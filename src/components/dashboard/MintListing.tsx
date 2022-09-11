import { InfoContext } from "../../infocontext";
import { useContext, useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Mint } from "./Mint";
import { NonMarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";

export const MintListing = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);

  useEffect(() => {
    getMinting();
  }, []);

  async function getMinting() {
    const nmHistory = hyperClient.getNonMpaUserHistory({
      condition: {
        userAddress: userAddress,
        nonMpaActionTypes: [NonMarketPlaceActionEnum.Mint],
      },
    });
    const resNmHistory = (await nmHistory).getNonMpaUserHistory;
    console.log("nm history", resNmHistory);
  }

  return (
    <Flex
      background="#171A2799"
      rounded="lg"
      direction={"column"}
      w="100%"
      h="100%"
      padding="10px"
      gap="10px"
      overflow={"auto"}
    >
      <p>MINTING</p>
    </Flex>
  );
};
