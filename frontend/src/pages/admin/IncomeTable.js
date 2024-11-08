import React, { useState } from "react";
import { maintenanceData } from "../../data/maintenanceData";
import { otherIncomeData } from "../../data/maintenanceData";
import { Popover } from "@headlessui/react";
import CreateOtherIncome from "../../components/models/CreateOtherIncome";
import EditOtherIncome from "../../components/models/EditOtherIncome";
import ViewMaintenanceDetails from "../../components/models/ViewMaintenanceDetails";
import SetMaintenance from "../../components/models/SetMaintenance";
import AddMaintenanceDetail from "../../components/models/AddMaintenanceDetail";

const IncomeTable = () => {
  const [view, setView] = useState("maintenance");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isViewMaintenanceVisible, setViewMaintenanceVisible] = useState(false);
  const [isSetMaintenanceVisible, setSetMaintenanceVisible] = useState(false);
  const [isAddMaintenanceDetail,setIsAddMaintenanceDetail] = useState(false)

  const handleEditClick = () => {
    setSelectedItem();
    setIsEditPopupVisible(true);
  };

  const handleCreateOtherIncome = () => {
    setCreatePopupOpen(true);
  };
  const handleClosePopup = () => {
    setCreatePopupOpen(false);
    setIsEditPopupVisible(false);
    setSelectedItem(null);
    setViewMaintenanceVisible(false);
    setSetMaintenanceVisible(false);
  };
  const handleViewMaintenanceClick = () => {
    setViewMaintenanceVisible(true);
  };

  const handleSetMaintenanceClick = () => {
    setSetMaintenanceVisible(true);
  };

  return (
    <div className="bg-blue-50 min-h-[100px] p-6 overflow-y-hidden">
      {view === "maintenance" && (
        <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl">
          <div className="flex space-x-4 ">
            <div className="bg-white shadow rounded-lg p-4 w-[230px] flex flex-col justify-center">
              <div className="text-gray-500">Maintenance Amount</div>
              <div className="text-green-500 font-bold text-xl">₹ 0</div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 w-[230px] flex flex-col justify-center">
              <div className="text-gray-500">Penalty Amount</div>
              <div className="text-red-500 font-bold text-xl">₹ 0</div>
            </div>
          </div>
          <div className="flex">
            <button
              className="text-white font-bold py-2 px-8 rounded-lg h-full"
              style={{
                background: "linear-gradient(to right, #FE512E, #F09619)",
              }}
              onClick={handleSetMaintenanceClick}>
              Set Maintenance
            </button>
            {isSetMaintenanceVisible && (
              <SetMaintenance onClose={handleClosePopup} setIsAddMaintenanceDetail={setIsAddMaintenanceDetail} />
            )}
            {isAddMaintenanceDetail && (
              <AddMaintenanceDetail onClose={()=>setIsAddMaintenanceDetail(false)} />
            )}
          </div>
        </div>
      )}
      <div className="flex ">
        <button
          className={`py-2 px-4 font-semibold rounded-tl-lg rounded-tr-lg ${view === "maintenance" ? "text-white" : "text-black"}`}
          style={{
            background: view === "maintenance" ? "linear-gradient(to right, #FE512E, #F09619)" : "transparent",
          }}
          onClick={() => setView("maintenance")}>
          Maintenance
        </button>
        <button
          className={`py-2 px-4 font-semibold rounded-tl-lg rounded-tr-lg ${view === "other" ? "text-white" : "text-black"}`}
          style={{
            background: view === "other" ? "linear-gradient(to right, #FE512E, #F09619)" : "transparent",
          }}
          onClick={() => setView("other")}>
          Other Income
        </button>
      </div>
      {/* Maintenance Table */}
      {view === "maintenance" && (
        <div className="bg-white shadow rounded-lg overflow-y-auto" style={{ maxHeight: "60vh" }}>
          <table className="w-full table-auto">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-left text-gray-600">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2 text-center">Unit Number</th>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2 text-center">Penalty</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Payment</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((maintenance, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full" src={maintenance.image} alt="Profile" />
                    <span>{maintenance.name}</span>
                  </td>
                  <td className="text-center">
                    <span className="p-2 text-[#5678E9] bg-[#F6F8FB] font-semibold py-1 rounded-full">{maintenance.unit}</span>
                    <span>{maintenance.unitnumber}</span>
                  </td>
                  <td className="px-4 py-2">{maintenance.date}</td>
                  <td className="text-center">
                    <span className={`flex items-center justify-center ${maintenance.status === "Tenant"
                      ? "text-[#EC4899] font-semibold py-2 px-4 rounded-full bg-[#ECFFFF]"
                      : "text-[#4F46E5] font-semibold py-2 px-4 rounded-full bg-[#FFF6FF]"}`}>
                      <img
                        src={maintenance.status === "Owner" ? "/assets/owner.svg" : "/assets/user.svg"}
                        alt={maintenance.status === "Owner" ? "Owner Icon" : "User Icon"}
                        className="h-5 w-5 mr-2" />
                      {maintenance.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{maintenance.phone}</td>
                  <td className="px-4 py-2 text-green-600">₹ {maintenance.amount}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`flex items-center justify-center ${maintenance.penalty === "--"
                      ? "text-[#000000] font-semibold py-2 px-4 rounded-full bg-[#F6F8FB]"
                      : "text-[#FFFFFF] font-semibold py-2 px-4 rounded-full bg-[#E74C3C]"}`}>
                      {maintenance.penalty}
                    </span>
                  </td>
                  <td className="px-4 text-center ">
                    <span className={`px-2 py-2 rounded-full flex items-center justify-center ${maintenance.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                      }`}
                      aria-label={`${maintenance.paymentStatus} Status`}>
                      <img
                        src={maintenance.paymentStatus === "Pending" ? "/assets/timer.svg" : "/assets/tickmark.svg"}
                        alt={maintenance.paymentStatus === "Pending" ? "Pending Icon" : "Done Icon"}
                        className="h-5 w-5 mr-2" />
                      {maintenance.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-2 flex items-center justify-center rounded-full ${maintenance.paymentMethod === "Online"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                      }`}
                      aria-label={`${maintenance.paymentMethod} Payment Method`}>
                      <img
                        src={maintenance.paymentMethod === "Online" ? "/assets/wallet-2.svg" : "/assets/moneys.svg"}
                        alt={maintenance.paymentMethod === "Online" ? "Online Payment Icon" : "Cash Payment Icon"}
                        className="h-5 w-5 mr-2" />
                      {maintenance.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-gray-200 hover:bg-gray-300 rounded-full" onClick={handleViewMaintenanceClick} >
                      <span className="material-icons">
                        <img src="/assets/blueeye.svg" alt="Action Icon" />
                      </span>
                    </button>
                    {isViewMaintenanceVisible && <ViewMaintenanceDetails onClose={handleClosePopup} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Other Income Section */}
      {view === "other" && (
        <div className="bg-[#ffffff] border rounded-xl p-3">

          <div className="mt-6 flex justify-between align-center p-5">
            <h2 className="text-2xl font-semibold">Other Income</h2>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              onClick={handleCreateOtherIncome}
            >
              Create Other Income
            </button>
          </div>

          {isCreatePopupOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
              <CreateOtherIncome onClose={handleClosePopup} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 rounded-lg">
            {otherIncomeData.map((item, index) => (
              <div key={index} className="border-2 border-[#5678E9] rounded-xl">

                <div className="flex mb-2 py-3 w-full rounded-t-lg px-2 bg-[#5678E9] justify-between">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <Popover className="relative">
                    <Popover.Button>
                      <img src="/assets/3dots.svg" alt="options" />
                    </Popover.Button>
                    <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-2">
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={handleEditClick}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => setSelectedOption("View")}
                        >
                          View
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => setSelectedOption("Delete")}
                        >
                          Delete
                        </button>
                      </div>
                    </Popover.Panel>
                  </Popover>
                </div>

                {isEditPopupVisible && <EditOtherIncome onClose={handleClosePopup} />}

                <div className="flex justify-between px-3 py-1">
                  <span className="text-sm text-gray-600">Amount Per Member:</span>
                  <span className="font-medium">₹{item.amount}</span>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="text-sm text-gray-600">Total Members:</span>
                  <span className="font-medium">{item.totalMembers}</span>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="font-medium">{item.date}</span>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="text-sm text-gray-600">Due Date:</span>
                  <span className="font-medium">{item.dueDate}</span>
                </div>
                <div className="flex justify-between px-3 py-1">
                  <span className="text-sm text-gray-600 mt-2">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeTable;

