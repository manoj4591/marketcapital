var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database, function(err) {
	if(err){
		console.log(err);
	}
	else{
		console.log("database connected");
	}
})
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});

var api = require('./app/routes/api')(app, express);
app.use('/api', api);
app.listen(config.port, function(err) {
	if(err){
		console.log("joo" + err);
	}
	else{
		console.log("listening to port 3000");
	}
});