import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { LineWinOrLoseType } from "../../../actions/interface/lineWinOrLose.interface";

Chart.register(CategoryScale);

interface IProps {
  lineWinOrLose: LineWinOrLoseType[];
}

const BarGraph = ({ lineWinOrLose }: IProps) => {
  const labels = lineWinOrLose.map((line) => line.line);

  const data = {
    labels,
    datasets: [
      {
        label: "승리",
        data: lineWinOrLose.map((line) => line.win),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "패배",
        data: lineWinOrLose.map((line) => line.lose),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
