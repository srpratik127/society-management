import React, { useState } from 'react';

const SetMaintenance = ({ onClose , setIsAddMaintenanceDetail}) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };
    const onContinue = () => {
        onClose()
        setIsAddMaintenanceDetail(true)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-96 mx-auto">
                <div className="flex justify-between items-center mb-6 border-b">
                    <h2 className="text-xl font-semibold">Set Maintenance</h2>
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="text-sm font-medium">
                        Password<span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handlePasswordToggle}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            <img src={showPassword ? "/assets/eye.svg" : "/assets/eye-slash.svg"} alt="Toggle visibility" />
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button className="w-1/2 bg-gray-200 text-gray-700 rounded-lg py-2 mr-2" onClick={onClose}>Cancel</button>
                    <button className="w-1/2 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg py-2 ml-2" onClick={onContinue}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SetMaintenance;
