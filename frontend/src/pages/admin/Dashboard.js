import React, { useEffect, useState } from "react";
import DashbordCard from "../../components/admin/DashbordCard";
import LineChart from "../../components/admin/LineChart";
import ImportantNum from "../../components/admin/ImportantNum";
import PendingMaintenances from "../../components/admin/PendingMaintenances";
import ComplainTable from "../../components/admin/ComplainTable";
import UpcomingActivitys from "../../components/admin/UpcomingActivitys";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const [totalMaintenance, setTotalMaintenance] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);
  const [totalUnit, setTotalUnit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maintenanceRes, expenseRes] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/total-maintenance`, {
              withCredentials: true,
            }
          ),
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/v1/api/expenses/total-expense`
          ),
        ]);
        setTotalMaintenance(maintenanceRes?.data?.totalAmount);
        setTotalExpense(expenseRes?.data?.totalExpense);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/resident`
        );
        setTotalUnit(response?.data?.data?.length);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchResidents();
    fetchData();
  }, []);

  const DashboardCards = [
    {
      id: "1",
      title: "Total Balance",
      amount: `₹ ${totalMaintenance - totalExpense}`,
      icon: "/assets/1-4.svg",
      color: "#F7CA8C",
    },
    {
      id: "2",
      title: "Total Income",
      amount: `₹ ${totalMaintenance}`,
      icon: "/assets/money-recive.svg",
      color: "#9CCB9E",
    },
    {
      id: "3",
      title: "Total Expense",
      amount: `₹ ${totalExpense}`,
      icon: "/assets/money-send.svg",
      color: "#C2CFF9",
    },
    {
      id: "4",
      title: "Total Unit",
      amount: `0${totalUnit}`,
      icon: "/assets/building-4.svg",
      color: "#F59BE1",
    },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {DashboardCards.map((card) => (
          <DashbordCard key={card.id} cards={card} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="w-full lg:w-2/4 bg-white p-3 rounded-lg shadow overflow-hidden">
          <LineChart />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-2/4">
          <div className="shadow bg-white rounded-lg w-full lg:w-1/2 p-3">
            <ImportantNum />
          </div>
          <div className="shadow bg-white rounded-lg w-full lg:w-1/2 p-3">
            <PendingMaintenances />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <ComplainTable />
        </div>
        <div className="w-full lg:w-1/4">
          <UpcomingActivitys />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
