var url = require('url');
var http = require('http');
var users = require ('./users/user');
var mongoDBService = require ('./connectDB');
var handleCRUD = require ('./handleCRUD');
var schema = require*('./schema/schema');
var mongoConnectionClient;
var ObjectID = require('mongodb').ObjectID;




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
                            "username" : username,
                            "isQuestion" : true,
                            "isComment" : false,
                            "isAnswer" : false
                          };
        console.log (tagsArray);
        var ObjectId = mongoDBService.mongoose.Schema.ObjectId;
        
        var QuestionSchema = mongoDBService.mongoose.model('newquestions');
        handleCRUD.insertData('newQuestion', QuestionSchema, newQuestionQuery, function (err) {
            if (err) console.log(err);
            return res.redirect ('dashboard');
        });
        
        //mongoDBService.db.close();
        
        
    }
}

function  getAnswerPage (req, res) {
    console.log("Working!");
    
   // var o_id = ObjectID.createFromHexString(req.params.id);
   console.log(req.params.id);
   var o_id =  req.params.id.substring(1, 25);
   console.log(o_id);
    mongoDBService.db.collection('newquestions').findOne({ "_id" : new ObjectID(o_id) }, function(err, doc){
                    if (err) {
                        console.log(err);
                        mongoDBService.db.close();
                        return res.end();

                    }
                    if (!doc) {
                        console.log("No such post!");
                        res.redirect("displayQuestions");
                        return res.end();
                    }
                    console.log ("Entered getAnswerPage");
                    mongoDBService.db.collection ('newquestions').find({"questionId" : new ObjectID(o_id)}).toArray(function (err, docs){

                        res.render ("answer.jade", {question : doc, answers: docs});
                        console.dir (JSON.stringify(doc));
                        return res.end ();    
                    })
                    

                });

}

function createComment (req, res) {
    var newComment = req.body.newComment;
    
    if (newComment == undefined) {
        console.log ("undefined comment");
        return;
    }else {
         var o_id =  req.params.id.substring(1, 25);
         var query = { 
                       "isQuestion" : false,
                       "questionId" : new ObjectID(o_id),
                       "description" : newComment,
                       "isComment" : true,
                       "isAnswer" : false,
                       "username" : users.username
                        };
        var QuestionSchema = mongoDBService.mongoose.model('newquestions');
        console.log("Entered create comment");
        handleCRUD.updateData('newQuestion', QuestionSchema, query, function (err) {
            return res.redirect ('displayQuestions');
        });
    }
}

exports.handleCreateNewQuestion = handleCreateNewQuestion;
exports.getAnswerPage = getAnswerPage;
exports.createComment = createComment;