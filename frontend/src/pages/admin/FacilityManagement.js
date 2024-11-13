import React, { useEffect, useState } from "react";
import CreateFacilityManagement from "../../components/models/CreateFacilityManagement";
import EditFacilityManagement from "../../components/models/EditFacilityManagement";
import axios from "axios";
import { Popover } from "@headlessui/react";

const FacilityManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    const fetchComplainList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/facilities`
        );
        setFacilities(response?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchComplainList();
  }, []);
 
  return (
    <div className="p-6 bg-white m-5 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Facility Management</h1>
        <button
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Facility
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {facilities.length > 0 ? (
          facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="bg-[#5678E9] text-white px-4 py-2 flex justify-between items-center">
                <h2 className="text-lg font-medium">{facility.name}</h2>
                <Popover className="relative">
                  <Popover.Button className="outline-none">
                    <img src="/assets/3dots.svg" alt="Menu" />
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0  w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setSelectedFacility(facility);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
              <div className="p-4">
                <p className="text-gray-600">
                  <span className="text-[#4F4F4F]">
                    Upcoming Schedule Service Date:
                  </span>{" "}
                  <span className="text-black">
                    {new Date(facility.serviceData).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="text-[#4F4F4F]">Description:</span>{" "}
                  <span className="text-black block">
                    {facility.description}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-full">
            <p className="text-gray-500 text-center select-none">
              No Data found.
            </p>
          </div>
        )}
      </div>
      {isCreateModalOpen && (
        <CreateFacilityManagement
          onClose={()=> setIsCreateModalOpen(false)}
          setFacilities={setFacilities}
        />
      )}
      {isEditModalOpen && (
        <EditFacilityManagement
          onClose={()=>setIsEditModalOpen(false)}
          selectedFacility={selectedFacility}
          setFacilities={setFacilities}
        />
      )}
    </div>
  );
};

export default FacilityManagement;
