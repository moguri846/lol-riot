import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { ITimeLine } from "../../actions/interface/matchSummary.interface";
import { TOTAL_GOLD, XP } from "./constant/LineGraph.constant";

Chart.register(CategoryScale);

type Type = typeof TOTAL_GOLD | typeof XP;

interface Props {
  timeline: ITimeLine[] | undefined;
  type: Type;
}

const LineGraph = ({ timeline, type }: Props) => {
  const labels = timeline?.map((line, index) => `${index}분`);

  const data = {
    labels,
    datasets: [
      {
        label: "플레이어",
        data: timeline?.map((line) => line.player[type]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "상대",
        data: timeline?.map((line) => line.enemy[type]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };
  return <>{timeline ? <Line data={data} options={options} /> : <>Spinner</>}</>;
};

export default LineGraph;
