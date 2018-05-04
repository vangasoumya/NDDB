import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Gene} from '../gene';
import {GeneserviceService} from '../geneservice.service';
import {RouterState, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
import * as cytoscape from 'cytoscape';
import { query } from '@angular/core/src/animation/dsl';
import { ElementRef } from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import { AuthGuard } from "../guards/auth.guard";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

//import { JitCompiler } from '@angular/compiler';


@Component({
  selector: 'app-diseaseprofile', 
  templateUrl: './diseaseprofile.component.html',
  styleUrls: ['./diseaseprofile.component.css'],
  providers: [GeneserviceService, CacheService],
  
  
})



export class DiseaseprofileComponent implements OnInit 

{
public disease;
public finalgenealias;
public genediseasepair;
public displaygenediseasepair;

public outputdiseasealias;
public outputdiseasesummary;
public outputprevalence;
public outputmutation;
public outputinheritance;
public outputmechanism;
public outputmolecularfunction;
  
public output;

public genelist = [];

public updatedgenelist = [];

public evidencedropdown:number[];

public count = 0;


public updatedgenealias = [];
public diseasesummaryedited = [];
public prevalenceedited = [];
public mutationedited = [];
public inheritanceedited = [];
public mechanismedited = [];
public molecularfunctionedited = [];
public diseasealiasedited = [];

public finallinks = [];
public refcount = 1
public prevalencerefcount;


//public diseasesummarysources = {};
public diseasesummaryarray = [];
public prevalencearray = [];
public mutationarray = [];
public molecularfunctionarray = [];
public inheritancearray = [];
public mechanismarray = [];
public ppi;
public diseaseinfo;

public editedvalue;
public displaydiseasesummary = [];
public displayreferences = [];
public displayprevalence = [];

pathogenicgene : string;
pathogenicvariation : string;
pathogenictype : string;
pathogenicsignificance : string;
pathogenicsnp : string;
pathogenicassembly : string;
pathogeniclocation: string;

modifierorganism : string;
modifiermodifier : string;
modifiereffect : string;
modifierpmid : string;

genes: Gene[];
gene: Gene;
genename: string;
genealias: string;
diseasename: string;
name: string;

private cy;
constructor(private activeRoute:ActivatedRoute,private authguard:AuthGuard, private router:Router,private authService: AuthService, private geneServicing: GeneserviceService, private _cacheService: CacheService, private elementRef:ElementRef) 
{     
  
}

//@ViewChild('diseasealias') el:ElementRef;
//@ViewChild('diseasealias1') private tref: any;

ngAfterViewInit(){
console.log("first")
  
console.log($(".disease-alias").val())
console.log(this.elementRef)
  //this.tref._element.nativeElement.addEventListener('click', this.navigate.bind(this));
  //this.el.nativeElement.addEventListener('click', this.navigate.bind(this));


  //var x = document.getElementById("diseasealias");
  //x.querySelector("a").addEventListener('click', this.navigate.bind(this));
  
  //var container = document.querySelector("#diseasealais");
  //var matches = container.querySelectorAll("a").addEventListener('click', this.navigate.bind(this));

  setTimeout(function(){
   function navigate(){
 
      $('ul.tabs').tabs('select_tab', 'test-swipe-6');
   
  }
    //console.log(this.elementRef)
    let el1 = document.querySelector('.disease-alias');  
    console.log(el1)  //return an element with id='test'
    let matches1 = el1.querySelectorAll('a')
    console.log(matches1)
    for(var i =0; i<matches1.length; i++){
      matches1[i].addEventListener('click', navigate.bind(this))
    }

    let el2 = document.querySelector('.disease-summary');  
    console.log(el2)  //return an element with id='test'
    let matches2 = el2.querySelectorAll('a')
    console.log(matches2)
    for(var i =0; i<matches2.length; i++){
      matches2[i].addEventListener('click', navigate.bind(this))
    }

    let el3 = document.querySelector('.prevalence');  
    console.log(el3)  //return an element with id='test'
    let matches3 = el3.querySelectorAll('a')
    console.log(matches3)
    for(var i =0; i<matches3.length; i++){
      matches3[i].addEventListener('click', navigate.bind(this))
    }

    let el4 = document.querySelector('.mutation');  
    console.log(el4)  //return an element with id='test'
    let matches4 = el4.querySelectorAll('a')
    console.log(matches4)
    for(var i =0; i<matches4.length; i++){
      matches4[i].addEventListener('click', navigate.bind(this))
    }

    let el5 = document.querySelector('.inheritance');  
    console.log(el5)  //return an element with id='test'
    let matches5 = el5.querySelectorAll('a')
    console.log(matches5)
    for(var i =0; i<matches5.length; i++){
      matches5[i].addEventListener('click', navigate.bind(this))
    }

    let el6 = document.querySelector('.mechanism');  
    console.log(el6)  //return an element with id='test'
    let matches6 = el6.querySelectorAll('a')
    console.log(matches6)
    for(var i =0; i<matches6.length; i++){
      matches6[i].addEventListener('click', navigate.bind(this))
    }

    let el7 = document.querySelector('.molecular-function');  
    console.log(el7)  //return an element with id='test'
    let matches7 = el7.querySelectorAll('a')
    console.log(matches7)
    for(var i =0; i<matches7.length; i++){
      matches7[i].addEventListener('click', navigate.bind(this))
    }
  }, 1000);
  
  //console.log(matches[0].addEventListener('click', this.navigate.bind(this)))
  
 
  //var d1 = this.elementRef.nativeElement.querySelector(".disease-alias").addEventListener('click', this.navigate.bind(this));
  //var d2 = this.elementRef.nativeElement.querySelector(".disease-summary").addEventListener('click', this.navigate.bind(this));
  //if(d1){
    //d1.addEventListener('click', this.navigate.bind(this));
  //}
  //d1.querySelector("a").addEventListener('click', this.navigate.bind(this));
  //d1.insertAdjacentHTML('beforeend', "<a href='javascript:;'>Hello[1]</a>");
}


/*searchGene(gene) 
{
    this.geneServicing.searchGene(gene).subscribe(gene => this.gene = gene);  
}*/

/*getAllGenes() 
{
    this.geneServicing.getGenes().subscribe(genes => this.genes = genes);
}*/
replaceContent(pathogenic_snp):string{
  
  console.log("Text to link : "+pathogenic_snp);
  if(pathogenic_snp!= null && pathogenic_snp!= undefined){
    pathogenic_snp = pathogenic_snp.replace(pathogenic_snp,'<u><a href=\"https://www.ncbi.nlm.nih.gov/SNP/snp_ref.cgi?searchType=adhoc_search&type=rs&rs='+pathogenic_snp+'\" target=\"_blank\">'+pathogenic_snp+'</a></u>');
    console.log("after conversion Text to link : "+pathogenic_snp);
  }
  return pathogenic_snp;
}

replaceFlyContent(allele_symbol,allele_Fbal):string{
  
  // console.log("Text to link : "+allele_symbol);
  if(allele_Fbal!= null && allele_Fbal!= undefined){
    if(allele_symbol.indexOf("[")>0 && allele_symbol.indexOf("]")>0){
  var name = allele_symbol.substring(0, allele_symbol.indexOf("["));
  var sup_name = allele_symbol.substring(allele_symbol.indexOf("[")+1,allele_symbol.indexOf("]"));
  allele_symbol = allele_symbol.replace(allele_symbol,'<a href=\"http://flybase.org/reports/'+allele_Fbal+'\".html target=\"_blank\">'+name+sup_name.sup()+'</a>');
  console.log("after conversion Text to link : "+allele_symbol);
    }else{
      allele_symbol = allele_symbol.replace(allele_symbol,'<a href=\"http://flybase.org/reports/'+allele_Fbal+'\".html target=\"_blank\">'+allele_symbol+'</a>');
  
    }
  }
  return allele_symbol;
}

replaceMouseContent(mouse_allele_symbol,mouse_allele_id):string{
  if(mouse_allele_id!= null && mouse_allele_id!= undefined){
    if(mouse_allele_symbol.indexOf("<")>0 && mouse_allele_symbol.indexOf(">")>0){
  var name = mouse_allele_symbol.substring(0, mouse_allele_symbol.indexOf("<"));
  var sup_name = mouse_allele_symbol.substring(mouse_allele_symbol.indexOf("<")+1,mouse_allele_symbol.indexOf(">"));
  
  mouse_allele_symbol = mouse_allele_symbol.replace(mouse_allele_symbol,'<a href=\"http://www.informatics.jax.org/allele/'+mouse_allele_id+'\" target=\"_blank\">'+name+sup_name.sup()+'</a>');
    } 
    else{
      mouse_allele_symbol = mouse_allele_symbol.replace(mouse_allele_symbol,'<a href=\"http://www.informatics.jax.org/allele/'+mouse_allele_id+'\" target=\"_blank\">'+mouse_allele_symbol+'</a>');
   
    }
}
return mouse_allele_symbol;
}

placetab()
{

  
    $('ul.tabs').tabs('select_tab', 'swipe-100');
 
  
  
   
  
    //$('ul.tabs').tabs('select_tab', 'swipe-100');
    
}



newtab(){
  $('ul.tabs').tabs('select_tab', 'swipe-100');
}


addModifier()
{
  const newmodifier= {
    genesymbol: this.disease[0]["genesymbol"], 
    diseasename: this.disease[1]["diseasename"],
    organism : this.modifierorganism,
    modifier : this.modifiermodifier,
    modifiereffect : this.modifiereffect,
    pmid : this.modifierpmid
  }
  console.log(newmodifier)

  this.geneServicing.addModifierservice(newmodifier).subscribe(
    res =>{

      this.disease[2]["modifiers"] = res.modifier
      console.log(res)
    console.log("Modifier Added")
    })
    //location.reload()
}

addPathogenic()
{
  const newpathogenic= {
    genesymbol: this.disease[0]["genesymbol"], 
    diseasename: this.disease[1]["diseasename"],
    pathogenicvariation : this.pathogenicvariation,
    pathogenictype : this.pathogenictype,
    pathogenicsignificance : this.pathogenicsignificance,
    pathogenicsnp : this.pathogenicsnp,
    pathogenicassembly : this.pathogenicassembly,
    pathogeniclocation: this.pathogeniclocation

  }
  console.log(newpathogenic)

  this.geneServicing.addPathogenicservice(newpathogenic).subscribe(
    res =>{

      this.disease[1]["pathogenic"] = res.pathogenic
      console.log(res)
    console.log("Pathogenic Variant Added")
    })
    //loca

  }




 navigate(){
 
    $('ul.tabs').tabs('select_tab', 'test-swipe-6');
 
}





changeContent(newgenesymbol, newdiseasename, newsearchelement){

  const genesymbol1 = newgenesymbol
  const diseasename1 = newdiseasename
  const searchelement1 = newsearchelement
  console.log(genesymbol1)
  console.log(diseasename1)
  console.log(searchelement1)
  this.geneServicing.searchGeneDisease(genesymbol1, diseasename1).subscribe(
    res =>{

      this.disease = res;
      console.log(this.disease)
      for (var each of this.disease[0]["genealias"]){
          
        this.updatedgenealias.push(" "+each)
      }
      //console.log(this.updatedgenealias)
      this.finalgenealias = this.updatedgenealias


      /** Display of References and numbering accordingly */

      if(this.disease[3]["references"].length > 0){
        var dscount = 1
        this.displayreferences = []
        for (var eachrefvalue of this.disease[3]["references"]){
          eachrefvalue =  (dscount++)+". "+eachrefvalue
          this.displayreferences.push(eachrefvalue)
        }
        //console.log(this.displayreferences)
      }
      else{
        this.displayreferences = []
      }

      var diseasealiasoutput = []
      var diseasesummaryoutput = []
      var prevalenceoutput = []
      var mutationoutput = []
      var inheritanceoutput = []
      var mechanismoutput = []
      var molecularfunctionoutput = []


      referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
      referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
      referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
      referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
      referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
      referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
      referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)








      

      function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
      {
        var contentarray = []
        var refcount;
          if(referencearray.length > 0 && content.length >0){
            //console.log(this.displayreferences)
            var element = specificreferencearray[0]
            //console.log(element)
            var index = referencearray.indexOf(element);
            refcount= index+1
            //console.log(this.refcount)
          }
          
          var editedvalue = null;
          if(specificreferencearray.length>0){

          for(var j=0; j<specificreferencearray.length; j++){
            var find = specificreferencearray[j]
            var re1 = new RegExp("\{\{("+find+")\}\}", "g")
            //console.log(re1)
            for (var i=0; i<content.length; i++)
            {
            

              var replaced = content[i].search(re1) >= 0
              //console.log(replaced)
              //console.log(this.disease[1]["diseasesummary"][i])
              if(replaced){
                
                if(editedvalue!= null){

                  if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                    editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    contentarray.push(editedvalue)
                  }

                  else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                    //console.log("Entered the final loop")
                    //console.log(editedvalue)
                    //this.displaydiseasesummary.push(editedvalue)
                    editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    contentarray.push(editedvalue)
                  }
                  else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                    //console.log("Entered the final loop")
                    contentarray.push(editedvalue)
                    editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    contentarray.push(editedvalue)
                  }
                  //console.log("second loop entered")
                  else if((editedvalue.search(re1) >= 0) == true){
                    //console.log("Match found on edited value")
                    editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    //console.log(editedvalue)
                    //console.log(this.refcount)
                  }
                  else if(((editedvalue.search(re1) >= 0) == false)){
                    contentarray.push(editedvalue)
                    editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    //console.log(editedvalue)
                    //console.log(refcount)
                  }
                
                }
                else if (editedvalue == null && (specificreferencearray.length==1)){
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                }
                else if(editedvalue == null){
                  //console.log("First loop entered")
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log("First loop value")
                  //console.log(editedvalue)
                  //console.log(refcount)
                }
              
                  //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                  //this.refcount = this.refcount+1
                  
                
              
              }
              
            //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

            }
            
          }

          /*var find = "PMID: 2230"
          
          //var re = /\{\{(098776)\}\}/g
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          console.log(re1)
          for (var each of  this.disease[1]["diseasesummary"]){
            this.displaydiseasesummary.push(each.replace(re1, '[1]'))
          }*/
          if(identifier == "diseasealias"){
            var newdiseasealias = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
                l=l+1;
                //console.log(diseasealiasoutput)
                //finaldisease=finaldisease
              }
              else if(found == false){
                diseasealiasoutput.push(newdiseasealias[k])
              }
            }

            //console.log(diseasealiasoutput)
          }
          if(identifier == "diseasesummary"){
            var newdiseasesummary = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
                l=l+1;
                //console.log(diseasesummaryoutput)
                //finaldisease=finaldisease
              }
              else if(found == false){
                diseasesummaryoutput.push(newdiseasesummary[k])
              }
            }

            //console.log(diseasesummaryoutput)
          }
          if(identifier == "prevalence"){
            var newprevalence = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
                l=l+1;
                
                //finaldisease=finaldisease
              }
              else if(found == false){
                prevalenceoutput.push(newprevalence[k])
              }
            }

            //console.log(prevalenceoutput)
          }
          if(identifier == "mutation"){
            var newmutation = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
                l=l+1;
                //console.log(mutationoutput)
                //finaldisease=finaldisease
              }
              else if(found == false){
                mutationoutput.push(newmutation[k])
              }
            }

            //console.log(mutationoutput)
          }
          if(identifier == "inheritance"){
            var newinheritance = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
                l=l+1;
                //console.log(inheritanceoutput)
                //finaldisease=finaldisease
              }
              else if(found == false){
                inheritanceoutput.push(newinheritance[k])
              }
            }

            //console.log(inheritanceoutput)
          }
          if(identifier == "mechanism"){
            var newmechanism = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
                l=l+1;
                //console.log(mechanismoutput)
                //finaldisease=finaldisease
              }
              else if(found == false){
                mechanismoutput.push(newmechanism[k])
              }
            }

            //console.log(mechanismoutput)
          }
          if(identifier == "molecularfunction"){
            var newmolecularfunction = content
            var re2 = new RegExp("\{\{(.*?)\}\}", "g")
            var l =0
            //var finaldisease=[]
            for (var k=0; k<content.length; k++){
              var found = content[k].search(re2) >= 0
              if(found){
                //console.log(k)
                //console.log(this.displaydiseasesummary[l])
                //console.log(finaldisease)
                molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
                l=l+1;
                //console.log(molecularfunctionoutput)
                //finaldisease=finaldisease
              }
              else if(found == false){
                molecularfunctionoutput.push(newmolecularfunction[k])
              }
            }

            //console.log(molecularfunctionoutput)
          }
          //console.log(this.displaydiseasesummary)
          //console.log(this.disease[1]["diseasesummary"])
          

}
else if(specificreferencearray.length==0){
  if(identifier == "diseasealias"){
    diseasealiasoutput = content
  }
  if(identifier == "diseasesummary"){
    diseasesummaryoutput = content
  }
  if(identifier == "prevalence"){
    prevalenceoutput = content
  }
  if(identifier == "mutation"){
    mutationoutput = content
  }
  if(identifier == "inheritance"){
    inheritanceoutput = content
  }
  if(identifier == "mechanism"){
    mechanismoutput = content
  }
  if(identifier == "molecularfunction"){
    molecularfunctionoutput = content
  }
}
}

      //console.log("output")
      this.outputdiseasealias = diseasealiasoutput
      this.outputdiseasesummary = diseasesummaryoutput
      this.outputprevalence = prevalenceoutput
      this.outputmutation = mutationoutput
      this.outputinheritance =  inheritanceoutput
      this.outputmechanism = mechanismoutput
      this.outputmolecularfunction = molecularfunctionoutput


      var finalre = new RegExp("\\[(.*?)\\]", "g")
      $(".disease-alias").empty()
      for (var diseasealias of this.outputdiseasealias){
        if(diseasealias.match(finalre) != null){
          console.log(diseasealias.match(finalre))
          for (var each of diseasealias.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(diseasealias.match(re2))
            if(diseasealias.match(re2)!=null){
              for (var eachalias of diseasealias.match(re2)){
                console.log(eachalias)
                if(each==eachalias){
                  console.log("matched")
                  diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                  console.log(diseasealias)
                }
              }
              
            }
           
            console.log(diseasealias)
          }
        }
      $( ".disease-alias" ).append(diseasealias+'<br>')
      }

      $(".disease-summary").empty()
      for (var diseasesummary of this.outputdiseasesummary){
        if(diseasesummary.match(finalre) != null){
          console.log(diseasesummary.match(finalre))
          for (var each of diseasesummary.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(diseasesummary.match(re2))
            if(diseasesummary.match(re2)!=null){
              for (var eachdiseasesummary of diseasesummary.match(re2)){
                console.log(eachdiseasesummary)
                if(each==eachdiseasesummary){
                  console.log("matched")
                  diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                  console.log(diseasesummary)
                }
              }
              
            }
           
            console.log(diseasesummary)
          }
        }
      $( ".disease-summary" ).append(diseasesummary+'<br>')
      }

      $(".prevalence").empty()
      for (var prevalence of this.outputprevalence){
        if(prevalence.match(finalre) != null){
          console.log(prevalence.match(finalre))
          for (var each of prevalence.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(prevalence.match(re2))
            if(prevalence.match(re2)!=null){
              for (var eachprevalence of prevalence.match(re2)){
                console.log(eachprevalence)
                if(each==eachprevalence){
                  console.log("matched")
                  prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                  console.log(prevalence)
                }
              }
              
            }
           
            console.log(prevalence)
          }
        }
      $( ".prevalence" ).append(prevalence+'<br>')
      }

      $(".mutation").empty()
      for (var mutation of this.outputmutation){
        if(mutation.match(finalre) != null){
          console.log(mutation.match(finalre))
          for (var each of mutation.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(mutation.match(re2))
            if(mutation.match(re2)!=null){
              for (var eachmutation of mutation.match(re2)){
                console.log(eachmutation)
                if(each==eachmutation){
                  console.log("matched")
                  mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                  console.log(mutation)
                }
              }
              
            }
           
            console.log(mutation)
          }
        }
      $( ".mutation" ).append(mutation+'<br>')
      }

      $(".inheritance").empty()
      for (var inheritance of this.outputinheritance){
        if(inheritance.match(finalre) != null){
          console.log(inheritance.match(finalre))
          for (var each of inheritance.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(inheritance.match(re2))
            if(inheritance.match(re2)!=null){
              for (var eachinheritance of inheritance.match(re2)){
                console.log(eachinheritance)
                if(each==eachinheritance){
                  console.log("matched")
                  inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                  console.log(inheritance)
                }
              }
              
            }
           
            console.log(inheritance)
          }
        }
      $( ".inheritance" ).append(inheritance+'<br>')
      }

      $(".mechanism").empty()
      for (var mechanism of this.outputmechanism){
        if(mechanism.match(finalre) != null){
          console.log(mechanism.match(finalre))
          for (var each of mechanism.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(mechanism.match(re2))
            if(mechanism.match(re2)!=null){
              for (var eachmechanism of mechanism.match(re2)){
                console.log(eachmechanism)
                if(each==eachmechanism){
                  console.log("matched")
                  mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                  console.log(mechanism)
                }
              }
              
            }
           
            console.log(mechanism)
          }
        }
      $( ".mechanism" ).append(mechanism+'<br>')
      }

      $(".molecular-function").empty()
      for (var molecularfunction of this.outputmolecularfunction){
        if(molecularfunction.match(finalre) != null){
          console.log(molecularfunction.match(finalre))
          for (var each of molecularfunction.match(finalre)){
            console.log(each)
            var re2 = new RegExp("\\[([0-9]+)\\]", "g")
            console.log(re2)
            console.log(molecularfunction.match(re2))
            if(molecularfunction.match(re2)!=null){
              for (var eachmolecular of molecularfunction.match(re2)){
                console.log(eachmolecular)
                if(each==eachmolecular){
                  console.log("matched")
                  molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                  console.log(molecularfunction)
                }
              }
              
            }
           
            console.log(molecularfunction)
          }
        }
      $( ".molecular-function" ).append(molecularfunction+'<br>')
      }



      this.ngAfterViewInit()

    });

  this.displaygenediseasepair = {
    displaygenesymbol: genesymbol1,
    displaydiseasename: diseasename1
  }

  console.log(this.displaygenediseasepair)
  if(searchelement1=="genename")
  {
    this.geneServicing.genetodisease(genesymbol1).subscribe(
      res =>{

      this.genediseasepair = res;
      console.log(this.genediseasepair)
      

    });
  }
  else if(searchelement1=="diseasename")
  {
    this.geneServicing.genetodisease(diseasename1).subscribe(
      res =>{

      this.genediseasepair = res;
      console.log(this.genediseasepair)
      

    });
  }
}

