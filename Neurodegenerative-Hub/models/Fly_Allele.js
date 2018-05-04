const mongoose = require('mongoose');

const Fly_Allele_Schema = mongoose.Schema({

    allele_symbol: {
        type: String,
        required: true
    },

    allele_Fbal: {
        type: String, 
        required: false
    },

    phenotype: {
        type: String,
        required: true
    },

    fly_FBrf: {
        type: String,
        required: false
    },

    
   

});

const Fly_Allele = module.exports = mongoose.model('Fly_Allele', Fly_Allele_Schema, 'Fly_Allele');