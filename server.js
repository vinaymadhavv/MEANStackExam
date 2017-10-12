/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

var url = 'mongodb://localhost:27017/flight';
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

var url = 'mongodb://localhost:27017/flight';
app.use(express.static(__dirname ));

app.get('/index',function(req,res){
	res.sendFile(__dirname+"/index.html");
	
});

app.post('/index',function(req,res){
	var newUser = {
	email: req.body.email,
	firstname: req.body.firstname,
	lastname:req.body.lastname,
	phone:req.body.phone,        
   date: req.body.dt,
   dateTo: req.body.dt1
	};
	mongoClient.connect(url,function(err,db){
		if (err){
	console.error('Error occured in database');
	res.send("Error in connection");

} else{
	console.log('Connection established '+ url);
db.collection('users').count({email:newUser.email},function(err,count){
if (err){console.log(err);}
else{
var number = count;
if (count == 0){
db.collection('users').insert(newUser,function(err,result){
	if (err){
	console.log(err);
	} else {
	console.log('Item Inserted');
         res.send('Inserted records successfully');
	 db.close();
					}
					});

	} 
        else {
	res.send("already exists");
   db.close();

	}
	}


	});

	}
	});


});

app.listen(3000);
console.log('Running on port 3000');

http.createServer(function(request ,response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Page One');
}).listen(80);
console.log("Server is listening");