/*getsources(text)
{

  const diseasename2 = this.activeRoute.snapshot.params['diseasename'];
  this.geneServicing.getdiseaseinfo(diseasename2).subscribe(
    res =>{

    this.diseaseinfo = res;
    //console.log(this.diseaseinfo)
    
    if(text == "diseasesummary")
    {
      console.log("Went in sources")
    
    
      for (const genes of this.diseaseinfo)
    {
  
      //console.log(genes)
       //for (var each in genes){
         //console.log(genes[each])
       //}
  
        //console.log("newgenes" + newgenes[0])
        //console.log(newgenes.diseasesummarysource[0])
        for(var i=0; i<3; i++ )
        {
          //console.log(genes["text"])
          $('#diseasesummarytext'+(i+1)).val(genes.diseasesummarysource[i].text)  
          $('#diseasesummarylink'+(i+1)).val(genes.diseasesummarysource[i].link) 
          
        }
      
    }
    }

    if(text == "mechanism")
    {
      for (const genes of this.diseaseinfo)
      {
       
          for(var i=0; i<3; i++ )
          {
            $('#mechanismtext'+(i+1)).val(genes.mechanismsource[i].text)  
            $('#mechanismlink'+(i+1)).val(genes.mechanismsource[i].link) 
          }
        
      }
    }

    if(text == "prevalence")
  {
    for (const genes of this.diseaseinfo)
    {
     
        for(var i=0; i<3; i++ )
        {
          $('#prevalencetext'+(i+1)).val(genes.prevalencesource[i].text)  
          $('#prevalencelink'+(i+1)).val(genes.prevalencesource[i].link) 
        }
      
    }
  }

  

  if(text == "inheritance")
  {
    for (const genes of this.diseaseinfo)
    {
     
        for(var i=0; i<3; i++ )
        {
          $('#inheritancetext'+(i+1)).val(genes.inheritancesource[i].text)  
          $('#inheritancelink'+(i+1)).val(genes.inheritancesource[i].link) 
        }
      
    }
  }

});


const genename2 = this.activeRoute.snapshot.params['genename'];
  this.geneServicing.searchGene(genename2).subscribe(
    res =>{

    this.ppi = res;
    console.log(this.ppi)

  if(text == "molecularfunction")
  {
    
    for (const genes of this.ppi)
    {
     console.log(genes)
        for(var i=0; i<3; i++ )
        {
          $('#molecularfunctiontext'+(i+1)).val(genes.molecularfunctionsource[i].text)  
          $('#molecularfunctionlink'+(i+1)).val(genes.molecularfunctionsource[i].link) 
        }
      
    }
  }

  if(text == "mutation")
  {
    for (const genes of this.ppi)
    {
     
        for(var i=0; i<3; i++ )
        {
          $('#mutationtext'+(i+1)).val(genes.mutationsource[i].text)  
          $('#mutationlink'+(i+1)).val(genes.mutationsource[i].link) 
        }
      
    }
  }
 
})
 
  

  
  
}


savesources(text)
{
  if(text == "diseasesummary"){

  
  this.diseasesummaryarray = []
  for (var i=1; i<=3; i++ ){
    var diseasesummarysources = {}
    diseasesummarysources["text"] = $('#diseasesummarytext'+i).val()
    diseasesummarysources["link"] = $('#diseasesummarylink'+i).val()
    this.diseasesummaryarray.push(diseasesummarysources)
  }
 
  console.log(this.diseasesummaryarray)
  for (const genes of this.disease)
  {
    genes.diseasesummarysource = this.diseasesummaryarray
    genes.editedfield="diseasesummarysource"
  }

}

if(text == "prevalence")
{
  this.prevalencearray = []
  for (var i=1; i<=3; i++ ){
    var prevalencesources = {}
    prevalencesources["text"] = $('#prevalencetext'+i).val()
    prevalencesources["link"] = $('#prevalencelink'+i).val()
    this.prevalencearray.push(prevalencesources)
  }
 
  //console.log(this.diseasesummaryarray)
  for (const genes of this.disease)
  {
    genes.prevalencesource = this.prevalencearray
    genes.editedfield="prevalencesource"
  }
}

if(text == "mutation"){

  
  this.mutationarray = []
  for (var i=1; i<=3; i++ ){
    var mutationsources = {}
    mutationsources["text"] = $('#mutationtext'+i).val()
    mutationsources["link"] = $('#mutationlink'+i).val()
    this.mutationarray.push(mutationsources)
  }
 
  console.log(this.mutationarray)
  for (const genes of this.disease)
  {
    genes.mutationsource = this.mutationarray
    genes.editedfield="mutationsource"
  }

}

if(text == "molecularfunction"){

  
  this.molecularfunctionarray = []
  for (var i=1; i<=3; i++ ){
    var molecularfunctionsources = {}
    molecularfunctionsources["text"] = $('#molecularfunctiontext'+i).val()
    molecularfunctionsources["link"] = $('#molecularfunctionlink'+i).val()
    this.molecularfunctionarray.push(molecularfunctionsources)
  }
 
  console.log(this.molecularfunctionarray)
  for (const genes of this.disease)
  {
    genes.molecularfunctionsource = this.molecularfunctionarray
    genes.editedfield="molecularfunctionsource"
  }

}

if(text == "inheritance"){

  
  this.inheritancearray = []
  for (var i=1; i<=3; i++ ){
    var inheritancesources = {}
    inheritancesources["text"] = $('#inheritancetext'+i).val()
    inheritancesources["link"] = $('#inheritancelink'+i).val()
    this.inheritancearray.push(inheritancesources)
  }
 
  console.log(this.inheritancearray)
  for (const genes of this.disease)
  {
    genes.inheritancesource = this.inheritancearray
    genes.editedfield="inheritancesource"
  }

}

if(text == "mechanism"){

  
  this.mechanismarray = []
  for (var i=1; i<=3; i++ ){
    var mechanismsources = {}
    mechanismsources["text"] = $('#mechanismtext'+i).val()
    mechanismsources["link"] = $('#mechanismlink'+i).val()
    this.mechanismarray.push(mechanismsources)
  }
 
  console.log(this.mechanismarray)
  for (const genes of this.disease)
  {
    genes.mechanismsource = this.mechanismarray
    genes.editedfield="mechanismsource"
  }

}
  
  this.geneServicing.updateGene(this.disease).subscribe(res => this.disease = res);
}


displaysources(newtext)
{
  console.log(newtext)
  const diseasename2 = this.activeRoute.snapshot.params['diseasename'];
  this.geneServicing.getdiseaseinfo(diseasename2).subscribe(
    res =>{

      this.diseaseinfo = res;
      console.log(this.diseaseinfo)
      
  console.log(newtext)
  if(newtext == 'diseasesummary')
  {
    console.log("Went in dis")
    for (const genes of this.diseaseinfo){
      for(var i=0; i<3; i++ ) {
        var ab = genes.diseasesummarysource[i].text
        console.log(ab)
        var text = genes.diseasesummarysource[i].link
        console.log(text)
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1=text.replace(exp, "<a href='$1'>"+ab+"</a>");
        var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        $("#diseasesummaryconverted_url"+(i+1)).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>'));
      }
    }
  }

  if(newtext == 'prevalence')
  {
    for (const genes of this.diseaseinfo){
      for(var i=0; i<3; i++ ) {
        var ab = genes.prevalencesource[i].text
        console.log(ab)
        var text = genes.prevalencesource[i].link
        console.log(text)
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1=text.replace(exp, "<a href='$1'>"+ab+"</a>");
        var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        $("#prevalenceconverted_url"+(i+1)).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>'));
      }
    }
  }

  if(newtext == 'mechanism')
  {
    for (const genes of this.diseaseinfo){
      for(var i=0; i<3; i++ ) {
        var ab = genes.mechanismsource[i].text
        console.log(ab)
        var text = genes.mechanismsource[i].link
        console.log(text)
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1=text.replace(exp, "<a href='$1'>"+ab+"</a>");
        var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        $("#mechanismconverted_url"+(i+1)).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>'));
      }
    }
  }

  if(newtext == 'inheritance')
  {
    for (const genes of this.diseaseinfo){
      for(var i=0; i<3; i++ ) {
        var ab = genes.inheritancesource[i].text
        console.log(ab)
        var text = genes.inheritancesource[i].link
        console.log(text)
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1=text.replace(exp, "<a href='$1'>"+ab+"</a>");
        var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        $("#inheritanceconverted_url"+(i+1)).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>'));
      }
    }
  }


})


const genename2 = this.activeRoute.snapshot.params['genename'];
  this.geneServicing.searchGene(genename2).subscribe(
    res =>{

      this.ppi = res;


  if(newtext == 'molecularfunction')
  {
    for (const genes of this.ppi){
      for(var i=0; i<3; i++ ) {
        var ab = genes.molecularfunctionsource[i].text
        console.log(ab)
        var text = genes.molecularfunctionsource[i].link
        console.log(text)
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1=text.replace(exp, "<a href='$1'>"+ab+"</a>");
        var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        $("#molecularfunctionconverted_url"+(i+1)).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>'));
      }
    }
  }

  if(newtext == 'mutation')
  {
    for (const genes of this.ppi){
      for(var i=0; i<3; i++ ) {
        var ab = genes.mutationsource[i].text
        console.log(ab)
        var text = genes.mutationsource[i].link
        console.log(text)
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var text1=text.replace(exp, "<a href='$1'>"+ab+"</a>");
        var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        $("#mutationconverted_url"+(i+1)).html(text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>'));
      }
    }
  }

})


    
}*/


