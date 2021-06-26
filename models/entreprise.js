const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema de l'entreprise
const EntrepriseSchema = new Schema({
    entreprise : {
        type: String,
        require: [false, 'Nom entreprise obligatoire']
    },
    email : {
        type: String,
        require: [false, 'email entreprise obligatoire']
    },
    password : {
        type: String,
        require: [false, 'password entreprise obligatoire']
    },
    description : {
        type: String,
        require: [false, 'description entreprise obligatoire']
    },
    logo : {
        type: String,
        require: [false, 'Nom entreprise obligatoire']
    },
    tel : {
        type: String,
        require: [false, 'tel entreprise obligatoire']
    },
    fax : {
        type: String,
        require: [false, 'Nom entreprise obligatoire']
    },
    siegeSocial : {
        type: String,
        require: [false, 'Adresse entreprise obligatoire']
    },
    secteur : {
        type: String,
        require: [false, "Secteur d'activité entreprise obligatoire"]
    },
    fournisseur : {
        type: String,
        require: [false, 'Fournisseur entreprise obligatoire']
    },
    categorie : {
        type: String,
        require: [false, 'Catégorie entreprise obligatoire']
    },
    produit : {
        type: String,
        require: [false, 'Produit entreprise obligatoire']
    },
    role : {
        type: String,
        require: [false, 'Produit entreprise obligatoire']
    },
});

const Entreprise = mongoose.model('entreprise', EntrepriseSchema);
module.exports = Entreprise;