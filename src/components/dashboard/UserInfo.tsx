import { InfoContext } from "../../infocontext";
import { useContext, useEffect, useState } from "react";
import { Flex, Stack, Text, Badge, Button } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { round } from "lodash";

export const UserInfo = () => {
  const { userAddress, hyperClient, setUserAddress } = useContext(InfoContext);
  const [walletInfo, setWalletInfo] = useState("");

  useEffect(() => {
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
      h="20vh"
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
        gap="3px"
      >
        <Button
          height="50%"
          onClick={() => {
            setUserAddress("");
          }}
        >
          <TiArrowBack />
        </Button>

        <FaWallet />
        <Text
          fontSize="sm"
          textOverflow={"ellipsis"}
          overflow="hidden"
          whiteSpace={"nowrap"}
        >
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
          Portfolio Value: {round(walletInfo.portfolio_value, 2)}
        </Badge>
      </Flex>
    </Flex>
  );
};
