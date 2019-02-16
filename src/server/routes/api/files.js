const express = require("express");
const router = express.Router();

const dolphin = require('../../libs/dolphin');

router.get('/', (req, res) =>
    dolphin.exec('prc_GetProjects')
        .then(db => res.json(db.Data))
);

router.post('/', (req, res) =>
    dolphin.exec('prc_CreateProject', {
        title: req.body.title,
        description: req.body.description
    }).then(db => res.json(db.Data))
)

module.exports = router;