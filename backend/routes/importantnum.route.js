const express = require('express');
const router = express.Router();
const importantNumController = require('../controllers/importantnum.controller');
const {roleCheck} = require("../middleware/jwt-middleware.js")

router.post('/', roleCheck(["admin"]), importantNumController.addNumber);
router.get('/', importantNumController.getAllNumbers);
router.get('/:id',importantNumController. getNumberById);
router.put('/:id', roleCheck(["admin"]), importantNumController.updateNumber); 
router.delete('/:id', roleCheck(["admin"]), importantNumController.deleteNumber); 

module.exports = router;
