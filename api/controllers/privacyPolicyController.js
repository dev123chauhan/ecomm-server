const asyncHandler = require("express-async-handler");
const PrivacyPolicy = require("../models/PrivacyPolicy");
exports.getPrivacyPolicy = asyncHandler(async (req, res) => {
  const privacyPolicy = await PrivacyPolicy.findOne().sort({ createdAt: -1 });

  if (!privacyPolicy) {
    const defaultPolicy = new PrivacyPolicy({
      sections: [
        {
          key: "dataCollection",
          title: "Data Collection",
          content: "Details about data collection practices",
        },
        {
          key: "sifhilhfw",
          title: "wqfhkwfhq klwqhflh",
          content: "Details about data collection practices",
        },
        {
          key: "dataCollection",
          title: "Data Collection",
          content: "Details about data collection practices",
        },
        {
          key: "dataCollection",
          title: "Data Collection",
          content: "Details about data collection practices",
        },
        {
          key: "dataCollection",
          title: "Data Collection",
          content: "Details about data collection practices",
        },
        {
          key: "dataCollection",
          title: "Data Collection",
          content: "Details about data collection practices",
        },
      ],
    });
    await defaultPolicy.save();
    res.json(defaultPolicy);
  } else {
    res.json(privacyPolicy);
  }
});

exports.updatePrivacyPolicy = asyncHandler(async (req, res) => {
  const { companyName, contactEmail, sections } = req.body;

  const privacyPolicy = await PrivacyPolicy.findOne().sort({ createdAt: -1 });

  if (privacyPolicy) {
    privacyPolicy.companyName = companyName;
    privacyPolicy.contactEmail = contactEmail;
    privacyPolicy.sections = sections;
    privacyPolicy.lastUpdated = new Date();

    const updatedPolicy = await privacyPolicy.save();
    res.json(updatedPolicy);
  } else {
    const newPolicy = new PrivacyPolicy({
      companyName,
      contactEmail,
      sections,
      lastUpdated: new Date(),
    });

    const createdPolicy = await newPolicy.save();
    res.status(201).json(createdPolicy);
  }
});
