const express = require('express');
var http = require('http');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

var PythonShell = require('python-shell');
var os = require("os");
var msg = [];
var freq = [];
var inheritance = [];
var out;
var newres;
var interaction;
var interactionmess;
var final;
//var cheerio = require('cheerio');
//var request = require('request');
//const Genemysql = require('../models/genemysql');
//const Diseasemysql = require('../models/diseasemysql')
const Human_Genes = require('../models/Human_Genes');
const Neuro_Diseases = require('../models/Neuro_Diseases');
const Gene_Ontology = require('../models/Gene_Ontology');
const Fly_Allele = require('../models/Fly_Allele');
const Mouse_Allele = require('../models/Mouse_Allele');
const PPI = require('../models/PPI');
const PPI_Publications = require('../models/PPI_Publications');
const Pathogenic_Variants = require('../models/Pathogenic_Variants');
const Modifiers = require('../models/Modifiers');
const References = require('../models/References');
var fly;
var genealias;
var genesymbol;
var genename;
var geneontologybiological;
var geneontologycellular;
var geneontologymolecular;
var interaction;
var molecularfunction;
var mouse;
var diseasename;
var diseasealias;
var diseasesummary;
var diseasetype;
var inheritance;
var mechanism;
var pathogenic;
var prevalence;
var mutation;

 //var sleep = require('sleep');

/*Old architecture to get all gene information*/

/*router.get('/genes', (req, res, next)=>{
    Gene.find(function(err, genes)
        {
            res.json(genes);
        });
});*/

/*
router.get('/allgenes', (req, res, next)=>{
    Genemysql.getallgenes(function (err, rows){
        if(err)
  {
  res.json(err);
  }
  else
  {
      console.log(rows[0].molecularFunction)
      console.log(rows)
  res.json(rows);
  }
 
    });
});
*/

