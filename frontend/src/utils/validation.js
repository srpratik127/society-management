export const AddOwnerValidateFields = (mainUser, memberDetails, vehicles, setErrors) => {
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

    memberDetails.forEach((member, index) => {
        if (!member.name) newErrors[`memberName${index}`] = `Member ${index + 1} Full Name is required`;
        if (!member.phone) newErrors[`memberPhone${index}`] = `Member ${index + 1} Phone is required`;
        if (member.phone && !/^\d{10}$/.test(member.phone)) newErrors[`memberPhone${index}`] = `Member ${index + 1} Phone must be a valid number`;
        if (!member.email || !/\S+@\S+\.\S+/.test(member.email)) newErrors[`memberEmail${index}`] = `Member ${index + 1} Email is invalid`;
    });

    vehicles.forEach((vehicle, index) => {
        if (!vehicle.type) newErrors[`vehicleType${index}`] = `Vehicle ${index + 1} Type is required`;
        if (!vehicle.name) newErrors[`vehicleName${index}`] = `Vehicle ${index + 1} Name is required`;
        if (!vehicle.number) newErrors[`vehicleNumber${index}`] = `Vehicle ${index + 1} Number is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};