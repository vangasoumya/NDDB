const mongoose = require('mongoose');

const References_Schema = mongoose.Schema({

    references_gene_id: {
        type: Object,
        required: true
    },

    references_disease_id: {
        type: Object, 
        required: true
    },
    
    diseasesummary_ref_links:{
        type: [String], 
        required: false
    }, 

    prevalence_ref_links:{
        type: [String], 
        required: false
    }, 

    diseasealias_ref_links:{
        type: [String], 
        required: false
    }, 

    mutation_ref_links:{
        type: [String], 
        required: false
    }, 

    inheritance_ref_links:{
        type: [String], 
        required: false
    }, 

    mechanism_ref_links:{
        type: [String], 
        required: false
    }, 

    molecularfunction_ref_links:{
        type: [String], 
        required: false
    }

    

    

   

});

const References = module.exports = mongoose.model('References', References_Schema, 'References');