router.post('/geneupdate', (req, res, next)=>{
    console.log(req.body)

   /* if(req.body[0].editedfield == 'diseasesummarysource')
    {
        var diseasesummarysource = req.body[0].diseasesummarysource
        console.log(diseasesummarysource)
        Disease.update(
            {diseasename: req.body[0].diseasename},
            {
             $set: {diseasesummarysource: diseasesummarysource}
            }, 
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        

        );
    }

    if(req.body[0].editedfield == 'mutationsource')
    {
        var mutationsource = req.body[0].mutationsource
        console.log(mutationsource)
        Gene.update(
            {genename: req.body[0].genename},
            {
             $set: {mutationsource: mutationsource}
            }, 
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        

        );
    }

    if(req.body[0].editedfield == 'mechanismsource')
    {
        var mechanismsource = req.body[0].mechanismsource
        console.log(mechanismsource)
        Disease.update(
            {diseasename: req.body[0].diseasename},
            {
             $set: {mechanismsource: mechanismsource}
            }, 
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        

        );
    }

    if(req.body[0].editedfield == 'inheritancesource')
    {
        var inheritancesource = req.body[0].inheritancesource
        console.log(inheritancesource)
        Disease.update(
            {diseasename: req.body[0].diseasename},
            {
             $set: {inheritancesource: inheritancesource}
            }, 
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        

        );
    }

    if(req.body[0].editedfield == 'molecularfunctionsource')
    {
        var molecularfunctionsource = req.body[0].molecularfunctionsource
        console.log(molecularfunctionsource)
        Gene.update(
            {genename: req.body[0].genename},
            {
             $set: {molecularfunctionsource: molecularfunctionsource}
            }, 
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        

        );
    }

    if(req.body[0].editedfield == 'prevalencesource')
    {
        var prevalencesource = req.body[0].prevalencesource
        //console.log(diseasesummarysource)
        Disease.update(
            {diseasename: req.body[0].diseasename},
            {
             $set: {prevalencesource: prevalencesource}
            }, 
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        

        );
    }*/
   //Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
        //console.log(searchgeneresult)
     //Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
            //console.log(searchdiseaseresult)
       //References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, searchreferencesresult){
                //console.log(searchreferencesresult.length)
           
    console.log("Went inside the proper route")
    //console.log(req.body)
    
    var newstring;
    var dbdata = [];
    var updated = [];
    var finalstring;
    var ref_link_array=[]
    var matcharray = []
    var finalmatcharray = []
    //var count = searchreferencesresult.length
    if(req.body[1].editedfield == 'diseasesummary')
    {
    console.log("Went in diseasesummary")
    //console.log(req.body)
    var diseasesummary = req.body[1].diseasesummary
    for (var each of diseasesummary)
    {
        //console.log(each)
        newstring = each;
    }
    
    maincontentupdate(newstring);
    //console.log(newstring)
    Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {disease_summary: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseasesummaryresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        //console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{diseasesummary_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{diseasesummary_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                        //res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references:[], diseasesummaryreferences: []})
                    //}
                
                 }
             })
         }
        }        
    );
    //res.end()
    
    } 

    if(req.body[1].editedfield == 'prevalence')
    {
    console.log("Went in prevalence")
    var prevalence = req.body[1].prevalence
    for (var each of prevalence)
    {
        newstring = each;
    }
    console.log(newstring)
    maincontentupdate(newstring);
    console.log("updated")
    console.log(updated)
    //console.log(req.body[1].diseasename)
    //console.log(updated)
   /* Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {prevalence: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.log(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseasesummaryresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     res.send(diseasesummaryresult[0].prevalence)
                 }
             })
         }
        }        
    );*/



    Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {prevalence: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.log(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseaseresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     console.log(diseaseresult[0].prevalence)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{prevalence_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({prevalence: diseaseresult[0].prevalence, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){


                        console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{prevalence_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({prevalence: diseaseresult[0].prevalence, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    





                        //res.send({prevalence: diseasesummaryresult[0].prevalence, references:[]})
                    }
                
                 }
             })
         }
        }        
    );

    } 


    if(req.body[1].editedfield == 'diseasealias')
    {
    console.log("Went in diseasealias")
    var diseasealias = req.body[1].diseasealias
    
    for (var each of diseasealias)
    {
        //console.log(each)
        newstring = each;
    }
    console.log(newstring)
    maincontentupdate(newstring);

    Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {disease_alias: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseaseresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        //console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{diseasealias_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({diseasealias: diseaseresult[0].disease_alias, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{diseasealias_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({diseasealias: diseaseresult[0].disease_alias, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                   //res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references:[], diseasesummaryreferences: []})
                    //}
                
                 }
             })
         }
        }        
    );

    }


    if(req.body[1].editedfield == 'mutation')
    {
    console.log("Went in diseasemutation")
    var mutation = req.body[1].mutation
    for (var each of mutation)
    {
        newstring = each;
    }
    maincontentupdate(newstring);

    Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {mutation: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseaseresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        //console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{mutation_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({mutation: diseaseresult[0].mutation, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{mutation_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({mutation: diseaseresult[0].mutation, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }

                        //res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references:[], diseasesummaryreferences: []})
                    //}
                
                 }
             })
         }
        }        
    );

    }





    if(req.body[1].editedfield == 'inheritance')
    {
    console.log("Went in diseaseinheritance")
    var inheritance = req.body[1].inheritance
    for (var each of inheritance)
    {
        newstring = each;
    }
    maincontentupdate(newstring);

    Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {inheritance: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseaseresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        //console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{inheritance_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({inheritance: diseaseresult[0].inheritance, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{inheritance_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({inheritance: diseaseresult[0].inheritance, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                        //res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references:[], diseasesummaryreferences: []})
                    //}
                
                 }
             })
         }
        }        
    );
    }







    if(req.body[1].editedfield == 'mechanism')
    {
    console.log("Went in diseasemechanism")
    var mechanism = req.body[1].mechanism
    for (var each of mechanism)
    {
        newstring = each;
    }
    maincontentupdate(newstring);

    Neuro_Diseases.update(
        {disease_name: req.body[1].diseasename},
        {
         $set: {mechanism: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
             Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, diseaseresult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        //console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{mechanism_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({mechanism: diseaseresult[0].mechanism, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{mechanism_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({mechanism: diseaseresult[0].mechanism, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                        //res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references:[], diseasesummaryreferences: []})
                    //}
                
                 }
             })
         }
        }        
    );
    }




    if(req.body[1].editedfield == 'molecularfunction')
    {
    console.log("Went in molecularfunction")
    var molecularfunction = req.body[0].molecularfunction
    for (var each of molecularfunction)
    {
        newstring = each;
    }
    maincontentupdate(newstring);

    Human_Genes.update(
        {gene_symbol: req.body[0].genesymbol},
        {
         $set: {gene_molecular_function: updated}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
             Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, generesult){
                 if(err){
                     console.log(err)
                 }
                 else{
                     //console.log(diseasesummaryresult[0].disease_summary)
                     //res.send(diseasesummaryresult[0].disease_summary)
                     if(finalmatcharray.length>0){
                        //console.log("Went in refrences")
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{molecularfunction_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                //console.log(referencesresult)
                                                res.send({molecularfunction: generesult[0].gene_molecular_function, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                    else if(finalmatcharray.length==0){
                        Human_Genes.find({gene_symbol: req.body[0].genesymbol}, function(err, searchgeneresult){
                            //console.log(searchgeneresult)
                         Neuro_Diseases.find({disease_name: req.body[1].diseasename}, function(err, searchdiseaseresult){
                           
                            References.update(
                                {$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]},
                                {
                                    $set:{molecularfunction_ref_links: finalmatcharray}
                                }, 
                                function(err, object){
                                    if (err){
                                        console.warn(err.message);  
                                    }else{
                                        console.dir(object);
                                        References.find({$and:[{references_gene_id: searchgeneresult[0]._id},{references_disease_id: searchdiseaseresult[0]._id}]}, function(err, referencesresult){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                var referencearray = []
                                                var diseasealiasreferencearray = []
                                                var diseasesummaryreferencearray = []
                                                var prevalencereferencearray = []
                                                var mutationreferencearray = []
                                                var inheritancereferencearray = []
                                                var mechanismreferencearray = []
                                                var molecularfunctionreferencearray = []

                                            for (var eachreferences of referencesresult){
                                                for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                    referencearray.push(eachdiseasealiasreferences)
                                                    diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                                }
                                                for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                    referencearray.push(eachdiseasesummaryreferences)
                                                    diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                                }
                                                for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                    referencearray.push(eachprevalencereferences)
                                                    prevalencereferencearray.push(eachprevalencereferences)
                                                }
                                               
                                                for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                    referencearray.push(eachmutationreferences)
                                                    mutationreferencearray.push(eachmutationreferences)
                                                }
                                                for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                    referencearray.push(eachinheritancereferences)
                                                    inheritancereferencearray.push(eachinheritancereferences)
                                                }
                                                for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                    referencearray.push(eachmechanismreferences)
                                                    mechanismreferencearray.push(eachmechanismreferences)
                                                }
                                                for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                    referencearray.push(eachmolecularfunctionreferences)
                                                    molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                                }
                                            }
                                                console.log(generesult[0].gene_molecular_function)
                                                res.send({molecularfunction: generesult[0].gene_molecular_function, references: referencearray, diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, diseasealiasreferences: diseasealiasreferencearray,
                                                mutationreferences: mutationreferencearray, inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, molecularfunctionreferences: molecularfunctionreferencearray 
                                                })
                                                //res.write(referencesresult)
                                            }
                                        })
                                    }
                                }
                            )
                
                         })
                
                        })
                    }
                        //res.send({diseasesummary: diseasesummaryresult[0].disease_summary, references:[], diseasesummaryreferences: []})
                    //}
                
                 }
             })
         }
        }        
    );
    }
    

    

    
    function maincontentupdate(newstring, field)
    {
    
    //console.log("newstring")
    //console.log(newstring)
    //var splitstring = newstring.split(".,").map(function (val) { return val + "."; });
    //console.log(splitstring)
   
    

       var splitstring = newstring.split(os.EOL)
    
   
    //console.log(splitstring)
    for (var string of splitstring)
    {

        //console.log(string)
    //var EOLstring= string.split(os.EOL)
        //console.log(EOLstring)
        //console.log(string)
        //(/[^[\]]+(?=])/g)
        //(/\{\{(.*?)\}\}/)
        matcharray.push(string.match(/[^{{\]]+(?=}})/g))
        
        //console.log(ref)
        /*if(ref!=null){
            console.log(ref[1])
            ref_link_array.push(ref[1])
        }*/
        
        //if(ref==null){
        dbdata.push(string.replace(/\s*$/,""))
        
        //if(ref!=null){
        //console.log(ref[1])  
        //count = count +1
        //var replaced = string.replace(/\{\{(.*?)\}\}/, "["+count+"]") 
        //console.log(replaced)
        //console.log(searchgeneresult[0]._id)
        //console.log(searchdiseaseresult[0]._id)
        /*var addnewreference = {
            references_gene_id: searchgeneresult[0]._id,
            references_disease_id: searchdiseaseresult[0]._id,
            ref_id: count,
            ref_link: ref[1],
            ref_section: req.body[1].editedfield
        }*/
        /*References.create(
           addnewreference,
           
            function(err, object){
             if (err){
                 console.warn(err.message);  
             }else{
                 console.dir(object);
             }
            }        
        );*/
        //dbdata.push(replaced)

        
        
       
        
            //console.log(each.replace(/\s*$/,""))
         //dbdata.push(each.replace(/\s*$/,""))   
        
     //dbdata.push(string.replace(/\s*$/,""))
    }
    //console.log(matcharray)

    for (var match of matcharray){
        if(match!=null){
            for (var eachmatch of match){
                finalmatcharray.push(eachmatch)
            }
        }
    }
    console.log("finalmatcharray")
    console.log(finalmatcharray)
    if(dbdata[0] == ''){
        dbdata.shift();
    }
    //updated.push(dbdata)
    for (var i=0; i<dbdata.length; i++){
        updated.push(dbdata[i])
    }
    /*for(var i=0; i< dbdata.length; i++){
        for (var dbfinal of dbdata[i])
        {
            if(dbfinal=="."){
                dbfinal = "";
                updated.push(dbfinal)
            }
            else{
           
            dbfinal1 = dbfinal.replace(/\.\./g, '.');
                updated.push(dbfinal1)
        }
    }
    }*/

    
    //console.log(updated)
        //console.log(updated)
       
      //console.log(finalmatcharray)

    }

    })
