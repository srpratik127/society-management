const Facility = require('../models/facility.model');

const createFacility = async (req, res) => {
    try {
        const { name, serviceData, description, remindBefore, date } = req.body;
        const newFacility = new Facility({
            name,
            serviceData,
            description,
            remindBefore,
            date
        });
        const savedFacility = await newFacility.save();
        res.status(201).json(savedFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFacilityById = async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.status(200).json(facility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFacility = async (req, res) => {
    try {
        const { name, serviceData, description, remindBefore, date } = req.body;

        const updatedFacility = await Facility.findByIdAndUpdate(
            req.params.id,
            { name, serviceData, description, remindBefore, date },
            { new: true }
        );
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.status(200).json(updatedFacility);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={
    createFacility,
    getFacilities,
    getFacilityById,
    updateFacility,
}