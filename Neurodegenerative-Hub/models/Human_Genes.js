const mongoose = require('mongoose');

const Human_Genes_Schema = mongoose.Schema({

   

    entrez_id : {
        type: String,
        required: false
    },

    gene_name: {
        type: String, 
        required: false
    },

    gene_symbol: {
        type: String,
        required: true
    },

    gene_alias: {
        type: [String],
        required: true
    },

    hgnc_id: {
        type: String,
        required: false
    },

    ensembl_id: {
        type: String,
        required: false
    },

    OMIM_gene_id:{
        type: String,
        required: false
    },

    gene_molecular_function: {
        type: [String],
        required: false
    },
    
    mouse_allele_id: {
        type: [String],
        required: false
    },

    ppi_id : {
        type: [String],
        required: false
    },

    fly_allele_id : {
        type: [String],
        required: false
    },

   GO_biological_id : {
        type: [String],
        required: false
    },

   GO_cellular_id : {
        type: [String],
        required: false
    }, 

    GO_molecular_id : {
        type: [String],
        required: false
    }, 

    disease_id : {
        type: [String],
        required: false
    }, 

    modifier_id : {
        type: [String],
        required: false
    }


   

});

const Human_Genes = module.exports = mongoose.model('Human_Genes', Human_Genes_Schema, 'Human_Genes');