import React, { useEffect, useState } from "react";
import ViewMaintenance from "../../components/admin/ViewMaintenance";
import OtherIncome from "../../components/admin/OtherIncome";
import ConfirmPassword from "../../components/models/ConfirmPassword";
import AddMaintenanceDetail from "../../components/models/AddMaintenanceDetail";
import axios from "axios";

const Income = () => {
  const [view, setView] = useState("maintenance");
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isAddMaintenance, setIsAddMaintenance] = useState(false);
  const [maintenance, setMaintenance] = useState([]);

  const viewMaintenanceFn = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/maintenance`
      );
      setMaintenance(response?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    viewMaintenanceFn();
  }, []);

  return (
    <>
      <div className="bg-blue-50 min-h-[100px] p-6 overflow-y-hidden">
        {view === "maintenance" && (
          <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl">
            <div className="flex space-x-4">
              <div className="bg-white shadow rounded-lg p-4 w-[230px] flex flex-col justify-center">
                <div className="text-gray-500">Maintenance Amount</div>
                <div className="text-green-500 font-bold text-xl">
                  ₹ {maintenance[0]?.amount || "00"}
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 w-[230px] flex flex-col justify-center">
                <div className="text-gray-500">Penalty Amount</div>
                <div className="text-red-500 font-bold text-xl">
                  ₹ {maintenance[0]?.penaltyAmount || "00"}
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                className="text-white font-bold py-2 px-8 rounded-lg h-full"
                style={{
                  background: "linear-gradient(to right, #FE512E, #F09619)",
                }}
                onClick={() => setIsConfirmPassword(true)}
              >
                Set Maintenance
              </button>
            </div>
          </div>
        )}
        <div className="flex">
          <button
            className={`py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg ${
              view === "maintenance" ? "text-white" : "text-black"
            }`}
            style={{
              background:
                view === "maintenance"
                  ? "linear-gradient(to right, #FE512E, #F09619)"
                  : "white",
            }}
            onClick={() => setView("maintenance")}
          >
            Maintenance
          </button>
          <button
            className={`py-2 px-4 font-semibold rounded-tl-lg rounded-tr-lg ${
              view === "other" ? "text-white" : "text-black"
            }`}
            style={{
              background:
                view === "other"
                  ? "linear-gradient(to right, #FE512E, #F09619)"
                  : "white",
            }}
            onClick={() => setView("other")}
          >
            Other Income
          </button>
        </div>
        {view === "maintenance" && (
          <ViewMaintenance maintenance={maintenance} />
        )}
        {view === "other" && <OtherIncome />}
      </div>
      {isConfirmPassword && (
        <ConfirmPassword
          onClose={() => setIsConfirmPassword(false)}
          setIsAddMaintenance={setIsAddMaintenance}
        />
      )}
      {isAddMaintenance && (
        <AddMaintenanceDetail onClose={() => setIsAddMaintenance(false)} />
      )}
    </>
  );
};

export default Income;
