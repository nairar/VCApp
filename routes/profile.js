
	var mongoDBService = require ('./connectDB');
	var handleCRUD = require ('./handleCRUD');
	var users = require ('./users/user');

	require('./schema/schema');

	var mongoConnectionClient;
	function getQuestionsPosted(req, res){
		if (req.method == 'GET') {
			/* Just fill the page with all results for that particular user*/
			console.log("questionPostedUsername : " + users.username);
			search({"question.username" : users.username}, req, res);
		}
		else {
			/* Use query to find questions as results of search */
			var query = { "group" : req.body.searchTextBox ,
						  "question.username" : users.username};

			search(query, req, res);
			
		}
		
		//var QuestionSchema = mongoDBService.mongoose.model('newquestions');
		
		


	}

	function getQuestionsForUser(req, res, user){
	{
			/* Use query to find questions as results of search */
			var query = {"question.username" : user.username};
			console.log("Username at : " + user.username);
			search(query, req, res, user);
			
	}
		
		//var QuestionSchema = mongoDBService.mongoose.model('newquestions');
		
		


	}

	function search(query, req, res, user){

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
				res.render ('dashboard.jade', {questionList : docs, user: user});
				console.dir (JSON.stringify(docs));
				
				return res.end();
			});

	}

	exports.getQuestionsPosted = getQuestionsPosted;
	exports.getQuestionsForUser = getQuestionsForUser;
