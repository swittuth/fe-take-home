import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../infocontext";
import moment from "moment";
import { Flex, Badge, Box, Skeleton } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

let labels: string[] = [];
export const PortfolioChart = () => {
  const { userAddress, hyperClient, containerColor } = useContext(InfoContext);
  const [data, setData] = useState({});

  useEffect(() => {
    getWalletHistory();
  }, []);

  async function getWalletHistory() {
    // retrieving data for wallet information
    const walletHistory = await hyperClient.getWalletStatsHist({
      condition: {
        searchAddress: userAddress,
        dayLookback: "MONTH",
      },
    });

    const resWalletHistory = walletHistory.getWalletStatsHist;

    // register labels for Chartjs
    for (let data of resWalletHistory.wallet_stats_history) {
      labels.push(moment.unix(data.timestamp).format("DD-MM"));
    }
    labels.reverse();

    const tempData = {
      labels,
      datasets: [
        {
          fill: true,
          label: userAddress,
          data: labels.map(
            (data, index) =>
              resWalletHistory.wallet_stats_history[index].portfolio_value
          ),
          borderColor: "#2b3595",
          borderWidth: "1",
          backgroundColor: "#7045af",
          tension: 0.5,
        },
      ],
    };
    labels = [];
    setData(tempData);
  }

  return (
    <Flex
      height="58vh"
      width="100%"
      alignItems={"center"}
      direction="column"
      rounded="lg"
      boxShadow={"xl"}
      background={containerColor}
    >
      <Badge
        width="100%"
        roundedTopLeft="lg"
        roundedTopRight="lg"
        colorScheme={"blue"}
        fontSize="lg"
      >
        <p style={{ textAlign: "center", letterSpacing: "0.2em" }}>
          PORTFOLIO VALUE
        </p>
      </Badge>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Box width="95%" height="90%">
          {/* conditional rendering - skeleton is used as placeholder while Line gets data to be rendered */}
          {Object.keys(data).length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <Skeleton width="100%" height="100%">
              placeholder
            </Skeleton>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
