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
      toast.error(error.response?.data?.message);
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
              <div className="bg-[white] rounded-lg shadow relative z-[1]">
                <div className="bg-white  sm:flex items-center w-full justify-between p-6 rounded-lg">
                  <div
                    className={`h-12 w-2 absolute left-0 top-1/2 transform -translate-y-1/2 rounded-tr-lg rounded-br-lg bg-[#39973e83]`}
                  ></div>
                  <div className="flex flex-col justify-center font-poppins px-3 text-left pl-2">
                    <p className="font-medium leading-6">Maintenance Amount</p>
                    <p className="text-green-500 font-bold text-xl leading-6">
                      ₹ {maintenance[maintenance.length - 1]?.amount || "00"}
                    </p>
                  </div>
                  <div
                    className={`absolute w-[100%] h-[100%] rounded-e-lg rounded-tl-lg top-[-2px] right-[-2px] z-[-1]`}
                    style={{
                      background: `linear-gradient(45deg, #ffff 70%, #39973D)`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-[white] rounded-lg shadow relative z-[1]">
                <div className="bg-white  sm:flex items-center w-full justify-between p-6 rounded-lg">
                  <div
                    className={`h-12 w-2 absolute left-0 top-1/2 transform -translate-y-1/2 rounded-tr-lg rounded-br-lg bg-[#e74d3c88]`}
                  ></div>
                  <div className="flex flex-col justify-center font-poppins px-3 text-left pl-2">
                    <p className="font-medium leading-6">Maintenance Amount</p>
                    <p className="text-[#E74C3C] font-bold text-xl leading-6">
                      ₹{" "}
                      {maintenance[maintenance.length - 1]?.penaltyAmount ||
                        "00"}
                    </p>
                  </div>
                  <div
                    className={`absolute w-[100%] h-[100%] rounded-e-lg rounded-tl-lg top-[-2px] right-[-2px] z-[-1]`}
                    style={{
                      background: `linear-gradient(45deg, #ffff 70%, #e74d3c88)`,
                    }}
                  ></div>
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
            className={`py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg  border-b-2 border-orange-500 ${
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
            className={`py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg border-b-2 border-orange-500 ${
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
        <AddMaintenanceDetail
          onClose={() => setIsAddMaintenance(false)}
          setMaintenance={setMaintenance}
        />
      )}
    </>
  );
};

export default Income;
