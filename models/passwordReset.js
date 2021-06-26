const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema de password forget
const PasswordForgetSchema = new Schema({
    email : {
        type: String,
        require: [false, 'PasswordForget champs']
    },

    token : {
        type: String,
        require: [false, 'token champs']
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time
      }
 
});

const PasswordForget = mongoose.model('passwordForget', PasswordForgetSchema);
module.exports = PasswordForget;