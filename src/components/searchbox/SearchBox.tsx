import HypeLogoAnimated from "./HypeLogoAnimated";
import { useEffect, useState } from "react";

export const SearchBox = () => {
  const [logo, setLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLogo(false);
    }, 3500);
  }, []);

  return (
    <>
      {logo ? (
        <HypeLogoAnimated
          width="70vw"
          drawDuration={2}
          fillDuration={1}
          strokeColor="#7efaff"
          fillColor="#7efaff"
        />
      ) : (
        <p>Input</p>
      )}
    </>
  );
};
