const router = require('express').Router();
const HashtagController = require('../controller/hashtagController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/:tag', verifyToken, HashtagController.getPostsByHashtag);

module.exports = router;
