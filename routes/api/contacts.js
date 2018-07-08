const express = require("express");
const router = express.Router();

const validateContactInput = require('../../validation/contact');

router.post('/', (req, res) => {
    const { errors, isValid } = validateContactInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    res.status(200);
})

module.exports = router;