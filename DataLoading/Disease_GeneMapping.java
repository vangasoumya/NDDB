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

public class Disease_GeneMapping {
	public static Map<String, ObjectId> oldToNewDisease() throws UnknownHostException { // takes
		// the
		// diseaseName
		// and
		// give
		// its
		// corresponding
		// geneid
		Map<String, ObjectId> mapList = new HashMap<String, ObjectId>();
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

			DBCollection new_diseasetable = new_db.getCollection("Human_Genes");
			BasicDBObject searchQuery = new BasicDBObject();
			searchQuery.put("gene_symbol", geneName);
			DBCursor cursor1 = new_diseasetable.find(searchQuery);

			while (cursor1.hasNext()) {
				DBObject dbobj1 = cursor1.next();

				result = (ObjectId) dbobj1.get("_id");
				mapList.put(diseaseName, result);

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
		DBCollection dis_col = db.getCollection("Diseases");

		for(String item:resultMap.keySet()){
							
				BasicDBObject newDocument = new BasicDBObject();
	    		newDocument.append("$push", new BasicDBObject().append("gene_id", resultMap.get(item)));
	    				
	    		BasicDBObject searchQuery = new BasicDBObject().append("disease_name", item);

	    		WriteResult result = dis_col.update(searchQuery, newDocument);
				
	    		System.out.println(result);
			
		}

	}
}
