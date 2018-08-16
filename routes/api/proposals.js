const express = require("express");
const router = express.Router();

const emailService = require('../../services/emailService');

// @route   POST api/posts
// @desc    Send website proposal email
// @access  Public
router.post('/', (req, res) => {
    const { message } = req.body;

    const data = {
        title: `Send from portfolio website, Website proposal!`,
        message: message,
      }
    
    emailService.sentHtmlAsync(data)
        .then(() => res.status(200).json({ message: 'success' }))
        .catch((err) => res.status(400).json({ error: err }));
})

module.exports = router;