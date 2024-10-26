import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4, 
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
     
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
