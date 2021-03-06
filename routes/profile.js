
	var mongoDBService = require ('./connectDB');
	var handleCRUD = require ('./handleCRUD');
	var users = require ('./users/user');
	var url = require ('url');

	require('./schema/schema');

	var mongoConnectionClient;
	function getQuestionsPosted(req, res){
		if (req.method == 'GET') {
			/* Just fill the page with all results for that particular user*/

			console.log("questionPostedUsername : " + users.username);
			/*mongoDBService.db.collection('newquestions').ensureIndex( { subject: "group" } );
			mongoDBService.db.collection('newquestions').ensureIndex( { subject: "question.title" } );
			mongoDBService.db.collection('newquestions').ensureIndex( { subject: "tags" } );
			mongoDBService.db.collection('newquestions').ensureIndex( { subject: "question.username" } );
			mongoDBService.db.collection('newquestions').ensureIndex( { subject: "question.description" } );
			mongoDBService.db.collection('newquestions').ensureIndex( { subject: "question.comment" } );*/
			search({"isQuestion" : true}, req, res, users, 'displayQuestions.jade');
			
		}
		else {
			var searchRegex = ".*" + req.body.searchTextBox + ".*"
			/* Use query to find questions as results of search */
			var query = {$or: [ {"group" : req.body.searchTextBox}, 
								{"question.title" : { $regex: searchRegex}},
								{"tags" : req.body.searchTextBox},
								{"question.username" : req.body.searchTextBox},
								{"question.description" : { $regex: searchRegex}},
								{"question.comment" : req.body.searchTextBox}
								]}; 	
	

			search(query, req, res, users, 'displayQuestions.jade');
			
		}
		
		//var QuestionSchema = mongoDBService.mongoose.model('newquestions');
		
		


	}

	function getQuestionForTags (req, res){
		var path = url.parse(req.url).pathname;
		path= path.match (/displayQuestions/g)[0];
		console.log(path);
		console.log(req.params.id);
   		var tagName =  req.params.id.substring(1, req.params.id.length);
   		var query = {"tags" : tagName};
		
   		if (path.length > 1) {
   			
   			search(query, req, res, 'displayQuestions.jade');	
   		}
   		else {
   			search(query, req, res, 'displayQuestions.jade');		
   		}
		
	}

	function getQuestionsForUser(req, res, user){
	{
			/* Use query to find questions as results of search */
			console.log ("Entered getQuestionsForUser");
			var query = {"question.username" : user.username, "isQuestion" : true};
			console.log("Username at : " + user.username);
			search(query, req, res, user, 'dashboard.jade');
			
	}
		
		//var QuestionSchema = mongoDBService.mongoose.model('newquestions');
		
		


	}

	function search(query, req, res, user, url){

		
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
				
				res.render (url, {questionList : docs, user: user});
				
				
				return res.end();
			});

	}


	function getUsers(req, res, user) {
		var searchText = req.body.searchTextBox;
		var userRegex = ".*" + req.body.searchTextBox + ".*"
		
		if (searchText == undefined) {
			var query = {};	
		} else {
			var query = { "firstName" : userRegex };	
		}
		
		mongoDBService.db.collection('user').find(query).toArray(function (err, docs) {
				if(err){
					console.log (err);
					//mongoDBService.db.close();
					
					return res.end();
				}

				if (docs == null)
				{
				 console.log ("Entered3");
				 //mongoDBService.db.close();
				 return res.end();
				 
				}

				console.log ("Entered8");
				res.render ('user.jade', {userList : docs, user:user});
				console.log (JSON.stringify(docs));
				
				return res.end();
		});
	}


	exports.getQuestionsPosted = getQuestionsPosted;
	exports.getQuestionsForUser = getQuestionsForUser;
	exports.getUsers = getUsers;
	exports.getQuestionForTags = getQuestionForTags;
