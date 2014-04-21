
var mongoDBService = require ('./connectDB');


function insertData(schemaType, schema, data){
	mongoDBService.mongoose.connect(mongoDBService.mongooseURL);
	if (schemaType == 'user'){
		var User = mongoDBService.mongoose.model('User', schema);
		var userData = new User({
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
		var newQuestionSchema = mongoDBService.mongoose.model('newQuestion', schema);
		var newQuestionData = new newQuestionSchema(
		{
			tags: data.tagsArray,
			group: data.group,
			qOrA : {
				title: data.title,
				description: data.description,
				username: data.username
			}

		});
		newQuestionData.save(function (err){
			if (err) {
				console.log ("New question insert failed");
				mongoDBService.mongoose.disconnect();

			}else{
				console.log ("New question inserted");
				mongoDBService.mongoose.disconnect();
			}
		});
	}
}


exports.insertData = insertData;