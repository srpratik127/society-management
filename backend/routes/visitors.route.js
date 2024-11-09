const express = require('express');
const router = express.Router();
const controller = require('../controllers/visitors.controller.js'); 

router.post('/',controller.createVisitor)
router.get('/',controller.getVisitor)
router.put('/:id', controller.updateVisitor);
router.delete('/:id', controller.deleteVisitor);  

module.exports = router;
