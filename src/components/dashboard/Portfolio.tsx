import { useContext, useEffect } from "react";
import { InfoContext } from "../../infocontext";
import moment from "moment";
import { Flex } from "@chakra-ui/react";
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
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels: string[] = [];

export let data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const Portfolio = () => {
  const { userAddress, hyperClient } = useContext(InfoContext);

  useEffect(() => {
    getWalletHistory();
  }, []);

  async function getWalletHistory() {
    const walletHistory = await hyperClient.getWalletStatsHist({
      condition: {
        searchAddress: "4ZCiGakZJy5aJsLpMBNBNwyrmNCCSCzukzhaPzzd4d7v",
        dayLookback: "MONTH",
      },
    });

    const resWalletHistory = walletHistory.getWalletStatsHist;

    // register labels for Chartjs
    for (let data of resWalletHistory.wallet_stats_history) {
      labels.push(moment.unix(data.timestamp).format("MMMM-DD-YYY"));
    }

    console.log(labels);

    data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => Math.random() * 1000),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: labels.map(() => Math.random() * 1000),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    console.log(resWalletHistory);
  }

  useEffect(() => {}, []);

  return (
    <Flex
      height={"100%"}
      width="100%"
      padding="5px"
      alignItems={"center"}
      rounded="lg"
      background="#171A2799"
    >
      <Line data={data} options={options} height="100%" />
    </Flex>
  );
};
