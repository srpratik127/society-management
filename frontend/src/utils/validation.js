export const AddOwnerValidateFields = (mainUser, memberDetails, vehicles, setErrors) => {
    const newErrors = {};

    // Main User validations
    if (!mainUser.fullName) newErrors.fullName = 'Full Name is required';
    if (!mainUser.phoneNumber || !/^\d{10}$/.test(mainUser.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be a valid 10-digit number';
    }
    if (!mainUser.email || !/\S+@\S+\.\S+/.test(mainUser.email)) {
        newErrors.email = 'Email must be a valid email address';
    }
    if (!mainUser.age || mainUser.age < 18) {
        newErrors.age = 'Age must be 18 or older';
    }
    if (!mainUser.gender) newErrors.gender = 'Gender is required';
    if (!mainUser.wing) newErrors.wing = 'Wing is required';
    if (!mainUser.unit) newErrors.unit = 'Unit is required';
    if (!mainUser.relation) newErrors.relation = 'Relation is required';

    // Member details validations
    memberDetails.forEach((member, index) => {
        if (!member.name) newErrors[`memberName${index}`] = `Member ${index + 1} Full Name is required`;
        if (!member.phone || !/^\d{10}$/.test(member.phone)) {
            newErrors[`memberPhone${index}`] = `Member ${index + 1} Phone number must be valid (10 digits)`;
        }
        if (!member.email || !/\S+@\S+\.\S+/.test(member.email)) {
            newErrors[`memberEmail${index}`] = `Member ${index + 1} Email must be valid`;
        }
        if (!member.age || member.age < 0) {
            newErrors[`memberAge${index}`] = `Member ${index + 1} Age must be a positive number`;
        }
        if (!member.gender) newErrors[`memberGender${index}`] = `Member ${index + 1} Gender is required`;
        if (!member.relation) newErrors[`memberRelation${index}`] = `Member ${index + 1} Relation is required`;
    });

    // Vehicle details validations
    vehicles.forEach((vehicle, index) => {
        if (!vehicle.type) newErrors[`vehicleType${index}`] = `Vehicle ${index + 1} Type is required`;
        if (!vehicle.name) newErrors[`vehicleName${index}`] = `Vehicle ${index + 1} Name is required`;
        if (!vehicle.number || !/^[A-Z0-9-]+$/.test(vehicle.number)) {
            newErrors[`vehicleNumber${index}`] = `Vehicle ${index + 1} Number is required and must be alphanumeric`;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
