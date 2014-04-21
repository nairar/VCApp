
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');

var mongoConnectionClient;
function getQuestionsPosted(req, res){
	mongoConnectionClient = mongoDBService.mongoConnectionClient;
	var db = mongoDBService.connectMongo(mongoConnectionClient);

	var query = { 'group' : 'NEU'};
	

		var ObjectId = mongoDBService.mongoose.Schema.ObjectId;
		var Schema = mongoDBService.mongoose.Schema;
		var questionSchema = new Schema({
			 "tags": [String],
            "group": String,
            "qOrA": {
                "title": String, 
                "description": String,
                "date created": {type: Date, default: Date.now},
                "score": {type: Number, default: 0},
                "unanswered": {type: Boolean, default: false},
                "vote": {type: Boolean, default: false},
                "username": {type: String, default: "Admin"}
            },
            "isQuestion": {type: Boolean, default: true},
            "questionId": ObjectId
		})
		
	

	db.open (function(err, db){

		if (err) return;
		
		var Questions = mongoDBService.mongoose.model('newquestions', questionSchema );

		Questions.find(query, function (err, docs){
			if(err){
				console.log ("No documents error.. ")
				db.close();
				res.end();
			}

			if (!docs) return res.end();

			res.render ('displayQuestions.jade', {questionList : docs});
			
			console.log (JSON.stringify(docs));
			
			db.close();
			
			return res.end();
		});


});

}





exports.getQuestionsPosted = getQuestionsPosted;