//})
//})
   
//})





router.post('/addpathogenic/', (req, res)=>{

    Human_Genes.find({gene_symbol: req.body.genesymbol}, function(err, searchgeneresult){
        console.log(searchgeneresult[0]._id)
     Neuro_Diseases.find({disease_name: req.body.diseasename}, function(err, searchdiseaseresult){
       console.log(searchdiseaseresult[0]._id)
       var pathogenic = {
        pathogenic_disease_id : searchdiseaseresult[0]._id,
        pathogenic_gene_id : searchgeneresult[0]._id,
        pathogenic_gene_name : req.body.genesymbol,
        pathogenic_variation : req.body.pathogenicvariation,
        pathogenic_type : req.body.pathogenictype,
        pathogenic_significance : req.body.pathogenicsignificance,
        pathogenic_snp : req.body.pathogenicsnp,
        pathogenic_assembly : req.body.pathogenicassembly,
        pathogenic_location : req.body.pathogeniclocation
       }
       Pathogenic_Variants.create(pathogenic, function(err, pathogenicresult) {
        if (err) throw err;
        console.log(pathogenicresult)
        console.log(pathogenicresult._id)
        //var pathogenicid = String(pathogenicresult._id)
        Neuro_Diseases.update(
            
            {disease_name: req.body.diseasename},
            {
                $push: {pathogenic_id: pathogenicresult._id}
            },
            function(err, object){
                if (err){
                    console.warn(err.message);  
                }else{
                    console.log("updated")
                    console.log(object);
                    Neuro_Diseases.find({disease_name: req.body.diseasename}, function(err, outputresult){
                        Pathogenic_Variants.find({_id: {$in: outputresult[0].pathogenic_id}}, function(err,pathogenic_final){
                            console.log(pathogenic_final)
                            res.send({pathogenic: pathogenic_final})
                        })
                    })
                }
            }
        )
      
      });

    
   /* Disease.update(
        {diseasename: req.body.diseasename},
        {
         $push: {pathogenic: req.body}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
         }
        }        
    );*/
    })
    })
})

