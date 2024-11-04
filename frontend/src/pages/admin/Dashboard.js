import React from "react";
import DashbordCard from "../../components/admin/DashbordCard";
import { DashbordCards } from "../../data/admindashbord";
import LineChart from "../../components/admin/LineChart";
import ImportantNum from "../../components/admin/ImportantNum";
import PendingMaintenances from "../../components/admin/PendingMaintenances";
import ComplainTable from "../../components/admin/ComplainTable";
import UpcomingActivitys from "../../components/admin/UpcomingActivitys";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {DashbordCards.map((cards) => (
          <DashbordCard key={cards.id} cards={cards} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="w-full lg:w-2/4 bg-white p-3 rounded-lg shadow">
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
