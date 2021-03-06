
var mongoDBService = require('../connectDB');

/* file-scoped global variables */
var ObjectId = mongoDBService.mongoose.Schema.ObjectId;


var userSchema  = new mongoDBService.mongoose.Schema({
            firstName: String,
            lastName: String,
            username: String,
            password: String,
            email: String,
            aboutMe: String
});

var questionSchema = new mongoDBService.mongoose.Schema({
            

            "tags": [String],
            "group": String,
            "question": {
                "title": String, 
                "description": String,
                "datecreated": {type: Date, default: Date.now},
                "score": {type: Number, default: 0},
                "unanswered": {type: Boolean, default: false},
                "vote": {type: Boolean, default: false},
                "username": {type: String, default: "Admin"}
            },
            "isQuestion" : {type : Boolean, default: true},
            "questionId" : {type : mongoDBService.mongoose.Schema.ObjectId, default : null},
            "isComment" : {type : Boolean, default: false}
});




mongoDBService.mongoose.model('newquestions', questionSchema);
mongoDBService.mongoose.model('user', userSchema);

exports.questionSchema = questionSchema;