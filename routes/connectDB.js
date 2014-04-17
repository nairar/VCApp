var mongoose  = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;
var url = 'localhost';
var port = '27017';
var native_parser = true;
var mongoConnectionClient = new MongoClient(new MongoServer('localhost', 27017, {native_parser: true}));;
var mongooseURL = 'mongodb://localhost:27017/VCApp';


function connectMongo(clientName){
	var db = clientName.db('VCApp');
	return db;
}


exports.connectMongo = connectMongo;
exports.mongoDBUrl = url;
exports.mongoDBPort = port;
exports.nativeMongoParser = native_parser;
exports.mongoConnectionClient = mongoConnectionClient;
exports.mongooseURL = mongooseURL;