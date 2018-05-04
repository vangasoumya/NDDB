package com.uhcl.disease_gene;

import java.util.List;
import java.util.Map;

public class BaylorDataDTO {
	String disease;
	List<String> HashLinkLists;
	Map<String,String> stringMatchedLinks;
	Map<String, BaylorDiseaseDataDTO> hashlinkMappings;
	
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
	public List<String> getHashLinkLists() {
		return HashLinkLists;
	}
	public void setHashLinkLists(List<String> hashLinkLists) {
		HashLinkLists = hashLinkLists;
	}
	public Map<String, String> getStringMatchedLinks() {
		return stringMatchedLinks;
	}
	public void setStringMatchedLinks(Map<String, String> stringMatchedLinks) {
		this.stringMatchedLinks = stringMatchedLinks;
	}
	public void setHashLinkMappings(Map<String, BaylorDiseaseDataDTO> hashlinkMappings) {
		this.hashlinkMappings = hashlinkMappings;
	}
	public Map<String, BaylorDiseaseDataDTO> getHashlinkMappings() {
		return hashlinkMappings;
	}
	public void setHashlinkMappings(Map<String, BaylorDiseaseDataDTO> hashlinkMappings) {
		this.hashlinkMappings = hashlinkMappings;
	}
	
	
}
