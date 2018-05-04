const mongoose = require('mongoose');

const PPI_Schema = mongoose.Schema({

    ppi_gene_source: {
        type: [String],
        required: true
    },

    ppi_gene_interactor: {
        type: String, 
        required: true
    },

    ppi_publication_id: {
        type: [String],
        required: false
    }

    

   

});

const PPI = module.exports = mongoose.model('PPI', PPI_Schema, 'PPI');