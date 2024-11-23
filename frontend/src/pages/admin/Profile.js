import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../store/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [userSociety, setUserSociety] = useState({ _id: "", name: "" });

  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (user) {
      const fetchUserSociety = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/society/${user?.select_society}`
          );
          const { _id, name } = response?.data?.data;
          setUserSociety({ _id, name });
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchUserSociety();

      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        select_society: userSociety,
        country: user.country,
        state: user.state,
        city: user.city,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "select_society") {
      setUserSociety((prevSociety) => ({
        ...prevSociety,
        name: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleFileChange = (e) => setProfilePicture(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "select_society") {
        updatedData.append("select_society", JSON.stringify(userSociety));
      } else {
        updatedData.append(key, formData[key]);
      }
    });
    if (profilePicture) updatedData.append("profile_picture", profilePicture);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/update/${user._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(addToken(response.data.token));
      setIsEditing(false);
      toast.success("User Updated successful!");
    } catch (error) {
      toast.error(error.message);
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
            {!isEditing && !user.role && (
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
                <div className="relative w- rounded-full">
                  <img
                    src={
                      profilePicture
                        ? URL.createObjectURL(profilePicture)
                        : user?.profile_picture
                    }
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full overflow-hidden object-cover"
                  />
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        className="hidden outline-none"
                        accept=".png,.jpeg,.jpg,"
                        onChange={handleFileChange}
                        id="profile_picture"
                      />
                      <label
                        type="button"
                        className="absolute bottom-1 right-1 cursor-pointer"
                        htmlFor="profile_picture"
                      >
                        <img src="/assets/edit.svg" alt="" />
                      </label>
                    </>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-medium capitalize">
                  {user.role
                    ? `${user?.fullName}`
                    : `${user?.firstname} ${user?.lastname}`}
                </h2>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4 ">
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="firstname">
                    {user.role ? "Full Name*" : "First Name*"}
                  </label>
                  {user.role ? (
                    <input
                      type="text"
                      disabled
                      value={user.fullName}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  ) : (
                    <input
                      type="text"
                      id="firstname"
                      disabled={!isEditing}
                      value={formData.firstname || ""}
                      onChange={handleChange}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="lastname">
                    {user.role ? "Role*" : "Last Name*"}
                  </label>
                  {user.role ? (
                    <input
                      type="text"
                      disabled
                      value={user.role}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  ) : (
                    <input
                      type="text"
                      id="lastname"
                      disabled={!isEditing}
                      value={formData.lastname || ""}
                      onChange={handleChange}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  )}
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
                    className={`w-full bg-white border p-2 rounded-md outline-none`}
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
                    className={`w-full bg-white border p-2 rounded-md outline-none`}
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
                    value={userSociety.name || ""}
                    onChange={handleChange}
                    className={`w-full bg-white border p-2 rounded-md outline-none`}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="country">
                    {user.role ? "Gender*" : "Country*"}
                  </label>
                  {user.role ? (
                    <input
                      type="text"
                      disabled
                      value={user.gender}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  ) : (
                    <input
                      type="text"
                      id="country"
                      disabled={!isEditing}
                      value={formData.country || ""}
                      onChange={handleChange}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="state">
                    {user.role ? "Wing*" : "State*"}
                  </label>
                  {user.role ? (
                    <input
                      type="text"
                      disabled
                      value={user.wing}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  ) : (
                    <input
                      type="text"
                      id="state"
                      disabled={!isEditing}
                      value={formData.state || ""}
                      onChange={handleChange}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block font-medium mb-1" htmlFor="city">
                    {user.role ? "Unit*" : "City*"}
                  </label>
                  {user.role ? (
                    <input
                      type="text"
                      disabled
                      value={user.unit}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  ) : (
                    <input
                      type="text"
                      id="city"
                      disabled={!isEditing}
                      value={formData.city || ""}
                      onChange={handleChange}
                      className={`w-full bg-white border p-2 rounded-md outline-none`}
                    />
                  )}
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
