package com.uhcl.webScraper;

import java.net.UnknownHostException;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

public class Pathogenic_Disease_Mapping {

	public static void main(String[] args) throws UnknownHostException {
		MongoClient mongo = new MongoClient("localhost", 27017);
        DB db = mongo.getDB("GlobalDB");
        DBCollection col = db.getCollection("Pathogenic_Variants");  
        DBCollection disease_Col = db.getCollection("Diseases");
        
    	DBCursor cursor1 =  col.find();
    	
    	while (cursor1.hasNext()) {
    		DBObject dbobj = cursor1.next();
    		ObjectId pathogenicId = (ObjectId) dbobj.get("_id");
    		System.out.println(pathogenicId);
    		ObjectId diseaseId = (ObjectId) dbobj.get("pathogenic_disease_id");
    	    System.out.println(diseaseId);
    	    
    		BasicDBObject newDocument = new BasicDBObject();
    		newDocument.append("$push", new BasicDBObject().append("pathogenic_id", pathogenicId));
    				
    		BasicDBObject searchQuery = new BasicDBObject().append("_id", diseaseId);

    		WriteResult result = disease_Col.update(searchQuery, newDocument);
    		System.out.println(result);
    		//update
    		
  	}
    	mongo.close();
	}
}