savetext(text,text1)
{
  this.displaydiseasesummary = []
  this.displayprevalence = []
  console.log(text)

  console.log(this.disease)
  //console.log("savetext" + text);
  //console.log("savetet2" + text1);

 if(text1 =='diseasesummary'){
  console.log("Again went in disease")
  this.diseasesummaryedited.push(text)
  console.log(this.diseasesummaryedited)
  /*for (let genes of this.disease[1])
  {
    genes.diseasesummary = this.diseasesummaryedited
    genes.editedfield = 'diseasesummary'
  }*/
  this.disease[1]["diseasesummary"] = this.diseasesummaryedited
  this.disease[1]["editedfield"] = "diseasesummary"
  //console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[1]["diseasesummary"] = this.editedvalue.diseasesummary
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["diseasesummaryreferences"] = this.editedvalue.diseasesummaryreferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    console.log(this.disease[3]["diseasesummaryreferences"])
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

        /*var find = "PMID: 2230"
        
        //var re = /\{\{(098776)\}\}/g
        var re1 = new RegExp("\{\{("+find+")\}\}", "g")
        console.log(re1)
        for (var each of  this.disease[1]["diseasesummary"]){
          this.displaydiseasesummary.push(each.replace(re1, '[1]'))
        }*/
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(output)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput
    /*for (var each of this.disease[1]["diseasesummary"]){
      //for (var every of this.disease[3]["references"]){
        //console.log(each.replace(/\{\{(.*?)\}\}/g))
      //}
      //console.log(each.match(/\{\{(.*?)\}\}/g) )
      console.log(each.match(/[^{{\]]+(?=}})/g))
      if(each.match(/[^{{\]]+(?=}})/g) != null){
        for (var eachmatch of each.match(/[^{{\]]+(?=}})/g)){
          console.log(eachmatch)
        }
      }

      
      
      //this.displaydiseasesummary.push(each.replace(/\{\{(.*?)\}\}/g, "["+ dscount++ +"]"))
    }*/
   
    
    var finalre = new RegExp("\\[(.*?)\\]", "g")
    $(".disease-alias").empty()
    for (var diseasealias of this.outputdiseasealias){
      if(diseasealias.match(finalre) != null){
        console.log(diseasealias.match(finalre))
        for (var each of diseasealias.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(diseasealias.match(re2))
          if(diseasealias.match(re2)!=null){
            for (var eachalias of diseasealias.match(re2)){
              console.log(eachalias)
              if(each==eachalias){
                console.log("matched")
                diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                console.log(diseasealias)
              }
            }
            
          }
         
          console.log(diseasealias)
        }
      }
    $( ".disease-alias" ).append(diseasealias+'<br>')
    }

    $(".disease-summary").empty()
    for (var diseasesummary of this.outputdiseasesummary){
      if(diseasesummary.match(finalre) != null){
        console.log(diseasesummary.match(finalre))
        for (var each of diseasesummary.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(diseasesummary.match(re2))
          if(diseasesummary.match(re2)!=null){
            for (var eachdiseasesummary of diseasesummary.match(re2)){
              console.log(eachdiseasesummary)
              if(each==eachdiseasesummary){
                console.log("matched")
                diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                console.log(diseasesummary)
              }
            }
            
          }
         
          console.log(diseasesummary)
        }
      }
    $( ".disease-summary" ).append(diseasesummary+'<br>')
    }

    $(".prevalence").empty()
    for (var prevalence of this.outputprevalence){
      if(prevalence.match(finalre) != null){
        console.log(prevalence.match(finalre))
        for (var each of prevalence.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(prevalence.match(re2))
          if(prevalence.match(re2)!=null){
            for (var eachprevalence of prevalence.match(re2)){
              console.log(eachprevalence)
              if(each==eachprevalence){
                console.log("matched")
                prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                console.log(prevalence)
              }
            }
            
          }
         
          console.log(prevalence)
        }
      }
    $( ".prevalence" ).append(prevalence+'<br>')
    }

    $(".mutation").empty()
    for (var mutation of this.outputmutation){
      if(mutation.match(finalre) != null){
        console.log(mutation.match(finalre))
        for (var each of mutation.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(mutation.match(re2))
          if(mutation.match(re2)!=null){
            for (var eachmutation of mutation.match(re2)){
              console.log(eachmutation)
              if(each==eachmutation){
                console.log("matched")
                mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                console.log(mutation)
              }
            }
            
          }
         
          console.log(mutation)
        }
      }
    $( ".mutation" ).append(mutation+'<br>')
    }

    $(".inheritance").empty()
    for (var inheritance of this.outputinheritance){
      if(inheritance.match(finalre) != null){
        console.log(inheritance.match(finalre))
        for (var each of inheritance.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(inheritance.match(re2))
          if(inheritance.match(re2)!=null){
            for (var eachinheritance of inheritance.match(re2)){
              console.log(eachinheritance)
              if(each==eachinheritance){
                console.log("matched")
                inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                console.log(inheritance)
              }
            }
            
          }
         
          console.log(inheritance)
        }
      }
    $( ".inheritance" ).append(inheritance+'<br>')
    }

    $(".mechanism").empty()
    for (var mechanism of this.outputmechanism){
      if(mechanism.match(finalre) != null){
        console.log(mechanism.match(finalre))
        for (var each of mechanism.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(mechanism.match(re2))
          if(mechanism.match(re2)!=null){
            for (var eachmechanism of mechanism.match(re2)){
              console.log(eachmechanism)
              if(each==eachmechanism){
                console.log("matched")
                mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                console.log(mechanism)
              }
            }
            
          }
         
          console.log(mechanism)
        }
      }
    $( ".mechanism" ).append(mechanism+'<br>')
    }

    $(".molecular-function").empty()
    for (var molecularfunction of this.outputmolecularfunction){
      if(molecularfunction.match(finalre) != null){
        console.log(molecularfunction.match(finalre))
        for (var each of molecularfunction.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(molecularfunction.match(re2))
          if(molecularfunction.match(re2)!=null){
            for (var eachmolecular of molecularfunction.match(re2)){
              console.log(eachmolecular)
              if(each==eachmolecular){
                console.log("matched")
                molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                console.log(molecularfunction)
              }
            }
            
          }
         
          console.log(molecularfunction)
        }
      }
    $( ".molecular-function" ).append(molecularfunction+'<br>')
    }


    this.ngAfterViewInit()
    //console.log(this.displaydiseasesummary)
  });
  //console.log("Before")
  
  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

  //location.reload();
 } 
 
 if(text1 =='prevalence'){
  console.log("Again went in prevalence")
  this.prevalenceedited.push(text)
  /*for (const genes of this.disease)
  {
    genes.prevalence = this.prevalenceedited
    genes.editedfield = 'prevalence'
  }*/
  this.disease[1]["prevalence"] = this.prevalenceedited
  this.disease[1]["editedfield"] = "prevalence"
  console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

     

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[1]["prevalence"] = this.editedvalue.prevalence
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["prevalencereferences"] = this.editedvalue.prevalencereferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    console.log(this.disease[3]["diseasesummaryreferences"])
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

        /*var find = "PMID: 2230"
        
        //var re = /\{\{(098776)\}\}/g
        var re1 = new RegExp("\{\{("+find+")\}\}", "g")
        console.log(re1)
        for (var each of  this.disease[1]["diseasesummary"]){
          this.displaydiseasesummary.push(each.replace(re1, '[1]'))
        }*/
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(prevalenceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput

    /*for (var each of this.disease[1]["diseasesummary"]){
      //for (var every of this.disease[3]["references"]){
        //console.log(each.replace(/\{\{(.*?)\}\}/g))
      //}
      //console.log(each.match(/\{\{(.*?)\}\}/g) )
      console.log(each.match(/[^{{\]]+(?=}})/g))
      if(each.match(/[^{{\]]+(?=}})/g) != null){
        for (var eachmatch of each.match(/[^{{\]]+(?=}})/g)){
          console.log(eachmatch)
        }
      }
      
      //this.displaydiseasesummary.push(each.replace(/\{\{(.*?)\}\}/g, "["+ dscount++ +"]"))
    }*/
    

    var finalre = new RegExp("\\[(.*?)\\]", "g")
        $(".disease-alias").empty()
        for (var diseasealias of this.outputdiseasealias){
          if(diseasealias.match(finalre) != null){
            console.log(diseasealias.match(finalre))
            for (var each of diseasealias.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasealias.match(re2))
              if(diseasealias.match(re2)!=null){
                for (var eachalias of diseasealias.match(re2)){
                  console.log(eachalias)
                  if(each==eachalias){
                    console.log("matched")
                    diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasealias)
                  }
                }
                
              }
             
              console.log(diseasealias)
            }
          }
        $( ".disease-alias" ).append(diseasealias+'<br>')
        }

        $(".disease-summary").empty()
        for (var diseasesummary of this.outputdiseasesummary){
          if(diseasesummary.match(finalre) != null){
            console.log(diseasesummary.match(finalre))
            for (var each of diseasesummary.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasesummary.match(re2))
              if(diseasesummary.match(re2)!=null){
                for (var eachdiseasesummary of diseasesummary.match(re2)){
                  console.log(eachdiseasesummary)
                  if(each==eachdiseasesummary){
                    console.log("matched")
                    diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasesummary)
                  }
                }
                
              }
             
              console.log(diseasesummary)
            }
          }
        $( ".disease-summary" ).append(diseasesummary+'<br>')
        }

        $(".prevalence").empty()
        for (var prevalence of this.outputprevalence){
          if(prevalence.match(finalre) != null){
            console.log(prevalence.match(finalre))
            for (var each of prevalence.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(prevalence.match(re2))
              if(prevalence.match(re2)!=null){
                for (var eachprevalence of prevalence.match(re2)){
                  console.log(eachprevalence)
                  if(each==eachprevalence){
                    console.log("matched")
                    prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                    console.log(prevalence)
                  }
                }
                
              }
             
              console.log(prevalence)
            }
          }
        $( ".prevalence" ).append(prevalence+'<br>')
        }

        $(".mutation").empty()
        for (var mutation of this.outputmutation){
          if(mutation.match(finalre) != null){
            console.log(mutation.match(finalre))
            for (var each of mutation.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mutation.match(re2))
              if(mutation.match(re2)!=null){
                for (var eachmutation of mutation.match(re2)){
                  console.log(eachmutation)
                  if(each==eachmutation){
                    console.log("matched")
                    mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mutation)
                  }
                }
                
              }
             
              console.log(mutation)
            }
          }
        $( ".mutation" ).append(mutation+'<br>')
        }

        $(".inheritance").empty()
        for (var inheritance of this.outputinheritance){
          if(inheritance.match(finalre) != null){
            console.log(inheritance.match(finalre))
            for (var each of inheritance.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(inheritance.match(re2))
              if(inheritance.match(re2)!=null){
                for (var eachinheritance of inheritance.match(re2)){
                  console.log(eachinheritance)
                  if(each==eachinheritance){
                    console.log("matched")
                    inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                    console.log(inheritance)
                  }
                }
                
              }
             
              console.log(inheritance)
            }
          }
        $( ".inheritance" ).append(inheritance+'<br>')
        }

        $(".mechanism").empty()
        for (var mechanism of this.outputmechanism){
          if(mechanism.match(finalre) != null){
            console.log(mechanism.match(finalre))
            for (var each of mechanism.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mechanism.match(re2))
              if(mechanism.match(re2)!=null){
                for (var eachmechanism of mechanism.match(re2)){
                  console.log(eachmechanism)
                  if(each==eachmechanism){
                    console.log("matched")
                    mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mechanism)
                  }
                }
                
              }
             
              console.log(mechanism)
            }
          }
        $( ".mechanism" ).append(mechanism+'<br>')
        }

        $(".molecular-function").empty()
        for (var molecularfunction of this.outputmolecularfunction){
          if(molecularfunction.match(finalre) != null){
            console.log(molecularfunction.match(finalre))
            for (var each of molecularfunction.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(molecularfunction.match(re2))
              if(molecularfunction.match(re2)!=null){
                for (var eachmolecular of molecularfunction.match(re2)){
                  console.log(eachmolecular)
                  if(each==eachmolecular){
                    console.log("matched")
                    molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                    console.log(molecularfunction)
                  }
                }
                
              }
             
              console.log(molecularfunction)
            }
          }
        $( ".molecular-function" ).append(molecularfunction+'<br>')
        }


    this.ngAfterViewInit()

    //console.log(this.displaydiseasesummary)
  });












  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

 }

 if(text1 =='diseasealias'){
  console.log("Again went in diseasealias")
  console.log(text)
  this.diseasealiasedited.push(text)
  console.log(this.diseasealiasedited)
  this.disease[1]["diseasealias"] = this.diseasealiasedited
  this.disease[1]["editedfield"] = "diseasealias"
  console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

     

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[1]["diseasealias"] = this.editedvalue.diseasealias
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["diseasealiasreferences"] = this.editedvalue.diseasealiasreferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    console.log(this.disease[3]["diseasesummaryreferences"])
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

        /*var find = "PMID: 2230"
        
        //var re = /\{\{(098776)\}\}/g
        var re1 = new RegExp("\{\{("+find+")\}\}", "g")
        console.log(re1)
        for (var each of  this.disease[1]["diseasesummary"]){
          this.displaydiseasesummary.push(each.replace(re1, '[1]'))
        }*/
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(prevalenceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput

    /*for (var each of this.disease[1]["diseasesummary"]){
      //for (var every of this.disease[3]["references"]){
        //console.log(each.replace(/\{\{(.*?)\}\}/g))
      //}
      //console.log(each.match(/\{\{(.*?)\}\}/g) )
      console.log(each.match(/[^{{\]]+(?=}})/g))
      if(each.match(/[^{{\]]+(?=}})/g) != null){
        for (var eachmatch of each.match(/[^{{\]]+(?=}})/g)){
          console.log(eachmatch)
        }
      }
      
      //this.displaydiseasesummary.push(each.replace(/\{\{(.*?)\}\}/g, "["+ dscount++ +"]"))
    }*/
    

    var finalre = new RegExp("\\[(.*?)\\]", "g")
        $(".disease-alias").empty()
        for (var diseasealias of this.outputdiseasealias){
          if(diseasealias.match(finalre) != null){
            console.log(diseasealias.match(finalre))
            for (var each of diseasealias.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasealias.match(re2))
              if(diseasealias.match(re2)!=null){
                for (var eachalias of diseasealias.match(re2)){
                  console.log(eachalias)
                  if(each==eachalias){
                    console.log("matched")
                    diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasealias)
                  }
                }
                
              }
             
              console.log(diseasealias)
            }
          }
        $( ".disease-alias" ).append(diseasealias+'<br>')
        }

        $(".disease-summary").empty()
        for (var diseasesummary of this.outputdiseasesummary){
          if(diseasesummary.match(finalre) != null){
            console.log(diseasesummary.match(finalre))
            for (var each of diseasesummary.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasesummary.match(re2))
              if(diseasesummary.match(re2)!=null){
                for (var eachdiseasesummary of diseasesummary.match(re2)){
                  console.log(eachdiseasesummary)
                  if(each==eachdiseasesummary){
                    console.log("matched")
                    diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasesummary)
                  }
                }
                
              }
             
              console.log(diseasesummary)
            }
          }
        $( ".disease-summary" ).append(diseasesummary+'<br>')
        }

        $(".prevalence").empty()
        for (var prevalence of this.outputprevalence){
          if(prevalence.match(finalre) != null){
            console.log(prevalence.match(finalre))
            for (var each of prevalence.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(prevalence.match(re2))
              if(prevalence.match(re2)!=null){
                for (var eachprevalence of prevalence.match(re2)){
                  console.log(eachprevalence)
                  if(each==eachprevalence){
                    console.log("matched")
                    prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                    console.log(prevalence)
                  }
                }
                
              }
             
              console.log(prevalence)
            }
          }
        $( ".prevalence" ).append(prevalence+'<br>')
        }

        $(".mutation").empty()
        for (var mutation of this.outputmutation){
          if(mutation.match(finalre) != null){
            console.log(mutation.match(finalre))
            for (var each of mutation.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mutation.match(re2))
              if(mutation.match(re2)!=null){
                for (var eachmutation of mutation.match(re2)){
                  console.log(eachmutation)
                  if(each==eachmutation){
                    console.log("matched")
                    mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mutation)
                  }
                }
                
              }
             
              console.log(mutation)
            }
          }
        $( ".mutation" ).append(mutation+'<br>')
        }

        $(".inheritance").empty()
        for (var inheritance of this.outputinheritance){
          if(inheritance.match(finalre) != null){
            console.log(inheritance.match(finalre))
            for (var each of inheritance.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(inheritance.match(re2))
              if(inheritance.match(re2)!=null){
                for (var eachinheritance of inheritance.match(re2)){
                  console.log(eachinheritance)
                  if(each==eachinheritance){
                    console.log("matched")
                    inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                    console.log(inheritance)
                  }
                }
                
              }
             
              console.log(inheritance)
            }
          }
        $( ".inheritance" ).append(inheritance+'<br>')
        }

        $(".mechanism").empty()
        for (var mechanism of this.outputmechanism){
          if(mechanism.match(finalre) != null){
            console.log(mechanism.match(finalre))
            for (var each of mechanism.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mechanism.match(re2))
              if(mechanism.match(re2)!=null){
                for (var eachmechanism of mechanism.match(re2)){
                  console.log(eachmechanism)
                  if(each==eachmechanism){
                    console.log("matched")
                    mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mechanism)
                  }
                }
                
              }
             
              console.log(mechanism)
            }
          }
        $( ".mechanism" ).append(mechanism+'<br>')
        }

        $(".molecular-function").empty()
        for (var molecularfunction of this.outputmolecularfunction){
          if(molecularfunction.match(finalre) != null){
            console.log(molecularfunction.match(finalre))
            for (var each of molecularfunction.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(molecularfunction.match(re2))
              if(molecularfunction.match(re2)!=null){
                for (var eachmolecular of molecularfunction.match(re2)){
                  console.log(eachmolecular)
                  if(each==eachmolecular){
                    console.log("matched")
                    molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                    console.log(molecularfunction)
                  }
                }
                
              }
             
              console.log(molecularfunction)
            }
          }
        $( ".molecular-function" ).append(molecularfunction+'<br>')
        }

    this.ngAfterViewInit()
    //console.log(this.displaydiseasesummary)
  });












  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

 }


 if(text1 =='inheritance'){
  console.log("Again went in inheritance")
  this.inheritanceedited.push(text)
  this.disease[1]["inheritance"] = this.inheritanceedited
  this.disease[1]["editedfield"] = "inheritance"
  console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

     

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[1]["inheritance"] = this.editedvalue.inheritance
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["inheritancereferences"] = this.editedvalue.inheritancereferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

        /*var find = "PMID: 2230"
        
        //var re = /\{\{(098776)\}\}/g
        var re1 = new RegExp("\{\{("+find+")\}\}", "g")
        console.log(re1)
        for (var each of  this.disease[1]["diseasesummary"]){
          this.displaydiseasesummary.push(each.replace(re1, '[1]'))
        }*/
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(prevalenceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput

   
    
        var finalre = new RegExp("\\[(.*?)\\]", "g")
        $(".disease-alias").empty()
        for (var diseasealias of this.outputdiseasealias){
          if(diseasealias.match(finalre) != null){
            console.log(diseasealias.match(finalre))
            for (var each of diseasealias.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasealias.match(re2))
              if(diseasealias.match(re2)!=null){
                for (var eachalias of diseasealias.match(re2)){
                  console.log(eachalias)
                  if(each==eachalias){
                    console.log("matched")
                    diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasealias)
                  }
                }
                
              }
             
              console.log(diseasealias)
            }
          }
        $( ".disease-alias" ).append(diseasealias+'<br>')
        }

        $(".disease-summary").empty()
        for (var diseasesummary of this.outputdiseasesummary){
          if(diseasesummary.match(finalre) != null){
            console.log(diseasesummary.match(finalre))
            for (var each of diseasesummary.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasesummary.match(re2))
              if(diseasesummary.match(re2)!=null){
                for (var eachdiseasesummary of diseasesummary.match(re2)){
                  console.log(eachdiseasesummary)
                  if(each==eachdiseasesummary){
                    console.log("matched")
                    diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasesummary)
                  }
                }
                
              }
             
              console.log(diseasesummary)
            }
          }
        $( ".disease-summary" ).append(diseasesummary+'<br>')
        }

        $(".prevalence").empty()
        for (var prevalence of this.outputprevalence){
          if(prevalence.match(finalre) != null){
            console.log(prevalence.match(finalre))
            for (var each of prevalence.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(prevalence.match(re2))
              if(prevalence.match(re2)!=null){
                for (var eachprevalence of prevalence.match(re2)){
                  console.log(eachprevalence)
                  if(each==eachprevalence){
                    console.log("matched")
                    prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                    console.log(prevalence)
                  }
                }
                
              }
             
              console.log(prevalence)
            }
          }
        $( ".prevalence" ).append(prevalence+'<br>')
        }

        $(".mutation").empty()
        for (var mutation of this.outputmutation){
          if(mutation.match(finalre) != null){
            console.log(mutation.match(finalre))
            for (var each of mutation.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mutation.match(re2))
              if(mutation.match(re2)!=null){
                for (var eachmutation of mutation.match(re2)){
                  console.log(eachmutation)
                  if(each==eachmutation){
                    console.log("matched")
                    mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mutation)
                  }
                }
                
              }
             
              console.log(mutation)
            }
          }
        $( ".mutation" ).append(mutation+'<br>')
        }

        $(".inheritance").empty()
        for (var inheritance of this.outputinheritance){
          if(inheritance.match(finalre) != null){
            console.log(inheritance.match(finalre))
            for (var each of inheritance.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(inheritance.match(re2))
              if(inheritance.match(re2)!=null){
                for (var eachinheritance of inheritance.match(re2)){
                  console.log(eachinheritance)
                  if(each==eachinheritance){
                    console.log("matched")
                    inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                    console.log(inheritance)
                  }
                }
                
              }
             
              console.log(inheritance)
            }
          }
        $( ".inheritance" ).append(inheritance+'<br>')
        }

        $(".mechanism").empty()
        for (var mechanism of this.outputmechanism){
          if(mechanism.match(finalre) != null){
            console.log(mechanism.match(finalre))
            for (var each of mechanism.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mechanism.match(re2))
              if(mechanism.match(re2)!=null){
                for (var eachmechanism of mechanism.match(re2)){
                  console.log(eachmechanism)
                  if(each==eachmechanism){
                    console.log("matched")
                    mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mechanism)
                  }
                }
                
              }
             
              console.log(mechanism)
            }
          }
        $( ".mechanism" ).append(mechanism+'<br>')
        }

        $(".molecular-function").empty()
        for (var molecularfunction of this.outputmolecularfunction){
          if(molecularfunction.match(finalre) != null){
            console.log(molecularfunction.match(finalre))
            for (var each of molecularfunction.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(molecularfunction.match(re2))
              if(molecularfunction.match(re2)!=null){
                for (var eachmolecular of molecularfunction.match(re2)){
                  console.log(eachmolecular)
                  if(each==eachmolecular){
                    console.log("matched")
                    molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                    console.log(molecularfunction)
                  }
                }
                
              }
             
              console.log(molecularfunction)
            }
          }
        $( ".molecular-function" ).append(molecularfunction+'<br>')
        }
        this.ngAfterViewInit()

    //console.log(this.displaydiseasesummary)
  });












  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

 }

 


 if(text1 =='mutation'){
  console.log("Again went in mutation")
  this.mutationedited.push(text)
  this.disease[1]["mutation"] = this.mutationedited
  this.disease[1]["editedfield"] = "mutation"
  console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

     

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[1]["mutation"] = this.editedvalue.mutation
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["mutationreferences"] = this.editedvalue.mutationreferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    console.log(this.disease[3]["diseasesummaryreferences"])
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

        /*var find = "PMID: 2230"
        
        //var re = /\{\{(098776)\}\}/g
        var re1 = new RegExp("\{\{("+find+")\}\}", "g")
        console.log(re1)
        for (var each of  this.disease[1]["diseasesummary"]){
          this.displaydiseasesummary.push(each.replace(re1, '[1]'))
        }*/
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(prevalenceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput

    /*for (var each of this.disease[1]["diseasesummary"]){
      //for (var every of this.disease[3]["references"]){
        //console.log(each.replace(/\{\{(.*?)\}\}/g))
      //}
      //console.log(each.match(/\{\{(.*?)\}\}/g) )
      console.log(each.match(/[^{{\]]+(?=}})/g))
      if(each.match(/[^{{\]]+(?=}})/g) != null){
        for (var eachmatch of each.match(/[^{{\]]+(?=}})/g)){
          console.log(eachmatch)
        }
      }
      
      //this.displaydiseasesummary.push(each.replace(/\{\{(.*?)\}\}/g, "["+ dscount++ +"]"))
    }*/
    
    var finalre = new RegExp("\\[(.*?)\\]", "g")
    $(".disease-alias").empty()
    for (var diseasealias of this.outputdiseasealias){
      if(diseasealias.match(finalre) != null){
        console.log(diseasealias.match(finalre))
        for (var each of diseasealias.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(diseasealias.match(re2))
          if(diseasealias.match(re2)!=null){
            for (var eachalias of diseasealias.match(re2)){
              console.log(eachalias)
              if(each==eachalias){
                console.log("matched")
                diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                console.log(diseasealias)
              }
            }
            
          }
         
          console.log(diseasealias)
        }
      }
    $( ".disease-alias" ).append(diseasealias+'<br>')
    }

    $(".disease-summary").empty()
    for (var diseasesummary of this.outputdiseasesummary){
      if(diseasesummary.match(finalre) != null){
        console.log(diseasesummary.match(finalre))
        for (var each of diseasesummary.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(diseasesummary.match(re2))
          if(diseasesummary.match(re2)!=null){
            for (var eachdiseasesummary of diseasesummary.match(re2)){
              console.log(eachdiseasesummary)
              if(each==eachdiseasesummary){
                console.log("matched")
                diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                console.log(diseasesummary)
              }
            }
            
          }
         
          console.log(diseasesummary)
        }
      }
    $( ".disease-summary" ).append(diseasesummary+'<br>')
    }

    $(".prevalence").empty()
    for (var prevalence of this.outputprevalence){
      if(prevalence.match(finalre) != null){
        console.log(prevalence.match(finalre))
        for (var each of prevalence.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(prevalence.match(re2))
          if(prevalence.match(re2)!=null){
            for (var eachprevalence of prevalence.match(re2)){
              console.log(eachprevalence)
              if(each==eachprevalence){
                console.log("matched")
                prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                console.log(prevalence)
              }
            }
            
          }
         
          console.log(prevalence)
        }
      }
    $( ".prevalence" ).append(prevalence+'<br>')
    }

    $(".mutation").empty()
    for (var mutation of this.outputmutation){
      if(mutation.match(finalre) != null){
        console.log(mutation.match(finalre))
        for (var each of mutation.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(mutation.match(re2))
          if(mutation.match(re2)!=null){
            for (var eachmutation of mutation.match(re2)){
              console.log(eachmutation)
              if(each==eachmutation){
                console.log("matched")
                mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                console.log(mutation)
              }
            }
            
          }
         
          console.log(mutation)
        }
      }
    $( ".mutation" ).append(mutation+'<br>')
    }

    $(".inheritance").empty()
    for (var inheritance of this.outputinheritance){
      if(inheritance.match(finalre) != null){
        console.log(inheritance.match(finalre))
        for (var each of inheritance.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(inheritance.match(re2))
          if(inheritance.match(re2)!=null){
            for (var eachinheritance of inheritance.match(re2)){
              console.log(eachinheritance)
              if(each==eachinheritance){
                console.log("matched")
                inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                console.log(inheritance)
              }
            }
            
          }
         
          console.log(inheritance)
        }
      }
    $( ".inheritance" ).append(inheritance+'<br>')
    }

    $(".mechanism").empty()
    for (var mechanism of this.outputmechanism){
      if(mechanism.match(finalre) != null){
        console.log(mechanism.match(finalre))
        for (var each of mechanism.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(mechanism.match(re2))
          if(mechanism.match(re2)!=null){
            for (var eachmechanism of mechanism.match(re2)){
              console.log(eachmechanism)
              if(each==eachmechanism){
                console.log("matched")
                mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                console.log(mechanism)
              }
            }
            
          }
         
          console.log(mechanism)
        }
      }
    $( ".mechanism" ).append(mechanism+'<br>')
    }

    $(".molecular-function").empty()
    for (var molecularfunction of this.outputmolecularfunction){
      if(molecularfunction.match(finalre) != null){
        console.log(molecularfunction.match(finalre))
        for (var each of molecularfunction.match(finalre)){
          console.log(each)
          var re2 = new RegExp("\\[([0-9]+)\\]", "g")
          console.log(re2)
          console.log(molecularfunction.match(re2))
          if(molecularfunction.match(re2)!=null){
            for (var eachmolecular of molecularfunction.match(re2)){
              console.log(eachmolecular)
              if(each==eachmolecular){
                console.log("matched")
                molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                console.log(molecularfunction)
              }
            }
            
          }
         
          console.log(molecularfunction)
        }
      }
    $( ".molecular-function" ).append(molecularfunction+'<br>')
    }


    this.ngAfterViewInit()
    //console.log(this.displaydiseasesummary)
  });












  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

 }













 if(text1 =='mechanism'){
  console.log("Again went in mechanism")
  this.mechanismedited.push(text)
  this.disease[1]["mechanism"] = this.mechanismedited
  this.disease[1]["editedfield"] = "mechanism"
  console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

     

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[1]["mechanism"] = this.editedvalue.mechanism
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["mechanismreferences"] = this.editedvalue.mechanismreferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

      
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(prevalenceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput



        var finalre = new RegExp("\\[(.*?)\\]", "g")
        $(".disease-alias").empty()
        for (var diseasealias of this.outputdiseasealias){
          if(diseasealias.match(finalre) != null){
            console.log(diseasealias.match(finalre))
            for (var each of diseasealias.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasealias.match(re2))
              if(diseasealias.match(re2)!=null){
                for (var eachalias of diseasealias.match(re2)){
                  console.log(eachalias)
                  if(each==eachalias){
                    console.log("matched")
                    diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasealias)
                  }
                }
                
              }
             
              console.log(diseasealias)
            }
          }
        $( ".disease-alias" ).append(diseasealias+'<br>')
        }

        $(".disease-summary").empty()
        for (var diseasesummary of this.outputdiseasesummary){
          if(diseasesummary.match(finalre) != null){
            console.log(diseasesummary.match(finalre))
            for (var each of diseasesummary.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasesummary.match(re2))
              if(diseasesummary.match(re2)!=null){
                for (var eachdiseasesummary of diseasesummary.match(re2)){
                  console.log(eachdiseasesummary)
                  if(each==eachdiseasesummary){
                    console.log("matched")
                    diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasesummary)
                  }
                }
                
              }
             
              console.log(diseasesummary)
            }
          }
        $( ".disease-summary" ).append(diseasesummary+'<br>')
        }

        $(".prevalence").empty()
        for (var prevalence of this.outputprevalence){
          if(prevalence.match(finalre) != null){
            console.log(prevalence.match(finalre))
            for (var each of prevalence.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(prevalence.match(re2))
              if(prevalence.match(re2)!=null){
                for (var eachprevalence of prevalence.match(re2)){
                  console.log(eachprevalence)
                  if(each==eachprevalence){
                    console.log("matched")
                    prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                    console.log(prevalence)
                  }
                }
                
              }
             
              console.log(prevalence)
            }
          }
        $( ".prevalence" ).append(prevalence+'<br>')
        }

        $(".mutation").empty()
        for (var mutation of this.outputmutation){
          if(mutation.match(finalre) != null){
            console.log(mutation.match(finalre))
            for (var each of mutation.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mutation.match(re2))
              if(mutation.match(re2)!=null){
                for (var eachmutation of mutation.match(re2)){
                  console.log(eachmutation)
                  if(each==eachmutation){
                    console.log("matched")
                    mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mutation)
                  }
                }
                
              }
             
              console.log(mutation)
            }
          }
        $( ".mutation" ).append(mutation+'<br>')
        }

        $(".inheritance").empty()
        for (var inheritance of this.outputinheritance){
          if(inheritance.match(finalre) != null){
            console.log(inheritance.match(finalre))
            for (var each of inheritance.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(inheritance.match(re2))
              if(inheritance.match(re2)!=null){
                for (var eachinheritance of inheritance.match(re2)){
                  console.log(eachinheritance)
                  if(each==eachinheritance){
                    console.log("matched")
                    inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                    console.log(inheritance)
                  }
                }
                
              }
             
              console.log(inheritance)
            }
          }
        $( ".inheritance" ).append(inheritance+'<br>')
        }

        $(".mechanism").empty()
        for (var mechanism of this.outputmechanism){
          if(mechanism.match(finalre) != null){
            console.log(mechanism.match(finalre))
            for (var each of mechanism.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mechanism.match(re2))
              if(mechanism.match(re2)!=null){
                for (var eachmechanism of mechanism.match(re2)){
                  console.log(eachmechanism)
                  if(each==eachmechanism){
                    console.log("matched")
                    mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mechanism)
                  }
                }
                
              }
             
              console.log(mechanism)
            }
          }
        $( ".mechanism" ).append(mechanism+'<br>')
        }

        $(".molecular-function").empty()
        for (var molecularfunction of this.outputmolecularfunction){
          if(molecularfunction.match(finalre) != null){
            console.log(molecularfunction.match(finalre))
            for (var each of molecularfunction.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(molecularfunction.match(re2))
              if(molecularfunction.match(re2)!=null){
                for (var eachmolecular of molecularfunction.match(re2)){
                  console.log(eachmolecular)
                  if(each==eachmolecular){
                    console.log("matched")
                    molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                    console.log(molecularfunction)
                  }
                }
                
              }
             
              console.log(molecularfunction)
            }
          }
        $( ".molecular-function" ).append(molecularfunction+'<br>')
        }
        this.ngAfterViewInit()
  });


  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

 }











 if(text1 =='molecularfunction'){
  console.log("Again went in molecularfunction")
  this.molecularfunctionedited.push(text)
  this.disease[0]["molecularfunction"] = this.molecularfunctionedited
  this.disease[1]["editedfield"] = "molecularfunction"
  console.log(this.disease)
  this.geneServicing.updateGene(this.disease).subscribe(res =>{

     

    this.editedvalue = res;
    console.log(this.editedvalue)
    this.disease[0]["molecularfunction"] = this.editedvalue.molecularfunction
    this.disease[3]["references"] = this.editedvalue.references
    this.disease[3]["molecularfunctionreferences"] = this.editedvalue.molecularfunctionreferences
    console.log(this.disease)
    //console.log(this.disease[3]["references"])
    //console.log(this.disease[3]["diseasesummaryreferences"])
    //console.log(this.disease[1]["diseasesummary"])
    if(this.disease[3]["references"].length > 0){
      var dscount = 1
      this.displayreferences = []
      for (var eachrefvalue of this.disease[3]["references"]){
        eachrefvalue =  (dscount++)+". "+eachrefvalue
        this.displayreferences.push(eachrefvalue)
      }
      //console.log(this.displayreferences)
    }
    else{
      this.displayreferences = []
    }


    var diseasealiasoutput = []
    var diseasesummaryoutput = []
    var prevalenceoutput = []
    var mutationoutput = []
    var inheritanceoutput = []
    var mechanismoutput = []
    var molecularfunctionoutput = []

    
    referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
    referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
    referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
    referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
    referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
    referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
    referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)


    function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
    {
      console.log(identifier)
      console.log(content)
      console.log(referencearray)
      console.log(specificreferencearray)

      var contentarray = []
      var refcount;
        if(referencearray.length > 0 && content.length >0){
          //console.log(this.displayreferences)
          var element = specificreferencearray[0]
          
          var index = referencearray.indexOf(element);
          refcount= index+1
          
        }
        
        var editedvalue = null;
        if(specificreferencearray.length>0){

        for(var j=0; j<specificreferencearray.length; j++){
          var find = specificreferencearray[j]
          var re1 = new RegExp("\{\{("+find+")\}\}", "g")
          
          for (var i=0; i<content.length; i++)
          {
          

            var replaced = content[i].search(re1) >= 0
            //console.log(replaced)
            //console.log(this.disease[1]["diseasesummary"][i])
            if(replaced){
              
              if(editedvalue!= null){

                if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                  console.log("Not null first loop")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }

                else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                  console.log("Not null second loop")
                  
                  //this.displaydiseasesummary.push(editedvalue)
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                  console.log("Not null third loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  contentarray.push(editedvalue)
                  
                }
                //console.log("second loop entered")
                else if((editedvalue.search(re1) >= 0) == true){
                  console.log("Not null fourth loop")
                  //console.log("Match found on edited value")
                  editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                 
                  //console.log(this.refcount)
                }
                else if(((editedvalue.search(re1) >= 0) == false)){
                  console.log("Not null fifth loop")
                  contentarray.push(editedvalue)
                  editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                  refcount = refcount+1
                  //console.log(editedvalue)
                  //console.log(refcount)
                  
                }
              
              }
              else if (editedvalue == null && (specificreferencearray.length==1)){
                console.log("Null first loop")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                contentarray.push(editedvalue)
               
              }
              else if(editedvalue == null){
                console.log("Null second loop entered")
                editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                refcount = refcount+1
                //console.log("First loop value")
                
              }
            
                //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                //this.refcount = this.refcount+1
                
              
            
            }
            
          //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

          }

          //console.log("Overall content array")
          //console.log(contentarray)
          
        }

      
        if(identifier == "diseasealias"){
          var newdiseasealias = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(diseasealiasoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasealiasoutput.push(newdiseasealias[k])
            }
          }

          console.log(diseasealiasoutput)
        }
        if(identifier == "diseasesummary"){
          var newdiseasesummary = content
          console.log(newdiseasesummary)
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(diseasesummaryoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              diseasesummaryoutput.push(newdiseasesummary[k])
            }
          }

          console.log(diseasesummaryoutput)
        }
        if(identifier == "prevalence"){
          var newprevalence = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              console.log(k)
              console.log(contentarray[l])
              //console.log(finaldisease)
              prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
              l=l+1;
              console.log(prevalenceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              prevalenceoutput.push(newprevalence[k])
            }
          }

          console.log(prevalenceoutput)
        }
        if(identifier == "mutation"){
          var newmutation = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mutationoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mutationoutput.push(newmutation[k])
            }
          }

          console.log(mutationoutput)
        }
        if(identifier == "inheritance"){
          var newinheritance = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(inheritanceoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              inheritanceoutput.push(newinheritance[k])
            }
          }

          console.log(inheritanceoutput)
        }
        if(identifier == "mechanism"){
          var newmechanism = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(mechanismoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              mechanismoutput.push(newmechanism[k])
            }
          }

          console.log(mechanismoutput)
        }
        if(identifier == "molecularfunction"){
          var newmolecularfunction = content
          var re2 = new RegExp("\{\{(.*?)\}\}", "g")
          var l =0
          //var finaldisease=[]
          for (var k=0; k<content.length; k++){
            var found = content[k].search(re2) >= 0
            if(found){
              //console.log(k)
              //console.log(this.displaydiseasesummary[l])
              //console.log(finaldisease)
              molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
              l=l+1;
              //console.log(molecularfunctionoutput)
              //finaldisease=finaldisease
            }
            else if(found == false){
              molecularfunctionoutput.push(newmolecularfunction[k])
            }
          }

          console.log(molecularfunctionoutput)
        }
        //console.log(this.displaydiseasesummary)
        //console.log(this.disease[1]["diseasesummary"])
        

}
else if(specificreferencearray.length==0){
if(identifier == "diseasealias"){
  diseasealiasoutput = content
}
if(identifier == "diseasesummary"){
  diseasesummaryoutput = content
}
if(identifier == "prevalence"){
  prevalenceoutput = content
}
if(identifier == "mutation"){
  mutationoutput = content
}
if(identifier == "inheritance"){
  inheritanceoutput = content
}
if(identifier == "mechanism"){
  mechanismoutput = content
}
if(identifier == "molecularfunction"){
  molecularfunctionoutput = content
}
}
}

        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput

        var finalre = new RegExp("\\[(.*?)\\]", "g")
        $(".disease-alias").empty()
        for (var diseasealias of this.outputdiseasealias){
          if(diseasealias.match(finalre) != null){
            console.log(diseasealias.match(finalre))
            for (var each of diseasealias.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasealias.match(re2))
              if(diseasealias.match(re2)!=null){
                for (var eachalias of diseasealias.match(re2)){
                  console.log(eachalias)
                  if(each==eachalias){
                    console.log("matched")
                    diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasealias)
                  }
                }
                
              }
             
              console.log(diseasealias)
            }
          }
        $( ".disease-alias" ).append(diseasealias+'<br>')
        }

        $(".disease-summary").empty()
        for (var diseasesummary of this.outputdiseasesummary){
          if(diseasesummary.match(finalre) != null){
            console.log(diseasesummary.match(finalre))
            for (var each of diseasesummary.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasesummary.match(re2))
              if(diseasesummary.match(re2)!=null){
                for (var eachdiseasesummary of diseasesummary.match(re2)){
                  console.log(eachdiseasesummary)
                  if(each==eachdiseasesummary){
                    console.log("matched")
                    diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasesummary)
                  }
                }
                
              }
             
              console.log(diseasesummary)
            }
          }
        $( ".disease-summary" ).append(diseasesummary+'<br>')
        }

        $(".prevalence").empty()
        for (var prevalence of this.outputprevalence){
          if(prevalence.match(finalre) != null){
            console.log(prevalence.match(finalre))
            for (var each of prevalence.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(prevalence.match(re2))
              if(prevalence.match(re2)!=null){
                for (var eachprevalence of prevalence.match(re2)){
                  console.log(eachprevalence)
                  if(each==eachprevalence){
                    console.log("matched")
                    prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                    console.log(prevalence)
                  }
                }
                
              }
             
              console.log(prevalence)
            }
          }
        $( ".prevalence" ).append(prevalence+'<br>')
        }

        $(".mutation").empty()
        for (var mutation of this.outputmutation){
          if(mutation.match(finalre) != null){
            console.log(mutation.match(finalre))
            for (var each of mutation.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mutation.match(re2))
              if(mutation.match(re2)!=null){
                for (var eachmutation of mutation.match(re2)){
                  console.log(eachmutation)
                  if(each==eachmutation){
                    console.log("matched")
                    mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mutation)
                  }
                }
                
              }
             
              console.log(mutation)
            }
          }
        $( ".mutation" ).append(mutation+'<br>')
        }

        $(".inheritance").empty()
        for (var inheritance of this.outputinheritance){
          if(inheritance.match(finalre) != null){
            console.log(inheritance.match(finalre))
            for (var each of inheritance.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(inheritance.match(re2))
              if(inheritance.match(re2)!=null){
                for (var eachinheritance of inheritance.match(re2)){
                  console.log(eachinheritance)
                  if(each==eachinheritance){
                    console.log("matched")
                    inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                    console.log(inheritance)
                  }
                }
                
              }
             
              console.log(inheritance)
            }
          }
        $( ".inheritance" ).append(inheritance+'<br>')
        }

        $(".mechanism").empty()
        for (var mechanism of this.outputmechanism){
          if(mechanism.match(finalre) != null){
            console.log(mechanism.match(finalre))
            for (var each of mechanism.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mechanism.match(re2))
              if(mechanism.match(re2)!=null){
                for (var eachmechanism of mechanism.match(re2)){
                  console.log(eachmechanism)
                  if(each==eachmechanism){
                    console.log("matched")
                    mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mechanism)
                  }
                }
                
              }
             
              console.log(mechanism)
            }
          }
        $( ".mechanism" ).append(mechanism+'<br>')
        }

        $(".molecular-function").empty()
        for (var molecularfunction of this.outputmolecularfunction){
          if(molecularfunction.match(finalre) != null){
            console.log(molecularfunction.match(finalre))
            for (var each of molecularfunction.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(molecularfunction.match(re2))
              if(molecularfunction.match(re2)!=null){
                for (var eachmolecular of molecularfunction.match(re2)){
                  console.log(eachmolecular)
                  if(each==eachmolecular){
                    console.log("matched")
                    molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                    console.log(molecularfunction)
                  }
                }
                
              }
             
              console.log(molecularfunction)
            }
          }
        $( ".molecular-function" ).append(molecularfunction+'<br>')
        }

        this.ngAfterViewInit()
  });


  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});

 }


 //location.reload();
}

