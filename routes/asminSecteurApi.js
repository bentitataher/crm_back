const express = require('express');
const router = express.Router();
const passport = require('passport');
const AdminSecteur = require('../models/adminSecteur');

// Ajout
router.post('/', (req, res) => {
    AdminSecteur.create(req.body).then((secteur) => {
        res.send(secteur)
    })
});


module.exports = router;