# GENERAL INFORMATION

The project it will develop under cloud9 enviroment and should work on there. 

### User interface (UI)
We use node.js express.js and hbs (see https://www.npmjs.com/package/handlebars)  to show the adminlte template css based in boostrap.  see https://adminlte.io/ 

### Node.js Server components. 
We use node.js in Object literal module pattern see https://stackoverflow.com/questions/15718757/object-literal-or-modular-javascript-design-pattern 


Node.js Routing 
We create a main folder in the project example Mycomponent folder. 
Inside the folder we create the component with all funcionalities in object literal module 
```
function fnMycomponent (){
var cController = {
	AllParams:null, 
	swDebug : false, 

	// *LOAD HTML 
	test: function(fnCallBack){
	    var self = this; 
	    
	    
	    var retJson = {ok:1}
	    
	    fnCallBack(retJson);     
	} , // end test 
	    
} // end function 


module.exports = fnMycomponent;
    
``` 

Inside we place router.js for enroute all the funcionalities of the component. 
``` 

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


``` 

And in the app.js in the main folder we enroute the router. 
``` 

// MyCOMPONENT 
var RouteComponent = require("./Mycomponent/router.js"); 
app.use('/mycomponent', RouteComponent);


``` 

We create and html file on the plublic folder as the name of the component in nodejs. Here we place all the calls to test de functionality for each router and we create a basic component in javascript. 
See the example 
``` 

<!--------- menus - ------------> 

<div class="col-xs-12 col-md-2  no-padding" id="mailmenus">
    <div style="" class="box box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">Listas Emails</h3>
            <div class="box-tools">
                <button class="btn btn-box-tool" data-widget="collapse">
                    <i class="fa fa-minus"></i>
                </button>
            </div>
        </div>
        
        <div style="display:block" class="box-body no-padding">
            <ul class="nav nav-pills nav-stacked" style="max-height:300px;overflow:auto">
                <li class="" role="presentation" style="cursor:pointer">
                    <a role="menuitem" onclick="Mycomponent.test()"> /Test <span class="badge" style="float:right;background-color:#3C8DBC">6</span></a>
                </li>
                
            </ul>
        </div>
        
    </div>    
</div>
<div class="col-md-10" id="workMain">    
    <h1>Hello</h1>
    <p>Put each route in the component Mycomponent in order to call the router. </p>
    <p>Modify the var serverOptions in order to call your component. </p>
    <p>We use ajax call from jquery </p>
</div>



<script>
var Mycomponent = {
    
    // SERVER FUNCTIONS 
    serverOptions  : {
		hostname : null  , 
    	Route : "/mycomponent", 
    },
    
    CallServer: function(settings, Myparams){
	    // console.log("fn CallServer")
	    var self = this; 
	    var Mydiv = this.MainDiv;  
	    if (!Myparams) { Myparams = {}}
		var hostName = window.location.hostname; 
		if ( this.serverOptions.hostname ) { hostName = this.serverOptions.hostname }
		var url='https://'+ hostName + self.serverOptions.Route + '/' + settings.option;
		// console.log("KUDABY CALL SERVER: " + url);console.log("Settings:") ; console.dir(settings); console.log("Myparams:"); console.dir(Myparams); 
	    // NodeAjaxTime =  new Date().getTime();
	    var MydataReturn = null; 
	    var ajaxObject = {
	    	headers: {'kubyapikey': self.serverOptions.kubyapikey}, // set for increase security 
	        type: settings.CallType,
	        url: url,
	        timeout: settings.timeout,
	        data: Myparams  ,
	        success: function(data) {
	        	if (data.error){
 					view.showError(data.error,data.errorDescription ); 
	        	}else{
	            	if (settings.success) { settings.success.call(self,data);}     
	            }
	            
	        }, // success 
	        error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error",errorThrown ); 
	        } // error 
	         
	    }
	    if (settings.CallType !="POST") { ajaxObject.contentType= 'application/json'}
	    $.ajax(ajaxObject); // ajax call 
    }, // end call server 
    
    // YOUR TEST FUNCTIONS HERE. 
    test: function(){
        var self = this; 
        
        self.CallServer({option:"test", 
            success: function(data){
                console.log("data test",data); 

                $('#workMain').html('').html(JSON.stringify(data));  

            }
        },{var1:"value var1"})
    }, 
    
} // end component 



</script>
``` 


 
