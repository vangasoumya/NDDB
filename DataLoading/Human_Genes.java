package com.uhcl.webScraper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class Human_Genes {

	public static void main(String[] args) throws IOException {
		final String FILE_NAME = "M:/uhcl/capstone/newProjectFolder/data_loading/outputResult.xlsx";

		MongoClient mongo = new MongoClient("localhost", 27017);
		DB db = mongo.getDB("GlobalDB");

		DBCollection col = db.getCollection("Human_Genes");

		FileInputStream excelFile = new FileInputStream(new File(FILE_NAME));
		Workbook workbook = new XSSFWorkbook(excelFile);
		Sheet datatypeSheet = workbook.getSheetAt(0);
		Iterator<Row> iterator = datatypeSheet.iterator();

		while (iterator.hasNext()) {
			List<String> row = new ArrayList<String>();
			Row currentRow = iterator.next();
			Iterator<Cell> cellIterator = currentRow.cellIterator();
			while (cellIterator.hasNext()) {

				Cell currentCell = cellIterator.next();
				// getCellTypeEnum shown as deprecated for version 3.15
				// getCellTypeEnum ill be renamed to getCellType starting
				// from version 4.0
				if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
					String value = Integer.toString((int) currentCell.getNumericCellValue());
					// System.out.println(value);
					row.add(value);
				} else if (currentCell.getCellTypeEnum() == CellType.STRING) {
					row.add(currentCell.getStringCellValue());

				}

			}
			// writetoDB(row);
			String gene_id = row.get(1);
			String symbol = row.get(2);
			String synonyms = row.get(4);
			String[] alias = synonyms.split("\\|");

			String dbXrefs = row.get(5);
			String[] details = dbXrefs.split("\\|");
			String hgnc_id = "";
			String Ensembl_id = "";

			for (int i = 0; i < details.length; i++) {
				if (details[i].contains("HGNC")) {
					String[] hgnc = details[i].split(":");
					hgnc_id = hgnc[2];
				}
				if (details[i].contains("Ensembl")) {
					String[] Ensembl = details[i].split(":");
					Ensembl_id = Ensembl[1];
				}
			}

			String fullName = row.get(11);

			BasicDBObject document = new BasicDBObject();
			document.put("entrez_id", gene_id);
			document.put("gene_symbol", symbol);
			document.put("gene_name", fullName);
			document.put("gene_alias", alias);
			document.put("hgnc_id", hgnc_id);
			document.put("ensembl_id", Ensembl_id);
			document.put("gene_molecular_function", new String[0]);
			document.put("mouse_allele_id", new String[0]);
			document.put("fly_allele_id", new String[0]);
			document.put("GO_biological_id", new String[0]);
			document.put("GO_cellular_id", new String[0]);
			document.put("GO_molecular_id", new String[0]);
			document.put("disease_id", new String[0]);
			document.put("ppi_id", new String[0]);
			document.put("modifier_id", new String[0]);
//			System.out.println(document);
			col.insert(document);

			System.out.println(gene_id + " " + symbol + " " + Arrays.asList(alias) + " " + hgnc_id + " " + Ensembl_id
					+ " " + fullName);

		}

	}

}
