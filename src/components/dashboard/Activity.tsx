import { InfoContext } from "../../infocontext";
import { Flex } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { MarketPlaceActionEnum } from "hyperspace-client-js/dist/sdk";

ChartJS.register(ArcElement, Tooltip, Legend);

export let data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
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
          borderWidth: 1,
        },
      ],
    };
    setRenderData(data);
  }

  return (
    <Flex
      rounded="lg"
      background="#171A2799"
      position="relative"
      height="50vh"
      width="100%"
      maxWidth="40vw"
      alignItems="center"
      justifyContent="center"
      padding="10px"
    >
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </Flex>
  );
};
