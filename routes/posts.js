var url = require('url');
var http = require('http');
var users = require ('./users/user');
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');
var schema = require*('./schema/schema');
var mongoConnectionClient;
var mongo = require('mongodb');
var BSON = mongo.BSONPure;



function handleCreateNewQuestion(req, res){
    
    if (req.method == 'GET') {
        res.render('askquestion.jade', {title: 'Ask a question!'}); 
       
        //mongoDBService.db.close();
        return res.end();
    }
    else{
    
        var username = users.username;
        console.log("questionPostedUsername : " + users.username);
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

function  getAnswerPage (req, res) {
    console.log("Working!");
    console.log(req.params.id);
    var o_id = new BSON.ObjectID(req.params.id);
    mongoDBService.db.collection('newquestions').findOne({ "_id" : o_id }, function(err, doc){
                    if (err) {
                        console.log(err);
                        mongoDBService.db.close();
                        return res.end();

                    }
                    if (!doc) {
                        console.log("No such post!");
                        res.redirect("displayQuestions.jade");
                        return res.end();
                    }
                    console.log ("Entered getAnswerPage");
                    res.render ("answer.jade", {question : doc});
                    return res.end ();

                });

}

exports.handleCreateNewQuestion = handleCreateNewQuestion;
exports.getAnswerPage = getAnswerPage;