const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Admin Secteur
const AdminSecteurSchema = new Schema({
    descriptionSecteur : {
        type: String,
        require: [false, 'Champs description secteur obligatoire']
    },

    secteur : {
        type: String,
        require: [false, 'Champs secteur obligatoire']
    }
 
});

const AdminSecteur = mongoose.model('adminSecteur', AdminSecteurSchema);
module.exports = AdminSecteur;