const mongoose = require('mongoose');

const Neuro_Diseases_Schema = mongoose.Schema({

    disease_name: {
        type: String,
        required: true
    },

    disease_type: {
        type: String, 
        required: true
    },

    OMIM_disease_id:{
        type: String, 
        required: false
    },

    disease_alias: {
        type: [String],
        required: false
    },

    disease_summary: {
        type: [String],
        required: false
    },

    prevalence: {
        type:[String],
        required: false
    },

    mechanism: {
        type:[String],
        required: false
    },

    pathogenic_id: {
        type: [String],
        required: false
    },
    
    inheritance: {
        type:[String],
        required: false
    },

    mutation : {
        type: [String],
        required: false
    },

    gene_id : {
        type: [String],
        required: false
    },

    modifier_id : {
        type: [String], 
        required: false
    }

   

   

});

const Neuro_Diseases = module.exports = mongoose.model('Neuro_Diseases', Neuro_Diseases_Schema, 'Diseases');