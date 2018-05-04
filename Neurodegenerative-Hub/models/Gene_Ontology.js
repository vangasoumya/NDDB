const mongoose = require('mongoose');

const Gene_Ontology_Schema = mongoose.Schema({

    go_id: {
        type: String,
        required: true
    },

    go_name: {
        type: String, 
        required: true
    },

    go_namespace: {
        type: String,
        required: true
    },

    go_def: {
        type: String,
        required: false
    },

    go_synonym: {
        type:[String],
        required: false
    },

    go_is_a: {
        type:[String],
        required: false
    },

    go_intersection_of: {
        type:[String],
        required: false
    },
    
    go_relationship: {
        type:[String],
        required: false
    },

    go_created_by : {
        type: String,
        required: false
    },

    go_created_date : {
        type: String,
        required: false
    }

   
   

});

const Gene_Ontology = module.exports = mongoose.model('Gene_Ontology', Gene_Ontology_Schema, 'Gene_Ontology');