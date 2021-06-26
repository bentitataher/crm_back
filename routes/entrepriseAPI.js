const express = require('express');
const router = express.Router();
const Entreprise = require('../models/entreprise');
const PasswordReset = require('../models/passwordReset');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Méthose Get
router.get('/', (req, res) => {
    res.send({ type: "Get request" })
});

// Méthode Post
router.post('/', (req, res) => {
    Entreprise.create(req.body).then((entreprise) => {
        res.send(entreprise)
    })
});

// Inscription entreprise
router.post('/signup', function (req, res, next) {

    Entreprise.findOne({ email: req.body.email }).then(entreprise => {
        if (entreprise) {
            return res.status(409).json({ message: 'Mail exist' });
        }

        else {

            bcrypt.hash(req.body.password, 10, (err, hash) => {

                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }

                else {
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

// Compléter inscription
router.put('/:id', function (req, res) {
    Entreprise.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(function () {
            Entreprise.findOne({ _id: req.params.id })
                .then(function (entreprise) {
                    res.status(299).send(entreprise)
                });
        });
});


// login
router.post('/login', (req, res) => {
    Entreprise.find({ email: req.body.email })
        .then(entreprise => {
            if (entreprise.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, entreprise[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'error 1'
                    });
                }
                if (result) {

                    const token = jwt.sign({
                        email: entreprise[0].email,
                        userId: entreprise[0]._id
                    },
                        'secret',
                        {
                            expiresIn: "1d"
                        },

                    );

                    return res.status(200).json({
                        message: 'Auth seccussful',
                        checkResult: result,
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed',
                    checkResult: result,
                });
            })
        })
});

// forget password

router.post('/password-forget', (req, res) => {
    Entreprise.findOne({ email: req.body.email })
        .then((entreprise) => {
            if (entreprise) {

                PasswordReset.create({
                    email: req.body.email,
                    token: Math.floor(Math.random() * 1000)
                }).then((createdToken) =>{
                    // email message options
                    const mailOptions = {
                        from: 'bentitataher@gmail.com',
                        to: 'bentitataher@gmail.com',
                        subject: 'Sent mail from mailApi',
                        html: `Clickti this <a href="http://localhost:4200/#/password-reset/${createdToken.token}">link</a> to reset your password.` ,
                    };
                    // email transport configuration
    
                    var transport = nodemailer.createTransport({
                        service: "gmail",
                        secure: false,
                        auth: {
                            user: "bentitataher@gmail.com",
                            pass: "@Taher1988"
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
    
                    // send email
                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            res.send('error')
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.reponse);
                            res.json({ message: "email send sucessfully" });
                        }
                    });

                })


            }
            else {
                console.log("Ce mail n'existe pas !");
            }
        })
})

module.exports = router;