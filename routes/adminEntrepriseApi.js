const express = require('express');
const router = express.Router();
const Entreprise = require('../models/entreprise');
const PasswordReset = require('../models/passwordReset');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (res, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

// =============> admin Side

// Admin : Méthose Get
router.get('/', (req, res) => {
    Entreprise.find()
        .then((entreprise) => {
            res.status(200).json(entreprise)
        })
});

// Admin : Méthose delete
router.delete('/:id', (req, res) => {
    Entreprise.findByIdAndDelete({ _id: req.params.id })
        .then((entreprise) => {
            res.status(201).json(entreprise);
        });
});

// Admin : Ajouter entreprise
router.post('/signup', function (req, res, next) {
    Entreprise.findOne({ email: req.body.email }).then(entreprise => {
        if (entreprise) {

            return res.status(409).json({ message: 'Mail exist' });

        }else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }else {
                    req.body.password = hash;
                    Entreprise.create(req.body)
                        .then(function (entreprise) {
                            res.send(entreprise)
                        })
                }
            });
        }
    });
});

module.exports = router;