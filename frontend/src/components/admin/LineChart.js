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

  const chartData = {
    "Last Year": {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          data: [120, 150, 80, 100, 130, 90, 70, 110, 95, 115, 140, 150],
          fill: false,
          borderColor: "#9CABFF",
          tension: 0.4,
        },
      ],
    },
    "Last Month": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
      ],
      datasets: [
        {
          data: [40, 25, 30, 45],
          fill: false,
          borderColor: "#9CABFF",
          tension: 0.4,
        },
      ],
    },
    "Last Week": {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          data: [10, 20, 15, 25, 18, 22, 30],
          fill: false,
          borderColor: "#9CABFF",
          tension: 0.4,
        },
      ],
    },
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Performance Overview</h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md px-3 py-2 outline-none"
        >
          <option value="Last Year">Last Year</option>
          <option value="Last Month">Last Month</option>
          <option value="Last Week">Last Week</option>
        </select>
      </div>
      <div className="max-h-[350px] flex justify-center items-center">
        <Line data={chartData[filter]} options={options} />
      </div>
    </>
  );
};

export default LineChart;
