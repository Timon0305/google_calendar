var express = require('express');
var router = express.Router();


// *IMPORTar *DATA 
router.get('/test', function(req, res) {
	var retJson= {ok:'1'}
	var Myc = require("./MyComponent.js")(); 
	Myc.test(function(data){
	    res.json(retJson);    
	})

	
}); 


module.exports = router;
