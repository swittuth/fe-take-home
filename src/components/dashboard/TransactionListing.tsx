import { Flex } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
import { InfoContext } from "../../infocontext";
import { Transaction } from "./Transaction";

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
      h="88vh"
      w="100%"
      padding="10px"
      gap="10px"
      overflow={"auto"}
    >
      <p>TRANSACTIONS</p>
      {transactions.map((obj) => (
        <Transaction
          key={obj.market_place_state.block_timestamp}
          project_name={obj.project_name}
          meta_data_img={obj.meta_data_img}
          price={obj.market_place_state.price}
          block_timestamp={obj.market_place_state.block_timestamp}
        />
      ))}
    </Flex>
  );
};