router.post('/addmodifier/', (req, res)=>{

    //Gene.find({genename:req.body.genename}, function(err, result){
        //console.log(result)
    //})
    Human_Genes.find({gene_symbol: req.body.genesymbol}, function(err, searchgeneresult){
        console.log(searchgeneresult[0]._id)
     Neuro_Diseases.find({disease_name: req.body.diseasename}, function(err, searchdiseaseresult){
       console.log(searchdiseaseresult[0]._id)
       var modifier = {
        modifier_gene_id : searchgeneresult[0]._id,
        modifier_disease_id : searchdiseaseresult[0]._id,
        modifier_organism : req.body.organism,
        modifier : req.body.modifier,
        modifier_effect : req.body.modifiereffect,
        modifier_pmid : req.body.pmid
       }
       Modifiers.create(modifier, function(err, modifierresult) {
        if (err) throw err;
        console.log(modifierresult)
        console.log(modifierresult._id)
        Modifiers.find({$and:[{modifier_gene_id: searchgeneresult[0]._id},{modifier_disease_id: searchdiseaseresult[0]._id}]}, function(err, modifierfinal){
        console.log(modifierfinal)
        res.send({modifier: modifierfinal})
        })

        //var pathogenicid = String(pathogenicresult._id)
       /* Neuro_Diseases.update(
            
            {disease_name: req.body.diseasename},
            {
                $push: {modifier_id: modifierresult._id}
            },
            function(err, object){
                if (err){
                    console.warn(err.message);  
                }else{
                    console.log("updated")
                    console.log(object);
                    Human_Genes.update(
                        {gene_symbol: req.body.genesymbol},
                            {
                                $push: {modifier_id: modifierresult._id}
                             },
                            function(err, object){
                            if (err){
                                console.warn(err.message);  
                            }else{
                                console.log(object)
                            }
                        })
                
                }
            }
        )*/
      
      });

    
   /* Disease.update(
        {diseasename: req.body.diseasename},
        {
         $push: {pathogenic: req.body}
        }, 
        function(err, object){
         if (err){
             console.warn(err.message);  
         }else{
             console.dir(object);
         }
        }        
    );*/
    })
    })



    })






/* Old Architecture gene to disease code */

/*router.get('/genetodisease/:genename', (req, res, next)=>{

    console.log(req.params.genename);
    //console.log(Gene);
    Disease.find({genealias: new RegExp('^' +req.params.genename+ '$', 'i')}, function(err, result)
    {
        if(err){
            return res.send();
        }
        console.log(result);
        res.send(result);
        //console.log("Process")
        
    })

});*/

