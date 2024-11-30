export const AddOwnerValidateFields = (mainUser, files, setErrors) => {
  const newErrors = {};

  // Main User validations
  if (!mainUser.fullName) newErrors.fullName = "Full Name is required";
  if (!mainUser.phoneNumber || !/^\d{10}$/.test(mainUser.phoneNumber)) {
    newErrors.phoneNumber = "Phone number must be a valid 10-digit number";
  }
  if (!mainUser.email || !/\S+@\S+\.\S+/.test(mainUser.email)) {
    newErrors.email = "Email must be a valid email address";
  }
  if (!mainUser.age || mainUser.age < 18) {
    newErrors.age = "Age must be 18 or older";
  }
  if (!mainUser.gender) newErrors.gender = "Gender is required";
  if (!mainUser.wing) newErrors.wing = "Wing is required";
  if (!mainUser.unit) newErrors.unit = "Unit is required";
  if (!mainUser.relation) newErrors.relation = "Relation is required";

  const requiredFiles = [
    "Upload Aadhar Card (Front Side)",
    "Upload Aadhar Card (Back Side)",
    "Address Proof (Vera Bill OR Light Bill)",
    "Rent Agreement",
  ];

  requiredFiles.forEach((file) => {
    if (!files[file]) newErrors[file] = `${file} is required`;
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const formatTime = (timeString) => {
  if (!timeString) {
    return "Invalid time";
  }
  let time;
  if (typeof timeString === "string" && !isNaN(Number(timeString))) {
    timeString = Number(timeString);
  }
  if (typeof timeString === "number") {
    if (timeString.toString().length === 10) {
      timeString *= 1000;
    }
    time = new Date(timeString);
  } else if (
    typeof timeString === "string" &&
    /^[0-9]{2}:[0-9]{2}$/.test(timeString)
  ) {
    const [hours, minutes] = timeString.split(":");
    time = new Date();
    time.setHours(hours, minutes, 0, 0);
  } else {
    return "Invalid time";
  }
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
};
