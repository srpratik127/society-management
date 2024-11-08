const express = require('express');
const router = express.Router();
const controller = require('../controllers/protocol.controller');

router.post('/', controller.createProtocol);
router.get('/',controller.getProtocol)
router.put('/:id', controller.updateProtocol);
router.delete('/:id', controller.deleteProtocol);  

module.exports = router;
