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
import { Popover } from "@headlessui/react";

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
  const [filter, setFilter] = useState("Last Week");

  const chartData = {
    "Last Year": {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [120, 150, 80, 100, 130, 90, 70, 110, 95, 115, 140, 150],
          fill: false,
          borderColor: "#9CABFF",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "#9CABFF",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
        },
      ],
    },
    "Last Month": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          data: [40, 25, 30, 45],
          fill: false,
          borderColor: "#9CABFF",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "#9CABFF",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
        },
      ],
    },
    "Last Week": {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          data: [10, 20, 15, 25, 18, 22, 30],
          fill: false,
          borderColor: "#9CABFF",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "#9CABFF",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Performance Overview</h2>
        <Popover className="relative">
          <Popover.Button className="p-2 px-4 outline-none border rounded-md">
            {filter}
          </Popover.Button>
          <Popover.Panel className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            {({ close }) => (
              <div className="py-2">
                {["Last Year", "Last Month", "Last Week"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setFilter(level);
                      close();
                    }}
                    className={`px-4 py-1 flex gap-2 font-medium text-nowrap ${
                      filter === level ? "text-black" : "text-[#A7A7A7]"
                    }`}
                  >
                    <img
                      src={`${
                        filter === level
                          ? "/assets/fill-redio.svg"
                          : "/assets/unfill-redio.svg"
                      }`}
                      alt=""
                    />
                    {level}
                  </button>
                ))}
              </div>
            )}
          </Popover.Panel>
        </Popover>
      </div>
      <div className="min-h-[350px] w-[100%] flex justify-center items-center">
        <Line data={chartData[filter]} options={options} />
      </div>
    </>
  );
};

export default LineChart;
