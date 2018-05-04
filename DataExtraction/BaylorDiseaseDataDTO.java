package com.uhcl.disease_gene;

public class BaylorDiseaseDataDTO {
	private String gene;
	private String phenoType;
	private String alternateTitle;
	private String preferredTitle;
	private String location;
	private int phenotypeMimNumber;
	private String inheritance;
	private int geneMimNumber;
	private int mappingKey;
	
	
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public int getPhenotypeMimNumber() {
		return phenotypeMimNumber;
	}
	public void setPhenotypeMimNumber(int phenotypeMimNumber) {
		this.phenotypeMimNumber = phenotypeMimNumber;
	}
	public String getInheritance() {
		return inheritance;
	}
	public void setInheritance(String inheritance) {
		this.inheritance = inheritance;
	}
	public int getGeneMimNumber() {
		return geneMimNumber;
	}
	public void setGeneMimNumber(int geneMimNumber) {
		this.geneMimNumber = geneMimNumber;
	}
	public int getMappingKey() {
		return mappingKey;
	}
	public void setMappingKey(int mappingKey) {
		this.mappingKey = mappingKey;
	}
	public String getGene() {
		return gene;
	}
	public void setGene(String gene) {
		this.gene = gene;
	}
	public String getPhenoType() {
		return phenoType;
	}
	public void setPhenoType(String phenoType) {
		this.phenoType = phenoType;
	}
	public String getAlternateTitle() {
		return alternateTitle;
	}
	public void setAlternateTitle(String alternateTitle) {
		this.alternateTitle = alternateTitle;
	}
	public String getPreferredTitle() {
		return preferredTitle;
	}
	public void setPreferredTitle(String preferredTitle) {
		this.preferredTitle = preferredTitle;
	}
	
	
}