/* New architecture Gene to Disease and Disease to Gene Code */

router.get('/genetodisease/:name', (req, res, next)=>{
    //console.log(req.params.name)
    //var mouse =[];
    //var fly = [];
    var output =[];
    Human_Genes.find({gene_symbol: new RegExp('^' +req.params.name+ '$', 'i')}, function(err, result)
    {
        //console.log(result)

        if(err){
            console.log(err)
        }

        else if(result.length==0)
        {
            //console.log("Went inside disease search")

            Neuro_Diseases.find({disease_name : new RegExp('^' +req.params.name+ '$', 'i')}, function(err,disease_result){
                //console.log(disease_result)=
                if(disease_result.length>0){

                Human_Genes.find({_id : {$in:  disease_result[0].gene_id}}, function(err, gene_result){

                    if(err){
                        console.log(err)
                    }
                    else{
                        for (var i of gene_result)
                        {
                            var final = {
                                diseasename : req.params.name,
                                genesymbol: i.gene_symbol,
                                searchelement: "diseasename"
                            }

                            output.push(final)
                        }
                        res.send(output)
                    }
                })
            }
            else {
                console.log("Entered search term is not in our database")
            }
            })
        }

        else if(result.length >0){

        

        Neuro_Diseases.find({_id : {$in:  result[0].disease_id}}, function(err,disease_result)
        {
            //console.log(result)
            if(err){
                console.log(err)
            }
            else{
                //console.log(disease_result)
                for (var i of disease_result)
                {
                    var final =  {
                        diseasename : i.disease_name,
                        genesymbol : result[0].gene_symbol,
                        searchelement: "genename"

                    }
                    output.push(final)

                }
                res.send(output)
            }
            
        })

    } 

    })
})


/*Get all genealias*/

router.get('/allgenealias', (req, res, next)=>{

    var genelist = []

    Human_Genes.find(function(err, genes_list)
        {
            for(var genes of genes_list){
                for (var each of genes.gene_alias){
                   genelist.push(each)
                }

            }
            //console.log(genelist)
            res.send(genelist)
        });
})


/*Get all genes*/

router.get('/allgenes', (req, res, next)=>{

    var geneslist = []

    Human_Genes.find(function(err, genes_list)
        {
            
            
            //console.log(genelist)
            res.send(genes_list)
        });
})

/*Get all disease names*/

router.get('/alldiseases', (req, res, next)=>{

    var diseaselist = []

    Neuro_Diseases.find(function(err, diseases_list)
        {
            for(var disease of diseases_list){
               
                   diseaselist.push(disease.disease_name)

                

            }
            //console.log(diseaselist)
            res.send(diseaselist)
        });
})


/*Old Architecture code for Diseaseprofile Component*/

/*router.get('/genedisease/:genename/:diseasename', (req, res, next)=>{
    console.log("inside" + req.params.genename)
    console.log(req.params.diseasename)

    Disease.find({$and: [ { genename: new RegExp('^' +req.params.genename+ '$', 'i')}, { diseasename: new RegExp('^' +req.params.diseasename+ '$', 'i')}] }, function(err, result)
        {
            //console.log(result[0].diseasename)

            Gene.find({genename: new RegExp('^' +req.params.genename+ '$', 'i')}, function (err, newresult){

                //newresult.push({"diseasesummary" : result[0].diseasesummary})
                //newresult.push({"diseasetype" : result[0].diseasetype})
                var final
                final = {
                    
                    diseasetype : result[0].diseasetype,
                    diseasesummary : result[0].diseasesummary,
                    prevalence : result[0].prevalence,
                    inheritance : result[0].inheritance,
                    mechanism : result[0].mechanism, 
                    pathogenic : result [0].pathogenic,
                    diseasesummarysource : result[0].diseasesummarysource,
                    prevalencesource : result[0].prevalencesource,
                    inheritancesource : result[0].inheritancesource,
                    mechanismsource : result[0].mechanismsource
                }
                console.log(final)
                newresult.push(final)
                //final["diseasetype"] = result[0].diseasetype
                //final[0].diseasetype = result[0].diseasetype
                //newresult[0]["diseasetype"]=(result[0].diseasetype)
                console.log(newresult)
                res.send(newresult)

            })
        })
   
})
*/


