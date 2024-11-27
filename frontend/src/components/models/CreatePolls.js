import { useState } from "react";

const CreatePoll = ({ onClose }) => {
    const [pollType, setPollType] = useState("");
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [errors, setErrors] = useState({}); 

    const pollTypes = [
        { id: 1, name: "Multichoice polls" },
        { id: 2, name: "Ranking polls" },
        { id: 3, name: "Rating polls" },
        { id: 4, name: "Numeric polls" },
        { id: 5, name: "Text polls" },
    ];

    const validate = () => {
        const newErrors = {};
        if (!pollType) newErrors.pollType = "Poll type is required.";
        if (!question.trim()) newErrors.question = "Question is required.";
        if (!option1.trim()) newErrors.option1 = "Option 1 is required.";
        if (!option2.trim()) newErrors.option2 = "Option 2 is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleCreate = () => {
        if (validate()) {
            console.log({ pollType, question, option1, option2 });
            onClose(); 
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Polls</h2>
                <form>
                   
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Polls <span className="text-red-500">*</span>
                        </label>
                        <div
                            className="border border-gray-300 rounded-lg p-2 flex items-center justify-between cursor-pointer"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <span>{pollType || "Select Polls"}</span>
                            <button className="">
                                <img src="/assets/3dots.svg" alt="" />
                            </button>
                        </div>
                        {showDropdown && (
                            <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                {pollTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setPollType(type.name);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <div
                                            className="w-4 h-4 border border-gray-300 rounded-full mr-2 flex justify-center items-center"
                                            style={{
                                                background: pollType === type.name ? 'linear-gradient(to right, #FE512E, #F09619)' : '#fff',
                                                borderColor: pollType === type.name ? 'transparent' : '#D1D5DB',
                                            }}
                                        >
                                            {pollType === type.name && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span>{type.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.pollType && (
                            <p className="text-red-500 text-sm mt-1">{errors.pollType}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Question <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ask a question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.question && (
                            <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Option 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Add"
                            value={option1}
                            onChange={(e) => setOption1(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.option1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.option1}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Option 2 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Add"
                            value={option2}
                            onChange={(e) => setOption2(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.option2 && (
                            <p className="text-red-500 text-sm mt-1">{errors.option2}</p>
                        )}
                    </div>

                    <div className="flex justify-between  ">
                        <button
                            type="button"
                            className="border border-[#D3D3D3] w-full text-[#202224] font-semibold py-2 px-4 rounded-md mr-4"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={`w-full font-semibold py-2 px-4 rounded-md bg-[#F6F8FB]`}
                            onClick={handleCreate}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePoll;
