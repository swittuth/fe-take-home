import { createContext } from "react";
import { HyperspaceClient } from "hyperspace-client-js";

const hyperClient = new HyperspaceClient("");

export const InfoContext = createContext({
  userAddress: "",
  hyperClient: hyperClient,
  setUserAddress: (address: string) => {
    this.userAddress = address;
  },
});
