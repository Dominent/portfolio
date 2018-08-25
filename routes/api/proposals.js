const express = require("express");
const router = express.Router();

const emailService = require('../../services/emailService');

const validateProposalsInput = require('../../validation/proposal');

// @route   POST api/proposals
// @desc    Send website proposal email
// @access  Public
router.post('/', (req, res) => {
    const { errors, isValid } = validateProposalsInput(req.body);

    if (!isValid) { res.status(400).json(errors); }

    const { message } = req.body;

    const data = {
        title: `Send from portfolio website, Website proposal!`,
        message: message,
    }

    /**
     * Sends HTML Email to email service hosted on heroku.
     * Hackfix: Heroku hosting plan is free-tier which forces the host to enter a sleep mode.
     * When email service is called and the host is in sleep mode the service returns 503 for   no reason.
     * To fix this, if 503 is returned we call the email service 1 more time.
     */
    const MAX_RETRIES = 1;

    for (let i = 0; i < MAX_RETRIES; ++i) {
        emailService.sentHtmlAsync(data)
            .then(() => {
                return res.status(200).json({ message: 'success' });
            })
            .catch((err) => {
                const SERVICE_UNAVAILABLE = 503;

                if (err.response.status === SERVICE_UNAVAILABLE) {
                    continue
                }

                return res.status(400).json({ error: err });
            });
    }
})

module.exports = router;