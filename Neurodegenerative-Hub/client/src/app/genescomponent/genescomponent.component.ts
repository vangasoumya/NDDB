import { Component, OnInit, Input } from '@angular/core';
import {GeneserviceService} from '../geneservice.service';
import {Gene} from '../gene';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genescomponent',
  templateUrl: './genescomponent.component.html',
  styleUrls: ['./genescomponent.component.css'], 
  providers: [GeneserviceService]
})

export class GenescomponentComponent implements OnInit {

genes: Gene[];
gene: Gene;
genename: string;
genealias: string;
diseasename: string;
genetext: string;
public disease;
public completelist =[];
public genealiaslist;
public diseaseslist;
public GeneInfo;
public DiseaseInfo;
public GeneDiseaseInfo;
public filterKey = '';
public filteredItems = [];

public geneslist;

constructor(private geneServicing: GeneserviceService, private router: Router) { }

/*getallgenes(){
  this.geneServicing.getallgenes().subscribe(res =>{
    this.geneslist = res;
    console.log(this.geneslist)
  })
  $("#modal2").modal('open')
}*/

getalldiseases(){
  /*this.geneServicing.getalldiseases().subscribe(res =>{
    this.diseaseslist = res;
    console.log(this.diseaseslist)
  })*/

  $("#modal2").modal('open')
}


showDisease(name){
  $("#modal2").modal('close')
//this.router.navigate(['diseaseprofile', name])

  console.log("Inside function")
  this.geneServicing.genetodisease(name).subscribe(res =>{

  //console.log("inside service")
  this.disease = res
  console.log(this.disease)
if(this.disease.length == 0){
  console.log("")
}
//console.log(this.disease)
else if(this.disease.length == 1){
  
  console.log(this.disease[0]['diseasename'])
  var diseasename = this.disease[0]['diseasename']
  var genesymbol = this.disease[0]['genesymbol']
  var searchelement = this.disease[0]['searchelement']
  console.log(genesymbol)
  console.log(diseasename)
  console.log(searchelement)
  this.router.navigate(['diseaseprofile', genesymbol, diseasename, searchelement])
  
}
else
{
  console.log(this.disease)
  $("#modal1").modal('open')
  //returntodisease()
}
  //console.log("Went In")
  //console.log(name)
  //this.router.navigate(['diseaseprofile', name])
//}


});


}


returntodisease(genesymbol, diseasename, searchelement)
{
  $("#modal1").modal('close')
  console.log(genesymbol)
  console.log(diseasename)
  
  this.router.navigate(['diseaseprofile', genesymbol, diseasename, searchelement])
/*this.geneServicing.searchGeneDisease(genename, diseasename).subscribe(res =>{
  this.disease = res;
  console.log(this.disease)
})*/
}


/* searchGene(gene) {

this.geneServicing.searchGene(gene).subscribe(gene => this.gene = gene);

return gene;

}*/




filter = function(){
//console.log(this.genealiaslist)
//console.log(this.completelist)
//console.log(this.filterKey)
if (this.filterKey !== ''){
    this.filteredItems = this.completelist.filter(function(e){
        return (e.toLowerCase().substr(0, this.filterKey.length) ==
this.filterKey.toLowerCase()) == true;
    }.bind(this));
    
}

else{
    this.filteredItems = [];
}
}


select = function(item){
  this.filterKey = item;
  this.filteredItems = [];

}





ngOnInit() {

  $(".se-pre-con").fadeOut("slow");
//this.getAllGenes();
$('.slider').slider();
$('.button-collapse').sideNav();
$('.modal').modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: 0,
});



/*this.geneServicing.getallgenealias().subscribe(res =>{

  this.genealiaslist = res;
  console.log(this.genealiaslist)
  for (var each of this.genealiaslist){
  this.completelist.push(each)
}*/

this.geneServicing.getallgenes().subscribe(res =>{
  this.geneslist = res;
  
  for (var each of this.geneslist){
    
    this.completelist.push(each["gene_symbol"])

  }

//console.log(this.completelist)

});

this.geneServicing.getalldiseases().subscribe(res =>{

  this.diseaseslist = res;
  //console.log(this.diseaseslist)
  for (var every of this.diseaseslist){
  this.completelist.push(every)
}
});


//this.completelist.push(this.genealiaslist)
//this.completelist.push(this.diseaseslist)
}

}



