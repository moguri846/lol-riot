import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { ITimeLine } from "../../actions/interface/matchSummary.interface";

Chart.register(CategoryScale);

interface Props {
  timeline: ITimeLine[];
  isOpen: boolean;
}

const LineGraph = ({ timeline, isOpen }: Props) => {
  const labels = timeline.map((line, index) => `${index}분`);

  const data = {
    labels,
    datasets: [
      {
        label: "플레이어",
        data: timeline.map((line) => line.player.totalGold),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "상대",
        data: timeline.map((line) => line.enemy.totalGold),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <>{isOpen ? <Line data={data} options={options} /> : <div>loading</div>}</>;
};

export default LineGraph;
