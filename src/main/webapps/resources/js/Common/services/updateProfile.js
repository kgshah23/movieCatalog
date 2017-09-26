define([ 'angular' ], function(angular) {
	return [ '$resource', '$cookieStore', '$log',
			function($resource, $cookieStore, $log) {
		
				return {
					get : function(loginData){
						return $resource(baseUrl + "api/userProfile/:user_id", {
							user_id : "@user_id"
						}, {
							"get" : {
								'method' : 'GET',
								'params' : {
									'grant_type' : 'access_token',
									'access_token' : loginData!=undefined ? loginData.access_token: ""
								},
								isArray : false
							}
						});
					},
					update: function(loginData){
						return $resource(baseUrl + "api/userProfile/:user_id", {
							user_id : "@user_id"
						}, {
							"update" : {
								'method' : 'PUT',
								'params' : {
									'grant_type' : 'access_token',
									'access_token' : loginData!=undefined ? loginData.access_token: ""
								},
								isArray : false
							}
						});
					},
				};

			} ];
});
