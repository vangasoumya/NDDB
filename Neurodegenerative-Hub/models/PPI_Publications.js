const mongoose = require('mongoose');

const PPI_Publications_Schema = mongoose.Schema({

    ppi_gene_source:{
        type: [String],
        required: true
    },

    ppi_gene_interactor:{
        type: [String],
        required: true
    },

    ppi_experimental_setup: {
        type: String,
        required: true
    },

    ppi_experimental_setup_type: {
        type: String, 
        required: true
    },

    ppi_pubmed_author: {
        type: String,
        required: false
    },

    ppi_pubmed_id: {
        type: String,
        required: false
    },

    ppi_throughput: {
        type: String,
        required: false
    },

    

});

const PPI_Publication = module.exports = mongoose.model('PPI_Publications', PPI_Publications_Schema, 'PPI_Publications');