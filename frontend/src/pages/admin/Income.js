import React, { useEffect, useState } from "react";
import ViewMaintenance from "../../components/admin/ViewMaintenance";
import OtherIncome from "../../components/admin/OtherIncome";
import ConfirmPassword from "../../components/models/ConfirmPassword";
import AddMaintenanceDetail from "../../components/models/AddMaintenanceDetail";
import axios from "axios";
import toast from "react-hot-toast";

const Income = () => {
  const [view, setView] = useState("maintenance");
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isAddMaintenance, setIsAddMaintenance] = useState(false);
  const [maintenance, setMaintenance] = useState([]);

  const viewMaintenanceFn = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance`
      );
      setMaintenance(response?.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    viewMaintenanceFn();
  }, []);

  return (
    <>
      <div className="bg-blue-50 min-h-[100px] p-6 overflow-y-hidden max-w-full ">
        {view === "maintenance" && (
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 p-4 bg-white rounded-xl">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 lg:mb-0">
              <div className="bg-white shadow rounded-lg p-4 w-full sm:w-[230px] flex flex-col justify-center">
                <div className="text-gray-500">Maintenance Amount</div>
                <div className="text-green-500 font-bold text-xl">
                  ₹ {maintenance[maintenance.length -1]?.amount || "00"}
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 w-full sm:w-[230px] flex flex-col justify-center">
                <div className="text-gray-500">Penalty Amount</div>
                <div className="text-red-500 font-bold text-xl">
                  ₹ {maintenance[maintenance.length -1]?.penaltyAmount || "00"}
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <button
                className="text-white font-bold py-2 px-8 rounded-lg w-full lg:w-auto"
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
        <div className="flex flex-wrap">
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
            className={`py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg ${
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
        <AddMaintenanceDetail onClose={() => setIsAddMaintenance(false)} setMaintenance={setMaintenance}/>
      )}
    </>
  );
};

export default Income;
