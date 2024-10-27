const express = require('express');
const router = express.Router();
const importantNumController = require('../controllers/importantnum.controller');

router.post('/numbers', importantNumController.addNumber);
router.get('/', importantNumController.getAllNumbers);
router.get('/:id',importantNumController. getNumberById);
router.put('/numbers/:id', importantNumController.updateNumber); 
router.delete('/numbers/:id', importantNumController.deleteNumber); 

module.exports = router;