/*New Architecture code for DiseaseProfile Component*/
router.get('/geneanddisease/:genesymbol/:diseasename', (req, res, next)=>{
    
    var gene_output;
    var disease_output;
    var modifier_output;
    var total_output = [];
    var gene_molecular = [];
    var gene_cellular = [];
    var gene_biological = [];
    var modifier_values = [];
    var references_values = [];
    Human_Genes.find({gene_symbol : req.params.genesymbol}, function(err,gene_result){
        Fly_Allele.find({_id: {$in: gene_result[0].fly_allele_id}}, function(err,fly_result){
            Gene_Ontology.find({_id: {$in: gene_result[0].GO_molecular_id}}, function(err,GO_molecular){
                for(var each_molecular of GO_molecular)
                    {
                        gene_molecular.push(each_molecular.go_name)
                    }
                Gene_Ontology.find({_id: {$in: gene_result[0].GO_cellular_id}}, function(err,GO_cellular){
                    for(var each_cellular of GO_cellular)
                    {
                        gene_cellular.push(each_cellular.go_name)
                    }
                    Gene_Ontology.find({_id: {$in: gene_result[0].GO_biological_id}}, function(err,GO_biological){
                        for(var each_biological of GO_biological)
                            {   
                                gene_biological.push(each_biological.go_name)
                            }
                        Mouse_Allele.find({_id: {$in: gene_result[0].mouse_allele_id}}, function(err,mouse_result){

                            var gene_output = {
                                genesymbol: req.params.genesymbol,
                                genename: gene_result[0].gene_name,
                                genealias: gene_result[0].gene_alias,
                                fly: fly_result,
                                mouse: mouse_result, 
                                geneontologybiological: gene_biological,
                                geneontologycellular: gene_cellular,
                                geneontologymolecular: gene_molecular,
                                molecularfunction: gene_result[0].gene_molecular_function 
                            }
                            total_output.push(gene_output)
                            Neuro_Diseases.find({disease_name: req.params.diseasename}, function(err,disease_result){
                                Pathogenic_Variants.find({_id: {$in: disease_result[0].pathogenic_id}}, function(err,pathogenic_result){
                                    for (var allpathogenic of pathogenic_result){
                                        allpathogenic.pathogenic_gene_name=req.params.genesymbol
                                    }
                                    //console.log(disease_result[0])
                                    var disease_output = {
                                        diseasename: disease_result[0].disease_name,
                                        diseasesummary: disease_result[0].disease_summary,
                                        diseasetype: disease_result[0].disease_type,
                                        inheritance: disease_result[0].inheritance,
                                        mechanism: disease_result[0].mechanism,
                                        mutation: disease_result[0].mutation,
                                        pathogenic: pathogenic_result, 
                                        prevalence: disease_result[0].prevalence,
                                        diseasealias: disease_result[0].disease_alias
                                    }
                                    
                                    total_output.push(disease_output)
                                   

                                    Modifiers.find({$and:[{modifier_gene_id: gene_result[0]._id},{modifier_disease_id: disease_result[0]._id}]}, function(err, modifier_result){
                                        //console.log(modifier_result)
                                        for (var modifiervalue of modifier_result){
                                            modifier_values.push(modifiervalue)
                                        }
                                        //console.log(modifier_values)
                                        var modifier_output = {
                                            modifiers: modifier_values
                                        }
                                       total_output.push(modifier_output)

                                        //console.log(gene_result[0]._id)
                                        //console.log(disease_result[0]._id)
                                        References.find({$and:[{references_gene_id: gene_result[0]._id},{references_disease_id: disease_result[0]._id}]}, function(err, references_result){
                                            //console.log(references_result)
                                            for (var referencevalue of references_result){
                                                references_values.push(referencevalue)
                                            }
                                            //console.log("references_values")
                                            //console.log(references_values)
                                            var referencearray = []
                                            var diseasealiasreferencearray = []
                                            var diseasesummaryreferencearray = []
                                            var prevalencereferencearray = []
                                            var mutationreferencearray = []
                                            var inheritancereferencearray = []
                                            var mechanismreferencearray = []
                                            var molecularfunctionreferencearray = []

                                        for (var eachreferences of references_values){
                                            for (var eachdiseasealiasreferences of eachreferences.diseasealias_ref_links){
                                                referencearray.push(eachdiseasealiasreferences)
                                                diseasealiasreferencearray.push(eachdiseasealiasreferences)

                                            }
                                            for (var eachdiseasesummaryreferences of eachreferences.diseasesummary_ref_links){
                                                referencearray.push(eachdiseasesummaryreferences)
                                                diseasesummaryreferencearray.push(eachdiseasesummaryreferences)
                                            }
                                            for (var eachprevalencereferences of eachreferences.prevalence_ref_links){
                                                referencearray.push(eachprevalencereferences)
                                                prevalencereferencearray.push(eachprevalencereferences)
                                            }
                                           
                                            for (var eachmutationreferences of eachreferences.mutation_ref_links){
                                                referencearray.push(eachmutationreferences)
                                                mutationreferencearray.push(eachmutationreferences)
                                            }
                                            for (var eachinheritancereferences of eachreferences.inheritance_ref_links){
                                                referencearray.push(eachinheritancereferences)
                                                inheritancereferencearray.push(eachinheritancereferences)
                                            }
                                            for (var eachmechanismreferences of eachreferences.mechanism_ref_links){
                                                referencearray.push(eachmechanismreferences)
                                                mechanismreferencearray.push(eachmechanismreferences)
                                            }
                                            for (var eachmolecularfunctionreferences of eachreferences.molecularfunction_ref_links){
                                                referencearray.push(eachmolecularfunctionreferences)
                                                molecularfunctionreferencearray.push(eachmolecularfunctionreferences)
                                            }
                                        }
                                            //console.log(referencearray)
                                            //console.log(modifier_values)
                                            var references_output = {
                                                //references: references_values
                                                references: referencearray, 
                                                diseasealiasreferences: diseasealiasreferencearray,
                                                diseasesummaryreferences: diseasesummaryreferencearray,
                                                prevalencereferences: prevalencereferencearray, 
                                                mutationreferences: mutationreferencearray, 
                                                inheritancereferences: inheritancereferencearray, 
                                                mechanismreferences: mechanismreferencearray, 
                                                molecularfunctionreferences: molecularfunctionreferencearray 

                                            }
                                            total_output.push(references_output)
                                        //console.log(total_output)
                                            res.send(total_output)
                                        })
                                       //console.log(total_output)
                                      
                                    })
                                    //res.send(total_output)
                                }) 
                            }) 
                        })
                    })
                })
            })
        })
    })
})




