import { InfoContext } from "../../infocontext";
import { Flex, Badge, Box } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";

ChartJS.register(ArcElement, Tooltip, Legend);

let data = {
  labels: ["Listings", "Buyings"],
  datasets: [
    {
      label: "# of Votes",
      data: [0, 0],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
};

export const Activity = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);
  const [renderData, setRenderData] = useState(data);

  useEffect(() => {
    getActivity();
  }, []);

  async function getActivity() {
    const listingHistory = await hyperClient.getUserHistory({
      condition: {
        userAddress: userAddress,
        actionTypes: [MarketPlaceActionEnum.Listing],
      },
    });
    const resultListing = listingHistory.getUserHistory;
    console.log(resultListing);
    const transactionHistory = await hyperClient.getUserHistory({
      condition: {
        userAddress: userAddress,
        actionTypes: [MarketPlaceActionEnum.Transaction],
      },
    });
    const resultTransaction = transactionHistory.getUserHistory;
    console.log(resultTransaction);
    data = {
      labels: ["Listings", "Buyings"],
      datasets: [
        {
          label: "# of Votes",
          data: [
            resultListing.pagination_info.total_page_number *
              resultListing.pagination_info.current_page_size,
            resultTransaction.pagination_info.total_page_number *
              resultTransaction.pagination_info.current_page_size,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 2,
        },
      ],
    };
    setRenderData(data);
  }

  return (
    <Flex rounded="lg" background="#171A2799" height="100%" direction="column">
      <Badge
        position="relative"
        width="100%"
        roundedTopLeft="lg"
        roundedTopRight="lg"
        colorScheme={"blue"}
        fontSize="lg"
      >
        <p style={{ textAlign: "center", letterSpacing: "0.2em" }}>ACTIVITY</p>
      </Badge>
      <Box height="100%">
        <Doughnut data={data} options={options} />
      </Box>
    </Flex>
  );
};
