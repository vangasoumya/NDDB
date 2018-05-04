package com.uhcl.disease_gene;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;

public class BaylorDisease {
	private static final String FILE_NAME = "C:/Users/skkurash/Desktop/checkDisease.xlsx";

	public static List<String> readGenesList(String filename) throws Exception {
		List<String> genesList = new ArrayList<String>();

		FileInputStream excelFile = new FileInputStream(new File(FILE_NAME));
		Workbook workbook = new XSSFWorkbook(excelFile);
		Sheet datatypeSheet = workbook.getSheetAt(0);
		Iterator<Row> iterator = datatypeSheet.iterator();

		while (iterator.hasNext()) {

			Row currentRow = iterator.next();
			Iterator<Cell> cellIterator = currentRow.iterator();

			while (cellIterator.hasNext()) {

				Cell currentCell = cellIterator.next();
				// getCellTypeEnum shown as deprecated for version 3.15
				// getCellTypeEnum ill be renamed to getCellType starting
				// from version 4.0
				if (currentCell.getCellTypeEnum() == CellType.STRING) {
					genesList.add(currentCell.getStringCellValue());

				}

			}

		}
		System.out.println(Arrays.asList(genesList));
		workbook.close();
		return genesList;

	}

	public static void writeGenesList(List<String> genesList) throws Exception {
//		XSSFWorkbook workbook = new XSSFWorkbook();
//		XSSFSheet sheet = workbook.createSheet("GeneDetails");
////		List<BaylorDataDTO> objList = getEntries(genesList);
//		BaylorDataDTO obj = getEntries(genesList);
//		System.out.println("Creating excel");
//
//		int rowNum = 0;
//		int colNum = 0;
//
//			Row row = sheet.createRow(rowNum++);
//			Cell cell1 = row.createCell(colNum++);
//			cell1.setCellValue(obj.getDisease());
//			int k = 0;
//
//			List<String> hashLinkLists = obj.getHashLinkLists();
//			Map<String, String> stringMatchedLinks = obj.getStringMatchedLinks();
//			List<String> l = new ArrayList<String>(stringMatchedLinks.keySet());
//			int lIndex = 0;
//			int key = 0;
//			for (int i = 1; i <= hashLinkLists.size(); i++) {
//				Cell cell_List = row.createCell(1);
//				cell_List.setCellValue(hashLinkLists.get(k++));
//
//				if (lIndex < l.size()) {
//					Cell cell2 = row.createCell(2);
//					cell2.setCellValue(l.get(lIndex++));
//
//					Cell cell3 = row.createCell(3);
//					cell3.setCellValue(stringMatchedLinks.get(l.get(key++)));
//
//				}
//				row = sheet.createRow(i);
//				rowNum = i;
//			}
//
//			//
//			//
//			// int i=0;
//			// for(String key : stringMatchedLinks.keySet()){
//			// Cell cell3 = row.createCell(3);
//			// cell3.setCellValue(key);
//			//
//			// Cell cell4 = row.createCell(4);
//			// cell4.setCellValue(stringMatchedLinks.get(key));
//			//
//			// row = sheet.createRow(i++);
//			//
//			// }
//
//		
//		FileOutputStream outputStream = new FileOutputStream(
//				"M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/checkResult.xlsx");
//		workbook.write(outputStream);
//		workbook.close();
//
//		System.out.println("Done");
//
	}	
	public static void writeGenesListNew(List<String> genesList) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("GeneDetails");
		List<BaylorDataDTO> objList = getEntries(genesList);
		//BaylorDataDTO obj = getEntries(genesList);
		System.out.println("Creating excel");

