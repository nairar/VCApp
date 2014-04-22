var url = require('url');
var http = require('http');
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');
var schema = require*('./schema/schema');
var mongoConnectionClient;


function handleCreateNewQuestion(req, res){
    
    if (req.method == 'GET') {
        res.render('askquestion.jade', {title: 'Ask a question!'}); 
       
        //mongoDBService.db.close();
        return res.end();
    }
    else{
    
        var username = "guest";
        console.log ("current username is :" + username);

        var title = req.body.title;
        var tagsArray = req.body.tags.split(',');
        var group = req.body.group;
        var description = req.body.description;

       
        var newQuestionQuery = {"title": title, 
                            "tags": tagsArray,
                            "group": group,
                            "description": description,
                            "username" : username
                          };
        console.log (tagsArray);
        var ObjectId = mongoDBService.mongoose.Schema.ObjectId;
        
        var QuestionSchema = mongoDBService.mongoose.model('newquestions');
        handleCRUD.insertData('newQuestion', QuestionSchema, newQuestionQuery);
        res.render('dashboard.jade', {title: 'VCApp'});
        //mongoDBService.db.close();
        return res.end();
        
    }
}

exports.handleCreateNewQuestion = handleCreateNewQuestion;