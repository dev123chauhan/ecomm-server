const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register',  userController.registerUser);
router.post('/login', userController.loginUser);
router.delete('/delete-account', auth, userController.deleteAccount);

module.exports = router;