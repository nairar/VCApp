        var url = require('url');
        var http = require('http');
        var users = require ('./users/user');

        var mongoConnectionClient;
        var mongoDBService = require('./connectDB');
        var handleCRUD = require ('./handleCRUD');
        var profile = require ('./profile');
        require('./schema/schema');

        /* Route handling for posting new questions */
        var posting = require('./posts');

        function startServer(app, port){
        	
        	app.listen(port, function() {
        		console.log("Server VCApp listening on port " + port);		
        	});

        	/* Redirect to main(login) page */
        	app.get('/',  onRequest);
        	app.post('/',  onRequest);
        	/* Redirect to login page */
        	app.get('/login', onRequest);
        	app.post('/login', onRequest);
        	/* Redirect to profile page */
        	app.get('/dashboard', onRequest);
        	/* Redirect to sign-up page */
        	app.get('/signup', onRequest);
        	app.post('/signup', onRequest);
        	/* Redirect to create new question page */
        	app.get('/createNewQuestion', onRequest);
        	app.post('/createNewQuestion', onRequest);
        	/* Display the questions on dashboard */
            app.get('/displayQuestions', onRequest);
            app.post('/displayQuestions', onRequest);
            app.get('/answer/:id', onRequest);
        }

        function onRequest(request, response){
        		var path = url.parse(request.url).pathname;
        		console.log("Received request for " + path + " service");

        		switch(path){
        			case '/':  						console.log("Requesting main page");
        											serveMain(request, response);
        											break;
        			case '/index':					console.log("Requesting main page");
        											serveMain(request, response);
        											break;
        			case '/login':  				console.log("Requesting login page");
        											serveLogin(request, response);
        											break;
        			case '/dashboard':   			console.log("Requesting profile page");
        											serveProfile(request, response);
        											break;
        			case '/signup':   				console.log("Requesting sign-up page");
        											serveSignup(request, response);
        											break;
        			case '/createNewQuestion': 		console.log("Request to create a new question");
        											posting.handleCreateNewQuestion(request, response);
        											break;
        			case '/displayQuestions': 		console.log("Request to display questions posted");
        											profile.getQuestionsPosted(request, response);
        											break;
                    case '/answer/':                console.log("Request to display questions posted");
                                                    posting.getAnswerPage(request, response);
                                                    break;
        		}
        	}


        /* Page serving functions */
        function serveMain(req, res){
        	console.log("Received main page request");
        	res.render('index.jade', {title: 'VCApp'});		
        	res.destroy();
        }


        function serveLogin(req, res){
        	console.log("Received login request");
        	
        	/* For a GET request to get the login page */
        	if (req.method == 'GET'){
        		res.render('login.jade', {title: 'VCApp'});
        		res.end();
        	}
        	/* User will be set in session if the username matches the database entry */
        	else{		
        		console.log("connected to database.");
        		var receivedUsername = req.body.username;
        		var receivedPassword = req.body.password;
        		var query = {username: receivedUsername, password: receivedPassword};
        		
        		/* If user trying to login is different from session user, 
                close the db and restart login process again for new authentication */
        		if ((req.username != users.username)) {
                    mongoDBService.db.close();
                }


        		mongoDBService.db.open(function(err, db){
        			
        		mongoDBService.db.collection('user').findOne(query, function(err, doc){
        			if (err) {

        				mongoDBService.db.close();
        				return res.end();

        			}
        			if (!doc) {
        				console.log("No such user!");
        				mongoDBService.db.close();
        				res.render('login.jade', {title: 'VCApp'});
        				return res.end();
        			}
        			
        			if(receivedPassword == doc.password){
        				console.log("Login success!");
        				users.username = doc.username;
        				users.password = doc.password;	
                        users.firstName = doc.firstName;			
        				res.render('dashboard.jade', {user : users});
                        profile.getQuestionsForUser(req, res);
        				//mongoDBService.db.close();
        				return res.end();
        			} else{
        				mongoDBService.db.close();
        				res.end();
        			}

        		});



        	});
        		
        	}
        	
        }


        function serveProfile(request, response){
            users.firstName = request.
        	response.render('dashboard.jade', {name : users.firstName});
        }

        function serveSignup(request, response){
        	console.log('Request received for sign-up');
        	if(request.method == 'GET'){

        		response.render('signup.jade');
        		response.end();	
        	} else {
        		
        		var newUserData = {name : request.body.name, username: request.body.username, password: request.body.password};
        		var UserSchema = mongoDBService.mongoose.model('user');
        		handleCRUD.insertData('user', UserSchema, newUserData);
        		response.redirect('login');
        		response.end();
        		
        	}



        }

        exports.startServer = startServer;	
