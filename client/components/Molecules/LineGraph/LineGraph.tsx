import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { IProps } from "./interface/LineGraph.interface";

Chart.register(CategoryScale);

const LineGraph = ({ loading, timeline, option }: IProps) => {
  const labels = timeline?.map((line, index) => `${index}분`);

  if (loading) {
    return <div className="loading">loading...</div>;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "플레이어",
        data: timeline?.map((line) => line.player[option]),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "상대",
        data: timeline?.map((line) => line.enemy[option]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
