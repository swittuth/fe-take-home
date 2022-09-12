import { InfoContext } from "../../infocontext";
import { useContext, useEffect, useState } from "react";
import { Flex, Stack, Text, Badge, Button, Skeleton } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { round } from "lodash";
import { SOL_USD } from "../../soltousd";

export const UserInfo = () => {
  const { userAddress, hyperClient, setUserAddress } = useContext(InfoContext);
  const [loading, setLoading] = useState(true);
  const [walletInfo, setWalletInfo] = useState<any>({});
  const [displayDollar, setDisplayDollar] = useState(false);

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
    setLoading(false);
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
      <Flex
        h="60%"
        alignItems={"center"}
        gap="3px"
        justifyContent={"center"}
        flexWrap="wrap"
      >
        {loading ? (
          <Skeleton height="max-content" width="max-content">
            Rank
          </Skeleton>
        ) : (
          <Badge
            shadow="2xl"
            padding="5px"
            rounded="md"
            height="min-content"
            colorScheme={"purple"}
          >
            Rank {walletInfo.rank}
          </Badge>
        )}
        {loading ? (
          <Skeleton height="max-content" width="max-content">
            NFT OWNED:
          </Skeleton>
        ) : (
          <Badge
            shadow={"2xl"}
            padding="5px"
            rounded="md"
            height="min-content"
            colorScheme={"blue"}
          >
            NFT OWNED: {walletInfo.owned_nfts}
          </Badge>
        )}
        {loading ? (
          <Skeleton height="max-content" width="max-content">
            PORTFOLIO VALUE:
          </Skeleton>
        ) : (
          <Badge
            shadow={"2xl"}
            padding="5px"
            rounded="md"
            height="min-content"
            colorScheme={"green"}
            _hover={{ cursor: "pointer" }}
            onMouseEnter={() => {
              setDisplayDollar(true);
            }}
            onMouseLeave={() => {
              setDisplayDollar(false);
            }}
          >
            {displayDollar
              ? `Portfolio Value: ${round(
                  walletInfo.portfolio_value * SOL_USD,
                  2
                )} $`
              : `Portfolio Value: ${round(walletInfo.portfolio_value, 2)} Sol`}
          </Badge>
        )}
      </Flex>
    </Flex>
  );
};
