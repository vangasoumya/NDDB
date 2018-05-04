package com.uhcl.webScraper;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import com.github.tsohr.JSONArray;
import com.github.tsohr.JSONObject;

public class PathogenicTable {
	public static void main(String[] args) throws Exception {

        MongoClient mongo = new MongoClient("localhost", 27017);
        DB db = mongo.getDB("OldDB");

        DBCollection col = db.getCollection("diseasetable");

        System.out.println("Reading..");
        DBCursor cursor = col.find();
        System.out.println(cursor.count());
        List<DBObject> list_objects = new ArrayList<DBObject>();
        
        while(cursor.hasNext()){
        	DBObject dbObj = cursor.next();
            list_objects.add(dbObj);
            
        }
        
        
        mongo.close();
        writeToDB(list_objects);
        
        
    }

	private static void writeToDB(List<DBObject> sourceList) throws UnknownHostException {
		
		MongoClient mongo = new MongoClient("localhost", 27017);
        DB db = mongo.getDB("GlobalDB");
        DBCollection col = db.getCollection("Pathogenic_Variants");        
        DBCollection col_disease = db.getCollection("Diseases");
        DBCollection col_gene = db.getCollection("Human_Genes");
        
        for(DBObject entry : sourceList){
        	Object dis_name = entry.get("diseasename");
        	Object gene_name = entry.get("genename");
        	
        	ObjectId result_diseaseId = new ObjectId();
        	ObjectId result_geneId = new ObjectId();
        	
        	BasicDBObject searchQuery = new BasicDBObject();
        	searchQuery.put("disease_name", dis_name);
        	
        	DBCursor cursor = col_disease.find(searchQuery);

        	while (cursor.hasNext()) {
        		DBObject dbobj = cursor.next();
        		result_diseaseId = (ObjectId) dbobj.get("_id");
        		break;
        	}
        	
        	BasicDBObject searchQuery1 = new BasicDBObject();
        	searchQuery1.put("gene_symbol", gene_name);
        	
        	DBCursor cursor1 = col_gene.find(searchQuery1);

        	while (cursor1.hasNext()) {
        		DBObject dbobj = cursor1.next();
        		result_geneId = (ObjectId) dbobj.get("_id");
        		break;
        	}
        	
        	JSONObject pathogenic = new JSONObject("{ \"pathogenic\":"+entry.get("pathogenic").toString()+"}");
        	
        	JSONArray entryList = pathogenic.getJSONArray("pathogenic");
        	
			for (int k = 0; k < entryList.length(); k++) {
				JSONObject entryListData = entryList.getJSONObject(k);
				
				BasicDBObject document = new BasicDBObject();
				document.put("pathogenic_disease_id", result_diseaseId);
				document.put("pathogenic_gene_id", result_geneId);
				document.put("pathogenic_gene_name", entryListData.get("pathogenicgene"));
				document.put("pathogenic_variation", entryListData.get("pathogenicvariation"));
				document.put("pathogenic_type", entryListData.get("pathogenictype"));
				document.put("pathogenic_significance", entryListData.get("pathogenicsignificance"));
				document.put("pathogenic_snp", entryListData.get("pathogenicsnp"));
				document.put("pathogenic_assembly", entryListData.get("pathogenicassembly"));
				document.put("pathogenic_location", entryListData.get("pathogeniclocation"));
				
				 col.insert(document); 
			}
        	
        }
        mongo.close();
        
	}
}
