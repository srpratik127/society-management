import React, { useEffect, useState } from "react";
import ResidenceStatus from "../../components/models/ResidenceStatus";
import axios from "axios";
import ViewResident from "../../components/models/ViewResident";
import { useNavigate } from "react-router-dom";
import DeleteModel from "../../components/models/DeleteModel";
import toast from "react-hot-toast";

const Resident = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [viewResident, setViewResident] = useState(false);
  const [openConform, setOpenConform] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [residents, setResidents] = useState([]);
  const [selectViewResidents, setSelectViewResidents] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/resident`
        );
        setResidents(response?.data?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchResidents();
  }, []);

  const handleEditClick = (resident) => {
    setSelectedResident(resident);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleVacate = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/api/resident/vacate-flat/${selectedResident._id}`
      );
      setSelectedResident(null);
      setOpenConform(false);
      const updatedResidents = residents.map((resident) => {
        if (resident._id === selectedResident._id) {
          return { ...resident, residenceStatus: "Vacate" };
        }
        return resident;
      });
      toast.success("Vacate Flat successful!");
      setResidents(updatedResidents);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="p-4 max-w-full lg:max-w-full mx-auto">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-6">
          <h2 className="text-xl font-semibold">
            Resident Tenant and Owner Details
          </h2>
          <button
            className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white font-bold py-2 px-4 rounded mb-4 flex items-center sm:mb-0"
            onClick={() => navigate("/admin/add-resident")}
          >
            <span className="pr-2">
              <img src="/assets/add-square.svg" alt="Add" />
            </span>
            Add New Resident Details
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-[#5678E9] bg-opacity-10">
              <tr>
                <th className="py-3 font-semibold px-8 text-start text-nowrap">Full Name</th>
                <th className="py-3 font-semibold px-4 text-nowrap">Unit Number</th>
                <th className="py-3 font-semibold px-4 text-nowrap">Unit Status</th>
                <th className="py-3 font-semibold px-4 text-nowrap">Resident Status</th>
                <th className="py-3 font-semibold px-4 text-nowrap text-start">
                  Phone Number
                </th>
                <th className="py-3 font-semibold px-4 text-nowrap">Member</th>
                <th className="py-3 font-semibold px-4 text-nowrap">Vehicle</th>
                <th className="py-3 font-semibold text-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {residents.length > 0 ? (
                residents?.map((resident) => {
                  const Vacate = resident.residenceStatus === "Vacate";
                  return (
                    <tr key={resident._id} className="border-t mx-auto">
                      <td className="py-2 px-4 flex items-center capitalize">
                        <span className="mr-2">
                          <img
                            src={
                              !Vacate
                                ? resident.profile_picture
                                : "/assets/empty.png"
                            }
                            alt={`${resident.fullName}'s Avatar`}
                            className="h-10 w-10 rounded-full"
                          />
                        </span>
                        {!Vacate ? resident.fullName : "--"}
                      </td>
                      <td className="text-center">
                        <span className="p-2 text-[#5678E9] bg-[#F6F8FB] font-semibold py-1 rounded-full">
                          {resident.wing}
                        </span>
                        <span>{resident.unit}</span>
                      </td>
                      <td className="py-2 text-center min-w-[170px]">
                        <span
                          className={`flex items-center mx-4 justify-center ${
                            resident.residenceStatus === "Occupied"
                              ? "text-[#14B8A6] font-semibold py-2 px-3 rounded-full bg-[#ECFFFF]"
                              : "text-[#9333EA] font-semibold py-2 px-3 rounded-full bg-[#FFF6FF]"
                          }`}
                        >
                          <img
                            src={
                              resident.residenceStatus === "Occupied"
                                ? "/assets/occupied.svg"
                                : "/assets/vacate.svg"
                            }
                            alt="Residence Status Icon"
                            className="h-5 w-5 mr-2"
                          />
                          {resident.residenceStatus}
                        </span>
                      </td>
                      <td className="text-center">
                        <span
                          className={`flex items-center justify-center ${
                            resident.role === "tenant"
                              ? "text-[#EC4899] font-semibold py-2 px-4 rounded-full bg-[#FFF1F8]"
                              : "text-[#4F46E5] font-semibold py-2 px-4 rounded-full bg-[#F1F0FF]"
                          }`}
                        >
                          {!Vacate && (
                            <img
                              src={
                                resident.role === "owner"
                                  ? "/assets/owner.svg"
                                  : "/assets/user.svg"
                              }
                              alt={
                                resident.role === "owner"
                                  ? "Owner Icon"
                                  : "User Icon"
                              }
                              className="h-5 w-5 mr-2"
                            />
                          )}
                          {!Vacate ? resident.role : "--"}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-nowrap">
                        {!Vacate ? `+91 ${resident.phone}` : "--"}
                      </td>
                      <td className="py-2 text-center">
                        <span className="bg-[#F6F8FB] px-2 py-1 rounded-full">
                          {!Vacate ? `0${resident?.members?.length}` : "--"}
                        </span>
                      </td>
                      <td className="py-2 text-center">
                        <span className="bg-[#F6F8FB] px-2 py-1 rounded-full">
                          {!Vacate ? `0${resident.vehicles?.length}` : "--"}
                        </span>
                      </td>
                      <td className="py-2 px-4 flex justify-center">
                        {!Vacate ? (
                          <>
                            <button
                              className="text-green-500 hover:text-green-700 px-2  w-12"
                              aria-label={`Edit ${resident.name}`}
                              onClick={() => handleEditClick(resident)}
                            >
                              <img
                                src="/assets/edit.svg"
                                alt="Edit"
                                className="h-8 w-8"
                              />
                            </button>
                            <button
                              className="text-blue-500 hover:text-blue-700 px-2  w-12"
                              onClick={() => {
                                setViewResident(true);
                                setSelectViewResidents(resident);
                              }}
                            >
                              <img
                                src="/assets/blueeye.svg"
                                alt="View"
                                className="h-8 w-8"
                              />
                            </button>
                          </>
                        ) : (
                          "--"
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="text-center py-4 leading-[70vh] select-none"
                    colSpan="100%"
                  >
                    No Data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <ResidenceStatus
          resident={selectedResident}
          onClose={closePopup}
          setOpenConform={setOpenConform}
        />
      )}
      {viewResident && (
        <ViewResident
          onClose={() => setViewResident(false)}
          selectResidents={selectViewResidents}
        />
      )}
      {openConform && (
        <DeleteModel
          closePopup={() => setOpenConform(false)}
          onDelete={handleVacate}
          message={{
            title: "Do you want to vacate the finlay flat?",
            sms: "Are you sure you want to delate all details?",
          }}
        />
      )}
    </div>
  );
};

export default Resident;
