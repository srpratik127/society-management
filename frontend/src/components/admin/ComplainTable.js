import React, { useEffect, useState } from "react";
import ViewComplain from "../models/ViewComplain";
import EditComplaint from "../models/EditComplaint";
import axios from "axios";
import DeleteModel from "../models/DeleteModel";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { filterComplains } from "../../utils/validation";
import Loader from "../Loader";

const ComplainTable = () => {
  const [openViewComplain, setOpenViewComplain] = useState(false);
  const [openEditComplain, setOpenEditComplain] = useState(false);
  const [openDeleteComplain, setOpenDeleteComplain] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState({});
  const [complainList, setComplainList] = useState([]);
  const [complainToDelete, setComplainToDelete] = useState(null);
  const [filteredComplainList, setFilteredComplainList] = useState([]);
  const [timeFilter, setTimeFilter] = useState("");
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/complaints`
        );
        setComplainList(response?.data?.data);
        setFilteredComplainList(response?.data?.data);
        setLoader(false);
      } catch (error) {
        toast.error(error.response?.data?.message);
        setLoader(false);
      }
    };

    fetchComplainList();
  }, []);

  useEffect(() => {
    filterComplains(
      timeFilter,
      complainList,
      setFilteredComplainList,
      "updatedAt"
    );
  }, [timeFilter]);

  const ViewComplains = (complaint) => {
    setOpenViewComplain(true);
    setSelectedComplain(complaint);
  };

  const editComplains = (complaint) => {
    setOpenEditComplain(true);
    setSelectedComplain(complaint);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/v1/api/complaints/${complainToDelete}`,
        {
          withCredentials: true,
        }
      );
      setComplainList((prev) =>
        prev.filter((complain) => complain._id !== complainToDelete)
      );
      toast.success("Complaints Delete successful!");
      setOpenDeleteComplain(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-white rounded-lg px-4 pt-2 w-full shadow">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Complaint List</h1>
        <div className="relative">
          <select
            className="bg-gray-100 border border-gray-300 rounded-md p-2 outline-none"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
      </div>
      <div className="max-w-[91vw] overflow-auto h-[218px] ">
        <table className="min-w-full  bg-white">
          <thead className="sticky top-0 bg-gray-100">
            <tr className="text-left text-sm ">
              <th className="py-3 text-light px-4 text-nowrap">
                Complainer Name
              </th>
              <th className="py-3 text-light px-4 text-nowrap">
                Complaint Name
              </th>
              <th className="py-3 text-light px-8">Date</th>
              <th className="py-3 text-light text-center px-5">Priority</th>
              <th className="py-3 text-light text-center px-4 text-nowrap">
                Complain Status
              </th>
              <th className="py-3 text-light px-14 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {loader ? (
              <tr className="text-gray-500 select-none">
                <td className="text-center py-4 leading-[140px]" colSpan="100%">
                  <Loader />
                </td>
              </tr>
            ) : filteredComplainList.length > 0 ? (
              filteredComplainList.map((complaint, index) => (
                <tr key={index} className="border-b capitalize">
                  <td className="py-1 px-4 flex items-center space-x-3 text-nowrap">
                    <img
                      src={complaint.user?.profile_picture}
                      alt={complaint.complainerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{complaint.complainerName}</span>
                  </td>
                  <td className="py-3 px-4">{complaint.complaintName}</td>
                  <td className="py-3 px-4 text-nowrap">
                    {complaint.updatedAt.slice(0, 10)}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`py-1 px-3 block w-24 mx-auto text-center rounded-full text-white ${
                        complaint.priority === "High"
                          ? "bg-red-500"
                          : complaint.priority === "Medium"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="py-2 px-12">
                    <span
                      className={`py-1 px-3 rounded-full block w-24 mx-auto text-center ${
                        complaint.status === "Open"
                          ? "bg-blue-100 text-blue-600"
                          : complaint.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    <button
                      className="p-1 rounded-xl text-green-600"
                      onClick={() => editComplains(complaint)}
                    >
                      <img
                        src="/assets/edit.svg"
                        alt="Edit Icon"
                        className="h-7 w-7 cursor-pointer"
                      />
                    </button>
                    <button
                      className="p-1 rounded-xl text-blue-600"
                      onClick={() => ViewComplains(complaint)}
                    >
                      <img
                        src="/assets/show.svg"
                        alt="Show Icon"
                        className="h-7 w-7 cursor-pointer"
                      />
                    </button>
                    <button
                      className="p-1 rounded-xl text-red-600"
                      onClick={() => {
                        if (user?.user_role === "admin") {
                          setComplainToDelete(complaint._id);
                          setOpenDeleteComplain(true);
                        } else {
                          toast.error(
                            "You are not authorized to perform this action."
                          );
                        }
                      }}
                    >
                      <img
                        src="/assets/delete.svg"
                        alt="Delete Icon"
                        className="h-7 w-7 cursor-pointer"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-gray-500 select-none">
                <td className="text-center py-4 leading-[140px]" colSpan="100%">
                  No Complaint Data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openViewComplain && (
        <ViewComplain
          closePopup={() => setOpenViewComplain(false)}
          selectedComplain={selectedComplain}
        />
      )}
      {openEditComplain && (
        <EditComplaint
          closePopup={() => setOpenEditComplain(false)}
          selectedComplain={selectedComplain}
          setComplainList={setComplainList}
        />
      )}
      {openDeleteComplain && (
        <DeleteModel
          closePopup={() => setOpenDeleteComplain(false)}
          onDelete={handleDelete}
          message={{
            title: "Delete Complain?",
            sms: "Are you sure you want to delate this complain?",
          }}
        />
      )}
    </div>
  );
};

export default ComplainTable;
