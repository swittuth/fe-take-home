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
      backgroundColor: ["#ea168e", "#612570"],
      borderColor: ["#ea168e9f", "#6125709f"],
      borderWidth: 3,
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
          backgroundColor: ["#ea168e", "#612570"],
          borderColor: ["#ea168e9f", "#6125709f"],
          borderWidth: 3,
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
      <Flex
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box height="95%">
          <Doughnut data={data} options={options} />
        </Box>
      </Flex>
    </Flex>
  );
};
