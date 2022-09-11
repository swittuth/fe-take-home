import { useState } from "react";
import { Flex, FlexProps, Avatar, Text, Badge } from "@chakra-ui/react";
import moment from "moment";
import { round } from "lodash";

type transactionType = {
  project_name: string;
  meta_data_img: string;
  price: number;
  block_timestamp: number;
};

const SOL_USD = 34.98;

export const Transaction = (props: transactionType | FlexProps) => {
  const [displayDollar, setDisplayDollar] = useState(false);
  return (
    <Flex
      direction="row"
      alignItems={"center"}
      rounded="lg"
      border="1px"
      padding="8px"
      background="#1A365D"
      borderColor="black"
      fontWeight="semibold"
      onMouseEnter={() => {
        setDisplayDollar(true);
      }}
      onMouseLeave={() => {
        setDisplayDollar(false);
      }}
      _hover={{
        backgroundColor: "#36485e",
        cursor: "pointer",
        transition: "0.2s",
      }}
      {...props}
      color="#bdf9f7"
    >
      <Flex w="70%" alignItems={"center"} gap="5px">
        <Avatar src={props.meta_data_img} />
        <Text fontSize="sm">{props.project_name}</Text>
      </Flex>
      <Flex w="30%" alignItems={"flex-end"} direction="column">
        <Text fontSize="sm">
          {displayDollar
            ? round(props.price * SOL_USD, 2) + " $"
            : props.price + " Sol"}
        </Text>
        <Text fontSize="x-small">
          {moment.unix(props.block_timestamp).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
};
