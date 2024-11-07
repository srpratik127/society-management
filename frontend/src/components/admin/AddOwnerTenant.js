import React, { useState } from 'react'
import { AddOwnerValidateFields } from '../../utils/validation';
import axios from 'axios';

const AddOwnerTenant = ({role}) => {
    const [OwnerfullName, setOwnerFullName] = useState('');
    const [OwnerPhone, setOwnerPhone] = useState('');
    const [OwnerAddress, setOwnerAddress] = useState('');
    const [files, setFiles] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [members, setMembers] = useState(1);
    const [memberDetails, setMemberDetails] = useState([{ name: '', phone: '', email: '', age: '', gender: '', relation: '' }]);
    const [vehicleCount, setVehicleCount] = useState(1);
    const [vehicles, setVehicles] = useState([{ type: '', name: '', number: '' }]);
    const [mainUser, setMainUser] = useState({ fullName: '', phoneNumber: '', email: '', age: '', gender: '', wing: '', unit: '', relation: '' });
    const [errors, setErrors] = useState({});

    const handleFileChange = (event, key) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) setFiles(prev => ({ ...prev, [key]: selectedFile.name }));
    };

    const handleDrop = (event, key) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) setFiles(prev => ({ ...prev, [key]: droppedFile.name }));
    };

    const handleCountChange = (setter, count) => {
        setter(count);
        if (setter === setMembers) {
          const updatedMemberDetails = Array(count).fill({
            name: '',
            phone: '',
            email: '',
            age: '',
            gender: '',
            relation: '',
          });
          setMemberDetails(updatedMemberDetails);
        }
        if (setter === setVehicleCount) {
          const updatedVehicles = [...vehicles];
          if (count < updatedVehicles.length) {
            setVehicles(updatedVehicles.slice(0, count)); 
          } else {
            while (updatedVehicles.length < count) {
              updatedVehicles.push({ type: '', name: '', number: '' });
            }
            setVehicles(updatedVehicles); 
          }
        }
    };
      
    const handleDetailChange = (setter, index, field, value) => {
      setter(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    };
    
    const handleSubmit = async () => {
        try {
            if (!AddOwnerValidateFields(mainUser, files, setErrors)) return;
            const ownerData = { selectedImage, files, memberDetails, vehicles, mainUser };
            console.log("Owner Data:", ownerData);
            const payload = {
            "ownerfullname": OwnerfullName,
            "ownerphone": OwnerPhone,
            "owneraddress": OwnerAddress,
            "fullName": mainUser.fullName,
            "phone": mainUser.phoneNumber,
            "email": mainUser.email,
            "role": role === "Owner"?"owner":"tenant",
            "age": mainUser.age,
            "gender": mainUser.gender,
            "wing": mainUser.wing,
            "unit": mainUser.unit,
            "relation": mainUser.relation,
            "profile_picture": selectedImage?.name,
            "aadharCardFront": files["Upload Aadhar Card (Front Side)"],
            "aadharCardBack": files["Upload Aadhar Card (Back Side)"],
            "addressProof": files["Address Proof (Vera Bill OR Light Bill)"],
            "rentAgreement": files["Rent Agreement"],
            "residenceStatus": "Occupied",
            "members": memberDetails.map((member) => ({
                fullName: member.name,
                phone: member.phone,
                email: member.email,
                age: member.age,
                gender: member.gender,
                relation: member.relation
            })),
            "vehicles": vehicles.map((vehicle) => ({
                vehicleType: vehicle.type,
                vehicleName: vehicle.name,
                vehicleNumber: vehicle.number
            }))
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/resident`,
          payload
        );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="justify-center bg-gray-100 px-8 text-sm">
            {role === "Tenant" && (<div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl mb-2 shadow space-y-4 md:space-y-0">
                <div className="w-full md:w-1/3 px-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Owner Full Name*
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter Full Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setOwnerFullName(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/3 px-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Owner Phone*
                    </label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="+91"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setOwnerPhone(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/3 px-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Owner Address*
                    </label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setOwnerAddress(e.target.value)}
                    />
                </div>
            </div>)}
            <div className="bg-white rounded-lg shadow w-full p-4">
                <div className='flex justify-between gap-4'>
                    <div className="flex flex-col mt-3 items-center">
                        <div className="w-28 mb-3 h-28 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                            <img src={selectedImage ? URL.createObjectURL(selectedImage) : '/assets/empty.png'} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <label className="cursor-pointer text-blue-500 px-2">
                            <input type="file" className="hidden" accept=".png,.jpeg,.jpg," onChange={(e) => setSelectedImage(e.target.files[0])} />
                            Upload Photo
                        </label>
                    </div>
                    <div className="grid grid-cols-4 gap-3 w-full">
                        {['Full Name', 'Phone Number', 'Email Address', 'Age', 'Gender', 'Wing', 'Unit', 'Relation'].map((label, index) => {
                            const keys = ['fullName', 'phoneNumber', 'email', 'age', 'gender', 'wing', 'unit', 'relation'];
                            const isSelect = label === 'Gender';
                            return (
                                <div className="flex flex-col" key={index}>
                                    <label className="text-gray-700 font-semibold py-2">{label}</label>
                                    {isSelect ? (
                                        <select className={`border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                                            value={mainUser.gender}
                                            onChange={(e) => setMainUser({ ...mainUser, gender: e.target.value })}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={label === 'Age' ? 'number' : 'text'}
                                            className={`border ${errors[keys[index]] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 focus:outline-none`}
                                            placeholder={`Enter ${label}`}
                                            value={mainUser[keys[index]]}
                                            onChange={(e) => setMainUser({ ...mainUser, [keys[index]]: e.target.value })}
                                        />
                                    )}
                                    {errors[keys[index]] && <p className="text-red-500 text-sm">{errors[keys[index]]}</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Upload Aadhar Card (Front Side)', 'Upload Aadhar Card (Back Side)', 'Address Proof (Vera Bill OR Light Bill)', 'Rent Agreement'].map((label, index) => (
                        <div key={index} className="flex flex-col">
                            <label className="text-gray-700 font-semibold py-3">{label}</label>
                            <div
                                className={`border-dashed border-2 rounded-lg p-4 flex items-center justify-center cursor-pointer ${
                                    errors[label] ? 'border-red-500' : 'border-gray-300'
                                }`}
                                onDrop={(e) => handleDrop(e, label)}
                            >
                                <label className="flex flex-col items-center w-full h-full">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, label)}
                                        accept=".png,.jpeg,.jpg,"
                                    />
                                    <div className="flex flex-col items-center space-x-2">
                                        <img src="/assets/addPhoto.svg" alt="Upload Icon" className="w-6 h-6" />
                                        <p className="text-blue-500 py-2">{files[label] || 'Upload a file or drag and drop'}</p>
                                        <p className="font-poppins text-[12px] leading-[18px] text-center">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </label>
                            </div>
                            {errors[label] && <p className="text-red-500 text-sm mt-1">{errors[label]}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div className=''>
                <div className="flex flex-col md:items-center gap-4 bg-[#ffff] my-2 px-8 pb-4 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row justify-between w-full items-center border-b-2 py-2 gap-4">
                    <p className="text-gray-700 font-semibold py-2">Member Counting (Other Members)</p>
                    <div className='flex justify-center align-center'>
                        <p className='flex items-center px-2'>Select Member</p>
                        <select className="border border-gray-300 rounded-lg p-2" value={members} onChange={(e) => handleCountChange(setMembers, parseInt(e.target.value, 10))}>
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                        </select>
                    </div>
                    </div>
                    {Array.from({ length: members }).map((_, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full mt-2">
                            {['Name', 'Phone', 'Email', 'Age', 'Gender', 'Relation'].map((label, idx) => {
                            const field = label.toLowerCase();
                            return (
                                <div className="flex flex-col" key={idx}>
                                    <label className="text-gray-700 font-semibold mb-1">{label}</label>
                                    {label === 'Gender' ? (
                                        <select className={`border border-gray-300 rounded-lg p-2`} onChange={(e) => handleDetailChange(setMemberDetails, index, 'gender', e.target.value)}>
                                            <option>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={label === 'Age' ? 'number' : 'text'}
                                            className={`border border-gray-300 rounded-lg p-2 outline-none`}
                                            placeholder={`Enter ${label}`}
                                            value={memberDetails[index] && memberDetails[index][field] ? memberDetails[index][field] : ''}
                                            onChange={(e) => handleDetailChange(setMemberDetails, index, field, e.target.value)}
                                        />
                                    )}
                                </div>
                            );
                            })}
                        </div>
                    ))}
                </div>
                <div className='flex flex-col md:items-center gap-4 bg-white p-4 rounded-lg shadow'>
                    <div className="flex flex-col md:flex-row justify-between w-full items-center border-b-2 py-2 gap-4">
                    <p className="text-gray-700 font-semibold py-2">Vehicles Count</p>
                    <div className='flex justify-center align-center'>
                        <p className='flex items-center px-2'>Select Vehicles</p>
                        <select className="border border-gray-300 rounded-lg p-2" value={vehicleCount} onChange={(e) => handleCountChange(setVehicleCount, parseInt(e.target.value, 10))}>
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                        </select>
                    </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4 mt-2">
                        {Array.from({ length: vehicleCount }).map((_, index) => (
                        <div key={index} className="border p-4 rounded-lg">
                            <div className="flex gap-4">
                                {['Type', 'Name', 'Number'].map((label, idx) => {
                                const field = label.toLowerCase();
                                return (
                                    <div className="flex flex-col w-full" key={idx}>
                                        <label className="text-gray-700 font-semibold mb-1">Vehicle {field}</label>
                                        {label === 'Type' ? (
                                                <select className={`border border-gray-300 rounded-lg p-2`} onChange={(e) => handleDetailChange(setVehicles, index, 'type', e.target.value)}>
                                                    <option>Select Type</option>
                                                    <option value="Two Wheeler">Two Wheeler</option>
                                                    <option value="Four Wheeler">Four Wheeler</option>
                                                </select>
                                            ) : (
                                                <input
                                                type="text"
                                                className={`border border-gray-300 rounded-lg p-2 w-full outline-none`}
                                                placeholder={`Enter Vehicle ${label}`}
                                                value={vehicles[index] && vehicles[index][field] ? vehicles[index][field] : ''}
                                                onChange={(e) => handleDetailChange(setVehicles, index, field, e.target.value)}
                                            />
                                    )}
                                    </div>
                                );
                                })}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">Submit</button>
            </div>
        </div>
    );
}
export default AddOwnerTenant;