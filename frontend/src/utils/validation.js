export const AddOwnerValidateFields = (mainUser, files, setErrors) => {
    const newErrors = {};

    if (!mainUser.fullName) newErrors.fullName = 'Full Name is required';
    if (!mainUser.phoneNumber || !/^\d{10}$/.test(mainUser.phoneNumber)) {
        newErrors.phoneNumber = 'Valid Phone Number is required';
    }
    if (!mainUser.email || !/\S+@\S+\.\S+/.test(mainUser.email)) {
        newErrors.email = 'Valid Email Address is required';
    }
    if (!mainUser.age || mainUser.age < 18) newErrors.age = 'Age must be 18 or older';
    if (!mainUser.gender) newErrors.gender = 'Gender is required';
    if (!mainUser.wing) newErrors.wing = 'Wing is required';
    if (!mainUser.unit) newErrors.unit = 'Unit is required';
    if (!mainUser.relation) newErrors.relation = 'Relation is required';

    const requiredFiles = ['Upload Aadhar Card (Front Side)', 'Upload Aadhar Card (Back Side)', 'Address Proof (Vera Bill OR Light Bill)', 'Rent Agreement'];
    
    requiredFiles.forEach((file) => {
        if (!files[file]) newErrors[file] = `${file} is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};