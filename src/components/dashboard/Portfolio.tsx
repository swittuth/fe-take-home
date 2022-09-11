import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../infocontext";
import moment from "moment";
import { Flex, Badge, Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
};

const labels: string[] = [];

let data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const Portfolio = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);
  const [renderData, setRenderData] = useState({});

  useEffect(() => {
    getWalletHistory();
  }, []);

  async function getWalletHistory() {
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

    data = {
      labels,
      datasets: [
        {
          label: userAddress,
          data: labels.map(
            (date, index) =>
              resWalletHistory.wallet_stats_history[index].portfolio_value
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.5,
        },
      ],
    };
    setRenderData(data);
  }

  useEffect(() => {}, []);

  return (
    <Flex
      height="58vh"
      width="100%"
      alignItems={"center"}
      direction="column"
      rounded="lg"
      background="#171A2799"
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
          <Line data={data} options={options} />
        </Box>
      </Flex>
    </Flex>
  );
};
