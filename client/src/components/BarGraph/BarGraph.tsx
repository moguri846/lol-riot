import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { RootReducer } from "../../reducers";
import { LineWinOrLoseType } from "../../actions/interface/lineWinOrLose.interface";

Chart.register(CategoryScale);

const BarGraph = () => {
  const line: LineWinOrLoseType[] = useSelector((state: RootReducer) => state.lineWinOrLoseReducer);

  const labels = ["탑", "정글", "미드", "원딜", "서폿"];

  const data = {
    labels,
    datasets: [
      {
        label: "승리",
        data: line.map((line) => line.win),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "패배",
        data: line.map((line) => line.lose),
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
