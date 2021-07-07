const express = require('express');
const routes =  require('./routes/entrepriseAPI');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// set up express app
const app = express();

// Connexion à mongoDb
const connexionOptions = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect('mongodb://localhost/crm_project_II', connexionOptions);
mongoose.Promise = global.Promise;

// Paramétrage body parser
app.use(bodyParser.json());
app.use(cors({ origin : 'http://localhost:4200' }));

// initialisation des routes
app.use('/entreprise', require('./routes/entrepriseAPI'));
app.use('/admin-secteur', require('./routes/adminSecteurApi'));
app.use('/admin-entreprise', require('./routes/adminEntrepriseApi'))

// listen for requests
app.listen(3000, function(){
    console.log('app listening on port 3000');
})