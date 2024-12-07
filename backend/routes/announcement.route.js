const express = require('express');
const router = express.Router();
const controller = require('../controllers/announcement.controller'); 

router.post('/',controller.createAnnouncement)
router.get('/',controller.getAnnouncement)
router.put('/:id', controller.updateAnnouncement);
router.delete('/:id', controller.deleteAnnouncement);  
router.put("/:id/add-member", controller.addAnnouncementMember);

module.exports = router;
