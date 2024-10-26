const Society = require('../models/society.model');

const createSociety = async (req, res) => {
    try {
        const { name, address, country, state, city, zipCode } = req.body;

        const society = new Society({
            name,
            address,
            country,
            state,
            city,
            zipCode
        });

        await society.save();
        res.status(200).json({ message: 'Society created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating society', error: error.message });
    }
};

const getAllSociety = async (req, res) => {
    try {
        const response = await Society.find();       
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching societies', error: error.message });
    }
};

module.exports = {
    createSociety,
    getAllSociety
};
