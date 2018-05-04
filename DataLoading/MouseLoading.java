package com.uhcl.webScraper;

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

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class MouseLoading {

		public static void main(String[] args) throws IOException {
			MongoClient mongo = new MongoClient("localhost", 27017);
			DB db = mongo.getDB("FinalDatabase");

			DBCollection col = db.getCollection("Mouse_Allele");

			
			File dir = new File("M:/uhcl/capstone/naveenGIt/MouseData");
			  File[] directoryListing = dir.listFiles();
			  if (directoryListing != null) {
			    for (File child : directoryListing) {
			      if (child.getName().endsWith(".xlsx"))
			      {
			    	  System.out.println("Inserting data from file - " + child.getName());
			    	  try
			    	  {
			    	    insertDataToDB(child, col);
			    	  }
			    	  catch(Exception ex)
			    	  {
			    		  System.out.println("Exception occurred " + ex);
			    		  throw ex;
			    	  }
			      }
			    }
			  }
			
			

		}

		public static void insertDataToDB(File file, DBCollection col)
				throws FileNotFoundException, IOException {
			FileInputStream excelFile = new FileInputStream(file);
			Workbook workbook = new XSSFWorkbook(excelFile);
			Sheet datatypeSheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = datatypeSheet.iterator();
			
			if (iterator.hasNext())
			{
				iterator.next();
			}

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
				String mouse_allele_id = row.get(0);
				String mouse_allele_symbol = row.get(1);
				String mouse_allele_name = row.get(2);
				String mouse_chromosome = row.get(3);
				String mouse_synonyms = row.get(4);
				String mouse_allele_type = row.get(5);
				String mouse_allele_attributes = row.get(6);
				String mouse_transmission = row.get(7);
				String mouse_abnormal_phenotypes_reported_in_these_systems = row.get(8);
				String mouse_human_disease_models = row.get(9);
				
				BasicDBObject document = new BasicDBObject();
				document.put("mouse_allele_id", mouse_allele_id);
				document.put("mouse_allele_symbol", mouse_allele_symbol);
				document.put("mouse_allele_name", mouse_allele_name);
				document.put("mouse_chromosome", mouse_chromosome);
				document.put("mouse_synonyms", mouse_synonyms);
				document.put("mouse_allele_type", mouse_allele_type);
				document.put("mouse_allele_attributes", mouse_allele_attributes);
				document.put("mouse_transmission", mouse_transmission);
				document.put("mouse_abnormal_phenotypes_reported_in_these_systems", mouse_abnormal_phenotypes_reported_in_these_systems);
				document.put("mouse_human_disease_models", mouse_human_disease_models);
				
//				System.out.println(document);
				col.insert(document);

//				System.out.println(gene_id + " " + symbol + " " + Arrays.asList(alias) + " " + hgnc_id + " " + Ensembl_id
//						+ " " + fullName);

			}
		}


	}


