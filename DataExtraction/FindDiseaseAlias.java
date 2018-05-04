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

public class FindDiseaseAlias {
	private static final String FILE_NAME = "C:/Users/skkurash/Desktop/checkDisease.xlsx";

	public static List<Integer> readDiseaseList(String filename) throws Exception {
		List<Integer> diseaseList = new ArrayList<Integer>();

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
				if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
//					System.out.println(currentCell.getNumericCellValue());
					diseaseList.add((int) currentCell.getNumericCellValue());

				}

			}

		}
		System.out.println(diseaseList);
		return diseaseList;

	}

	private static List<String> getDiseaseAlias(List<Integer> mimNumber) throws Exception {
		List<String> diseaseAliasList = new ArrayList<String>();
		int count = 0;
		while (count < mimNumber.size()) {
			int str = mimNumber.get(count++);
			try {
				URL url = new URL(
						"https://api.omim.org/api/entry/search?search='" + str + "'&start=0&limit=1&include=geneMap");

				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("apikey", "5ikcTWQLTcSwUHSWpqncZQ");
				conn.setRequestProperty("Accept", "application/json");

				if (conn.getResponseCode() != 200) {
					throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
				}

				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

				String output;
				// System.out.println("Output from Server .... \n");
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

					String alternateTitles = "";
					JSONObject titles = entry.getJSONObject("titles");
					if (titles.has("alternativeTitles")) {
						alternateTitles = titles.getString("alternativeTitles");

					}else{
						alternateTitles = "No Alternative Titles";
					}
						
					diseaseAliasList.add(alternateTitles);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println(diseaseAliasList);
		return diseaseAliasList;

	}

	public static void writeDiseaseList(List<Integer> diseaseAliasList) throws Exception {
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet("GeneDetails");
		List<String> diseaseAlias = getDiseaseAlias(diseaseAliasList);
		// System.out.println(geneAttributes);
		// System.out.println(geneAttributes.size());
		int rowNum = 0;
		System.out.println("Creating excel");

		for (String alias : diseaseAlias) {
			Row row = sheet.createRow(rowNum++);
			int colNum = 1;

			Cell cell1 = row.createCell(colNum++);
			cell1.setCellValue(alias);

		}
		FileOutputStream outputStream = new FileOutputStream(
				"M:/uhcl/capstone/newProjectFolder/Data_to_collect/UHCL Task/Data to be collected/checkres.xlsx");
		workbook.write(outputStream);
		workbook.close();

		System.out.println("Done");

	}

	public static void main(String[] args) throws Exception {
		List<Integer> genesList = readDiseaseList(FILE_NAME);
		 writeDiseaseList(genesList);
//		getDiseaseAlias(genesList);
	}

}
