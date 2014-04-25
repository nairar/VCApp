
var mongoDBService = require ('./connectDB');


function insertData(schemaType, schema, data, callback){
	mongoDBService.mongoose.connect(mongoDBService.mongooseURL);
	if (schemaType == 'user'){
		
		var userData = new schema({
			firstName: data.name,
			username: data.username,
			password: data.password
		});
		userData.save(function(err){
			if(err) {
				console.log("Cannot insert due to " + err);
				mongoDBService.mongoose.disconnect();
			}else{
				console.log("Inserted data");
				mongoDBService.mongoose.disconnect();

			}
		});

	}
	else if (schemaType == 'newQuestion'){
		
		
		var newQuestionData = new schema(
		{
			tags: data.tags,
			group: data.group,
			question : {
				title: data.title,
				description: data.description,
				username: data.username
			},
			isComment : data.isComment,
			isQuestion : data.isQuestion,
			isAnswer : data.isAnswer

		});

		console.log (newQuestionData);
		newQuestionData.save(function (err){
			if (err) {
				console.log(err);
				console.log ("New question insert failed");
				
				return;

			}else{
				console.log ("New question inserted");
				
				

				callback();
			}
		});
	}
}

function updateData (schemaType, schema, data, callback){
	if (schemaType == 'newQuestion'){
		
	var questionSchema = new schema ({
		question :
				{
					description : data.description,	
					username : data.username
				},
		isQuestion : data.isQuestion,
		questionId : data.questionId,
		isComment : data.isComment

	});
			
	console.log ("Entered update data2");
	console.log (questionSchema);
	questionSchema.save(function (err){
		if (err) {
				console.log(err);
				console.log ("New question insert failed");
				
				return;

		}else{
				console.log ("New question inserted");
				
				callback();
		}
	});		

		
		
	}
}

exports.insertData = insertData;
exports.updateData = updateData;