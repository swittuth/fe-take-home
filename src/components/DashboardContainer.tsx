import { Grid, GridItem } from "@chakra-ui/react";
import { GridProps } from "@chakra-ui/styled-system";
import { UserInfo } from "./dashboard/UserInfo";
import { TransactionListing } from "./dashboard/TransactionListing";
import { Portfolio } from "./dashboard/Portfolio";
import { Activity } from "./dashboard/Activity";
import { MintListing } from "./dashboard/MintListing";
import { repeat } from "lodash";

export const DashboardContainer = (props: GridProps) => {
  return (
    <Grid
      templateAreas={`
      "userInfo userInfo donutChart donutChart minting minting minting"
      "transaction transaction donutChart donutChart minting minting minting"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
    `}
      gap="1"
      templateColumns={"2fr 2fr 2fr 2fr 2fr 2fr 2fr"}
      {...props}
    >
      <GridItem area={"userInfo"}>
        <UserInfo />
      </GridItem>
      <GridItem area={"donutChart"}>
        <Activity />
      </GridItem>
      <GridItem area={"minting"}>
        <MintListing />
      </GridItem>
      <GridItem area={"transaction"}>
        <TransactionListing />
      </GridItem>
      <GridItem area="portfolio">
        <Portfolio />
      </GridItem>
    </Grid>
  );
};
