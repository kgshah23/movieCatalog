define([], function() {
	angular.module('deviceServiceModule',[])
	.factory('deviceService',['$resource',
								'$cookieStore',
								'ErrorHandlerService',function($resource,$cookieStore,ErrorHandlerService){
		return {

			/**
			 * **************** Create Device
			 * ************
			 */
			getDeviceTypes : function(callback) {
				var loginData = $cookieStore
						.get('loginData');
				if (loginData != undefined) {
					var sitesResource = $resource(
							baseUrl
									+ "api/deviceTypes",
							{},
							{
								"add" : {
									'method' : 'GET',
									'params' : {
										'grant_type' : 'access_token',
										'access_token' : loginData.access_token
									},
									isArray : false
								}
							});

					sitesResource
							.add(
									{},
									{},
									function(
											response) {
										if (ErrorHandlerService
												.handleError(response, true) == true) {
											callback(response.response);
										}
									},
									function(
											response) {
										ErrorHandlerService
												.handleRequestFailure(response);
										console
												.log(response);
									});

				}
			}
		};
	}]);
});