package com.uhcl.disease_gene;

public class DataDTO {
	private String gene;
	private String disease;
	private String symbols;
	private String location;
	private String mimNumber;
	private String inheritance;
	private String phenotypeMappingKey;
	private String phenotypeMimNumber;
	private String alternateTitles;
	private String InputgeneName;
	
	
	public String getInputgeneName() {
		return InputgeneName;
	}
	public void setInputgeneName(String inputgeneName) {
		InputgeneName = inputgeneName;
	}
	public String getAlternateTitles() {
		return alternateTitles;
	}
	public void setAlternateTitles(String alternateTitles) {
		this.alternateTitles = alternateTitles;
	}
	public String getPhenotypeMimNumber() {
		return phenotypeMimNumber;
	}
	public void setPhenotypeMimNumber(String phenotypeMimNumber) {
		this.phenotypeMimNumber = phenotypeMimNumber;
	}
	public String getGene() {
		return gene;
	}
	public void setGene(String gene) {
		this.gene = gene;
	}
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
	public String getSymbols() {
		return symbols;
	}
	public void setSymbols(String symbols) {
		this.symbols = symbols;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getMimNumber() {
		return mimNumber;
	}
	public void setMimNumber(String mimNumber) {
		this.mimNumber = mimNumber;
	}
	public String getInheritance() {
		return inheritance;
	}
	public void setInheritance(String inheritance) {
		this.inheritance = inheritance;
	}
	public String getPhenotypeMappingKey() {
		return phenotypeMappingKey;
	}
	public void setPhenotypeMappingKey(String phenotypeMappingKey) {
		this.phenotypeMappingKey = phenotypeMappingKey;
	}
	
	public String toString(){
		return ""+gene+" : "+mimNumber+":"+symbols+":"+location+":"+disease+":"+phenotypeMimNumber+":"+alternateTitles+":"+inheritance+":"+phenotypeMappingKey;
	}
}
