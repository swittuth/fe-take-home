import { useColorMode, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

type SwitchType = {
  position?: string;
  top?: number;
  right?: number;
};

export const DarkModeSwitch: FC<SwitchType> = ({ position, top, right }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      position={position}
      top={top}
      right={right}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label="Toggle Theme"
      colorScheme="gray"
      onClick={toggleColorMode}
    />
  );
};
