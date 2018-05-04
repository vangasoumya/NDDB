const mongoose = require('mongoose');

const Pathogenic_Variants_Schema = mongoose.Schema({

    pathogenic_disease_id: {
        type: String,
        required: true
    },

    pathogenic_gene_id: {
        type: String, 
        required: true
    },

    pathogenic_gene_name: {
        type:String, 
        required: false
    },

    pathogenic_variation: {
        type: String,
        required: false
    },

    pathogenic_type: {
        type: String,
        required: false
    },

    pathogenic_significance: {
        type: String,
        required: false
    },

    pathogenic_snp: {
        type: String,
        required: false
    },

    pathogenic_assembly: {
        type: String,
        required: false
    },
    
    pathogenic_location: {
        type: String,
        required: false
    }

   

   

});

const Pathogenic_Variants = module.exports = mongoose.model('Pathogenic_Variants', Pathogenic_Variants_Schema, 'Pathogenic_Variants');