router.get('/diseasedata/:diseasename', (req, res, next)=>{

    Disease.find({diseasename: new RegExp('^' +req.params.diseasename+ '$', 'i')}, function(err, result){
        if(err)
                {
                    return res.send(); //res.json(err);
                }
            res.send(result)
    })
});


router.post('/genedata/:genename', (req, res, next)=>{

    console.log("server" + req.params.genename)
//logic to search and retrieve the specific gene
    Gene.find({genealias: new RegExp('^' +req.params.genename+ '$', 'i')}, function(err,result)
        {
            if(err)
                {
                    return res.send(); //res.json(err);
                }
                
                //Gene.find({genename: "VAMP1"},function (err, result1){
                    //newres = result1;
                    
                    //console.log(newres[0].newfield)
                    
                //console.log(result);

              
                
                


                
            /*else
                {   console.log(result);
                    for (var genename in result) 
                        {
                            var item = result[genename];
                            var item1 = item.diseasename;
                            var item2 = item.genename;
                            var id = item._id;
                            var data = JSON.stringify(item1);
                            var data1 = JSON.stringify(item2);
                            

                            
                            var options = {
                                mode: 'text',
                                pythonPath: '/anaconda/bin/python3'
                            };
                                    
                            var pyshell = new PythonShell('./routes/newinteractor.py', options);
                            pyshell.send(data1);
                            pyshell.on('message', function (interactionmess) 
                                {
                                    interaction = JSON.parse(interactionmess);
                                    console.log("Newly created" + interaction);
                                }); 
                                    
                            pyshell.end(function (err) {
                                    //if (err) throw err
                                    //console.log('finished');
                            });
                            
                            if(item.diseasesummary == "")
                                {
                                    //console.log("Entered the loop");
                                    var options = {
                                    mode: 'text',
                                    pythonPath: '/anaconda/bin/python3'
                                    };
                                    var pyshell = new PythonShell('./routes/scrappy.py', options);
                                    pyshell.send(data);
                                    pyshell.on('message', function (message) 
                                        {
                                            //console.log(message);
                                            msg.push(message);
                                            //console.log(msg);
                                        });
                                    
                                    pyshell.end(function (err) {
                                    
                                    });
                                }

                                //console.log(msg);

                            if(item.prevalence == "")
                                {
                                    var options = {
                                    mode: 'text',
                                    pythonPath: '/anaconda/bin/python3'                     
                                    };
                                    
                                    var pyshell = new PythonShell('./routes/frequency.py', options);
                                    pyshell.send(data);
                                    pyshell.on('message', function (frequencymess) 
                                        {
                                            freq.push(frequencymess);
                                            //console.log(freq);
                                            
                                        }); 
                                    
                                    pyshell.end(function (err) {
                                    
                                    });
                                }   

                                //console.log(freq);
                                    
                            if(item.patternofinheritance == "")
                                {
                                    var options = {
                                    mode: 'text',
                                    pythonPath: '/anaconda/bin/python3'
                                    };
                                    
                                    var pyshell = new PythonShell('./routes/inheritancepattern.py', options);
                                    pyshell.send(data);
                                    pyshell.on('message', function (inheritancemess) 
                                        {
                                            
                                            inheritance.push(inheritancemess); 
                                            //console.log(inheritance)
                                        }); 
                                    
                                    pyshell.end(function (err) {
                                    
                                    });
                                    
                                }

                                //console.log(inheritance);
                            function databaseupdate()
                            
                            {
                            
                                if((freq.length > 0) &&  (inheritance.length > 0) && (msg.length > 0) )
                            {

                               

                            var myquery = { _id: id };
                            var newvalue1 = { $set: {prevalence: freq}};
                            Gene.updateOne(myquery, newvalue1, function(err, res)
                                {
                                    if (err) throw err;
                                    console.log("Updated the row")
                                    console.log(res);

                                });
                            
                            var newvalue2 = { $set: {patternofinheritance: inheritance}};
                            Gene.updateOne(myquery, newvalue2, function(err, res)
                                {
                                    if (err) throw err;
                                    console.log("Updated the row")
                                    console.log(res);
                                });
                            var newvalue3 = { $set: {diseasesummary: msg}};
                            Gene.updateOne(myquery, newvalue3, function(err, res)
                                {
                                    if (err) throw err;
                                    console.log("Updated the row")
                                    console.log(res);
                                });
                                    
                            }


                        }

                        databaseupdate();
                          
                        // for gene interaction
                       
                        
                        

                        
                            
                                
                                        
                            //result.push({"description": msg});
                            //result.push({"frequency": freq});
                            //result.push({"inheritance": inheritance});
                           //if(interaction !=  null) {
                                //result.push({"interaction": interaction});
                            //}
                            
                        

                        

                            msg = [];
                            freq = [];
                            inheritance = [];  
                               
                        }
                                                
                    }
                    
                    function sleep(milliseconds) {
                        var start = new Date().getTime();
                        for (var i = 0; i < 1e7; i++) {
                          if ((new Date().getTime() - start) > milliseconds){
                            break;
                          }
                        }
                      }
                      
        
                    setTimeout(function() {
                        databaseupdate();
                        Gene.find({genealias: req.params.genename}, function(err,newresult){
                            {
                                if(err)
                                    {
                                        return res.send(); //res.json(err);
                                    }
                                else{
                                    newresult.push({"interaction": interaction});
                                    result = newresult;
                                    res.send(result);
                                }
                        }
                    });
                            //res.send(result);
                        
                       
                        
                        }, 1000);*/
                        //result.push({"newfield" : newres.newfield})
            res.send(result);
                                       
        })
});

