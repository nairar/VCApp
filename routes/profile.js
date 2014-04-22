
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');

require('./schema/schema');

var mongoConnectionClient;
function getQuestionsPosted(req, res){
	var query = { "group" : "NEU"};
	//var QuestionSchema = mongoDBService.mongoose.model('newquestions');
	
	mongoDBService.db.collection('newquestions').find(query).toArray(function (err, docs){
			
			if(err){
				console.log (err)
				//mongoDBService.db.close();
				
				return res.end();
			}
			console.log ("Entered2");
			if (docs == null)
			{
			 console.log ("Entered3");
			 //mongoDBService.db.close();
			 return res.end();
			 
			}

			

			console.log ("Entered5");
			res.render ('displayQuestions.jade', {questionList : docs});
			
			return res.end();
		});



}



exports.getQuestionsPosted = getQuestionsPosted;