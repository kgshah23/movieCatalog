define(['angular'], function(angular){
    return ['$resource',
      function ($resource) {
  	    return $resource(
  	    		baseUrl+ "api/auth/resetpassword",
    	        { },
    	        {
    	            "update": {method: "PUT"},
    	            "resetpassword": {'method': 'GET', 'params': {}, isArray: false}
    	 
    	        }
    	    );
    }];
});
