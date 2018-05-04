package com.uhcl.webScraper;

import java.util.List;

import org.bson.types.ObjectId;

public class FlyMappingDTO {
	private String gene;
	private List<ObjectId> fly_allele;
	public String getGene() {
		return gene;
	}
	public void setGene(String gene) {
		this.gene = gene;
	}
	public List<ObjectId> getFly_allele() {
		return fly_allele;
	}
	public void setFly_allele(List<ObjectId> fly_allele) {
		this.fly_allele = fly_allele;
	}
	
	
}
