import { Grid, GridItem } from "@chakra-ui/react";
import { GridProps } from "@chakra-ui/styled-system";
import { useContext } from "react";
import { InfoContext } from "../infocontext";
import { UserInfo } from "./dashboard/UserInfo";
import { TransactionListing } from "./dashboard/TransactionListing";

export const DashboardContainer = (props: GridProps) => {
  return (
    <Grid
      templateAreas={`
      "userInfo userInfo donutChart donutChart  minting minting minting"
      "transaction transaction donutChart donutChart minting minting minting"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
    `}
      gap="1"
      {...props}
    >
      <GridItem area={"userInfo"}>
        <UserInfo />
      </GridItem>
      <GridItem area={"donutChart"}>Donut Chart</GridItem>
      <GridItem area={"minting"}>Minting</GridItem>
      <GridItem area={"transaction"}>
        <TransactionListing />
      </GridItem>
      <GridItem area="portfolio">Portfolio</GridItem>
    </Grid>
  );
};
