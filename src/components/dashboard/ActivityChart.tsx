import { InfoContext } from "../../infocontext";
import { Flex, Badge, Box } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";
import { Skeleton } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  responsive: true,
};

export const ActivityChart = () => {
  const { userAddress, hyperClient, containerColor } = useContext(InfoContext);
  const [data, setData] = useState({});

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
    const transactionHistory = await hyperClient.getUserHistory({
      condition: {
        userAddress: userAddress,
        actionTypes: [MarketPlaceActionEnum.Transaction],
      },
    });
    const resultTransaction = transactionHistory.getUserHistory;
    const tempData = {
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
    setData(tempData);
  }

  return (
    <Flex
      rounded="lg"
      background={containerColor}
      height="100%"
      direction="column"
      boxShadow="xl"
    >
      <Badge
        position="relative"
        width="100%"
        roundedTopLeft="lg"
        roundedTopRight="lg"
        colorScheme="blue"
        fontSize="lg"
      >
        <p style={{ textAlign: "center", letterSpacing: "0.2em" }}>ACTIVITY</p>
      </Badge>
      <Box height="100%" width="100%">
        <Flex
          height="95%"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          {Object.keys(data).length > 0 ? (
            <Doughnut data={data} options={options} />
          ) : (
            <Skeleton height="90%" width="90%">
              placeholder
            </Skeleton>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
