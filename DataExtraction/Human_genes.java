package com.uhcl.disease_gene;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
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

public class Human_genes {

	public static void main(String[] args) throws IOException {
		final String FILE_NAME = "M:/uhcl/capstone/newProjectFolder/data_loading/outputResult.xlsx";



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
//						System.out.println(value);
						row.add(value);
					}
					else if (currentCell.getCellTypeEnum() == CellType.STRING) {
						row.add(currentCell.getStringCellValue());

					}

				}
			 writetoDB(row);
		}
		 
	}

	private static void writetoDB(List<String> row) {
		

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
		
		System.out.println(gene_id+" "+symbol+" "+Arrays.asList(alias)+" "+hgnc_id+" "+Ensembl_id+" "+fullName);
	}

}
