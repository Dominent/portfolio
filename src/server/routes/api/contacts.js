import express from 'express';
import emailService from '../../services/emailService';
import validateContactInput  from '../../validation/contact';
import reCaptcha from '../../libs/reCaptcha';

const router = express.Router();

// @route   POST api/contacts
// @desc    Send contact me email
// @access  Public
router.post('/', reCaptcha.verify, (req, res) => {
  const { errors, isValid } = validateContactInput(req.body);

  if (!isValid) { return res.status(400).json(errors); }

  const { email, firstname, message, phonenumber } = req.body;

  const data = {
    title: `Send from portfolio website, by: ${firstname}`,
    message: `${message}\nContacts: \n\tEmail: ${email}\n\tPhone: ${phonenumber}`,
  }

  emailService.sendTextAsync(data)
    .then(() => res.status(200).json({ message: 'success' }))
    .catch((err) => res.status(400).json({ error: err }));
})

export default router;