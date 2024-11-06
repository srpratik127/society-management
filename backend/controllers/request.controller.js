const Request = require('../models/request.models');

const createRequest = async (req, res) => {
    try {
        const { requestName, requesterName, date, wing, unit, priority, status } = req.body;
        const newRequest = new Request({
            requestName,
            requesterName,
            date,
            wing,
            unit,
            priority,
            status
        });
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRequest = async (req, res) => {
    try {
        const { requestName, requesterName, date, wing, unit, priority, status } = req.body;
        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            { requestName, requesterName, date, wing, unit, priority, status },
            { new: true }
        );
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const deletedRequest = await Request.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={
    createRequest,
    getRequests,
    getRequestById,
    updateRequest,
    deleteRequest,
}