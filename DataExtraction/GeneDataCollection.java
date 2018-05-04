package com.uhcl.disease_gene;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
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

public class GeneDataCollection {

	private static final String FILE_NAME = "C:/Users/skkurash/Desktop/check.xlsx";

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
//					System.out.println(currentCell.getStringCellValue());
				}

			}

		}
		// return genesList;
		
		return genesList;

	}

	public static void writeGenesList(List<String> genesList) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("GeneDetails");
		List<DataDTO> geneAttributes = getGeneData(genesList);
		int rowNum = 0;
		System.out.println("Creating excel");

		for (DataDTO geneData : geneAttributes) {
			Row row = sheet.createRow(rowNum++);
			int colNum = 0;

			Cell cell1 = row.createCell(colNum++);
			cell1.setCellValue((String) geneData.getInputgeneName());

			Cell cell2 = row.createCell(colNum++);
			cell2.setCellValue((String) geneData.getMimNumber());

			Cell cell3 = row.createCell(colNum++);
			cell3.setCellValue((String) geneData.getGene());

			Cell cell4 = row.createCell(colNum++);
			cell4.setCellValue((String) geneData.getAlternateTitles());

			Cell cell5 = row.createCell(colNum++);
			cell5.setCellValue((String) geneData.getSymbols());

			Cell cell6 = row.createCell(colNum++);
			cell6.setCellValue((String) geneData.getLocation());

			Cell cell7 = row.createCell(colNum++);
			cell7.setCellValue((String) geneData.getDisease());

			Cell cell8 = row.createCell(colNum++);
			cell8.setCellValue((String) geneData.getPhenotypeMimNumber());

			Cell cell9 = row.createCell(colNum++);
			cell9.setCellValue((String) geneData.getInheritance());

			Cell cell10 = row.createCell(colNum++);
			cell10.setCellValue((String) geneData.getPhenotypeMappingKey());

		}

		FileOutputStream outputStream = new FileOutputStream(
				"M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/checkDiseaseResult.xlsx");
		workbook.write(outputStream);
		workbook.close();

		System.out.println("Done");

	}

	static List<DataDTO> getGeneData(List<String> genesList) throws Exception {
		List<DataDTO> geneAttributeList = new ArrayList<DataDTO>();
		Map<String, String> errorMap = new HashMap<String, String>();
		for (String str : genesList) {
			System.out.println("input is " + str);
			String value = str;

			if (value.contains("-")) {
				value = value.replaceAll("-", " ");
			}
			String[] input = value.replaceAll("[()]", "").split(" ");
			System.out.println(Arrays.asList(input));

			URL url = new URL("https://api.omim.org/api/entry/search?search=" + value.replaceAll(" ", "%20")
					+ "&start=0&limit=10&include=geneMap");

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
			//boolean foundAtleastOne = false;
			
			if(entryList.length() == 0){
				DataDTO geneobj = new DataDTO();
				geneobj.setInputgeneName(value);
				geneAttributeList.add(geneobj);
			}
			for (int k = 0; k < entryList.length(); k++) {
				JSONObject entryListData = entryList.getJSONObject(k);

				JSONObject entry = entryListData.getJSONObject("entry");

				if (entry.has("prefix") && !entry.getString("prefix").equals("*")
						&& !entry.getString("prefix").equals("+")) 
				{
//					if ((k == entryList.length()-1) && !foundAtleastOne)
//					{
//						DataDTO geneobj = new DataDTO();
//						geneobj.setInputgeneName(value);
//						geneAttributeList.add(geneobj);
//					}
					continue;
				}
				
				JSONObject titles = entry.getJSONObject("titles");
				String preferredTitle = titles.getString("preferredTitle");
				String alternativeTitles = "";
				if (titles.has("alternativeTitles")) {
					alternativeTitles = titles.getString("alternativeTitles");
				}
				if (compare(input, titles)) {
					if (!entry.has("geneMap")) {
						System.out.println("Entry has no genemap...............");
						DataDTO geneobj = new DataDTO();
						int mim = entry.getInt("mimNumber");
						geneobj.setInputgeneName(value);
						geneobj.setAlternateTitles(alternativeTitles);
						geneobj.setMimNumber(Integer.toString(mim));
						geneobj.setGene(preferredTitle);
						geneobj.setDisease("No Disease found");
						geneAttributeList.add(geneobj);
						break;
					}
					JSONObject geneMap = entry.getJSONObject("geneMap");

					String geneName = geneMap.getString("geneName");

					int mim = geneMap.getInt("mimNumber");

					String location = geneMap.getString("cytoLocation");

					String geneSymbol = geneMap.getString("geneSymbols");
					if (geneMap.has("phenotypeMapList")) {
						JSONArray phenotypeMapList = geneMap.getJSONArray("phenotypeMapList");
						for (int j = 0; j < phenotypeMapList.length(); j++) {
							DataDTO geneobj = new DataDTO();
							geneobj.setGene(geneName);
							geneobj.setMimNumber(Integer.toString(mim));
							geneobj.setLocation(location);
							geneobj.setSymbols(geneSymbol);
							geneobj.setAlternateTitles(alternativeTitles);

							JSONObject phenotypeMapListData = phenotypeMapList.getJSONObject(j);
							JSONObject phenotypeMap = phenotypeMapListData.getJSONObject("phenotypeMap");

							String phenotype = phenotypeMap.getString("phenotype");
							geneobj.setDisease(phenotype);

							int mapKey = phenotypeMap.getInt("phenotypeMappingKey");
							String mappingKey = Integer.toString(mapKey);
							geneobj.setPhenotypeMappingKey(mappingKey);

							if (phenotypeMap.has("phenotypeMimNumber")) {
								int phMimNumb = phenotypeMap.getInt("phenotypeMimNumber");
								String phMimNmber = Integer.toString(phMimNumb);

								geneobj.setPhenotypeMimNumber(phMimNmber);
							}

							if (phenotypeMap.get("phenotypeInheritance") != null
									&& !phenotypeMap.isNull("phenotypeInheritance")) {
								String phenotypeInheritance = phenotypeMap.getString("phenotypeInheritance");
								geneobj.setInheritance(phenotypeInheritance);
							}

							geneobj.setInputgeneName(value);
							geneAttributeList.add(geneobj);
							System.out.println("list is " + geneAttributeList);
						}
					} else {
						DataDTO geneobj = new DataDTO();
						geneobj.setGene(geneName);
						geneobj.setMimNumber(Integer.toString(mim));
						geneobj.setLocation(location);
						geneobj.setSymbols(geneSymbol);
						geneobj.setAlternateTitles(alternativeTitles);
						geneobj.setDisease("No disease found");
						geneobj.setInputgeneName(value);
						geneAttributeList.add(geneobj);
						// System.out.println("phenotype details not found for "
						// + value);
					}
					break;
				}
				else
				{
					DataDTO geneobj = new DataDTO();
					geneobj.setInputgeneName(value);
					geneAttributeList.add(geneobj);
				}
			}

		}

		return geneAttributeList;

	}

	public static boolean compare(String[] input, JSONObject titles) {
		boolean check = false;
		String preferredTitle = titles.getString("preferredTitle");
		String alternativeTitles = "";
		if (titles.has("alternativeTitles")) {
			alternativeTitles = titles.getString("alternativeTitles");
		}

		for (String val : input) {
			if (preferredTitle.toUpperCase().contains(val.toUpperCase())
					|| alternativeTitles.toUpperCase().contains(val.toUpperCase())) {

				check = true;
			} else {
				check = false;
				break;

			}
		}
		return check;

	}

	public static void main(String[] args) throws Exception {
		List<String> genesList = readGenesList(FILE_NAME);
//		writeGenesList(genesList);
		// getGeneData(genesList);
	}

}
