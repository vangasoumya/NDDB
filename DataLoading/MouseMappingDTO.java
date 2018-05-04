package com.uhcl.webScraper;

import java.util.List;

import org.bson.types.ObjectId;

public class MouseMappingDTO {
	private String gene;
	private List<ObjectId> mouse_allele;
	public String getGene() {
		return gene;
	}
	public void setGene(String gene) {
		this.gene = gene;
	}
	public List<ObjectId> getMouse_allele() {
		return mouse_allele;
	}
	public void setMouse_allele(List<ObjectId> mouse_allele) {
		this.mouse_allele = mouse_allele;
	}
	
}
