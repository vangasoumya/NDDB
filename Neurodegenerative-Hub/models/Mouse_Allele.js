const mongoose = require('mongoose');

const Mouse_Allele_Schema = mongoose.Schema({

    mouse_allele_id: {
        type: String,
        required: true
    },

    mouse_allele_symbol: {
        type: String, 
        required: true
    },

    mouse_allele_name: {
        type: String,
        required: false
    },

    mouse_chromosome: {
        type: String,
        required: false
    },

    mouse_synonyms: {
        type: String,
        required: false
    },

    mouse_allele_type: {
        type: String,
        required: false
    },

    mouse_allele_attributes: {
        type: String,
        required: false
    },
    
    mouse_transmission: {
        type: String,
        required: false
    },

    mouse_abnormal_phenotypes : {
        type: String,
        required: false
    },

    mouse_human_disease_models : {
        type: String,
        required: false
    }

   

   

});

const Mouse_Allele = module.exports = mongoose.model('Mouse_Allele', Mouse_Allele_Schema, 'Mouse_Allele');