		int rowNum = 1;
		int colNum = 0;
		for(BaylorDataDTO obj : objList){
			Row row = sheet.createRow(rowNum);
			Cell cell1 = row.createCell(0);
			cell1.setCellValue(obj.getDisease());
			System.out.println(obj.getDisease());
			Map<String, BaylorDiseaseDataDTO> hashlinkMappings = obj.getHashlinkMappings();
			for (java.util.Map.Entry<String, BaylorDiseaseDataDTO> hashMapping:hashlinkMappings.entrySet()) {
				Cell cell_List = row.createCell(1);
				cell_List.setCellValue(hashMapping.getKey());
				
				BaylorDiseaseDataDTO mappingVal = hashMapping.getValue();
				if (mappingVal != null)	{
						Cell cell2 = row.createCell(2);
						cell2.setCellValue(mappingVal.getPreferredTitle());

						Cell cell3 = row.createCell(3);
						cell3.setCellValue(mappingVal.getAlternateTitle());
						
						Cell cell4 = row.createCell(4);
						cell4.setCellValue(mappingVal.getPhenoType());
						
						Cell cell5 = row.createCell(5);
						cell5.setCellValue(mappingVal.getGene());
						
						Cell cell6 = row.createCell(6);
						cell6.setCellValue(mappingVal.getPhenotypeMimNumber());
						
						Cell cell7 = row.createCell(7);
						cell7.setCellValue(mappingVal.getLocation());
						Cell cell8 = row.createCell(8);
						cell8.setCellValue(mappingVal.getInheritance());
						Cell cell9 = row.createCell(9);
						cell9.setCellValue(mappingVal.getMappingKey());
						Cell cell10 = row.createCell(10);
						cell10.setCellValue(mappingVal.getGeneMimNumber());
						
				}

				row = sheet.createRow(++rowNum);
			}
			System.out.println(rowNum);
			rowNum++;
		}
		FileOutputStream outputStream = new FileOutputStream(
				"M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/checkResult.xlsx");
		workbook.write(outputStream);
		workbook.close();

