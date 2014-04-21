var url = require('url');
var http = require('http');
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');
var mongoConnectionClient;


function handleCreateNewQuestion(req, res){
    mongoConnectionClient = mongoDBService.mongoConnectionClient;
    var db = mongoDBService.connectMongo(mongoConnectionClient);
    if (req.method == 'GET') {
        res.render('askquestion.jade', {title: 'Ask a question!'}); 
        res.end();
    }
    else{
    
        var username = "guest";
        console.log ("current username is :" + username);

        var title = req.body.title;
        var tagsArray = req.body.tags.split(',');
        var group = req.body.group;
        var description = req.body.description;


        console.log (tagsArray);
        var newQuestionQuery = {"title": title, 
                            "tags": tagsArray,
                            "group": group,
                            "description": description,
                            "username" : username
                          };
        var ObjectId = mongoDBService.mongoose.Schema.ObjectId;
        var questionSchema = new mongoDBService.mongoose.Schema({
            

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
        });

        handleCRUD.insertData('newQuestion', questionSchema, newQuestionQuery);
        res.redirect('createNewQuestion.js');
        res.end();
        
    }
}

exports.handleCreateNewQuestion = handleCreateNewQuestion;