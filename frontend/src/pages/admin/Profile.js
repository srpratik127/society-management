import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        select_society: user.select_society.name,
        country: user.country,
        state: user.state,
        city: user.city,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      select_society: {
        name: formData.select_society,
        _id: user.select_society._id, 
      },
    };
  
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/update/${user._id}`,
        updatedFormData
      );
      dispatch(addToken(response.data.token));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center h-auto relative">
        <div className="flex w-full absolute h-[80%] overflow-hidden">
          <img src="/assets/pngwing.png" className="bg-[#a2b7fd] w-[50%]" />
          <img src="/assets/pngwing.png" className="bg-[#a2b7fd] w-[50%]" />
        </div>
        <div className="w-[65%] max-w-[1200px] translate-y-44">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-700">
              {isEditing ? "Edit Profile" : "Profile"}
            </h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white font-medium px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col items-center md:col-span-1">
                <div className="relative w-32 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={user?.profile_picture}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <>
                    <input type="file" className="hidden" id="profile_picture" />
                    <label type="button" className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-1 rounded-full text-white hover:bg-opacity-75" htmlFor="profile_picture">
                      <span className="material-icons">photo_camera</span>
                    </label>
                    </>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-medium">
                  {user?.firstname} {user?.lastname}
                </h2>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4 ">
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="firstname">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    disabled={!isEditing}
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="lastname">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    disabled={!isEditing}
                    value={formData.lastname || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="phone">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    id="phone"
                    disabled={!isEditing}
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="email">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled={!isEditing}
                    value={formData.email || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    className="block font-medium mb-1"
                    htmlFor="select_society"
                  >
                    Select Society*
                  </label>
                  <input
                    type="text"
                    id="select_society"
                    disabled={!isEditing}
                    value={formData.select_society || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="country">
                    Country*
                  </label>
                  <input
                    type="text"
                    id="country"
                    disabled={!isEditing}
                    value={formData.country || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="state">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    disabled={!isEditing}
                    value={formData.state || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="city">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    disabled={!isEditing}
                    value={formData.city || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md`}
                  />
                </div>
                {isEditing && (
                  <div className="col-span-2 flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white font-medium px-6 py-2 rounded-md"
                    >
                      Update Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
