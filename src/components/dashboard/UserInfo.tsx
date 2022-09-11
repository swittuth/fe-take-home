import { InfoContext } from "../../infocontext";
import { useContext, useEffect, useState } from "react";
import { Flex, Stack, Avatar, Text, Badge } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export const UserInfo = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);
  const [walletInfo, setWalletInfo] = useState("");

  useEffect(() => {
    // perform fetch request to get user info
    getWalletInfo();
  }, []);

  async function getWalletInfo() {
    const walletStats = await hyperClient.getWalletStats({
      condition: {
        searchAddress: userAddress,
        includeUserRank: true,
        timePeriod: "ALL",
      },
    });
    const resultWallStats = walletStats.getWalletStats;
    setWalletInfo(resultWallStats.wallet_stats[0]);
  }

  return (
    <Flex
      w="100%"
      h="10vh"
      flexDirection="column"
      rounded="lg"
      border="1px"
      borderColor="black"
      background="#171A2799"
      padding="5px"
      boxShadow="2xl"
    >
      <Stack
        h="40%"
        borderTopLeftRadius="5px"
        borderTopRightRadius="5px"
        direction="row"
        alignItems={"center"}
        gap="5px"
      >
        <Avatar></Avatar>
        <Text textOverflow={"ellipsis"} overflow="hidden" whiteSpace={"nowrap"}>
          {/* to fix later and resize text depending on the width of the screen */}
          {userAddress}
        </Text>
      </Stack>
      {/* contain information related to the wallet overall */}
      <Flex h="60%" alignItems={"center"} gap="3px" justifyContent={"center"}>
        <Badge
          shadow={"2xl"}
          padding="5px"
          rounded="md"
          height="min-content"
          colorScheme={"purple"}
        >
          Rank {walletInfo.rank}
        </Badge>
        <Badge
          shadow={"2xl"}
          padding="5px"
          rounded="md"
          height="min-content"
          colorScheme={"blue"}
        >
          NFT OWNED: {walletInfo.owned_nfts}
        </Badge>
        <Badge
          shadow={"2xl"}
          padding="5px"
          rounded="md"
          height="min-content"
          colorScheme={"green"}
        >
          Portfolio Value: {walletInfo.portfolio_value}
        </Badge>
      </Flex>
    </Flex>
  );
};
