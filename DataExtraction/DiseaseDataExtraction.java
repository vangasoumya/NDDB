package com.uhcl.disease_gene;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
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

public class ApachePOIExcelRead {

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
					// System.out.print(currentCell.getStringCellValue());

				}

			}

		}
		// return genesList;

		return genesList;

	}

	public static void writeGenesList(List<String> genesList) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("GeneDetails");
		List<DataDTO> geneAttributes = getGeneAttribute(genesList);
		//System.out.println(geneAttributes);
		//System.out.println(geneAttributes.size());
		int rowNum = 0;
		System.out.println("Creating excel");

		for (DataDTO geneData : geneAttributes) {
			Row row = sheet.createRow(rowNum++);
			int colNum = 0;

			Cell cell1 = row.createCell(colNum++);
			cell1.setCellValue((String) geneData.getGene());
			
			Cell cell2 = row.createCell(colNum++);
			cell2.setCellValue((String) geneData.getMimNumber());

			Cell cell3 = row.createCell(colNum++);
			cell3.setCellValue((String) geneData.getSymbols());
			

			Cell cell4 = row.createCell(colNum++);
			cell4.setCellValue((String) geneData.getLocation());
			
			Cell cell5 = row.createCell(colNum++);
			cell5.setCellValue((String) geneData.getDisease());			


			Cell cell6 = row.createCell(colNum++);
			cell6.setCellValue((String) geneData.getPhenotypeMimNumber());

			Cell cell7 = row.createCell(colNum++);
			cell7.setCellValue((String) geneData.getAlternateTitles());


			Cell cell8 = row.createCell(colNum++);
			cell8.setCellValue((String) geneData.getInheritance());			


			Cell cell9 = row.createCell(colNum++);
			cell9.setCellValue((String) geneData.getPhenotypeMappingKey());
			
			Cell cell10 = row.createCell(colNum++);
			cell10.setCellValue((String) geneData.getInputgeneName());


		}

		FileOutputStream outputStream = new FileOutputStream(
				"M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/checkres.xlsx");
		workbook.write(outputStream);
		workbook.close();

		System.out.println("Done");

	}

	private static List<DataDTO> getGeneAttribute(List<String> genesList) throws Exception {

		List<DataDTO> geneAttributeList = new ArrayList<DataDTO>();
		Map<String, String> errorMap = new HashMap<String, String>();
		
		int count = 0;

		// for (int geneIndex = 0; geneIndex < genesList.size(); geneIndex++) {

		// String value = genesList.get(geneIndex);
		while (count < genesList.size()) {
			String str = genesList.get(count++);
			
			String value = str.replaceAll(" ", "%20");
			//value = value.replaceAll("", replacement)
			

			try
			{
			URL url = new URL(
					"https://api.omim.org/api/entry/search?search='"+value+"'&start=0&limit=1&include=geneMap");
			//System.out.println(url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("apikey", "5ikcTWQLTcSwUHSWpqncZQ");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			//System.out.println("Output from Server .... \n");
			StringBuilder json = new StringBuilder();

			while ((output = br.readLine()) != null) {
				json.append(output);
			}

			conn.disconnect();

			JSONObject jObject = new JSONObject(json.toString());
			JSONObject omim = jObject.getJSONObject("omim");
			JSONObject searchResponse = omim.getJSONObject("searchResponse");
			
			JSONArray entryList = searchResponse.getJSONArray("entryList");
			
			for (int k = 0; k < entryList.length(); k++) {
				JSONObject entryListData = entryList.getJSONObject(k);
				
				JSONObject entry = entryListData.getJSONObject("entry");
				
				JSONObject geneMap = entry.getJSONObject("geneMap");
				
				String alternateTitles = "";
				JSONObject titles = entry.getJSONObject("titles");
				if(titles.has("alternativeTitles"))
					{
						alternateTitles = titles.getString("alternativeTitles");
						
					}
				
				
				String geneName = geneMap.getString("geneName");
				

				int mim = geneMap.getInt("mimNumber");
				

				String location = geneMap.getString("cytoLocation");
				

				String geneSymbol = geneMap.getString("geneSymbols");
				
				
				if(geneMap.has("phenotypeMapList")){
				JSONArray phenotypeMapList = geneMap.getJSONArray("phenotypeMapList");
				for (int j = 0; j < phenotypeMapList.length(); j++) {
					DataDTO geneobj = new DataDTO();
					geneobj.setGene(geneName);
					geneobj.setMimNumber(Integer.toString(mim));
					geneobj.setLocation(location);
					geneobj.setSymbols(geneSymbol);
					geneobj.setAlternateTitles(alternateTitles);
					
					JSONObject phenotypeMapListData = phenotypeMapList.getJSONObject(j);
					JSONObject phenotypeMap = phenotypeMapListData.getJSONObject("phenotypeMap");
					

					String phenotype =  phenotypeMap.getString("phenotype");
					geneobj.setDisease(phenotype);

					int mapKey = phenotypeMap.getInt("phenotypeMappingKey");
					String mappingKey = Integer.toString(mapKey);
					geneobj.setPhenotypeMappingKey(mappingKey);

					if(phenotypeMap.has("phenotypeMimNumber")){
					int phMimNumb = phenotypeMap.getInt("phenotypeMimNumber");
					String phMimNmber = Integer.toString(phMimNumb);
					
					geneobj.setPhenotypeMimNumber(phMimNmber);
					}
					
					if (phenotypeMap.get("phenotypeInheritance") != null && !phenotypeMap.isNull("phenotypeInheritance"))
					{
						String phenotypeInheritance = phenotypeMap.getString("phenotypeInheritance");
						geneobj.setInheritance(phenotypeInheritance);
					}
					
					geneobj.setInputgeneName(str);
					geneAttributeList.add(geneobj);
					System.out.println(geneobj);
				}
				}else{
					System.out.println("phenotype details not found for "+value);
				}
			}
			//System.out.println(count);
			//System.out.println(geneobj);
			
			}
			catch(Exception ex)
			{
				errorMap.put(value, ex.getMessage());
			}
		}
		System.out.println("The following are errored out");
		System.out.println(errorMap);
		
		return geneAttributeList;
	}

	public static void main(String[] args) throws Exception {
		List<String> genesList = readGenesList(FILE_NAME);
		 writeGenesList(genesList);
		//getGeneAttribute(genesList);
	}
}