const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/request.controller');

router.post('/', requestsController.createRequest);
router.get('/', requestsController.getRequests);
router.get('/:id', requestsController.getRequestById);
router.put('/:id', requestsController.updateRequest);
router.delete('/:id', requestsController.deleteRequest);

module.exports = router;
