define([ 'angular' ], function(angular) {
	return [ '$resource', '$cookieStore', '$log','$state','$rootScope','$location','$timeout','Idle','NotificationService','userService','spinnerService',
			function($resource, $cookieStore, $log,$state,$rootScope,$location,$timeout,Idle,NotificationService,userService,spinnerService) {
		
				return {
					login : function(username,password,callback){
						var loginresource =  $resource(baseUrl + "oauth/token", {
						}, {
							"login" : {
								'method' : 'POST',
								'params' : {
									'grant_type' : 'password',
									'client_id' : 'client',
									'username' : username,
									'password' : password
								},
								isArray : false
							}
						});
					loginresource
							.login(
									{},
									{},
									function(response) {
										spinnerService.dismissSpinner();
										console.log(response);
										var loginData = JSON.parse(JSON.stringify(response));
										$log.info('data === >'+ loginData);
										$log.info("password expirs in:" + loginData.passwordExpiresIn);
										$log.info('accesstoken  === >' + loginData.access_token);
										
										$rootScope.timeoutPromise = $timeout(
												function() {
													console.log('=================================in tout fn======================');
													userService.logoutUser(function(response){
													});
													$cookieStore.remove('loginData');
													$cookieStore.remove('loggedin');
													$location.path("/login");
												    $rootScope.$broadcast("CloseModals");
													//$rootScope.$broadcast("myEvent", {Response: "Your session has expired. Please login again.", Type: "info", color: "#A9D4E5" });
													NotificationService.show("md","Your session has expired. Please login again.","danger");
													Idle.unwatch();

												}, loginData.expires_in * 1000);

										$cookieStore.put('loggedin',
												true);
										$cookieStore.put('loginData',
												loginData);
										loginDataGlobal = loginData;
										Idle.watch();
										$state.go('common.dashboard.tickets');

									}, function(response) {
										spinnerService.dismissSpinner();
										callback(response);
										console.log(response);
									});
					}
				};
				

			} ];
});
