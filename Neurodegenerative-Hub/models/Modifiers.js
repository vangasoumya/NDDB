const mongoose = require('mongoose');

const Modifiers_Schema = mongoose.Schema({

    modifier_gene_id: {
        type: Object,
        required: true
    },

    modifier_disease_id: {
        type: Object,
        required: true
    },
    

    modifier_organism: {
        type: String, 
        required: false
    },

    modifier: {
        type: String,
        required: false
    },

    modifier_effect: {
        type: String,
        required: false
    },

    modifier_pmid: {
        type: String,
        required: false
    }

    

   

});

const Modifiers = module.exports = mongoose.model('Modifiers', Modifiers_Schema, 'Modifiers');