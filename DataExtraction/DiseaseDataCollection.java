package com.uhcl.disease_gene;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.xml.crypto.Data;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;

public class DiseaseDataCollection {
	private static final String FILE_NAME = "C:/Users/skkurash/Desktop/checkDisease.xlsx";

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

				}

			}

		}
		return diseaseList;

	}

	private static List<String> getGeneData(List<String> diseaseList) throws Exception {

		List<String> geneList = new ArrayList<String>();
		Map<String, String> errorMap = new HashMap<String, String>();
		for (String str : diseaseList) {
//			System.out.println("input is " + str);
			String value = str;

			if (value.contains("-")) {
				value = value.replaceAll("-", " ");
			}
			String[] input = value.replaceAll("[()]", "").split(" ");
//			System.out.println(Arrays.asList(input));

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
//			System.out.println("connected");
			conn.disconnect();

			JSONObject jObject = new JSONObject(json.toString());
			JSONObject omim = jObject.getJSONObject("omim");
			JSONObject searchResponse = omim.getJSONObject("searchResponse");

			JSONArray entryList = searchResponse.getJSONArray("entryList");
			// boolean foundAtleastOne = false;

			if (entryList.length() == 0) {
				System.out.println(str+" not found");
				continue;
			}
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
//					System.out.println("entry is "+entry);
					if (!entry.has("phenotypeMapList")) {
						System.out.println(str+" does not have any genes");
						continue;
					}
					JSONArray phenotypeMapList = entry.getJSONArray("phenotypeMapList");
					if (phenotypeMapList.length() == 0) {
						System.out.println(str+" does not have any genes");
						continue;
					}
					for (int i = 0; i < phenotypeMapList.length(); k++) {
						JSONObject phenotypeMapListData = phenotypeMapList.getJSONObject(i);
//						System.out.println("list data object is "+phenotypeMapListData);
						JSONObject phenotypeMap = phenotypeMapListData.getJSONObject("phenotypeMap");
						if(phenotypeMap.has("geneSymbols")){
							String[] genes = phenotypeMap.getString("geneSymbols").split(",");
							geneList.add(genes[0]);
							
							break;
						}
						
					}
				}
			}//end of all links
						
		}//end of input list
		System.out.println("final Genes list  is "+geneList);
		return geneList;
	}// end of class

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
public static void main(String[] args) throws Exception{
	List<String> inputList = readDiseaseList(FILE_NAME);
	GeneDataCollection geneobj = new GeneDataCollection();
	
	List<String> genesList = getGeneData(inputList);
	geneobj.writeGenesList(genesList);
	
}

}
