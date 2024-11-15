import React, { useEffect, useState } from 'react';
import AddSecurity from '../../components/models/AddSecurity'; 
import EditSecurity from '../../components/models/EditSecurity';
import ViewSecurity from '../../components/models/ViewSecurity'; 
import axios from 'axios';
import DeleteModel from '../../components/models/DeleteModel';

const SecurityGuard = () => {
  const [guards, setGuards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); 
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [selectedViewGuard, setSelectedViewGuard] = useState(null); 

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/guard`
        );
        setGuards(response?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchGuards();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/guard/${selectedGuard._id}`
      );
  
      if (response.status === 200) {
        setGuards((prevGuards) => prevGuards.filter((guard) => guard._id !== selectedGuard._id));
        setSelectedGuard(null);
        setIsDeleteOpen(false);
      }
    } catch (err) {
      console.error("Error deleting guard:", err.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow rounded-lg m-4 sm:m-6 max-w-full ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Security Guard Details</h2>
        <button
          className="mt-4 sm:mt-0 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded flex items-center"
          onClick={()=>setIsModalOpen(true)}
        >
          <span className="pr-2">
            <img src="/assets/add-square.svg" alt="Add" />
          </span>
          Add Security
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
              <th className="py-4 px-2 sm:px-6 text-nowrap">Security Guard Name</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap">Phone Number</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Select Shift</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Shift Date</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Shift Time</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Gender</th>
              <th className="py-4 px-2 sm:px-6 text-nowrap text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {guards.map((guard) => (
              <tr key={guard._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-2 sm:px-6 flex items-center text-nowrap">
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
                    src={guard.profile_photo}
                    alt={guard.fullName}
                  />
                  {guard.fullName}
                </td>
                <td className="py-4 px-2 sm:px-6 text-nowrap">{guard.phoneNumber}</td>
                <td className="py-4 px-2 sm:px-6 text-nowrap text-center">
                  {guard.shift === 'Day' ? (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm font-medium rounded-full">
                      <img src="/assets/clips.png" alt="Day" />
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm font-medium rounded-full">
                      <img src="/assets/clips.1.png" alt="Night" />
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 sm:px-6 text-center text-nowrap">{new Date(guard.shiftDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</td>
                <td className="py-4 px-2 sm:px-6 text-center text-nowrap">{guard.shiftTime}</td>
                <td className="py-4 px-2 sm:px-6 text-center text-nowrap">
                  {guard.gender === 'Male' ? (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm rounded-full">
                      <img src="/assets/male.png" alt="Male" />
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs sm:text-sm rounded-full">
                      <img src="/assets/female.png" alt="Female" />
                    </span>
                  )}
                </td>
                <td className="py-4 px-2 sm:px-6 text-center flex justify-center space-x-3">
                  <button
                    className="text-green-500 hover:text-green-700 h-10 w-10"
                    onClick={() => {
                      setSelectedGuard(guard);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <img src="/assets/edit.svg" alt="Edit" />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 h-10 w-10"
                    onClick={() => {
                      setSelectedViewGuard(guard); 
                      setIsViewModalOpen(true); 
                    }}
                  >
                    <img src="/assets/blueeye.svg" alt="View" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 h-10 w-10"
                    onClick={() => {
                      setIsDeleteOpen(true);
                      setSelectedGuard(guard);
                    }}
                  >
                    <img src="/assets/delete.svg" alt="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddSecurity isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} setGuards={setGuards} />
      {selectedGuard && (
        <EditSecurity
          isOpen={isEditModalOpen}
          onClose={()=>{
            setIsEditModalOpen(false);
            setSelectedGuard(null);
          }}
          guardData={selectedGuard} 
          setGuards={setGuards}
        />
      )}
      {isViewModalOpen && (
        <ViewSecurity
          guard={selectedViewGuard} 
          onClose={() => {
            setIsViewModalOpen(false); 
            setSelectedViewGuard(null); 
          }} 
        />
      )}
      {isDeleteOpen && (
        <DeleteModel
          closePopup={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
          message={{
            title: "Delete Security?",
            sms: "Are you sure you want to delate this Security?",
          }}
        />
      )}
    </div>
  );
};

export default SecurityGuard;
