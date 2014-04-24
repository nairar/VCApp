
var mongoDBService = require ('./connectDB');


function insertData(schemaType, schema, data){
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
			qOrA : {
				title: data.title,
				description: data.description,
				username: data.username
			}

		});

		console.log (newQuestionData);
		newQuestionData.save(function (err){
			if (err) {
				console.log(err);
				console.log ("New question insert failed");
				mongoDBService.mongoose.disconnect();
				return;

			}else{
				console.log ("New question inserted");
				mongoDBService.mongoose.disconnect();
				return;
			}
		});
	}
}


exports.insertData = insertData;