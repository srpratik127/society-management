import React from "react";

const ViewComplain = ({ closePopup, selectedComplain }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
        <div className="flex justify-between items-center mb-6 border-b">
          <h2 className="text-xl font-semibold">View Complain</h2>
          <button
            className="p-2 text-gray-400 hover: focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={closePopup}
          >
            &#10006;
          </button>
        </div>

        <div className="flex items-center mb-4">
          <img
            src={selectedComplain.complainerAvatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {selectedComplain.complainerName}
            </h3>
            <p className="text-gray-500">{selectedComplain.date}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[#202224]">
            <span className=" text-[#A7A7A7]">Request Name </span>
            <br />
            {selectedComplain.selectedComplainName}
          </p>
          <p className="text-[#202224] mb-2">
            <span className="text-[#A7A7A7]">Description </span>
            <br /> {selectedComplain.description}
          </p>

          <div className="flex mt-5 justify-between">
            <p className="text-center mb-2">
              <span className="text-[#A7A7A7] block">Wing</span>
              <span className="text-[#5678E9] block w-8 h-8 bg-[#F6F8FB] leading-8 font-bold rounded-full">
                {selectedComplain.wing}
              </span>
            </p>
            <p className="text-center mb-2">
              <span className="text-[#A7A7A7] block">Unit</span>{" "}
              {selectedComplain.unit}
            </p>
            <p className="text-center mb-2">
              <span className="text-[#A7A7A7]">Priority</span>
              <span
                className={`py-1 px-3 block w-24 mx-auto text-center rounded-full text-white ${
                  selectedComplain.priority === "High"
                    ? "bg-red-500"
                    : selectedComplain.priority === "Medium"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {selectedComplain.priority}
              </span>
            </p>
            <p className="text-center mb-2">
              <span className="text-[#A7A7A7] block">Status</span>
              <span
                className={`py-1 px-3 rounded-full block w-24 mx-auto text-center ${
                  selectedComplain.status === "Open"
                    ? "bg-blue-100 text-blue-600"
                    : selectedComplain.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {selectedComplain.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplain;
