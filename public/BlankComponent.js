// BLANKCOMPONENT  *mycomponent. 




// BEGIN SCOPE 
// self executing function for jquery reference. That prevents the $ is allways jquery component. 
// W = window D= document undefined = nothing prevent undefined = true
(function ($, W, D, undefined ) {



/* ---------------------------------------------------------
// FUNCTION 
The function has 4components 
cMain for main control,
serverCall for call server to /node 
data for data manipulation and connect to server. 
view for view UI  


 ------------------------------------------------------------ */ 
var BlankComponent = function(){
var name = "jthn"; 

var cMain = {
	// default values *defaults
	defaults : {
		name: 'Default Name', 

	}, // end defaults 

	// CREATE A INSTANCE  *new *instance
	create: function(options){
		var instance = Object.create(this);
		Object.keys(options).forEach(function(key){
			instance[key] = options[key];
		})
		return instance; 

	}, // end create

	// INIT *init componentn  
	init: function(options, elem){
		// INI OBJECTS  
		var self = cMain;
		// console.log("FN init"); console.log(this); console.log(cMain); 


		// INI OPTIONS 
		self.options = $.extend({}, self.defaults, options);
		self.recordset = self.options.recordset; 


		// INI DATA AND VIEW 
		view.iniHtml($(elem)); 
		data.init({name:self.options.name}); 




		// CALL MAIN
		self.Main();

		// self.CallServer({success: self.testReturn},{app:"MarcTest003",option:"1",value1:'marc',DBToken:'Prog001'})
		
	},// end init


	// ******************************  FUNCTIONS FROM HERE !!!!
	Main: function(){
		var self = this, op = self.options; 
		view.spin(); 
		data.Getdata(function(data){
			console.log('GetData Return'); console.log(data); 
			view.ShowNames(); 
		}); 
	},



}// END COMPONENT 


// ALL THE CONNECTIONS TO THE *SERVER. 
// If the server return and error variable it will show the view.showError 
var serverCall = {

	// SERVER CONNECTION *server *options 
	serverOptions: {
		hostname : null  , 
    	Route : "/BlankComponent/node", 
    	kubyapikey: null,
	},

	// CALL SERVER *server *call 
	CallServer: function(settings, Myparams){
	    // console.log("fn CallServer")
	    var self = this; 
	    var Mydiv = this.MainDiv;  
	    if (!Myparams) { Myparams = {}}
		var hostName = window.location.hostname; 
		if ( this.serverOptions.hostname ) { hostName = this.serverOptions.hostname }
		var url='http://'+ hostName + self.serverOptions.Route + '/' + settings.option;
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
				view.showError("Error",errorThrown ); 
	        } // error 
	         
	    }
	    if (settings.CallType !="POST") { ajaxObject.contentType= 'application/json'}
	    $.ajax(ajaxObject); // ajax call 
	},// end call server,

} // end server Call 


// ALL DATA MANIPULATION *DATA 
// all the funcionts on the data manipulation, have to have a callback function and return the data demanded. 
// There is no Any call to the server in the functions, all the calls to the server should be on the serverCall component 
var data = {
	init: function(datadefaults){
		var self = this; 
		// this.name = name;
		Object.keys(datadefaults).forEach(function(key){
			self[key] = datadefaults[key];
		})
		//self  = $.extend({}, datadefaults);

	},

	// GET DATA EXAMPLE. 
	Getdata: function(fnCallBack){
		var self = this; 
		this.name = name; 

		// SERVER OPTIONS 
		var CallOptions = {option:"testcomponent", // CallType:"POST", 
			success:function(data){
				self.names = data.recordset; 
				fnCallBack(data); 
			}
		} // options 

		// SERVER PARAMS 
		var Myparams = {param1:"value1"}

		// SERVER CALL 
		serverCall.CallServer(CallOptions,Myparams)	
	}, 	

};  // end data


// ALL DOM MANIPULATION *VIEW
var view = {
	template: `
		<div class="box box-success">
                <div class="box-header with-border">
                  <h3 class="box-title">Visitors Report</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                </div><!-- /.box-body -->
        </div>

	`, 
	// *INI *HTML 
	// Catch here all the elements in the DOM that you'll gonna need to use. 
	// the param elem is the main container 
	iniHtml: function(elem){
		var self = this; 
		self.$MainDiv = elem; 

		self.$MainDiv.html(''); 
		self.$MainDiv.append(self.template); 
		// .html('').append("Hello component initiated !!! " + self.options.name); 

		self.$divName = $("<div/>",{class:"container"}).appendTo(self.$MainDiv)
		// self.$divName.append("Component initiated !!! " + data.name)

		// CATCH HTML TO REUSE
		self.DivWork = self.$MainDiv.find(".box-body"); 

	},

	// *RENDER 
	render: function(){
		var self = view; 
		console.log("FN RENDER"); console.log(this);

		self.DivWork.html(''); 
		self.DivWork.append("Render function " + data.name); 
	}, 


	// SHOW ERROR. 
	showError: function(Err,Description){
        var DivModal = $('<div class="modal modal-danger"/>');
        var hModal ='<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' + 
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>' + 
            '<h4 class="modal-title">' + Err + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>'+ Description + '</p></div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>' +
            '</div></div><!-- /.modal-content --></div><!-- /.modal-dialog --> <!-- /.modal -->'; 
        DivModal.html(hModal);
        $('body').append(DivModal); 
        DivModal.modal('show');
    }, // END showModalError	

    ShowNames: function(){
    	var self = view; 
    	self.DivWork.html(''); 

    	var Ul = $("<ul/>").appendTo(self.DivWork); 
    	$.each(data.names, function(i,obj){
    		Ul.append("<li>" + obj + "</li>"); 
    	})	
    }, // Show names 

    spin: function(){
    	var self = view; 
    	self.DivWork.html(''); 

		var spinOPtions = {class: "fa fa-spinner fa-spin center fa-3x fa-fw spin", 
        style: "margin:0 50%"} 

		var hSpin =$('<i class="' + spinOPtions.class  + '" aria-hidden="true" style="' + spinOPtions.style  + '"></i>'); 
		if (spinOPtions.addclass) { hSpin.addClass(spinOPtions.addclass) }

		self.DivWork.append(hSpin);
    } // spin. 

} // end view 


// EXPOSED METHODS 
// return cComponent; 
return {
	init:cMain.init,
	sayHi: cMain.sayHi,
	render: view.render,
	names: view.ShowNames

}// end exposed methods 

}; // function 

// ---------------------------------------------------------
// JQUERY DECLARED FUNCTIONS 
// ------------------------------------------------------------
$.fn.BlankComponent = function(options){
	// RETURN FOR EACH ELEMENT CHAINING MANTEINING 
	return this.each(function(){
		// this is now jquery object this.html('');
		//var my = Object.create(jLists);
		var my = new BlankComponent();
		// my.create({})
		console.log(my); 

		my.init(options, this);


		// INSTANCIATE MYCOMPONENT 
		// access to my component from outside like $('#mydiv').data('mycomponent')
		$.data(this,'BlankComponent',my)

	}); 
	// end return FOR EACH ELEMENT CHAINING MANTEINING  
}
 

})(jQuery, window, document);
// END SCOPE MYCOMPONENT  


