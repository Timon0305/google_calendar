var express = require('express');
var app = express();
var path = require('path');



// BD ROUTER. 
var appRouter = require("./BD-ROUTER.js"); 
app.use('/bd', appRouter);




// RENDER 
const hbs = require('hbs');
hbs.registerPartials(__dirname + "/views/partials"); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public')) 



// MyCOMPONENT 
var RouteComponent = require("./Mycomponent/router.js"); 
app.use('/mycomponent', RouteComponent);

// MAIN ROTURES 
app.get('/', function (req, res) {
  // res.send('Hello World 22!');
  var oData = {}; 
	res.render('mainKuby',oData);	
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LISTENING MAIN APP ');
});