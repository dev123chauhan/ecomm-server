const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'Example Company'
  },
  contactEmail: {
    type: String,
    required: true,
    default: 'privacy@example.com'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  sections: [{
    key: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);