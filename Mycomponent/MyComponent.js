function fnMycomponent (){
var cController = {
	AllParams: null, 
	version :"2020.10",
	nameComponent:"mycomponent" , 
	swDebug : false, 

	// *LOAD HTML 
	test: function(fnCallBack){
	    var self = this; 
	    
	    
	    var retJson = {ok:1}
	    
	    fnCallBack(retJson);     
	} , // end test 
	    
} // end controller 

return cController 

} // end function 


module.exports = fnMycomponent;
