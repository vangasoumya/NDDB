package com.uhcl.webScraper;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.mongodb.BasicDBObject;
//import com.uhcl.techhawks.dto.User;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class DiseaseTable {
	
	public static void writeToDB(List<DBObject> sourceList) throws UnknownHostException{
		MongoClient mongo = new MongoClient("localhost", 27017);
        DB db = mongo.getDB("GlobalDB");

        DBCollection col = db.getCollection("Diseases");
        
        for(DBObject entry : sourceList){
        	String disease = (String) entry.get("diseasename");
        	Object mutation_result = getMutation(disease);
        	BasicDBObject document = new BasicDBObject();
		    document.put("disease_name",disease);
		    document.put("disease_type",(String)entry.get("diseasetype"));
		    document.put("disease_alias",entry.get("diseasealias"));
		    document.put("disease_summary",entry.get("diseasesummary"));
		    document.put("prevalence",entry.get("prevalence"));
		    document.put("inheritance",entry.get("inheritance"));
		    document.put("mutation",mutation_result);
		    document.put("mechanism",entry.get("mechanism")); 
		    document.put("pathogenic_id",new String[0]);
		    document.put("gene_id",new String[0]);
		    document.put("modifier_id",new String[0]);
		    
		    col.insert(document);    	    
        }
        mongo.close();
	}
    private static Object getMutation(Object disease) throws UnknownHostException {
    	
    	Object result = new Object();
    	MongoClient mongo = new MongoClient("localhost", 27017);
        DB db = mongo.getDB("OldDB");

        DBCollection col = db.getCollection("genetable");
        
        BasicDBObject searchQuery = new BasicDBObject();
    	searchQuery.put("diseasename", disease);
    	
    	DBCursor cursor = col.find(searchQuery);

    	while (cursor.hasNext()) {
    		DBObject dbobj = cursor.next();
    		result = dbobj.get("mutation");
    		System.out.println(result);
    		break;
    	}
    	mongo.close();
    	return  result;
		
	}
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
        //System.out.println("list printed.."+Arrays.toString(list_objects.toArray()));
        
        
        mongo.close();
        writeToDB(list_objects);
        
        // iterate list, get required values, write to mongodb
        
    }
}
