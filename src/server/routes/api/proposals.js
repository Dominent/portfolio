import express from 'express';
import emailService from '../../services/emailService';
import validateProposalsInput from '../../validation/proposal';

const router = express.Router();

// @route   POST api/posts
// @desc    Send website proposal email
// @access  Public
router.post('/', (req, res) => {
    const { errors, isValid } = validateProposalsInput(req.body);

    if (!isValid) {  res.status(400).json(errors); }

    const { message } = req.body;

    const data = {
        title: `Send from portfolio website, Website proposal!`,
        message: message,
      }
    
    emailService.sentHtmlAsync(data)
        .then(() => res.status(200).json({ message: 'success' }))
        .catch((err) => res.status(400).json({ error: err }));
})

export default router;