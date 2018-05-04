import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Gene} from './gene'
import 'rxjs/add/operator/map'

@Injectable()
export class GeneserviceService {

  constructor(private http: Http) { }

/*getGenes()
{
  return this.http.get('http://localhost:3000/api/genes')
  .map(res => res.json());
}*/

/*addGenes(newGene)
{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/geneadd', newGene, {headers: headers})
    .map(res => res.json());
}*/

searchGene(genename) 
{
  console.log("service" + genename)
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/api/genedata/'+genename, {headers:headers})
  .map(res => res.json());
}

searchGeneDisease(genesymbol, diseasename)
{
  console.log("service" + genesymbol)
  console.log("service" + diseasename)
  //var headers = new Headers();
  //headers.append('Content-Type', 'application/json');
  return this.http.get('http://localhost:3000/api/geneanddisease/'+genesymbol+"/"+diseasename)
  .map(res => res.json());
}

updateGene(updatedtext)
{
  console.log(updatedtext)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/geneupdate', updatedtext, {headers:headers})
    .map(res => res.json());

}

genetodisease(name)
{
    //var headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/api/genetodisease/'+genename, {headers:headers})
    //.map(res => res.json());
    return this.http.get('http://localhost:3000/api/genetodisease/'+name)
  .map(res => res.json());

}

getdiseaseinfo(diseasename){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/diseasedata/'+diseasename, {headers:headers})
    .map(res => res.json());
}


getallgenealias(){
  return this.http.get('http://localhost:3000/api/allgenealias/')
    .map(res => res.json());
}

getalldiseases(){
  return this.http.get('http://localhost:3000/api/alldiseases/')
    .map(res => res.json());
}


addPathogenicservice(newpathogenic){
  console.log(newpathogenic)
  var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/addpathogenic/', newpathogenic, {headers:headers})
    .map(res => res.json());
}

addModifierservice(newmodifier){
  console.log(newmodifier)
  var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/addmodifier/', newmodifier, {headers:headers})
    .map(res => res.json());
}

getallgenes(){
  return this.http.get('http://localhost:3000/api/allgenes/')
    .map(res => res.json());
}


}