/*reload(){

  console.log("Reload called")

const genesymbol2 = this.activeRoute.snapshot.params['genesymbol']
const diseasename2 = this.activeRoute.snapshot.params['diseasename']
const searchelement2 = this.activeRoute.snapshot.params['searchelement']
console.log(genesymbol2)
console.log(diseasename2)
console.log(searchelement2)
this.geneServicing.searchGeneDisease(genesymbol2, diseasename2).subscribe(
  res =>{

  this.disease = res;
  console.log(this.disease)
  for (var each of this.disease[0]["genealias"]){
      
    this.updatedgenealias.push(" "+each)
}
console.log(this.updatedgenealias)
this.finalgenealias = this.updatedgenealias
  

});

this.displaygenediseasepair = {
  displaygenesymbol: genesymbol2,
  displaydiseasename: diseasename2
}

console.log(this.displaygenediseasepair)
if(searchelement2=="genename")
{
  this.geneServicing.genetodisease(genesymbol2).subscribe(
    res =>{

    this.genediseasepair = res;
    console.log(this.genediseasepair)
    

  });
}
else if(searchelement2=="diseasename")
{
  this.geneServicing.genetodisease(diseasename2).subscribe(
    res =>{

    this.genediseasepair = res;
    console.log(this.genediseasepair)
    

  });
}


}*/