		System.out.println("Done");

	}

	private static List<BaylorDataDTO> getEntries(List<String> genesList) throws Exception {
		List<BaylorDataDTO> listResult = new ArrayList<BaylorDataDTO>();
		
		for (String str : genesList) {
			BaylorDataDTO obj = new BaylorDataDTO();
			String value = str;

			if (value.contains("-")) {
				value = value.replaceAll("-", " ");
			}
			String[] input = value.replaceAll("[()]", "").split(" ");

			URL url = new URL("https://api.omim.org/api/entry/search?search=" + value.replaceAll(" ", "%20"));

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("apikey", "5ikcTWQLTcSwUHSWpqncZQ");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			StringBuilder json = new StringBuilder();

			while ((output = br.readLine()) != null) {
				json.append(output);
			}
			conn.disconnect();

			JSONObject jObject = new JSONObject(json.toString());
			JSONObject omim = jObject.getJSONObject("omim");
			JSONObject searchResponse = omim.getJSONObject("searchResponse");
			int totalResults = searchResponse.getInt("totalResults");
			List<String> hashLinksList = getHashLinks(value, totalResults);
			Map<String, String> stringMatchedLinks = getStringMatchedLinks(value, hashLinksList);
			System.out.println("Value is "+value);
			System.out.println("got stringmatched");
			Map<String, BaylorDiseaseDataDTO> hashlinkMappings = getHashLinkMappings(value, hashLinksList, totalResults);
			
			System.out.println("got hash map links");

			obj.setDisease(str);
			obj.setHashLinkLists(hashLinksList);
			obj.setStringMatchedLinks(stringMatchedLinks);
			obj.setHashLinkMappings(hashlinkMappings);
			
			listResult.add(obj);

//			System.out.println(Arrays.asList(input) + "-" + totalResults + " - " + hashLinksList);
//			System.out.println("string matched links are : " + stringMatchedLinks);
		}
		
		return listResult;
		//return obj;
	}

	private static Map<String, BaylorDiseaseDataDTO> getHashLinkMappings(
			String value, List<String> hashLinksList, int totalResults) throws Exception{
		Map<String, BaylorDiseaseDataDTO> hashlinkMappings = new LinkedHashMap<String, BaylorDiseaseDataDTO>();
		int totalPages = totalResults/20 + 1;
		int startIndex = 0;
		int endIndex = 20;
		
		for (int i = 0; i < totalPages; i++) {
		String[] input = value.replaceAll("[()]", "").split(" ");
		URL url = new URL("https://api.omim.org/api/entry/search?search=" + value.replaceAll(" ", "%20")
				+ "&start="+startIndex+"&limit="+endIndex+"&include=geneMap");

		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("apikey", "5ikcTWQLTcSwUHSWpqncZQ");
		conn.setRequestProperty("Accept", "application/json");

		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
		}

		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		String output;
		StringBuilder json = new StringBuilder();

		while ((output = br.readLine()) != null) {
			json.append(output);
		}
		conn.disconnect();

		JSONObject jObject = new JSONObject(json.toString());
		JSONObject omim = jObject.getJSONObject("omim");
		JSONObject searchResponse = omim.getJSONObject("searchResponse");
		JSONArray entryList = searchResponse.getJSONArray("entryList");

		if (entryList.length() != 0) {
			for (int k = 0; k < entryList.length(); k++) {
				JSONObject entryListData = entryList.getJSONObject(k);

				JSONObject entry = entryListData.getJSONObject("entry");

				if (entry.has("prefix") && !entry.getString("prefix").equals("#")
						&& !entry.getString("prefix").equals("%")) {
					continue;
				}
				JSONObject titles = entry.getJSONObject("titles");
				String preferredTitle = titles.getString("preferredTitle");
				String alternativeTitles = "";
				if (titles.has("alternativeTitles")) {
					alternativeTitles = titles.getString("alternativeTitles");
				}
				if (compare(input, titles)) {
					String phenotype = "";
					String gene = "";
					String location = "";
					int mappingKey =0;
					int geneMimNumber = 0;
					String phenotypeInheritance = "";
					int phenotypeMimNumber = 0;
					if (entry.has("phenotypeMapList")) {

						JSONArray phenotypeMapList = entry.getJSONArray("phenotypeMapList");
						
						for (int j = 0; j < phenotypeMapList.length(); j++) {
							JSONObject phenotypeMapListData = phenotypeMapList.getJSONObject(j);
							JSONObject phenotypeMap = phenotypeMapListData.getJSONObject("phenotypeMap");
							
							phenotype = phenotype+";"+phenotypeMap.getString("phenotype");
							location = phenotypeMap.getString("cytoLocation");
							mappingKey = phenotypeMap.getInt("phenotypeMappingKey");
							geneMimNumber = phenotypeMap.getInt("mimNumber");
							if (phenotypeMap.get("phenotypeInheritance") != null && !phenotypeMap.isNull("phenotypeInheritance")) {
								phenotypeInheritance = phenotypeMap.getString("phenotypeInheritance");
							}
							phenotypeMimNumber = phenotypeMap.getInt("phenotypeMimNumber");
							
							if(phenotypeMap.has("geneSymbols")){
								String[] geneSymbol = phenotypeMap.getString("geneSymbols").split(",");
								gene = gene+";"+geneSymbol[0];
							}
							
						}
					}
					BaylorDiseaseDataDTO baylorDisDTO = new BaylorDiseaseDataDTO();
					
					baylorDisDTO.setPreferredTitle(preferredTitle);
					baylorDisDTO.setAlternateTitle(alternativeTitles);
					baylorDisDTO.setGene(gene.isEmpty()?gene:gene.substring(1));
					baylorDisDTO.setPhenoType(phenotype.isEmpty()?phenotype:phenotype.substring(1));
					//stringMatchedLinks.put(preferredTitle, alternativeTitles);
					baylorDisDTO.setGeneMimNumber(geneMimNumber);
					baylorDisDTO.setInheritance(phenotypeInheritance);
					baylorDisDTO.setLocation(location);
					baylorDisDTO.setMappingKey(mappingKey);
					baylorDisDTO.setPhenotypeMimNumber(phenotypeMimNumber);
					
					hashlinkMappings.put(preferredTitle, baylorDisDTO);
				}
				else
				{
					hashlinkMappings.put(preferredTitle, null);
				}
			}
		}
		startIndex = startIndex+20;
		endIndex = endIndex + 20;
		}
		
		return hashlinkMappings;
	}

	private static Map<String, String> getStringMatchedLinks(String value, List<String> hashLinksList)
			throws IOException {

		Map<String, String> stringMatchedLinks = new LinkedHashMap<String, String>();
		String[] input = value.replaceAll("[()]", "").split(" ");
		URL url = new URL("https://api.omim.org/api/entry/search?search=" + value.replaceAll(" ", "%20")
				+ "&start=0&limit=20&include=geneMap");

		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("apikey", "5ikcTWQLTcSwUHSWpqncZQ");
		conn.setRequestProperty("Accept", "application/json");

		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
		}

		BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

		String output;
		StringBuilder json = new StringBuilder();

		while ((output = br.readLine()) != null) {
			json.append(output);
		}
		conn.disconnect();

		JSONObject jObject = new JSONObject(json.toString());
		JSONObject omim = jObject.getJSONObject("omim");
		JSONObject searchResponse = omim.getJSONObject("searchResponse");
		JSONArray entryList = searchResponse.getJSONArray("entryList");

		if (entryList.length() != 0) {
			for (int k = 0; k < entryList.length(); k++) {
				JSONObject entryListData = entryList.getJSONObject(k);

				JSONObject entry = entryListData.getJSONObject("entry");

				if (entry.has("prefix") && !entry.getString("prefix").equals("#")
						&& !entry.getString("prefix").equals("%")) {
					continue;
				}
				JSONObject titles = entry.getJSONObject("titles");
				String preferredTitle = titles.getString("preferredTitle");
				String alternativeTitles = "";
				if (titles.has("alternativeTitles")) {
					alternativeTitles = titles.getString("alternativeTitles");
				}
				if (compare(input, titles)) {
					stringMatchedLinks.put(preferredTitle, alternativeTitles);
				}
			}
		}
		return stringMatchedLinks;
	}

	private static boolean compare(String[] input, JSONObject titles) {
		boolean check = false;
		String preferredTitle = titles.getString("preferredTitle");
		String alternativeTitles = "";
		String includedTitles = "";
		if (titles.has("alternativeTitles")) {
			alternativeTitles = titles.getString("alternativeTitles");
		}
		if(titles.has("includedTitles")){
			includedTitles = titles.getString("includedTitles");
		}

		for (String val : input) {
			if (preferredTitle.toUpperCase().contains(val.toUpperCase())
					|| alternativeTitles.toUpperCase().contains(val.toUpperCase()) || includedTitles.toUpperCase().contains(val.toUpperCase())) {

				check = true;
			} else {
				check = false;
				break;

			}
		}
		return check;

	}

	private static List<String> getHashLinks(String value, int totalResults) throws Exception {
		List<String> HashLinksList = new ArrayList<String>();
		String[] input = value.replaceAll("[()]", "").split(" ");
		int startIndex = 0;
		int endIndex = 20;
		for (int i = 0; i < 2; i++) {
			URL url = new URL("https://api.omim.org/api/entry/search?search=" + value.replaceAll(" ", "%20") + "&start="
					+ startIndex + "&limit=" + endIndex + "&include=geneMap");

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("apikey", "5ikcTWQLTcSwUHSWpqncZQ");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			StringBuilder json = new StringBuilder();

			while ((output = br.readLine()) != null) {
				json.append(output);
			}
			conn.disconnect();

			JSONObject jObject = new JSONObject(json.toString());
			JSONObject omim = jObject.getJSONObject("omim");
			JSONObject searchResponse = omim.getJSONObject("searchResponse");
			JSONArray entryList = searchResponse.getJSONArray("entryList");

			if (entryList.length() != 0) {
				for (int k = 0; k < entryList.length(); k++) {
					JSONObject entryListData = entryList.getJSONObject(k);

					JSONObject entry = entryListData.getJSONObject("entry");

					if (entry.has("prefix") && !entry.getString("prefix").equals("#")
							&& !entry.getString("prefix").equals("%")) {
						continue;
					}
					JSONObject titles = entry.getJSONObject("titles");
					String preferredTitle = titles.getString("preferredTitle");
					HashLinksList.add(preferredTitle);
				}
			}
			startIndex += 20;
			endIndex += 20;
		}
		return HashLinksList;

	}

	public static void main(String[] args) throws Exception {
		List<String> genesList = readGenesList(FILE_NAME);
		writeGenesListNew(genesList);
	}

}
