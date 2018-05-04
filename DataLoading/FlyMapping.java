package com.uhcl.webScraper;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

public class FlyMapping {
	public static void main(String[] args) throws UnknownHostException {
		MongoClient mongo = new MongoClient("localhost", 27017);
		DB db = mongo.getDB("OldDB");
		DBCollection genes_col = db.getCollection("genetable");

		DBCursor cursor = genes_col.find();

		while (cursor.hasNext()) {
			DBObject dbobj = cursor.next();
			String gene = (String) dbobj.get("genename");
			List<BasicDBObject> allele = (List<BasicDBObject>) dbobj.get("fly");
			System.out.println(gene + " and " + allele);

			List<ObjectId> objIds = findID(allele);
			System.out.println(objIds);
			FlyMappingDTO obj = new FlyMappingDTO();
			obj.setFly_allele(objIds);
			obj.setGene(gene);
			updateNewDB(obj);
		}
		mongo.close();
	}

	private static void updateNewDB(FlyMappingDTO obj) throws UnknownHostException {
		MongoClient mongo = new MongoClient("localhost", 27017);
		DB db = mongo.getDB("FinalDatabase");
		DBCollection fly = db.getCollection("Human_Genes");

		for (ObjectId s : obj.getFly_allele()) {
			BasicDBObject newDocument = new BasicDBObject();
			newDocument.append("$push", new BasicDBObject().append("fly_allele_id", s));

			BasicDBObject searchQuery = new BasicDBObject().append("gene_symbol", obj.getGene());

			WriteResult result = fly.update(searchQuery, newDocument);
			System.out.println(result);
		}

		mongo.close();
	}

	private static List<ObjectId> findID(List<BasicDBObject> allele) throws UnknownHostException {
		List<ObjectId> resultIds = new ArrayList<ObjectId>();
		Set<String> resultAllele = new HashSet<String>();

		MongoClient mongo = new MongoClient("localhost", 27017);
		DB db = mongo.getDB("FinalDatabase");
		DBCollection fly = db.getCollection("Fly_Allele");

		for (BasicDBObject fly_Allele : allele) {
			resultAllele.add((String) fly_Allele.get("allelesymbol"));
		}
		System.out.println(resultAllele);
		for (String res_allele : resultAllele) {
			BasicDBObject searchQuery = new BasicDBObject();
			searchQuery.put("allele_symbol", res_allele);

			DBCursor cursor = fly.find(searchQuery);

			while (cursor.hasNext()) {
				DBObject dbobj = cursor.next();
				resultIds.add((ObjectId) dbobj.get("_id"));
			}

		}
		mongo.close();
		return resultIds;
	}
}
