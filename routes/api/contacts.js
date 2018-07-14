const express = require("express");
const router = express.Router();
const axios = require("axios");
const emailService = require('../../config/email-service');

const validateContactInput = require('../../validation/contact');

router.post('/', (req, res) => {
  const { errors, isValid } = validateContactInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const { email, firstname, message, phonenumber } = req.body;

  const contactData = {
    Title: `Send from portfolio website, by: ${firstname}`,
    Message: `${message}\nContacts: \n\tEmail: ${email}\n\tPhone: ${phonenumber}`,
    To: emailService.receiver
  }

  axios.post(emailService.url, contactData)
    .then(() => res.status(200).json({ message: 'success' }))
    .catch((err) => res.status(400).json({ error: err }));
})

module.exports = router;