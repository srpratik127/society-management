import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import PaymentPopup from "../../components/models/PaymentPopup";

const OtherIncomeInvoice = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [otherIncomeData, setOtherIncomeData] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const [selectOtherIncome, setSelectOtherIncome] = useState({});

  useEffect(() => {
    const viewOtherIncome = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/income/${user?._id}`
        );
        setOtherIncomeData(data?.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    viewOtherIncome();
  }, []);

  return (
    <div className="p-4 m-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Due Event Payment</h2>
        <button className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg shadow">
          View Invoice
        </button>
      </div>
      {otherIncomeData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherIncomeData.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow flex flex-col justify-between"
            >
              <div className="bg-[#5678E9] text-white p-2 rounded-t-lg flex justify-between items-center">
                <p className="font-semibold">Due Event Payment</p>
                <p className="bg-[#FFFFFF1A] text-sm px-3 py-1 rounded-full">
                  Pending
                </p>
              </div>
              <div className="p-2">
                <div className="text-gray-700 flex justify-between p-2">
                  <p>Event Name:</p>
                  <p>{item.title}</p>
                </div>
                <div className="text-gray-700 flex justify-between px-2">
                  <p>Event Due Date:</p>
                  <p>
                    {new Date(item.dueDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-[#E74C3C] flex justify-between p-2 pb-0">
                  <p>Amount:</p>
                  <p>{item.amount}.00</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPopupOpen(true);
                  setSelectOtherIncome(item);
                }}
                className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-lg shadow m-2"
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center select-none text-gray-400">No Due Event Payment Found!</p>
      )}

      {isPopupOpen && (
        <PaymentPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          selectOtherIncome={selectOtherIncome}
          setOtherIncomeData={setOtherIncomeData}
        />
      )}
    </div>
  );
};

export default OtherIncomeInvoice;
