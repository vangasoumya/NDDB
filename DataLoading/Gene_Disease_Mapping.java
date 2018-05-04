package com.uhcl.webScraper;

import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

public class Gene_Disease_Mapping {
	public static Map<String, ObjectId> oldToNewDisease() throws UnknownHostException { // takes
																							// the
																							// geneName
																							// and
																							// give
																							// its
																							// corresponding
																							// diseaseid
		Map<String,ObjectId> mapList = new HashMap<String,ObjectId>();
		String geneName = "";
		String diseaseName = "";
		ObjectId result = null;
		MongoClient mongo = new MongoClient("localhost", 27017);
		DB new_db = mongo.getDB("GlobalDB");
		DB old_db = mongo.getDB("OldDB");

		DBCollection old_diseasetable = old_db.getCollection("diseasetable");
		
		DBCursor cursor = old_diseasetable.find();

		while (cursor.hasNext()) {
			DBObject dbobj = cursor.next();
			geneName = (String) dbobj.get("genename");
			diseaseName = (String) dbobj.get("diseasename");
		
		// Now search for the diseaseName in new diseases table and gets its
		// disease id.

		DBCollection new_diseasetable = new_db.getCollection("Diseases");
		BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("disease_name", diseaseName);
		DBCursor cursor1 = new_diseasetable.find(searchQuery);

		while (cursor1.hasNext()) {
			DBObject dbobj1 = cursor1.next();
			
			result = (ObjectId) dbobj1.get("_id");
			mapList.put(geneName, result);

		}
		}
		mongo.close();
		return mapList;

	}

	public static void main(String[] args) throws UnknownHostException {
		
		System.out.println(Arrays.asList(oldToNewDisease()));
		Map<String, ObjectId> resultMap = oldToNewDisease();
		// open human genes and write diseaseId to every entry

		MongoClient mongo = new MongoClient("localhost", 27017);
		DB db = mongo.getDB("GlobalDB");
		DBCollection genes_col = db.getCollection("Human_Genes");

		for(String item:resultMap.keySet()){
							
				BasicDBObject newDocument = new BasicDBObject();
	    		newDocument.append("$push", new BasicDBObject().append("disease_id", resultMap.get(item)));
	    				
	    		BasicDBObject searchQuery = new BasicDBObject().append("gene_symbol", item);

	    		WriteResult result = genes_col.update(searchQuery, newDocument);
				
	    		System.out.println(result);
			
		}
		
		mongo.close();
	}

}