//Register 
router.post('/register', (req, res, next) => {
    console.log("name entered is "+req.body.name);
    let newUser = new User ({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });
  
    User.addUser(newUser, (err, user) => {

        console.log("new User's name is "+newUser.name);
      if(err) {
        res.json({success: false, msg: 'Failed to register user'});
      } else {

        res.json({success: true, msg: 'User registered'});
      }
    });
  });
  
  // Authenticate
  router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({success: false, msg: 'User not found'});
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              role: user.role
            }
          })
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });
                                
module.exports = router;
  


//calling api directly from node
  /*var options = {
    
        host: 'webservice.thebiogrid.org',
        path: '/interactions/?searchNames=true&geneList='+item2+'&taxId=9606&includeInteractors=true&includeInteractorInteractions=true&accesskey=0657b85ba2dfda0d2ca64c07e06c8c52&includeEvidence=true&start=0&max=10&format=json',
        method: 'GET'
    
    }
    
    http.request(options, function(res){
        
        //console.log('entered the loop');
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
            console.log(body);
        });
    
        res.on('end', function(err){
            //if (err) throw err;
            out = JSON.parse(body);
            //console.log(out);
        });
    }).end();   
*/
  

// Write data (remember to send only strings or numbers, otherwhise python wont understand)


 /*function output(msg) {
                                        result.push({["link"]: msg, ["name1"]: "Mano"}); 
                                        console.log(result);
                                        //res.json(result);
                                    }  */  //result.push({["link"]: message, ["name1"]: "Mano"}); 
                                        //console.log(result);
                            //result.push({["link"]: link, ["name1"]: "Mano"}); 
                            
                                        
                                        
                                        //console.log(result);
                                        //sleep.sleep(1);




                                        //interaction.push(interactionmess)
                                    // received a message sent from the Python script (a simple "print" statement) 
                                    //console.log("Hello" + message);
                                    //inheritance.push(inheritancemess);
                                    
                                    //ABL1 = {"Two-hybrid": ["Shafman T (1997)"], "Affinity Capture-Western": ["Chen G (1999)", "Chen G (1999)", "Kishi S (2001)", "Kishi S (2001)", "Shafman T (1997)", "Wang X (2011)"], "Evidence": 10}
                                    //interaction.push(ABL1);
                                    //interaction = interactionmess;
                                    //console.log(interaction)
                                    //console.log("Hey" + msg);