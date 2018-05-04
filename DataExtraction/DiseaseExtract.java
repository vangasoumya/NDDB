package com.uhcl.disease_gene;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
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
import com.github.tsohr.JSONString;

public class DiseaseExtract {

	private static final String FILE_NAME = "M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/TotalDiseasesList.xlsx";

	public static List<String> readDiseaseList(String filename) throws Exception {
		List<String> diseaseList = new ArrayList<String>();

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
					diseaseList.add(currentCell.getStringCellValue());
					// System.out.print(currentCell.getStringCellValue());

				}

			}

		}
		// return genesList;

		return diseaseList;

	}

	public static void writeDiseaseList(List<String> diseaseList) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("DiseaseDetails");
		List<DiseaseDataDTO> diseaseAttributes = getDiseaseAttribute(diseaseList);
		// System.out.println(geneAttributes);
		// System.out.println(geneAttributes.size());
		int rowNum = 0;
		System.out.println("Creating excel");

		for (DiseaseDataDTO diseaseData : diseaseAttributes) {
			Row row = sheet.createRow(rowNum++);
			int colNum = 0;
			
			Cell cell1 = row.createCell(colNum++);
			cell1.setCellValue((String) diseaseData.getGene());
			
			Cell cell2 = row.createCell(colNum++);
			cell2.setCellValue((String) diseaseData.getDisease());

			Cell cell3 = row.createCell(colNum++);
			cell3.setCellValue((String) diseaseData.getSymbols());
			
			Cell cell4 = row.createCell(colNum++);
			cell4.setCellValue((String) diseaseData.getMimNumber());
			
			Cell cell5 = row.createCell(colNum++);
			cell5.setCellValue((String) diseaseData.getLocation());

			

			Cell cell6 = row.createCell(colNum++);
			cell6.setCellValue((String) diseaseData.getPhenotypeMimNumber());

			Cell cell7 = row.createCell(colNum++);
			cell7.setCellValue((String) diseaseData.getAlternateTitles());

			Cell cell8 = row.createCell(colNum++);
			cell8.setCellValue((String) diseaseData.getInheritance());

			Cell cell9 = row.createCell(colNum++);
			cell9.setCellValue((String) diseaseData.getPhenotypeMappingKey());
			
			Cell cell10 = row.createCell(colNum++);
			cell10.setCellValue((String) diseaseData.getSearchedDisease());
		}

		FileOutputStream outputStream = new FileOutputStream(
				"M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/Result1.xlsx");
		workbook.write(outputStream);
		workbook.close();

		System.out.println("Done");

	}

	private static List<DiseaseDataDTO> getDiseaseAttribute(List<String> diseaseList) {

		List<DiseaseDataDTO> diseaseAttributeList = new ArrayList<DiseaseDataDTO>();
//		diseaseList = new ArrayList<String>();
//		
//		diseaseList.add("Lyme disease");
		
		Map<String, String> errorMap = new HashMap<String, String>();

		int count = 0;
		while (count < diseaseList.size()) {

			String value = diseaseList.get(count++);
			//String value = "GM1 gangliosidosis".replaceAll(" ", "%20");
			try {
				StringBuilder json = makeServiceCall(value.replaceAll(" ", "%20"));

				JSONObject jObject = new JSONObject(json.toString());

				JSONObject omim = jObject.getJSONObject("omim");
				JSONObject searchResponse = omim.getJSONObject("searchResponse");

				JSONArray entryList = searchResponse.getJSONArray("entryList");
				//boolean processed = false;
				for (int k = 0; k < entryList.length(); k++) {
					JSONObject entryListData = entryList.getJSONObject(k);

					JSONObject entry = entryListData.getJSONObject("entry");

					String alternateTitles = "";
					JSONObject titles = entry.getJSONObject("titles");
					if (titles.has("alternativeTitles")) {
						alternateTitles = titles.getString("alternativeTitles");

					}
					//String phenotype = titles.getString("preferredTitle");
//
					if (entry.has("phenotypeMapList")) {

						JSONArray phenotypeMapList = entry.getJSONArray("phenotypeMapList");

						for (int j = 0; j < phenotypeMapList.length(); j++) {
							DiseaseDataDTO diseaseObj = new DiseaseDataDTO();
							
							diseaseObj.setAlternateTitles(alternateTitles);

							JSONObject phenotypeMapListData = phenotypeMapList.getJSONObject(j);
							JSONObject phenotypeMap = phenotypeMapListData.getJSONObject("phenotypeMap");
							
							String phenotype = phenotypeMap.getString("phenotype");
							diseaseObj.setDisease(phenotype);
							
							String geneSymbols = phenotypeMap.getString("geneSymbols");
							diseaseObj.setSymbols(geneSymbols);

							int phMimNumb = phenotypeMap.getInt("phenotypeMimNumber");
							String phenotypeMimNumber = Integer.toString(phMimNumb);
							diseaseObj.setPhenotypeMimNumber(phenotypeMimNumber);

							int geneMim = phenotypeMap.getInt("mimNumber");
							String geneMimNumber = Integer.toString(geneMim);
							diseaseObj.setMimNumber(geneMimNumber);

							String cytoLocation = phenotypeMap.getString("cytoLocation");
							diseaseObj.setLocation(cytoLocation);

							if (phenotypeMap.get("phenotypeInheritance") != null && !phenotypeMap.isNull("phenotypeInheritance")) {
								String phenotypeInheritance = phenotypeMap.getString("phenotypeInheritance");
								diseaseObj.setInheritance(phenotypeInheritance);
							}

							int phMappingKey = phenotypeMap.getInt("phenotypeMappingKey");
							String phenotypeMappingKey = Integer.toString(phMappingKey);
							diseaseObj.setPhenotypeMappingKey(phenotypeMappingKey);
							diseaseObj.setSearchedDisease(value);
							diseaseAttributeList.add(diseaseObj);
							System.out.println(diseaseObj);

						}
						
					}		else {
						if(entry.has("geneMap")){
							JSONObject geneMap = entry.getJSONObject("geneMap");
							
							String geneName = geneMap.getString("geneName");
							
							
							StringBuilder geneJson = makeServiceCall(geneName.replaceAll(" ", "%20"));
							System.out.println(geneJson.toString());
							
							JSONObject genejson = new JSONObject(geneJson.toString());
							JSONObject omim1 = genejson.getJSONObject("omim");
							JSONObject searchResponse1 = omim1.getJSONObject("searchResponse");
							
							JSONArray entryList1 = searchResponse1.getJSONArray("entryList");
							
							for (int k1 = 0; k1 < entryList1.length(); k1++) {
								JSONObject entryListData1= entryList1.getJSONObject(k1);
								
								JSONObject entry1 = entryListData1.getJSONObject("entry");
								
								JSONObject geneMap1 = entry1.getJSONObject("geneMap");
								
								String alternateTitles1 = "";
								JSONObject titles1 = entry1.getJSONObject("titles");
								if(titles1.has("alternativeTitles"))
									{
										alternateTitles1 = titles1.getString("alternativeTitles");
										
									}
								
								
								String geneName1 = geneMap1.getString("geneName");
								

								int mim1 = geneMap1.getInt("mimNumber");
								

								String location1 = geneMap1.getString("cytoLocation");
								

								String geneSymbol1 = geneMap1.getString("geneSymbols");
								
								
								if(geneMap1.has("phenotypeMapList")){
								JSONArray phenotypeMapList1 = geneMap1.getJSONArray("phenotypeMapList");
								for (int j = 0; j < phenotypeMapList1.length(); j++) {
									DiseaseDataDTO diseaseobj = new DiseaseDataDTO();
									diseaseobj.setGene(geneName1);
									diseaseobj.setMimNumber(Integer.toString(mim1));
									diseaseobj.setLocation(location1);
									diseaseobj.setSymbols(geneSymbol1);
									diseaseobj.setAlternateTitles(alternateTitles1);
									
									JSONObject phenotypeMapListData = phenotypeMapList1.getJSONObject(j);
									JSONObject phenotypeMap = phenotypeMapListData.getJSONObject("phenotypeMap");
									

									String phenotype1 =  phenotypeMap.getString("phenotype");
									diseaseobj.setDisease(phenotype1);

									int mapKey = phenotypeMap.getInt("phenotypeMappingKey");
									String mappingKey = Integer.toString(mapKey);
									diseaseobj.setPhenotypeMappingKey(mappingKey);

									if(phenotypeMap.has("phenotypeMimNumber")){
									int phMimNumb = phenotypeMap.getInt("phenotypeMimNumber");
									String phMimNmber = Integer.toString(phMimNumb);
									
									diseaseobj.setPhenotypeMimNumber(phMimNmber);
									}
									
									if (phenotypeMap.get("phenotypeInheritance") != null && !phenotypeMap.isNull("phenotypeInheritance"))
									{
//										Object obj = phenotypeMap.get("phenotypeInheritance");
//										System.out.println(obj);
										String phenotypeInheritance = phenotypeMap.getString("phenotypeInheritance");
										diseaseobj.setInheritance(phenotypeInheritance);
									}
									diseaseobj.setSearchedDisease(value);
									diseaseAttributeList.add(diseaseobj);
									System.out.println(diseaseobj);
								}
								}else{
									System.out.println("phenotype details not found for "+value);
								}
							}
							
						}
						
					}

				}
				
			} catch (Exception ex) {
				errorMap.put(value, ex.getMessage());
			}
		}
		System.out.println("The following are errored out");
		System.out.println(errorMap);

		return diseaseAttributeList;

	}

	public static StringBuilder makeServiceCall(String value)
			throws MalformedURLException, IOException, ProtocolException {
		URL url = new URL("https://api.omim.org/api/entry/search?search=" + value + "&include=geneMap&start=0&limit=1");

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
		// parse json
		return json;
	}

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		List<String> diseaseList = readDiseaseList(FILE_NAME);
		//getDiseaseAttribute(diseaseList);
		writeDiseaseList(diseaseList);
	}

}
