import { Grid, GridItem } from "@chakra-ui/react";
import { GridProps } from "@chakra-ui/styled-system";

export const DashboardContainer = (props: GridProps) => (
  <Grid
    templateAreas={`
      "userInfo userInfo donutChart donutChart  minting minting minting"
      "transaction transaction donutChart donutChart minting minting minting"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
      "transaction transaction portfolio portfolio portfolio portfolio portfolio"
    `}
    gap="1"
    {...props}
  >
    <GridItem area={"userInfo"}>User Info</GridItem>
    <GridItem area={"donutChart"}>Donut Chart</GridItem>
    <GridItem area={"minting"}>Minting</GridItem>
    <GridItem area={"transaction"}>Transaction Listing</GridItem>
    <GridItem area="portfolio">Portfolio</GridItem>
  </Grid>
);
