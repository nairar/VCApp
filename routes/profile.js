
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');
var users = require ('./users/user');

require('./schema/schema');

var mongoConnectionClient;
function getQuestionsPosted(req, res){
	if (req.method == 'GET') {
		/* Just fill the page with all results for that particular user*/
		console.log("questionPostedUsername : " + users.username);
		search({"qOrA.username" : users.username}, req, res);
	}
	else {
		/* Use query to find questions as results of search */
		var query = { "group" : req.body.searchTextBox ,
					  "qOrA.username" : users.username};

		search(query, req, res);
		
	}
	
	//var QuestionSchema = mongoDBService.mongoose.model('newquestions');
	
	


}

function search(query, req, res){

	mongoDBService.db.collection('newquestions').find(query).toArray(function (err, docs){
			
			if(err){
				console.log (err);
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