import { Flex, Badge } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
import { InfoContext } from "../../infocontext";
import { Transaction } from "./Transaction";
import { motion } from "framer-motion";

export const TransactionListing = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    const userHistory = await hyperClient.getUserHistory({
      condition: {
        userAddress: "4ZCiGakZJy5aJsLpMBNBNwyrmNCCSCzukzhaPzzd4d7v",
        actionTypes: [MarketPlaceActionEnum.Transaction],
      },
    });
    const resultUserHistory = userHistory.getUserHistory;
    setTransactions(resultUserHistory.market_place_snapshots);
  }

  return (
    <Flex
      background="#171A2799"
      rounded="lg"
      direction={"column"}
      h="78vh"
      w="100%"
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
        <p style={{ textAlign: "center", letterSpacing: "0.2em" }}>
          TRANSACTIONS
        </p>
      </Badge>

      {transactions.map((obj) => (
        <motion.div
          initial={{ paddingTop: "100px" }}
          animate={{ paddingTop: "0px" }}
          transition={{ duration: 0.2 }}
        >
          <Transaction
            key={obj.market_place_state.block_timestamp}
            marginLeft="10px"
            marginRight="10px"
            project_name={obj.project_name}
            meta_data_img={obj.meta_data_img}
            price={obj.market_place_state.price}
            block_timestamp={obj.market_place_state.block_timestamp}
          />
        </motion.div>
      ))}
    </Flex>
  );
};
