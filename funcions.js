var crypto = require('crypto');


var me = module.exports = {
// vars 
idWeb : '',
NumWeb: 0,  
 
RandomText : function(vLengh){

	var randomString = function(length, chars) {
		  if (!chars) {
			throw new Error('Argument \'chars\' is undefined');
		  }

		  var charsLength = chars.length;
		  if (charsLength > 256) {
			throw new Error('Argument \'chars\' should not have more than 256 characters'
			  + ', otherwise unpredictability will be broken');
		  }

		  var randomBytes = crypto.randomBytes(length);
		  var result = new Array(length);

		  var cursor = 0;
		  for (var i = 0; i < length; i++) {
			cursor += randomBytes[i];
			result[i] = chars[cursor % charsLength];
		  }

		  return result.join('');
	}// end randomString

	return randomString(vLengh,'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
	
}, // end RandomText 


// COONECTION TO OBJE 
STRconnectionToObj : function(vStr){
	var Connection = {
		user: '',
		password: '',
		server: '', 
		database: '',
		//debug : ''
	}; 
	var xTest = {};
	var vElements = vStr.split(";"); 
	for (var x in vElements) {
		var vElement = vElements[x].replace(/'/g, ''); 

		var vIgual = vElement.indexOf("=")
		var vName = vElement.substring(0, vIgual);
		var vEnd = vElement.length; 
		var vValor = vElement.substring((vIgual+1), vEnd);
		// Connection.debug = Connection.debug + ' *****Element:[' + vElement + '] pos:' + vIgual + ' - vEnd:' +  vEnd +  ' - name:[' + vName + '] - valor:[' + vValor + ']'; 
		// Antic 
		/* 
		var vElement = vElements[x].replace(/'/g, '').split("="); 
		var vName = vElement[0].toLowerCase()
		vElement = vElements[x].replace(/'/g, '').split("="); 
		xTest[vElement[0]] = vElement[1];
		var vValor = vElement[1];
		*/ 

		// DATA SOURCE 
		if (vName.toLowerCase()=='data source'){
			vPort = vValor.split(","); 
			Connection.server = vPort[0]; 
			if (vPort.length > 0 ) { Connection.port = vPort[1] }
		}
		if (vName.toLowerCase()=='initial catalog'){ Connection.database =vValor} 
		if (vName.toLowerCase()=='user id'){ Connection.user =vValor} 
		if (vName.toLowerCase()=='password'){ Connection.password =vValor} 
		
	}
	//xTest.CONNECTION = Connection;
	
	return Connection; 
},  // end  STRconnectionToObj


// *EACH *SYNC
EachSync: function(){
	var cKudabyEach = {
		// CREATE 
		create: function(options){
 			var instance = Object.create(this);
 			Object.keys(options).forEach(function(key){
 				instance[key] = options[key];
 			})
 			return instance; 
		}, 
		
		// each
		each: function(options){
			var self = this; 
			self.Recordset = options.recordset;
			self.Count = 0; 
			self.IterateFN = options.iterateFN; 
			self.endFN = options.endFN; 
			self.iterate(self.Recordset[self.Count]);
		},// each 
		
		// ITERATE ELEMENT 
		iterate: function(data){
			var self = this; 
			self.IterateFN(data); 
		},
		// NextIterate 
		next: function(){
			var self = this  ; 
			self.Count  = self.Count  +1; 
			if (self.Count < self.Recordset.length) {
				self.iterate(self.Recordset[self.Count]);
			}else {
				self.endFN(); 
			}
		}, // NextIterate 
	}// end MySync  

	return cKudabyEach.create({});
}, // end EachSync

KudabyEach: function(){
  var cKudabyEach = {
      // CREATE 
      create: function(options){
        var instance = Object.create(this);
        Object.keys(options).forEach(function(key){
          instance[key] = options[key];
        })
        return instance; 
      }, 
      
      // each
      each: function(options){
        var self = this; 
        self.Recordset = options.recordset;
        self.Count = 0; 
        self.IterateFN = options.iterateFN; 
        self.endFN = options.endFN; 
        if (self.Recordset.length>0){
          self.iterate(self.Recordset[self.Count]);
        }else{
          self.endFN();
        }
      },// each 
      
      // ITERATE ELEMENT 
      iterate: function(data){
        var self = this; 
        self.IterateFN(data); 
      },
      // NextIterate 
      next: function(){
        var self = this  ; 
        self.Count  = self.Count  +1; 
        if (self.Count < self.Recordset.length) {
          self.iterate(self.Recordset[self.Count]);
        }else {
          self.endFN(); 
        }
      }, // NextIterate 
  }// end MySync  
  return cKudabyEach; 
}, //KudabyEach 
 

// *EXTEND 
extend : function () {
	self = this; 
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf,
        class2type = {
          "[object Boolean]": "boolean",
          "[object Number]": "number",
          "[object String]": "string",
          "[object Function]": "function",
          "[object Array]": "array",
          "[object Date]": "date",
          "[object RegExp]": "regexp",
          "[object Object]": "object"
        },
        jQuery = {
          isFunction: function (obj) {
            return jQuery.type(obj) === "function"
          },
          isArray: Array.isArray ||
          function (obj) {
            return jQuery.type(obj) === "array"
          },
          isWindow: function (obj) {
            return obj != null && obj == obj.window
          },
          isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj)
          },
          type: function (obj) {
            return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
          },
          isPlainObject: function (obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
              return false
            }
            try {
              if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false
              }
            } catch (e) {
              return false
            }
            var key;
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key)
          }
        };
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {}
      }
      if (length === i) {
        target = this;
        --i;
      }
      for (i; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];
            if (target === copy) {
              continue
            }
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : []
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              // WARNING: RECURSION
              target[name] = self.extend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
}, //extend 

