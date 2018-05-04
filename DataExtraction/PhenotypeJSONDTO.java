package com.uhcl.disease_gene;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PhenotypeJSONDTO {
	private DiseaseJSONDTO phenoTypeMap;

	public DiseaseJSONDTO getPhenoTypeMap() {
		return phenoTypeMap;
	}

	public void setPhenoTypeMap(DiseaseJSONDTO phenoTypeMap) {
		this.phenoTypeMap = phenoTypeMap;
	}
	
}
