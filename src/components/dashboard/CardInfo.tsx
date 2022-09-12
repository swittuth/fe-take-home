import { useState, FC } from "react";
import { Flex, FlexProps, Avatar, Text } from "@chakra-ui/react";
import moment from "moment";
import { round } from "lodash";
import { SOL_USD } from "../../soltousd";
import { useContext } from "react";
import { InfoContext } from "../../infocontext";

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
  const { cardColor, cardTextColor } = useContext(InfoContext);
  return (
    <Flex
      direction="row"
      alignItems="center"
      rounded="lg"
      padding="8px"
      background={cardColor}
      fontWeight="semibold"
      onMouseEnter={() => {
        setDisplayDollar(true);
      }}
      onMouseLeave={() => {
        setDisplayDollar(false);
      }}
      _hover={{
        backgroundColor: "#9d8f8f",
        cursor: "pointer",
        transition: "0.2s",
      }}
      color={cardTextColor}
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
