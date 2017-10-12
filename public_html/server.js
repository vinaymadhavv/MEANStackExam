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
app.use(express.static(__dirname ));

app.get('/index',function(req,res){
	res.sendFile(__dirname+"public_html/index");
	
});

//For fetching the data from the mongoDB
app.get('/flightDetails', function(req,res){
    var newUser = {
	email: req.query.email
	};
        console.log(req.query.email);
    mongoClient.connect(url,function(err,db){
		if (err){
	console.error('Error occured in database');
	res.send("Error in connection");

} else{
	console.log('Connection established '+ url);
db.collection('users').findOne({email:newUser.email},function(err,result){
if (err){console.log(err);}
else{
    console.log("printing results....");
 console.log(result);
 res.send(result.firstname+" "+result.lastname+" ("+result.phone+") will depart on "+result.date+" and return on "+result.dateTo);
	}
        });
        }
    });
});
//for inserting the data into mongoDB
app.post('/index',function(req,res){
    
    console.log(req);
	var newUser = {
	email: req.body.email,
	firstname: req.body.firstname,
	lastname:req.body.lastname,
	phone:req.body.phone,        
   date: req.body.date,
   dateTo: req.body.dateTo
	};
        console.log(newUser);
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
        res.send("Inserted records successfully "+newUser.email);
						db.close();
					}
					});

	} else {
	res.send("already exists");
   db.close();

	}
	}


	});

	}
	});


});


app.set('port', 3009);
app.listen(app.set('port'), function(){
console.log('Server is running at port: ' + app.get('port'));
});


    
