const express    = require('express');
const router     = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { upsertUser } = require('../controllers/userController');

// POST /users — Register or update user profile
router.post('/', verifyToken, upsertUser);

module.exports = router;
