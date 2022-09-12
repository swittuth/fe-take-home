import { useState, FC } from "react";
import { Flex, FlexProps, Avatar, Text } from "@chakra-ui/react";
import moment from "moment";
import { round } from "lodash";
import { SOL_USD } from "../../soltousd";

type transactionType = {
  project_name: string;
  meta_data_img: string;
  price: number;
  block_timestamp: number;
};

export const CardInfo: FC<transactionType & FlexProps> = ({
  project_name,
  meta_data_img,
  price,
  block_timestamp,
  marginLeft,
  marginRight,
}) => {
  const [displayDollar, setDisplayDollar] = useState(false);
  return (
    <Flex
      direction="row"
      alignItems="center"
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
      color="#bdf9f7"
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <Flex w="70%" alignItems={"center"} gap="5px">
        <Avatar src={meta_data_img} />
        <Text fontSize="sm">{project_name}</Text>
      </Flex>
      <Flex w="30%" alignItems={"flex-end"} direction="column">
        <Text fontSize="sm">
          {displayDollar ? round(price * SOL_USD, 2) + " $" : price + " Sol"}
        </Text>
        <Text fontSize="x-small">{moment.unix(block_timestamp).fromNow()}</Text>
      </Flex>
    </Flex>
  );
};
