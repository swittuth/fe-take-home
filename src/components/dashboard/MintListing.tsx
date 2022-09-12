import { InfoContext } from "../../infocontext";
import { useContext, useState, useEffect } from "react";
import { Flex, Badge } from "@chakra-ui/react";
import { CardInfo } from "./CardInfo";
import { NonMarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
import { motion } from "framer-motion";

export const MintListing = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);
  const [mints, setMints] = useState<any[]>([]);

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
    setMints(resNmHistory.market_place_snapshots);
  }

  return (
    <Flex
      background="#171A2799"
      rounded="lg"
      direction={"column"}
      position="relative"
      h="40vh"
      width="100%"
      gap="10px"
      overflow={"auto"}
    >
      <Badge
        width="100%"
        roundedTopLeft="lg"
        roundedTopRight="lg"
        colorScheme={"blue"}
        fontSize="lg"
      >
        <p style={{ textAlign: "center", letterSpacing: "0.2em" }}>MINTING</p>
      </Badge>
      {mints.map((obj) => (
        <motion.div
          initial={{ paddingTop: "100px" }}
          animate={{ paddingTop: "0px" }}
          transition={{ duration: 0.2 }}
        >
          <CardInfo
            key={obj.non_market_place_state.block_timestamp}
            project_name={obj.project_name}
            meta_data_img={obj.meta_data_img}
            price={obj.non_market_place_state.price}
            block_timestamp={obj.non_market_place_state.block_timestamp}
            marginLeft="10px"
            marginRight="10px"
            fontSize="x-small"
          />
        </motion.div>
      ))}
    </Flex>
  );
};
