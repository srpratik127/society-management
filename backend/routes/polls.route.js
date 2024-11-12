const express = require('express');
const router = express.Router();
const controller = require('../controllers/polls.controller.js'); 

router.post('/',controller.createPolls)
router.get('/',controller.getPolls)
router.put('/:id', controller.updatePolls);
router.delete('/:id', controller.deletePolls);  

module.exports = router;
