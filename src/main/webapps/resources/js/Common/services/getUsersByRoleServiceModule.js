define(
		[],
		function() {
			angular
					.module('getUsersByRoleServiceModule', [])
					.factory(
							'getUsersByRoleService',[
									'$resource',
									'$cookieStore',
									'ErrorHandlerService',
									'$rootScope',
									function($resource, $cookieStore,
											ErrorHandlerService,
											$rootScope) {

										return {
											// status = {dummy =1 ,active =
											// 2,inactive = 3}
											
											/************************************* GET LIST OF Franchisee******************/
											getUsersByRole : function(roleId, referanceId, callback) {
												
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var usersResource = $resource(
															baseUrl
																	+ "api/usersByRole/:roleId/:referanceId",
															{
																roleId : '@roleId',
																referanceId : '@referanceId'
															},
															{
																"list" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													usersResource.list( {},{
														"roleId" : roleId,
														"referanceId" : referanceId
													},

													function(
															response) {
														if (ErrorHandlerService
																.handleError(response) == true)
															callback(response.response);
													},
													function(
															response) {
														ErrorHandlerService.handleRequestFailure(response);
														console
														.log(response);
													});
													
												}
											}
											
										};

									}]);
		});