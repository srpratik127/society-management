const express = require('express');
const router = express.Router();
const importantNumController = require('../controllers/importantnum.controller');

router.post('/', importantNumController.addNumber);
router.get('/', importantNumController.getAllNumbers);
router.get('/:id',importantNumController. getNumberById);
router.put('/:id', importantNumController.updateNumber); 
router.delete('/:id', importantNumController.deleteNumber); 

module.exports = router;
