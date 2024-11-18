import React from 'react';

const ServiceAndComplaint = () => {
    return (
        <div>
            <div className="flex flex-wrap m-6">
                <button
                    className="py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg text-sm border-b focus:bg-gradient-to-r from-[#FE512E] to-[#F09619] focus:text-white">
                    Complaint Submission
                </button>
                <button
                    className="py-3 px-4 font-semibold rounded-tl-lg rounded-tr-lg text-sm border-b focus:bg-gradient-to-r from-[#FE512E] to-[#F09619] focus:text-white">
                    Request Submission
                </button>
            </div>
        </div>
    );
};

export default ServiceAndComplaint;
