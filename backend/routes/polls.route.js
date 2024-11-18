const express = require('express');
const router = express.Router();
const pollController = require('../controllers/polls.controller');

router.post('/create', pollController.createPoll); 
router.post('/vote', pollController.votePoll); 
router.get('/:pollId', pollController.getPollResultsById); 
router.get('/', pollController.getAllPollResults); 

module.exports = router;