gettext(text)
{
  
  $('#'+text+'textarea').val("")
  console.log(text);

  if(text == "diseasealias")
  {

    //$('#'+text+'textarea').trigger('autoresize');
    console.log("Went in diseasealias")
    this.diseasealiasedited = [];
    console.log(this.disease)
    for (const each of this.disease[1]["diseasealias"])
    {  
        console.log(each)
        //for(var each of each.diseasesummary)
        //{
          //console.log(each)
          var diseasealiastextarea = $('#'+text+'textarea');
          
          diseasealiastextarea.val(diseasealiastextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
        
        //var diseasesummary = genes.diseasesummary;
        //console.log(diseasesummary.join())
        //$('#'+text+'textarea').val(genes.diseasesummary)
        
        //$('#'+text+'textarea')
        //$('.materialize-textarea').trigger('autoresize');
          //$('#'+text+'textarea').trigger('autoresize');

         
        
    }
    $(".materialize-textarea").trigger('autoresize');
 
  }

  if(text == "diseasesummary")
  {

    //$('#'+text+'textarea').trigger('autoresize');
    console.log("Went in disease")
    this.diseasesummaryedited = [];
    console.log(this.disease)
    for (const each of this.disease[1]["diseasesummary"])
    {  
        console.log(each)
        //for(var each of each.diseasesummary)
        //{
          //console.log(each)
          var diseasesummarytextarea = $('#'+text+'textarea');
          diseasesummarytextarea.val(diseasesummarytextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
        
        //var diseasesummary = genes.diseasesummary;
        //console.log(diseasesummary.join())
        //$('#'+text+'textarea').val(genes.diseasesummary)
        
        //$('#'+text+'textarea')
        //$('.materialize-textarea').trigger('autoresize');
          //$('#'+text+'textarea').trigger('autoresize');

         
        
    }
    $(".materialize-textarea").trigger('autoresize');
 
  }

  if(text == "prevalence")
  {
    //$('#'+text+'textarea').trigger('autoresize');
    //console.log("Went in prevalence")
    this.prevalenceedited = [];
    for (const each of this.disease[1]["prevalence"])
    {
      //for(var each of genes.prevalence)
        //{
          //console.log(each)
          var prevalencetextarea = $('#'+text+'textarea');
          prevalencetextarea.val(prevalencetextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
    }
    $('#'+text+'textarea').trigger('autoresize');
  }

  if(text == "mutation")
  {
    //$('#'+text+'textarea').trigger('autoresize');
    //console.log("Went in mutation")
    this.mutationedited = [];
    for (const each of this.disease[1]["mutation"])
    {
      //for(var each of genes.mutation)
        //{
          //console.log(each)
          var mutationtextarea = $('#'+text+'textarea');
          mutationtextarea.val(mutationtextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
    }
    $('#'+text+'textarea').trigger('autoresize');
  }

  if(text == "molecularfunction")
  {
    //$('#'+text+'textarea').trigger('autoresize');
    //console.log("Went in molecularfunction")
    this.molecularfunctionedited = [];
    for (const each of this.disease[0]["molecularfunction"])
    {
      //for(var each of genes.molecularfunction)
        //{
         //console.log(each)
          var molecularfunctiontextarea = $('#'+text+'textarea');
          molecularfunctiontextarea.val(molecularfunctiontextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
    }
    $('#'+text+'textarea').trigger('autoresize');
  }

  if(text == "mechanism")
  {
    //$('#'+text+'textarea').trigger('autoresize');
    //console.log("Went in mechanism")
    this.mechanismedited = [];
    for (const each of this.disease[1]["mechanism"])
    {
      //for(var each of genes.mechanism)
        //{
          //console.log(each)
          var mechanismtextarea = $('#'+text+'textarea');
          mechanismtextarea.val(mechanismtextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
    }
    $('#'+text+'textarea').trigger('autoresize');
  }

  if(text == "inheritance")
  {
    //$('#'+text+'textarea').trigger('autoresize');
    //console.log("Went in inheritance")
    this.inheritanceedited = [];
    for (const each of this.disease[1]["inheritance"])
    {
      //for(var each of genes.inheritance)
        //{
          //console.log(each)
          var inheritancetextarea = $('#'+text+'textarea');
          inheritancetextarea.val(inheritancetextarea.val() + '\n'+each);
          //$('#diseasesummarytextarea').append("hello");
        //}
    }
    $('#'+text+'textarea').trigger('autoresize');
  }
}

/* PPI Graph */ 
/*evidence(id) {

  var evidencegene;
  var evidencegraph = [];

  if(id == 0){

    this.cy = cytoscape({
        
      container: document.getElementById('cy'),
          
      elements: [
        
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'red',
            'label': 'data(name)', 
            'width': 'label',
            'height': 'label',
          }
        },
  
        {
          selector: 'edge',
          style: {
  
          }
        },
      ],
        zoomingEnabled: true,
        userZoomingEnabled: false,
    });
  
  if(this.updatedgenelist.length>0){
    for (var i=0; i<this.updatedgenelist.length; i++){
      var name = this.updatedgenelist[i]
    var collect = this.cy.add([
      {  group: 'nodes',
         data: {
         id: name,
         name: name
        } 
       }, 
     
  ]);
  }
  
  for (var i=1; i<this.updatedgenelist.length; i++){
  var collect = this.cy.add([
   {
     group: "edges", 
     data: { 
       id: this.updatedgenelist[0]+this.updatedgenelist[i], 
       source: this.updatedgenelist[0], target: this.updatedgenelist[i]
      }
   }
  ]);
  }
}
else {
  for (var i=0; i<this.genelist.length; i++){
    var name = this.genelist[i]
  var collect = this.cy.add([
    {  group: 'nodes',
       data: {
       id: name,
       name: name
      } 
     }, 
   
]);
}

for (var i=1; i<this.genelist.length; i++){
var collect = this.cy.add([
 {
   group: "edges", 
   data: { 
     id: this.genelist[0]+this.genelist[i], 
     source: this.genelist[0], target: this.genelist[i]
    }
 }
]);
}
}

  const layout = this.cy.layout({
  name: 'concentric',
  avoidOverlap: true
  
  });
  
  layout.run();

  }

  else
  {

  for (const genes of this.ppi)
  {
    //console.log(genes)
    for (const each of genes.interaction)
    {
      //console.log(each)
        if(id == each.evidence)
        {
            evidencegene = each.geneinteractor;
            //console.log(evidencegene)
            break;
            
        }
    }
  }

  evidencegraph.push(this.genelist[0])

  for (var every in this.genelist)
  {
    if(this.genelist[every] == evidencegene)
    {
      for(var i=parseInt(every); i<this.genelist.length; i++){

                evidencegraph.push(this.genelist[i])
       
      }
    }
  }

  //console.log(evidencegraph)
  if(evidencegraph.length > 45)
  {
    evidencegraph.splice(45, evidencegraph.length)
    $('#modal1').modal('open');
  }


  this.cy = cytoscape({
        
    container: document.getElementById('cy'),
        
    elements: [
      
    ],
    style: [
      {
        selector: 'node',
        style: {
          'background-color': 'red',
          'label': 'data(name)', 
          'width': 'label',
          'height': 'label',
        }
      },

      {
        selector: 'edge',
        style: {

        }
      },
    ],
      zoomingEnabled: true,
      userZoomingEnabled: false,
  });


  for (var i=0; i<evidencegraph.length; i++){
    var name = evidencegraph[i]
  var collect = this.cy.add([
    {  group: 'nodes',
       data: {
       id: name,
       name: name
      } 
     }, 
   
]);
}

for (var i=1; i<evidencegraph.length; i++){
var collect = this.cy.add([
 {
   group: "edges", 
   data: { 
     id: evidencegraph[0]+evidencegraph[i], 
     source: evidencegraph[0], target: evidencegraph[i]
    }
 }
]);
}

const layout = this.cy.layout({
name: 'concentric',
avoidOverlap: true

});

layout.run();
  }

}


getgraph()
{


  this.genelist = [];
  const genename1 = this.activeRoute.snapshot.params['genename'];
  //const diseasename1 = this.activeRoute.snapshot.params['diseasename']
  console.log(genename1)
  this.geneServicing.searchGene(genename1).subscribe(
    res =>{
      
      this.ppi = res;
      console.log(this.ppi)

      this.cy = cytoscape({
        
        container: document.getElementById('cy'),
            
        elements: [
          
        ],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': 'red',
              'label': 'data(name)', 
              'width': 'label',
              'height': 'label',
            }
          },

          {
            selector: 'edge',
            style: {

            }
          },
        ],
          zoomingEnabled: true,
          userZoomingEnabled: false,
      });

      var evidencelist = [];

      for (const genes of this.ppi)
      {
        console.log()
        console.log(genes.interaction);
        for (const each of genes.interaction)
          {
            
            evidencelist.push(each.evidence)
          }
          console.log(evidencelist)
          this.evidencedropdown = Array.from(new Set(evidencelist))
          this.evidencedropdown.sort(function(a, b){return a - b})
          console.log(this.evidencedropdown)


        for (var evidence of this.evidencedropdown)
        {
            for (var every of genes.interaction)
            {
                if(evidence == every.evidence)
                {
                  this.genelist.push(every.geneinteractor)
                }
            }
        }

      }
      //console.log(this.genelist)
      //console.log(this.genelist.length)
      //var  updatedgenelist = []
      var length = this.genelist.length
      //console.log(length)
      
      if(this.genelist.length > 45)
      
      {
        if(this.count == 0)
        {
          $('#modal1').modal('open');
          this.count = this.count + 1
          //console.log(this.count)
        }
        else if(this.count == 1){
          console.log("count" + this.count)
          $('#modal1').modal('close');
          this.count = 0;
        }
        this.updatedgenelist.push(this.genelist[0])
        var sub = this.genelist.length - 44
        for (var i = this.genelist.length-1; i>=sub; i--){
          //console.log(i)
          this.updatedgenelist.push(this.genelist[i])
        }

              //console.log(this.updatedgenelist.length)
      for (var i=0; i<this.updatedgenelist.length; i++){
        var name = this.updatedgenelist[i]
        
      var collect = this.cy.add([
        {  group: 'nodes',
           data: {
           id: name,
           name: name
          } 
         }, 
       
    ]);
  }

  for (var i=1; i<this.updatedgenelist.length; i++){
  var collect = this.cy.add([
     {
       group: "edges", 
       data: { 
         id: this.updatedgenelist[0]+this.updatedgenelist[i], 
         source: this.updatedgenelist[0], target: this.updatedgenelist[i]
        }
     }
]);
}

const layout = this.cy.layout({
  name: 'concentric',
  avoidOverlap: true

});

layout.run();


          
      }

     else
     {

     
      for (var i=0; i<this.genelist.length; i++){
        var name = this.genelist[i]
        
      var collect = this.cy.add([
        {  group: 'nodes',
           data: {
           id: name,
           name: name
          } 
         }, 
       
    ]);
  }

  for (var i=1; i<this.genelist.length; i++){
  var collect = this.cy.add([
     {
       group: "edges", 
       data: { 
         id: this.genelist[0]+this.genelist[i], 
         source: this.genelist[0], target: this.genelist[i]
        }
     }
]);
}

const layout = this.cy.layout({
  name: 'concentric',
  avoidOverlap: true

});

layout.run();

      }
      
    }
  );

  this.genelist = []
  this.updatedgenelist = []

}*/

resize(text)
{

  $('#'+text+'textarea').on('input keyup',function() {
    $(this).css({'height': 'auto'}).animate({ 'height' :  this.scrollHeight} , 0);
              
});

  /*console.log(text)  
  $( '#'+text+'textarea' ).on( "keyup", function( event ) {
    var lines = $('#'+text+'textarea').val().split("\n");  
    //console.log(lines)
    for (var eachline of lines){
      //console.log(eachline.length)
      $('#'+text+'textarea').height(eachline.length)
    }

    if(event.which==8){
     console.log("Delete action")
      }
    })*/

    /*else{
      var lines = $('#'+text+'textarea').val().split("\n");  
      console.log(lines.length);
      //console.log($('#'+text+'textarea').height())
      $('#'+text+'textarea').height((lines.length)*50)
    }*/
   

  
  
}






ngOnInit() 

{



  
  //$(".se-pre-con").fadeOut("slow");
  //$( "html" ).removeClass( "loading" );
  
 
if (window.location.href.indexOf('reload')==-1) {
  //$(".se-pre-con").fadeOut("slow");
    //$( "html" ).removeClass( "loading" );
    
    window.location.replace(window.location.href+'?reload');
   
   //$(".se-pre-con").fadeOut("slow");
}

setTimeout(
  function() 
  {
    

    
    $(".se-pre-con").fadeOut("slow");
    //do something special
  }, 100);
//$(".se-pre-con").fadeOut("slow");


 /*$( '.materialize-textarea' ).on( "keydown", function( event ) {
    //console.log(event.which)  ;
    console.log($('.materialize-textarea').val().length);
    console.log($('.materialize-textarea').height());
    
    $('.materialize-textarea').height($('.materialize-textarea').val().length/2.75);
    //console.log($('.materialize-textarea').val().length);
    //console.log($('.materialize-textarea').height());
   

  });*/
  
     //$('#diseasesummarytextarea').trigger('autoresize');

    //$('ul.tabs').tabs('select_tab', '#swipe-1');
    $('.slider').slider();
    $('.button-collapse').sideNav();
    $('ul.tabs').tabs();
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('.collapsible').collapsible();
    //$('.dropdown-trigger').dropdown()
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, 
        hover: true, 
        gutter: 0, 
        belowOrigin: true, 
        alignment: 'left', 
        stopPropagation: true 

      });



     
     
    /*const name = this.activeRoute.snapshot.params['genename'];
    //console.log(name);
    this.geneServicing.searchGene(name).subscribe(
      res =>{
        this.disease = res;
        //document.getElementById('cy').style.width = '1150px';
        //document.getElementById('cy').style.height = '650px';
        console.log(res)*/
      const genesymbol1 = this.activeRoute.snapshot.params['genesymbol']
      const diseasename1 = this.activeRoute.snapshot.params['diseasename']
      const searchelement1 = this.activeRoute.snapshot.params['searchelement']
      console.log(genesymbol1)
      console.log(diseasename1)
      console.log(searchelement1)
      this.geneServicing.searchGeneDisease(genesymbol1, diseasename1).subscribe(
        res =>{

        this.disease = res;
        console.log(this.disease)
        
        for (var each of this.disease[0]["genealias"]){
            
          this.updatedgenealias.push(" "+each)
        }
        //console.log(this.updatedgenealias)
        this.finalgenealias = this.updatedgenealias


        /** Display of References and numbering accordingly */

        if(this.disease[3]["references"].length > 0){
          var dscount = 1
          this.displayreferences = []
          for (var eachrefvalue of this.disease[3]["references"]){
            eachrefvalue =  (dscount++)+". "+eachrefvalue
            this.displayreferences.push(eachrefvalue)
          }
          //console.log(this.displayreferences)
        }
        else{
          this.displayreferences = []
        }

        var diseasealiasoutput = []
        var diseasesummaryoutput = []
        var prevalenceoutput = []
        var mutationoutput = []
        var inheritanceoutput = []
        var mechanismoutput = []
        var molecularfunctionoutput = []


        referencenumbers("diseasealias", this.disease[1]["diseasealias"], this.disease[3]["references"], this.disease[3]["diseasealiasreferences"], this.outputdiseasealias)
        referencenumbers("diseasesummary", this.disease[1]["diseasesummary"], this.disease[3]["references"], this.disease[3]["diseasesummaryreferences"], this.outputdiseasesummary)
        referencenumbers("prevalence", this.disease[1]["prevalence"], this.disease[3]["references"], this.disease[3]["prevalencereferences"], this.outputprevalence)
        referencenumbers("mutation", this.disease[1]["mutation"], this.disease[3]["references"], this.disease[3]["mutationreferences"], this.outputmutation)
        referencenumbers("inheritance", this.disease[1]["inheritance"], this.disease[3]["references"], this.disease[3]["inheritancereferences"], this.outputinheritance)
        referencenumbers("mechanism", this.disease[1]["mechanism"], this.disease[3]["references"], this.disease[3]["mechanismreferences"], this.outputmechanism)
        referencenumbers("molecularfunction", this.disease[0]["molecularfunction"], this.disease[3]["references"], this.disease[3]["molecularfunctionreferences"], this.outputmolecularfunction)








        

        function referencenumbers(identifier, content, referencearray, specificreferencearray, output)
        {
          var contentarray = []
          var refcount;
            if(referencearray.length > 0 && content.length >0){
              //console.log(this.displayreferences)
              var element = specificreferencearray[0]
              //console.log(element)
              var index = referencearray.indexOf(element);
              refcount= index+1
              //console.log(this.refcount)
            }
            
            var editedvalue = null;
            if(specificreferencearray.length>0){

            for(var j=0; j<specificreferencearray.length; j++){
              var find = specificreferencearray[j]
              var re1 = new RegExp("\{\{("+find+")\}\}", "g")
              //console.log(re1)
              for (var i=0; i<content.length; i++)
              {
              

                var replaced = content[i].search(re1) >= 0
                //console.log(replaced)
                //console.log(this.disease[1]["diseasesummary"][i])
                if(replaced){
                  
                  if(editedvalue!= null){

                    if(((editedvalue.search(re1) >= 0) == true)&& (specificreferencearray.length==1)){
                      editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                      refcount = refcount+1
                      contentarray.push(editedvalue)
                    }

                    else if(((editedvalue.search(re1) >= 0) == true) && (j==specificreferencearray.length-1)){
                      //console.log("Entered the final loop")
                      //console.log(editedvalue)
                      //this.displaydiseasesummary.push(editedvalue)
                      editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                      refcount = refcount+1
                      contentarray.push(editedvalue)
                    }
                    else if(((editedvalue.search(re1) >= 0) == false) && (j==specificreferencearray.length-1)){
                      //console.log("Entered the final loop")
                      contentarray.push(editedvalue)
                      editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                      refcount = refcount+1
                      contentarray.push(editedvalue)
                    }
                    //console.log("second loop entered")
                    else if((editedvalue.search(re1) >= 0) == true){
                      //console.log("Match found on edited value")
                      editedvalue = editedvalue.replace(re1, "["+(refcount)+"]")
                      refcount = refcount+1
                      //console.log(editedvalue)
                      //console.log(this.refcount)
                    }
                    else if(((editedvalue.search(re1) >= 0) == false)){
                      contentarray.push(editedvalue)
                      editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                      refcount = refcount+1
                      //console.log(editedvalue)
                      //console.log(refcount)
                    }
                  
                  }
                  else if (editedvalue == null && (specificreferencearray.length==1)){
                    editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    contentarray.push(editedvalue)
                  }
                  else if(editedvalue == null){
                    //console.log("First loop entered")
                    editedvalue = content[i].replace(re1, "["+(refcount)+"]")
                    refcount = refcount+1
                    //console.log("First loop value")
                    //console.log(editedvalue)
                    //console.log(refcount)
                  }
                
                    //editedvalue = this.disease[1]["diseasesummary"][i].replace(re1, "["+(this.refcount)+"]")
                    //this.refcount = this.refcount+1
                    
                  
                
                }
                
              //console.log(each.replace(re1, "["+(this.refcount++)+"]"))

              }
              
            }

            /*var find = "PMID: 2230"
            
            //var re = /\{\{(098776)\}\}/g
            var re1 = new RegExp("\{\{("+find+")\}\}", "g")
            console.log(re1)
            for (var each of  this.disease[1]["diseasesummary"]){
              this.displaydiseasesummary.push(each.replace(re1, '[1]'))
            }*/
            if(identifier == "diseasealias"){
              var newdiseasealias = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  diseasealiasoutput = (Object.assign([], diseasealiasoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  //console.log(diseasealiasoutput)
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  diseasealiasoutput.push(newdiseasealias[k])
                }
              }

              //console.log(diseasealiasoutput)
            }
            if(identifier == "diseasesummary"){
              var newdiseasesummary = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  diseasesummaryoutput = (Object.assign([], diseasesummaryoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  //console.log(diseasesummaryoutput)
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  diseasesummaryoutput.push(newdiseasesummary[k])
                }
              }

              //console.log(diseasesummaryoutput)
            }
            if(identifier == "prevalence"){
              var newprevalence = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  prevalenceoutput = (Object.assign([], prevalenceoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  prevalenceoutput.push(newprevalence[k])
                }
              }

              //console.log(prevalenceoutput)
            }
            if(identifier == "mutation"){
              var newmutation = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  mutationoutput = (Object.assign([], mutationoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  //console.log(mutationoutput)
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  mutationoutput.push(newmutation[k])
                }
              }

              //console.log(mutationoutput)
            }
            if(identifier == "inheritance"){
              var newinheritance = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  inheritanceoutput= (Object.assign([], inheritanceoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  //console.log(inheritanceoutput)
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  inheritanceoutput.push(newinheritance[k])
                }
              }

              //console.log(inheritanceoutput)
            }
            if(identifier == "mechanism"){
              var newmechanism = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  mechanismoutput = (Object.assign([], mechanismoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  //console.log(mechanismoutput)
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  mechanismoutput.push(newmechanism[k])
                }
              }

              //console.log(mechanismoutput)
            }
            if(identifier == "molecularfunction"){
              var newmolecularfunction = content
              var re2 = new RegExp("\{\{(.*?)\}\}", "g")
              var l =0
              //var finaldisease=[]
              for (var k=0; k<content.length; k++){
                var found = content[k].search(re2) >= 0
                if(found){
                  //console.log(k)
                  //console.log(this.displaydiseasesummary[l])
                  //console.log(finaldisease)
                  molecularfunctionoutput = (Object.assign([], molecularfunctionoutput, {[k]: contentarray[l]}));
                  l=l+1;
                  //console.log(molecularfunctionoutput)
                  //finaldisease=finaldisease
                }
                else if(found == false){
                  molecularfunctionoutput.push(newmolecularfunction[k])
                }
              }

              //console.log(molecularfunctionoutput)
            }
            //console.log(this.displaydiseasesummary)
            //console.log(this.disease[1]["diseasesummary"])
            

  }
  else if(specificreferencearray.length==0){
    if(identifier == "diseasealias"){
      diseasealiasoutput = content
    }
    if(identifier == "diseasesummary"){
      diseasesummaryoutput = content
    }
    if(identifier == "prevalence"){
      prevalenceoutput = content
    }
    if(identifier == "mutation"){
      mutationoutput = content
    }
    if(identifier == "inheritance"){
      inheritanceoutput = content
    }
    if(identifier == "mechanism"){
      mechanismoutput = content
    }
    if(identifier == "molecularfunction"){
      molecularfunctionoutput = content
    }
  }
  }

  /*var newoutput = []

        console.log(diseasealiasoutput)
       
        for (var eachpara of diseasealiasoutput){
          var html = eachpara;
          
          var emailPattern = /\[(.*?)\]/g;  
      
          var matched_str = html.match(emailPattern);
          console.log(matched_str)
          for (var each of matched_str){
            
           
              eachpara = eachpara.replace(each,"<a href='javascript:;' (click)='navigate()'></a>");
              console.log(eachpara)
              newoutput.push(eachpara)
          }
        }*/

        
        
          /*if(matched_str){
            var text = $(this).html();
            $.each(matched_str, function(index, value){
                text = text.replace(value,"<a href='mailto:"+value+"'>"+value+"</a>");
            });
            $(this).html(text);
          return $(this)
          }   */
        
       
          
     
           
      
        
        //var newfind = new RegExp("\[(.*?)\]")
        /*for (var newfinder of diseasealiasoutput)
        {
          console.log(newfinder)
          console.log(newfinder.match(/\[(.*?)\]/g))
          if(newfinder.match(/\[(.*?)\]/g)){
            var text = newfinder
            $.each(matched_str, function(index, value){
              text = text.replace(value,"<a href='mailto:"+value+"'>"+value+"</a>");
          });
          }
        }*/

        console.log(diseasesummaryoutput)
        //console.log("output")
        this.outputdiseasealias = diseasealiasoutput
        this.outputdiseasesummary = diseasesummaryoutput
        this.outputprevalence = prevalenceoutput
        this.outputmutation = mutationoutput
        this.outputinheritance =  inheritanceoutput
        this.outputmechanism = mechanismoutput
        this.outputmolecularfunction = molecularfunctionoutput
        

       
        
        /*for (var diseasealias of this.outputdiseasealias){
          $( ".disease-alias" ).append(diseasealias+'<br>')

        }*/
        
        var finalre = new RegExp("\\[(.*?)\\]", "g")
        $(".disease-alias").empty()
        for (var diseasealias of this.outputdiseasealias){
          if(diseasealias.match(finalre) != null){
            console.log(diseasealias.match(finalre))
            for (var each of diseasealias.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasealias.match(re2))
              if(diseasealias.match(re2)!=null){
                for (var eachalias of diseasealias.match(re2)){
                  console.log(eachalias)
                  if(each==eachalias){
                    console.log("matched")
                    diseasealias = diseasealias.replace(eachalias, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasealias)
                  }
                }
                
              }
             
              console.log(diseasealias)
            }
          }
        $( ".disease-alias" ).append(diseasealias+'<br>')
        }

        $(".disease-summary").empty()
        for (var diseasesummary of this.outputdiseasesummary){
          if(diseasesummary.match(finalre) != null){
            console.log(diseasesummary.match(finalre))
            for (var each of diseasesummary.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(diseasesummary.match(re2))
              if(diseasesummary.match(re2)!=null){
                for (var eachdiseasesummary of diseasesummary.match(re2)){
                  console.log(eachdiseasesummary)
                  if(each==eachdiseasesummary){
                    console.log("matched")
                    diseasesummary = diseasesummary.replace(eachdiseasesummary, "<a href='javascript:;'>"+each+"</a>")
                    console.log(diseasesummary)
                  }
                }
                
              }
             
              console.log(diseasesummary)
            }
          }
        $( ".disease-summary" ).append(diseasesummary+'<br>')
        }

        $(".prevalence").empty()
        for (var prevalence of this.outputprevalence){
          if(prevalence.match(finalre) != null){
            console.log(prevalence.match(finalre))
            for (var each of prevalence.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(prevalence.match(re2))
              if(prevalence.match(re2)!=null){
                for (var eachprevalence of prevalence.match(re2)){
                  console.log(eachprevalence)
                  if(each==eachprevalence){
                    console.log("matched")
                    prevalence = prevalence.replace(eachprevalence, "<a href='javascript:;'>"+each+"</a>")
                    console.log(prevalence)
                  }
                }
                
              }
             
              console.log(prevalence)
            }
          }
        $( ".prevalence" ).append(prevalence+'<br>')
        }

        $(".mutation").empty()
        for (var mutation of this.outputmutation){
          if(mutation.match(finalre) != null){
            console.log(mutation.match(finalre))
            for (var each of mutation.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mutation.match(re2))
              if(mutation.match(re2)!=null){
                for (var eachmutation of mutation.match(re2)){
                  console.log(eachmutation)
                  if(each==eachmutation){
                    console.log("matched")
                    mutation = mutation.replace(eachmutation, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mutation)
                  }
                }
                
              }
             
              console.log(mutation)
            }
          }
        $( ".mutation" ).append(mutation+'<br>')
        }

        $(".inheritance").empty()
        for (var inheritance of this.outputinheritance){
          if(inheritance.match(finalre) != null){
            console.log(inheritance.match(finalre))
            for (var each of inheritance.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(inheritance.match(re2))
              if(inheritance.match(re2)!=null){
                for (var eachinheritance of inheritance.match(re2)){
                  console.log(eachinheritance)
                  if(each==eachinheritance){
                    console.log("matched")
                    inheritance = inheritance.replace(eachinheritance, "<a href='javascript:;'>"+each+"</a>")
                    console.log(inheritance)
                  }
                }
                
              }
             
              console.log(inheritance)
            }
          }
        $( ".inheritance" ).append(inheritance+'<br>')
        }

        $(".mechanism").empty()
        for (var mechanism of this.outputmechanism){
          if(mechanism.match(finalre) != null){
            console.log(mechanism.match(finalre))
            for (var each of mechanism.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(mechanism.match(re2))
              if(mechanism.match(re2)!=null){
                for (var eachmechanism of mechanism.match(re2)){
                  console.log(eachmechanism)
                  if(each==eachmechanism){
                    console.log("matched")
                    mechanism = mechanism.replace(eachmechanism, "<a href='javascript:;'>"+each+"</a>")
                    console.log(mechanism)
                  }
                }
                
              }
             
              console.log(mechanism)
            }
          }
        $( ".mechanism" ).append(mechanism+'<br>')
        }

        $(".molecular-function").empty()
        for (var molecularfunction of this.outputmolecularfunction){
          if(molecularfunction.match(finalre) != null){
            console.log(molecularfunction.match(finalre))
            for (var each of molecularfunction.match(finalre)){
              console.log(each)
              var re2 = new RegExp("\\[([0-9]+)\\]", "g")
              console.log(re2)
              console.log(molecularfunction.match(re2))
              if(molecularfunction.match(re2)!=null){
                for (var eachmolecular of molecularfunction.match(re2)){
                  console.log(eachmolecular)
                  if(each==eachmolecular){
                    console.log("matched")
                    molecularfunction = molecularfunction.replace(eachmolecular, "<a href='javascript:;'>"+each+"</a>")
                    console.log(molecularfunction)
                  }
                }
                
              }
             
              console.log(molecularfunction)
            }
          }
        $( ".molecular-function" ).append(molecularfunction+'<br>')
        }



      });

    
      this.displaygenediseasepair = {
        displaygenesymbol: genesymbol1,
        displaydiseasename: diseasename1
      }

      //console.log(this.displaygenediseasepair)

      if(searchelement1=="genename")
      {
        this.geneServicing.genetodisease(genesymbol1).subscribe(
          res =>{
  
          this.genediseasepair = res;
          //console.log(this.genediseasepair)
          
        });
      }

      else if(searchelement1=="diseasename")
      {
        this.geneServicing.genetodisease(diseasename1).subscribe(
          res =>{
  
          this.genediseasepair = res;
          //console.log(this.genediseasepair)
  
        });
      }






     



console.log("last")






    
    
  }
  checkIfLogged_diseasealiasmodal(){

    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#diseasealiasmodal').modal('open');
    }
    else{
      
    const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
      this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
      // window.location.reload();
    }
  }
  checkIfLogged_diseasesummarymodal(){
    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#diseasesummarymodal').modal('open');
    }
    else{
      const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
      this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
    }
  }
  checkIfLogged_prevalencemodal(){
    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#prevalencemodal').modal('open');
    }
    else{
      const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
      this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
    }
  }
  checkIfLogged_mutationmodal(){
    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#mutationmodal').modal('open');
    }
    else{
      const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
      this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
    }
  }
  checkIfLogged_inheritancemodal(){
    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#inheritancemodal').modal('open');
    }
    else{
      const state: RouterState = this.router.routerState;
      const snapshot: RouterStateSnapshot = state.snapshot;
        this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
    }
  }
  checkIfLogged_mechanismmodal(){
    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#mechanismmodal').modal('open');
    }
    else{
      const state: RouterState = this.router.routerState;
      const snapshot: RouterStateSnapshot = state.snapshot;
        this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
    }
  }
  checkIfLogged_molecularfunctionmodal(){
    console.log("inside method");
    if(this.authService.loggedIn()){
      console.log("inside if");
    $('#molecularfunctionmodal').modal('open');
    }
    else{
      const state: RouterState = this.router.routerState;
      const snapshot: RouterStateSnapshot = state.snapshot;
        this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
    }
  }
 
  onLogoutClick() {
    this.authService.logout();
    // this.flashMessage.show('You are logged out', {
    //   cssClass: 'alert-success', timeout: 3000
    // });
    // this.router.navigate(['login']); 
    window.location.reload();
    return false;
    //console.log("logged out");
  }

  onLoginClick(){
    const state: RouterState = this.router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.router.navigate(['/login'],{ queryParams: { returnUrl: snapshot.url }});
  }
 
}

