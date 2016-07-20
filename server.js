//server.js

// set up ==============================
var express		=	require('express');
var app 		=	express();
var mongoose 	= 	require('mongoose'); 		// mehhhh
var morgan 		= 	require('morgan');			// log requests to the console for now
var bodyParser 	= 	require('body-parser');		// pull information from HTML POST
var override 	=	require('method-override'); // simulate DELETE and PUT
var utils 		= 	require('./app/utils');		// raspberry pi OS helper code

var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('mongodb://tgoodwin:ad-map2016@ds011840.mlab.com:11840/ad-map');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(override());

// example Todo model
var Todo = mongoose.model('Todo', {
	text: String
});

// load the 'AdLoc' model constructor
var AdLoc = require('./app/models/adloc');
// 
var tailer = require('./app/tail');
tailer.bind(AdLoc); // pass in our database-connected constructor.
tailer.watch();

// ---------- LISTEN ----------
var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port' + port); // - - - - - - - - - - - LISTENING - - - - - - - - - - - -

// ---------- ROUTES -----------

app.get('/api/todo', function(req, res) {
	Todo.find(function (err, result) {
		if (err)
			res.send(err);
		res.json(result); // return all results in json format.
	});
});

app.post('/api/todos', function(req, res) {
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after you create another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});


