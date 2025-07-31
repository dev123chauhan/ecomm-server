const express = require('express');
const router = express.Router();
const { 
  getPrivacyPolicy, 
  updatePrivacyPolicy 
} = require('../controllers/privacyPolicyController');

router.route('/')
  .get(getPrivacyPolicy)
  .put(updatePrivacyPolicy);

module.exports = router;