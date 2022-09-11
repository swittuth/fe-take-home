import HypeLogoAnimated from "./HypeLogoAnimated";
import { WalletInput } from "./WalletInput";
import { useEffect, useState } from "react";

export const SearchBox = () => {
  const [logo, setLogo] = useState(true);

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
          strokeColor="#7efaff"
          fillColor="#7efaff"
        />
      ) : (
        <WalletInput />
      )}
    </>
  );
};
