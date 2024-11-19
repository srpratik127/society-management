import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const MaintenanceData = () => {
  const [maintenance, setMaintenance] = useState([]);
  const user = useSelector((store) => store.auth.user);

  const viewMaintenanceFn = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/maintenance/pending/${user._id}`
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
    <div>
      <div className="flex justify-between flex-col bg-white md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 lg:mb-0 p-4 m-6 rounded-lg items-center">
        <h2 className="text-lg font-semibold">Show Maintenance Details</h2>
        <div className="flex gap-4">
          <div className="bg-white shadow rounded-lg p-4 w-full sm:w-[230px] flex flex-col justify-center">
            <div className="text-gray-500">Maintenance Amount</div>
            <div className="text-green-500 font-bold text-xl">
              <h1> ₹ {maintenance[maintenance?.length - 1]?.amount || "00"}</h1>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 w-full sm:w-[230px] flex flex-col justify-center">
            <div className="text-gray-500">Penalty Amount</div>
            <div className="text-red-500 font-bold text-xl">
              <h1>
                ₹ {maintenance[maintenance?.length - 1]?.penaltyAmount || "00"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#ffff] p-4 m-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Pending Maintenance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {maintenance.map((item, index) => {
            const currentDate = new Date();
            const penaltyDate = new Date(item.penaltyDay);
            const isPenaltyApplied = currentDate >= penaltyDate;

            return (
              <div key={index} className="rounded-lg shadow">
                <div className="bg-[#5678E9] text-white rounded-t-lg p-2 flex justify-between">
                  <span>Maintenance</span>
                  <span className="bg-[#FFFFFF1A] px-3 rounded-full py-1 capitalize">
                    {item.member[0].status}
                  </span>
                </div>
                <div className="space-y-4 text-gray-700 p-4">
                  <div className="flex justify-between">
                    <p>Bill Date</p>
                    <p>
                      {" "}
                      {new Date(item.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p>Penalty Date</p>
                    <p>
                      {new Date(item.penaltyDay).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-red-600">
                    <p className="pr-2">Maintenance Amount</p>
                    <p>₹ {item.amount}</p>
                  </div>
                  <div className="flex justify-between items-center text-red-600 border-b pb-2">
                    <p className="pr-2">Maintenance Penalty Amount</p>
                    <p className="text-nowrap">₹ {item.penaltyAmount}</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Grand Total</p>
                    <p className="text-green-600">
                      ₹{" "}
                      {isPenaltyApplied
                        ? `${
                            item.amount + item.penaltyAmount
                          } - (Penalty Applied)`
                        : item.amount}
                    </p>
                  </div>
                  <button className="mt-3 w-full py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-md font-semibold">
                    Pay Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="bg-[#ffff] p-4 m-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Due Maintenance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {maintenanceData.dueMaintenance.map((item, index) => (
                        <div key={index} className=" bg-white rounded-lg shadow-md">
                            <div className="bg-blue-500 text-white rounded-t-lg p-2 font-semibold flex justify-between">
                                <span>Maintenance</span>
                                <span className="bg-[#FFFFFF1A] px-3 rounded-full py-1">Pending</span>
                            </div>
                            <div className="p-3 space-y-2 text-gray-700">
                                <div className="flex justify-between border-b pb-2">
                                    <p>Date</p>
                                    <p>{item.date}</p>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <p>Amount</p>
                                    <p>₹ {item.amount}</p>
                                </div>
                                <div className="flex justify-between text-red-600 border-b pb-2">
                                    <p>Due Maintenance Amount</p>
                                    <p className="text-nowrap">₹ {item.duePenaltyAmount}</p>
                                </div>
                                <button className="mt-3 w-full py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-md font-semibold">
                                    Pay Now
                                </button>
                            </div>
                        </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default MaintenanceData;
