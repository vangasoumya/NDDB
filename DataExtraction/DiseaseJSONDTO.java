package com.uhcl.disease_gene;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DiseaseJSONDTO {
  private String phenotypeMimNumber;
  private String phenotype;
  private String phenotypeMappingKey;
  private String phenotypeInheritance;
public String getPhenotypeMimNumber() {
	return phenotypeMimNumber;
}
public void setPhenotypeMimNumber(String phenotypeMimNumber) {
	this.phenotypeMimNumber = phenotypeMimNumber;
}
public String getPhenotype() {
	return phenotype;
}
public void setPhenotype(String phenotype) {
	this.phenotype = phenotype;
}
public String getPhenotypeMappingKey() {
	return phenotypeMappingKey;
}
public void setPhenotypeMappingKey(String phenotypeMappingKey) {
	this.phenotypeMappingKey = phenotypeMappingKey;
}
public String getPhenotypeInheritance() {
	return phenotypeInheritance;
}
public void setPhenotypeInheritance(String phenotypeInheritance) {
	this.phenotypeInheritance = phenotypeInheritance;
}
    
}
