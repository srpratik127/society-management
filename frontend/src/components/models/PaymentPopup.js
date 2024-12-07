import axios from "axios";
import Razorpay from "razorpay";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const PaymentPopup = ({
  isOpen,
  onClose,
  selectMaintenance,
  setMaintenance,
  selectOtherIncome,
  setOtherIncomeData,
}) => {
  const [isConform, setIsConform] = useState(false);
  const [payMethod, setPayMethod] = useState(null);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: null,
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const userId = useSelector((store) => store.auth.user?._id);

  const validateForm = () => {
    const { cardName, cardNumber, expiryDate, cvv } = formData;
    const errors = {};

    if (!cardName.trim()) errors.cardName = "Card name is required.";
    if (cardNumber.trim().length !== 16)
      errors.cardNumber = "Card number must be 16 digits.";
    if (!(expiryDate instanceof Date && expiryDate > new Date()))
      errors.expiryDate = "Expiry date must be in the future.";
    if (cvv.trim().length !== 3) errors.cvv = "CVV must be 3 digits.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmClick = async () => {
    if (payMethod === "Cash Payment") {
      try {
        if (selectOtherIncome) {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/v1/api/income/add-member/${selectOtherIncome._id}`,
            {
              user: userId,
              paymentMethod: "cash",
              payAmount: selectOtherIncome.amount,
            }
          );
          setOtherIncomeData((prev) =>
            prev.filter(
              (OtherIncome) => OtherIncome._id !== selectOtherIncome._id
            )
          );
        }
        if (selectMaintenance) {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/${selectMaintenance._id}`,
            { userId, paymentMethod: "cash" }
          );
          setMaintenance((prev) =>
            prev.filter(
              (Maintenance) => Maintenance._id !== selectMaintenance._id
            )
          );
        }
        toast.success("Cash Payment Successful!");
        onClose();
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    } else {
      if (!isConform) {
        setIsConform(true);
      } else {
        if (validateForm()) {
          const paymentData = {
            amount: selectMaintenance
              ? selectMaintenance.amount
              : selectOtherIncome.amount,
            userId: userId,
            incomeId: selectMaintenance
              ? selectMaintenance._id
              : selectOtherIncome._id,
            paymentMethod: "online",
          };
          if (selectMaintenance) {
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/create-order`,
                {
                  amount: selectMaintenance.amount,
                  currency: "INR",
                  receipt: `maintenance_${selectMaintenance._id}`,
                  userId,
                  paymentMethod: "online",
                }
              );
              const { order, razorpayKey } = response.data;
              if (!order) throw new Error("Order creation failed");
              const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "Society Maintenance Payment",
                description: `Payment for maintenance ${selectMaintenance._id}`,
                handler: async (paymentResponse) => {
                  const paymentData = {
                    razorpayOrderId: paymentResponse.razorpay_order_id,
                    razorpayPaymentId: paymentResponse.razorpay_payment_id,
                    razorpaySignature: paymentResponse.razorpay_signature,
                    paymentMethod: "online",
                    userId: userId,
                    maintenanceId: selectMaintenance._id,
                    incomeId: null, 
                  };

                  try {
                    const verifyResponse = await axios.post(
                      `${process.env.REACT_APP_BASE_URL}/v1/api/maintenance/verify`,
                      paymentData
                    );
                    toast.success("Payment Successful!");
                    setMaintenance((prev) =>
                      prev.filter(
                        (Maintenance) =>
                          Maintenance._id !== selectMaintenance._id
                      )
                    );
                    onClose();
                  } catch (error) {
                    toast.error("Payment verification failed.");
                  }
                },
                prefill: {
                  name: "Your Name",
                  email: "your-email@example.com",
                  contact: "1234567890",
                },
              };

              const razorpay = new window.Razorpay(options);
              razorpay.open();
            } catch (error) {
              console.error("Error initiating Razorpay payment:", error);
              toast.error("Error initiating Razorpay payment.");
            }
          } else if (selectOtherIncome) {
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/v1/api/income/create-order`,
                {
                  amount: selectOtherIncome.amount,
                  currency: "INR",
                  receipt: `income_${selectOtherIncome._id}`,
                  userId,
                  paymentMethod: "online",
                }
              );
              const { order, razorpayKey } = response.data;
              if (!order) throw new Error("Order creation failed");
              const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "Other Income Payment",
                description: `Payment for income ${selectOtherIncome._id}`,
                handler: async (paymentResponse) => {
                  const paymentData = {
                    razorpayOrderId: paymentResponse.razorpay_order_id,
                    razorpayPaymentId: paymentResponse.razorpay_payment_id,
                    razorpaySignature: paymentResponse.razorpay_signature,
                    paymentMethod: "online",
                    amount: selectOtherIncome.amount,
                    userId: userId,
                    maintenanceId: null,
                    incomeId: selectOtherIncome._id,
                  };
                  try {
                    const verifyResponse = await axios.post(
                      `${process.env.REACT_APP_BASE_URL}/v1/api/income/verify`,
                      paymentData
                    );
                    toast.success("Payment Successful!");
                    setOtherIncomeData((prev) =>
                      prev.filter(
                        (OtherIncome) =>
                          OtherIncome._id !== selectOtherIncome._id
                      )
                    );
                    onClose();
                  } catch (error) {
                    toast.error("Payment verification failed.");
                  }
                },
                prefill: {
                  name: "Your Name",
                  email: "your-email@example.com",
                  contact: "1234567890",
                },
              };
              const razorpay = new window.Razorpay(options);
              razorpay.open();
            } catch (error) {
              console.error("Error initiating Razorpay payment:", error);
              toast.error("Error initiating Razorpay payment.");
            }
          }
        }
      }
    }
  };

  const resetForm = () => {
    setIsConform(false);
    setFormData({
      cardName: "",
      cardNumber: "",
      expiryDate: null,
      cvv: "",
    });
    setFormErrors({});
    setPayMethod(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, expiryDate: date }));
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        {!isConform ? (
          <div className="space-y-3">
            <div className="mt-1">
              {["Master Card", "Visa Card", "Cash Payment"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPayMethod(method)}
                  className={`p-2 flex border justify-between items-center w-full rounded-lg font-medium mb-3 ${
                    payMethod === method
                      ? "border-[#FE512E]"
                      : "border-gray-200 text-[#A7A7A7]"
                  }`}
                >
                  <div className="gap-3 flex items-center">
                    <img
                      src={
                        method === "Master Card"
                          ? "/assets/MasterCard.svg"
                          : method === "Visa Card"
                          ? "/assets/visa.svg"
                          : "/assets/CashPayment.svg"
                      }
                      alt={method}
                    />
                    <span>{method}</span>
                  </div>
                  <img
                    src={`${
                      payMethod === method
                        ? "/assets/fill-redio.svg"
                        : "/assets/unfill-redio.svg"
                    }`}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#202224]">
                Card Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="Enter Card Name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formErrors.cardName && (
                <p className="text-red-500 text-sm">{formErrors.cardName}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#202224]">
                Card Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="16"
                placeholder="Enter 16-digit Card Number"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formErrors.cardNumber && (
                <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>
              )}
            </div>
            <div className="flex gap-3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#202224]">
                  Expiry Date<span className="text-red-500">*</span>
                </label>
                <DatePicker
                  selected={formData.expiryDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="MM/YYYY"
                  className="block w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.expiryDate && (
                  <p className="text-red-500 text-sm">
                    {formErrors.expiryDate}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#202224]">
                  CVV<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                  placeholder="Enter CVV"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.cvv && (
                  <p className="text-red-500 text-sm">{formErrors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="w-1/2 px-4 py-2 border rounded-lg text-gray-700"
          >
            Cancel
          </button>
          <button
            disabled={!payMethod}
            className="w-1/2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#FE512E] to-[#F09619]"
            onClick={handleConfirmClick}
          >
            {isConform ? "Confirm" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
