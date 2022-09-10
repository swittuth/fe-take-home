import { useContext, useEffect } from "react";
import { Flex, Stack, Avatar, Text } from "@chakra-ui/react";
import moment from "moment";

type transactionType = {
  project_name: string;
  meta_data_img: string;
  price: number;
  block_timestamp: string;
};

export const Transaction = (props: transactionType) => {
  return (
    <Flex
      direction="row"
      alignItems={"center"}
      rounded="lg"
      border="1px"
      padding="8px"
      background="#1A365D"
      borderColor="black"
    >
      <Flex w="50%" alignItems={"center"} gap="5px">
        <Avatar src={props.meta_data_img} />
        <Text>{props.project_name}</Text>
      </Flex>
      <Flex w="100%" alignItems={"flex-end"} direction="column">
        <Text>{props.price} Sol</Text>
        <Text fontSize="x-small">
          {moment.unix(props.block_timestamp).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
};
