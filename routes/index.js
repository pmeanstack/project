var express = require('express');
var router = express.Router();
var monk=require('monk');
var db = monk('localhost:27017/guest'); 
var collection = db.get('orderlist'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/order',function(req,res){
	res.render('order');
});
router.post('/login',function(req,res){
	var name=req.body.name;
	console.log(name);
	var password=req.body.password;
	console.log(password);
    collection.findOne({"name":name,"password":req.body.password },function(err,docs){
    	if(!docs){
    		console.log("mismatch");
    		res.render('index',{err:"invalid username or password"});
    	}
    	else if(docs){
    		console.log("success");
    		res.redirect('/order');
    	}
    	else{
    		console.log("error");
    	}
    });
    
});    
module.exports = router;
