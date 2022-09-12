import HypeLogoAnimated from "./HypeLogoAnimated";
import { WalletInput } from "./WalletInput";
import { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const SearchBox = () => {
  const [logo, setLogo] = useState(true);
  const color = useColorModeValue("#2a3d66", "#7efaff");

  // to remove the logo after animation and transition to wallet input
  useEffect(() => {
    setTimeout(() => {
      setLogo(false);
    }, 2000);
  }, []);

  return (
    <>
      {logo ? (
        <HypeLogoAnimated
          width="70vw"
          drawDuration={1}
          fillDuration={0.5}
          strokeColor={color}
          fillColor={color}
        />
      ) : (
        <WalletInput />
      )}
    </>
  );
};
