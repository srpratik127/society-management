import React, { useState } from 'react';

function AddOwner() {
    const [view, setView] = useState("Owner");
    const [files, setFiles] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [members, setMembers] = useState(1); 
    const [memberDetails, setMemberDetails] = useState([{}]);
    const [vehicleCount, setVehicleCount] = useState(1); 
    const [vehicles, setVehicles] = useState([{ type: '', name: '', number: '' }]); 

    const handleFileChange = (event, key) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFiles(prev => ({ ...prev, [key]: selectedFile.name }));
        }
    };

    const handleDrop = (event, key) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFiles(prev => ({ ...prev, [key]: droppedFile.name }));
        }
    };
    const preventDefault = (event) => event.preventDefault();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMemberCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setMembers(count);
        setMemberDetails(Array(count).fill({}));
    };

    const handleMemberDetailChange = (index, key, value) => {
        setMemberDetails(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [key]: value };
            return updated;
        });
    };
    const handleVehicleCountChange = (e) => {
        const count = parseInt(e.target.value);
        setVehicleCount(count);

        if (count > vehicles.length) {
            setVehicles([...vehicles, ...Array(count - vehicles.length).fill({ type: '', name: '', number: '' })]);
        } else {
            setVehicles(vehicles.slice(0, count));
        }
    }; 
    const handleVehicleDetailChange = (index, field, value) => {
        const updatedVehicles = [...vehicles];
        updatedVehicles[index][field] = value;
        setVehicles(updatedVehicles);
    };

    return (
        <>
            {/* Tabs */}
            <div className="flex border-b mb-6 px-8 pt-8">
                <button
                    className={`py-2 px-4 font-bold border-b-4 border-orange-500 rounded-tl-lg rounded-tr-lg ${view === "Owner" ? "text-white" : "text-black"}`}
                    style={{
                        background: view === "Owner" ? "linear-gradient(to right, #FE512E, #F09619)" : "transparent",
                    }}
                    onClick={() => setView("Owner")}
                >
                    Owner
                </button>
                <button
                    className={`py-2 px-4 font-bold border-b-4 border-orange-500 rounded-tl-lg rounded-tr-lg ${view === "Tenant" ? "text-white" : "text-black"}`}
                    style={{
                        background: view === "Tenant" ? "linear-gradient(to right, #FE512E, #F09619)" : "transparent",
                    }}
                    onClick={() => setView("Tenant")}
                >
                    Tenant
                </button>
            </div>

            <div className=" justify-center bg-gray-100 px-8 text-sm">
                <div className="bg-white rounded-lg shadow-lg w-full p-4">
                    <div className='flex justify-between'>
                        <div>
                            <div className="w-28 mb-3 h-28 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <img src='/assets/empty.png' className='w-20 h-20' />
                                )}
                            </div>
                            <label className="cursor-pointer text-blue-500 px-2 ">
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                Upload Photo
                            </label>
                        </div>
                        <div>
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Full Name</label>
                                    <input type="text" className="border border-gray-300 rounded-lg p-2" placeholder="Enter Full Name" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Phone Number</label>
                                    <input type="text" className="border border-gray-300 rounded-lg p-2" placeholder="+91" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Email Address</label>
                                    <input type="email" className="border border-gray-300 rounded-lg p-2" placeholder="Enter Email Address" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Age</label>
                                    <input type="number" className="border border-gray-300 rounded-lg p-2" placeholder="Enter Age" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Gender</label>
                                    <select className="border border-gray-300 rounded-lg p-2">
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Wing</label>
                                    <input type="text" className="border border-gray-300 rounded-lg p-2" placeholder="Enter Wing" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Unit</label>
                                    <input type="text" className="border border-gray-300 rounded-lg p-2" placeholder="Enter Unit" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold py-2">Relation</label>
                                    <input type="text" className="border border-gray-300 rounded-lg p-2" placeholder="Enter Relation" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "Upload Aadhar Card (Front Side)", key: "aadharFront" },
                            { label: "Upload Aadhar Card (Back Side)", key: "aadharBack" },
                            { label: "Address Proof (Vera Bill OR Light Bill)", key: "addressProof" },
                            { label: "Rent Agreement", key: "rentAgreement" },
                        ].map(({ label, key }) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-gray-700 font-semibold py-3">{label}</label>
                                <div
                                    className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer"
                                    onDrop={(e) => handleDrop(e, key)}
                                    onDragOver={preventDefault}
                                    onDragEnter={preventDefault}
                                >
                                    <label className="flex flex-col items-center w-full h-full">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, key)}
                                        />
                                        <div className="flex flex-col items-center space-x-2 ">
                                            <img src="/assets/addPhoto.svg" alt="Upload Icon" className="w-6 h-6" />
                                            <p className="text-blue-500 py-2">
                                                {files[key] || "Upload a file or drag and drop"}
                                            </p>
                                            <p className="font-poppins text-[12px]  leading-[18px] text-center">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </label>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className=' bg-[#ffff] rounded-lg my-2 px-8 pb-4 text-sm'>
                    {/* Member Counting */}
                    <div className="mt-0 flex flex-col md:items-center gap-4 ">
                        <div className=" flex flex-col md:flex-row justify-between w-full items-center border-b-2 py-2 gap-4">
                            <p className="text-gray-700 font-semibold py-2">Member Counting (Other Members)</p>
                            <div className='flex justify-center align-center'>
                                <p className='flex items-center px-2 '>Select Member</p>
                                <select
                                    className="border border-gray-300 rounded-lg p-2 "
                                    value={members}
                                    onChange={handleMemberCountChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>

                        {/* Additional Members Input Fields */}
                        {Array.from({ length: members }).map((_, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-2">
                                <div className="flex flex-col">
                                    <label htmlFor="text" className="text-gray-700 font-semibold mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Full Name"
                                        onChange={(e) => handleMemberDetailChange(index, 'name', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="text" className="text-gray-700 font-semibold mb-1">Phone No</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                        placeholder="+91"
                                        onChange={(e) => handleMemberDetailChange(index, 'phone', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="text" className="text-gray-700 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Email"
                                        onChange={(e) => handleMemberDetailChange(index, 'email', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="text" className="text-gray-700 font-semibold mb-1">Age</label>
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Age"
                                        onChange={(e) => handleMemberDetailChange(index, 'age', e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="text" className="text-gray-700 font-semibold mb-1">Gender</label>
                                    <select
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                        onChange={(e) => handleMemberDetailChange(index, 'gender', e.target.value)}
                                    >
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="text" className="text-gray-700 font-semibold mb-1">Relation</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Relation"
                                        onChange={(e) => handleMemberDetailChange(index, 'relation', e.target.value)}
                                    />
                                </div>
                            </div>

                        ))}
                    </div>

                </div>
            {/* Vehicle Detail Fields */}
            <div className="bg-white p-4 rounded-lg shadow-lg ">
                  <div className='flex justify-between item-center'>
                  <label className="text-gray-700 font-semibold flex item-center">Vehicle Counting:</label>
                    <div className="flex justify-between items-center mt-2 mb-4">
                        <p className="text-gray-500 item-center px-3">Select Vehicle</p>
                        <select
                            className="border border-gray-300 rounded-lg p-2"
                            value={vehicleCount}
                            onChange={handleVehicleCountChange}
                        >
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                  </div>

                    <div className='bg-[#ffff] rounded-lg my-2 px-8 text-sm'>
                        <div className="space-y-4">
                            {Array.from({ length: vehicleCount }).map((_, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium">Vehicle Type<span className="text-red-500">*</span></label>
                                        <select
                                            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                                            value={vehicles[index].type}
                                            onChange={(e) => handleVehicleDetailChange(index, 'type', e.target.value)}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Two Wheelers">Two Wheelers</option>
                                            <option value="Four Wheelers">Four Wheelers</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium">Vehicle Name</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                                            placeholder="Enter Name"
                                            value={vehicles[index].name}
                                            onChange={(e) => handleVehicleDetailChange(index, 'name', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium">Vehicle Number</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                                            placeholder="Enter Number"
                                            value={vehicles[index].number}
                                            onChange={(e) => handleVehicleDetailChange(index, 'number', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
                <button className="bg-white border hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Back</button>
                <button className="bg-gray-300  text-black font-bold py-2 px-4 rounded-lg">create</button>
            </div>
                </div>
                
        </>
    );
}

export default AddOwner;