// CONVERT TO aRRAY 
convertToArray: function(obj){
		if (Object.prototype.toString.call(obj) == "[object Object]"){  
			var newView = []; 
			newView.push(obj); 
			return newView
		}else if (Object.prototype.toString.call(obj) == "[object Array]"){
			return obj;
		}else{
			return []
		}// end 

}, // END CONVERT TO ARRAY. 



// *READ POST 
ReadPost: function(req,fnCallBack){
	var swDebug = false ; 
 	var qs = require('querystring');
	var body = '';
    req.on('data', function (data) {
        body +=data;
    });
    req.on('end',function(){
        var Params = qs.parse(body,null, null,{ maxKeys : 0 });
		//  fnCallBack(Params)

        if (swDebug== true){Params.log = []}
		// CHANGE params NAME OF NESTEAD OBJECTS. COMMING FROM =client[num]=1  --> :client{num:'1'}  ---> 
		var hasBraked,ObjectName,endBraked,isArray,nObject,dif; 

		Object.keys(Params).forEach(function(key) {
			var value = Params[key];
			if (swDebug== true){Params.log.push("key: " + key );Params.log.push(" = " + value)}


			// SPLID NESTED 
			if (key !='log') {  
			var nested = key.split("["); 
			for (var item in nested) { 
				if (nested[item].substring(nested[item].length -1,nested[item].length) == "]") { nested[item] = nested[item].substring(0,nested[item].length -1) }
			}//for 

			if (swDebug== true){ Params.log.push(nested)} 

			// ATTRIBUTE 
			if (nested.length > 1 ){ 
				var oActual = null,isArray = null; 
				for (var i = 0; i < nested.length; i++) {
					// NESTED OBJECT.
					if (swDebug== true){ Params.log.push(i + " Nested:" + nested[i]);} 
					if (i < nested.length-1){
						if (oActual == null){

						// si el parametro siguiente es [] -> [myparam][] ya es un array de strings 
							if (nested[i+1] == ""){
								if (swDebug== true){Params.log.push("This is array :");}
								oActual[nested[i]] = Params[key]; 
								break;
							}else{
								isArray  = !isNaN(nested[i+1]);   
								if (swDebug== true){ Params.log.push("is Array " + isArray); }
								if (!Params[nested[i]]){
									if (isArray) {
										Params[nested[i]] = [];
									}else{
										Params[nested[i]] = {}; 
									}
								} //not object. 
								oActual = Params[nested[i]]; 
							}
						}else{
							if (nested[i+1] == ""){
								if (swDebug== true){ Params.log.push("This is array :");} 
								oActual[nested[i]] = Params[key];  
								break;
							}else{
								isArray  = !isNaN(nested[i+1]);   
								if (swDebug== true){ Params.log.push("is Array " + isArray);} 
								if (!oActual[nested[i]]){
									if (isArray) {
										oActual[nested[i]] = [];
									}else{
										oActual[nested[i]] = {}; 
									}
								} //not object. 
								oActual = oActual[nested[i]]; 
							}// nestedn next = ""
						} // oActual = null 

					// ATTRIBUTE LAVEL. 
					}else if (i == nested.length-1){
						if (isArray){
							oActual.push(Params[key]); 
						}else{
							oActual[nested[i]] = Params[key]; 
						}
					}
				}// for 

				
				delete Params[key]; 

			}

			}// no log iteration
 
			
		}); // forEach 
		

 
		
		
        fnCallBack(Params)
        // console.log(POST);
    });
}, // end ReadPost  

// *VALIDATE EMAIL
validateEmail: function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}, 



timeInit: function(name){
	var self = this; 
	
	if (!self.timers) {self.timers =[]}
	var atime = {name:name,start:new Date()}
	self.timers.push(atime); 
}, 



timeEnd: function(name) {
	var self = this ; 
	
	self.timers.forEach(function(item){
			if (item.name == name){
				item.end = new Date(); 
				item.Time = item.end -item.start ; 
				delete item.start; delete item.end;  
				return item.Time 
				// break
			}
			 
	})
}, 

timeGetAll: function(){
	var self = this ; 
	return self.timers; 
}






}; // END EXPORTS  




