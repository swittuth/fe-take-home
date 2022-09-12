import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import { InfoContext } from "../../infocontext";
import { useContext, useState } from "react";

export const WalletInput = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const { setUserAddress } = useContext(InfoContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <InputGroup width="70vh">
        <InputLeftElement children={<FaWallet color="#005792" />} />
        <Input
          borderColor="#1cb3c8"
          focusBorderColor="#a0edf7"
          type="text"
          placeholder="Wallet Address"
          variant={"filled"}
          onChange={(event) => {
            setWalletAddress(event.target.value);
          }}
        />
        <InputRightElement
          width="max-content"
          children={
            <Button
              size="sm"
              height="2.1em"
              marginRight="5px"
              backgroundColor={"#0ea5c6"}
              _hover={{
                backgroundColor: "#a0edf7",
                transitionDuration: "0.3s",
              }}
              onClick={() => {
                setUserAddress(walletAddress);
              }}
              color="white"
            >
              Search
            </Button>
          }
        />
      </InputGroup>
    </motion.div>
  );
};
