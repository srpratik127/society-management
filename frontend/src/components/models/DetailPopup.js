import { useState } from "react";
import DetailsViewPopup from "./DetailsViewPopup";

const DetailPopup = ({
  onClose,
  incomePopupContent,
  setDetailsViewPopup,
  setMembersOfIncomeDetails,
}) => {
  const [members, setMembers] = useState(1);
  const perPersonAmount = incomePopupContent.amount;
  const totalAmount = members * perPersonAmount;

  const handleGetPassClick = () => {
    setDetailsViewPopup(true);
    setMembersOfIncomeDetails({
      members,
      totalAmount,
      perPersonAmount: incomePopupContent.amount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Detail of the Per Person</h2>

        <div className="flex justify-between items-center mb-4">
          <label className="text-gray-600 font-medium">
            Per Person Amount :
          </label>
          <span className="bg-gray-100 px-3 py-1 rounded-lg font-medium text-gray-700">
            ₹ {perPersonAmount}
          </span>
        </div>

        <div className="mb-4">
          <label className="text-gray-600 font-medium block mb-1">
            Select Member
          </label>
          <select
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="text-gray-600 font-medium">Total Amount :</label>
          <span className="font-medium text-gray-800">
            ₹ {totalAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleGetPassClick}
            className="w-1/2 py-2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg"
          >
            Get Pass
          </button>
        </div>
      </div>
      {/* {isViewOpen && (
        <DetailsViewPopup
          onClose={handleClosePopup}
          perPersonAmount={perPersonAmount}
          members={members}
          totalAmount={totalAmount}
        />
      )} */}
    </div>
  );
};

export default DetailPopup;
