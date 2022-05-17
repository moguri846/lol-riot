import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { ILineWinLoseRate } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";

Chart.register(CategoryScale);

export interface IProps {
  lineWinOrLose: ILineWinLoseRate[];
}

const BarGraph = ({ lineWinOrLose }: IProps) => {
  const labels = Object.keys(lineWinOrLose).map((line) => line);

  const data = {
    labels,
    datasets: [
      {
        label: "승리",
        data: Object.values(lineWinOrLose).map((line) => line.win),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "패배",
        data: Object.values(lineWinOrLose).map((line) => line.lose),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Bar data={data} options={options} />;
  // return <div>BarGraph</div>;
};

export default BarGraph;
