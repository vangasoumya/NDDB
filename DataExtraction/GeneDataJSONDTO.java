package com.uhcl.disease_gene;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GeneDataJSONDTO {
 private String geneName;
 
 private List<PhenotypeJSONDTO> phenotypeMapList;

public String getGeneName() {
	return geneName;
}

public void setGeneName(String geneName) {
	this.geneName = geneName;
}

public List<PhenotypeJSONDTO> getPhenotypeMapList() {
	return phenotypeMapList;
}

public void setPhenotypeMapList(List<PhenotypeJSONDTO> phenotypeMapList) {
	this.phenotypeMapList = phenotypeMapList;
}
 
}
