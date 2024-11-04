import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [filter, setFilter] = useState("Last Month");
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#9CABFF",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Performance Overview</h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="Last Year">Last Year</option>
          <option value="Last Month">Month</option>
          <option value="Last Week">Last Week</option>
        </select>
      </div>
      <div className=" max-h-[350px]">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
