const express = require('express');
const router = express.Router();
const passport = require('passport');
const AdminSecteur = require('../models/adminSecteur');


// Get All
router.get('/', (req, res) => {
    AdminSecteur.find()
        .then((secteur) => {
            res.send(secteur)
        })
});

// Get One
router.get('/:id', (req, res) => {
    AdminSecteur.findOne({_id : req.params.id})
        .then((oneSecteur) => {
            res.status(200).json(oneSecteur)
        })
});

// Ajout
router.post('/', (req, res) => {
    AdminSecteur.create(req.body).then((secteur) => {
        res.send(secteur)
    })
});

// Modifier
router.put('/:id', (req,res) =>{
    AdminSecteur.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then( () =>{
            AdminSecteur.findOne({_id: req.params.id})
                .then(function(secteurUpdated){
                    res.status(299).json(secteurUpdated)
                });
        });  
  });

// Supprimer
router.delete('/:id', (req, res) =>{
    AdminSecteur.findByIdAndDelete({_id: req.params.id})
        .then( (secteur) =>{
            res.status(201).json(secteur);
        });  
  });


module.exports = router;