var express = require('express');
var session = require('express-session');

var app=express();
app.use(express.static(__dirname+"/public"));

var mongojs= require('mongojs');
var db=mongojs('login_app',['user']);
app.use(session({secret: 'aangishah', saveUninitialized: true,resave: true}));

var bodyparser=require('body-parser');
app.use(bodyparser.json());
var urlencodedParser = bodyparser.urlencoded({ extended: false })

app.get('/',function (req,res)
{
	var sess = req.session;
	if(sess.username)
	{
    	console.log("already logged in!");
		res.redirect("/dashboard");
	}
	else
	{
		res.redirect('index.html');
	}
});

app.get('/home',function (req,res)
{
	var sess = req.session;
	if(sess.username)
	{
    	console.log("already logged in!");
		res.redirect("/dashboard");
	}
	else
	{
		res.redirect('index.html');
	}
});

app.get('/login',function (req,res)
{
	var sess = req.session;
	if(sess.username)
	{
    	console.log("already logged in!");
		res.redirect("/dashboard");
	}
	else
	{
		res.redirect('login.html');
	}
});

app.get('/register',function (req,res)
{
	var sess = req.session;
	if(sess.username)
	{
    	console.log("already logged in!");
		res.redirect("/dashboard");
	}
	else
	{
		res.redirect('register.html');
	}

});

app.get('/user_data',function(req,res){
	db.user.find(function(err,docs){
			console.log(docs);
			res.json(docs);
		});
});

app.get('/dashboard', function(req,res){
	res.redirect('dashboard.html');
});

app.post('/register_user',function(req,res){
	username1=req.body.name;
	console.log(username1);
	var msg;
	db.collection("user").find({'name':username1}).toArray(function(err,docs)
	{
		if(docs[0]==null)
		{
				db.user.insert(req.body,function(err,doc)
				{
					res.json();
				});
			msg="registered";
			console.log(res);
			res.send({msg:"registered"});
		}
		else
		{	
			console.log("user already exists");
			msg="already there";
			res.json({msg:"already there"});
		}
		if(err)
			throw err;
	});

});

app.post('/login_user',urlencodedParser, function(req, res){
	console.log(req.body);

	var sess = req.session;
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	console.log(password);

	db.collection("user").find({'name':username, 'password':password}).toArray(function(err,docs)
	{
		//console.log("here");
		console.log(docs);
		if(docs[0]==null)
		{
			console.log("incorrect data");
			res.redirect('/index.html');
		}
		else
		{
			sess.username = username;
			console.log("correct data");
			res.redirect('/dashboard.html');
		}
		if(err)
			throw err;
	}); 
});
app.get('/logout',function(req,res){
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});
app.listen(3000);
console.log("server running on the port 3000");
