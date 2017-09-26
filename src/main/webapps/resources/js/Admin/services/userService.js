define(
		[ 'angular' ],
		function(angular) {
			return [
					'$resource',
					'$cookieStore',
					'$log',
					'ErrorHandlerService',
					'NotificationService','$location','$rootScope',
					function($resource, $cookieStore, $log,
							ErrorHandlerService, NotificationService,$location,$rootScope) {
						
						return {
							getListOfUsers : function(keyword, refId, refType,
									pageStart, pageCount, callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var usersResource = $resource(
											baseUrl + "api/users/",
											{},
											{
												"list" : {
													'method' : 'POST',
													'params' : {
														'grant_type' : 'access_token',
														'access_token' : loginData.access_token
													},
													isArray : false
												}
											});

									usersResource.list({}, {
										"keyword" : keyword,
										"referanceId" : refId,
										"referanceType" : refType,
										"pageStart" : (pageStart - 1)
												* pageCount,
										"pageCount" : pageCount
									}, function(response) {
										console.log($rootScope.timeoutPromise);
										if (ErrorHandlerService
												.handleError(response) == true)
											callback(response.response);
									}, function(response) {
										console.log(response);
										ErrorHandlerService.handleRequestFailure(response);
									});
								}
							},
							addUser : function(firstName, lastName, email,
									role, phoneNumber, refId, callback) {
								// alert("Spinner st");
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var usersResource = $resource(
											baseUrl + "api/user",
											{},
											{
												"add" : {
													'method' : 'POST',
													'params' : {
														'grant_type' : 'access_token',
														'access_token' : loginData.access_token
													},
													isArray : false
												}
											});

									usersResource.add({

									}, {

										"emailId" : email,
										"firstName" : firstName,
										"lastName" : lastName,
										"cellPhone" : phoneNumber,
										"officePhone" : "",
										"homePhone" : "",
										"otherPhone" : "",
										"referrenceId" : refId,
										"roleId" : role
									}, function(response) {
										// alert("Spinner end");
										if (ErrorHandlerService
												.handleError(response)) {
											 //$rootScope.$broadcast("myEvent", {Response: "User Added Successfully, Login credentials sent on registered Email ID." , Type: "success" });
											NotificationService.show("md","User Added Successfully, Login credentials sent on registered Email ID.","success");
											callback(response.response);
										}
									}, function(response) {
										console.log(response);
										ErrorHandlerService.handleRequestFailure(response);
									});
								}
							},
							editUser : function(firstName, lastName, role,
									phoneNumber,newPassword, user_id, refId, callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var usersResource = $resource(
											baseUrl + "api/user/:user_id",
											{
												user_id : "@user_id"
											},
											{
												"edit" : {
													'method' : 'PUT',
													'params' : {
														'grant_type' : 'access_token',
														'access_token' : loginData.access_token
													},
													isArray : false
												}
											});

									usersResource
											.edit(
													{
														user_id : user_id

													},
													{
														"id" : user_id,
														"firstName" : firstName,
														"lastName" : lastName,
														"cellPhone" : phoneNumber,
														"officePhone" : "",
														"homePhone" : "",
														"otherPhone" : "",
														"referrenceId" : refId,
														"roleId" : role,
														"password" : newPassword
													},
													function(response) {
														if (ErrorHandlerService
																.handleError(response)) {
															//$rootScope.$broadcast("myEvent", {Response: "User Edited Successfully." , Type: "success" });
															NotificationService.show("md","User Edited Successfully.","success");
															callback(response.response);
														}
													}, function(response) {
														console.log(response);
														ErrorHandlerService.handleRequestFailure(response);
													});
								}

							},
							getRoles : function(userType, callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var rolesResource = $resource(
											baseUrl + "api/roles/:roleTypeId",
											{
												roleTypeId : "@roleTypeId"
											},
											{
												"getroles" : {
													'method' : 'GET',
													'params' : {
														'grant_type' : 'access_token',
														'access_token' : loginData.access_token
													},
													isArray : false
												},
											});

									var roles = rolesResource.getroles({
										roleTypeId : userType
									}, {}, function(response) {
										callback(response.response);
									}, function(response) {
										console.log(response);
										ErrorHandlerService.handleRequestFailure(response);
									});
								}

							},
							deleteUser : function(user_id, callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var usersResource = $resource(
											baseUrl + "api/user/:user_id",
											{
												user_id : "@user_id"
											},

											{
												"deleteuser" : {
													'method' : 'DELETE',
													'params' : {
														'grant_type' : 'access_token',
														'access_token' : loginData.access_token
													},
													isArray : false
												}
											});

									usersResource
											.deleteuser(
													{
														'user_id' : user_id
													},
													{},
													function(response) {
														console.log(response);
														if (ErrorHandlerService
																.handleError(response)) {
															//$rootScope.$broadcast("myEvent", {Response: "User Deleted Successfully.", Type: "success" });
															NotificationService.show("md","User Deleted Successfully.","success");	
															callback(response.response);
														}
													}, function(response) {
														console.log(response);
														ErrorHandlerService.handleRequestFailure(response);
													});
								}
							},
							logoutUser : function(callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var usersResource = $resource(
											baseUrl + "api/auth/logout",
											{},

											{
												"logout" : {
													'method' : 'GET',
													'params' : {
														'grant_type' : 'access_token',
														'access_token' : loginData.access_token
													},
													isArray : false
												}
											});

									usersResource.logout({}, {}, function(
											response) {
										console.log(response);
										if (ErrorHandlerService
												.handleError(response)) {
											callback(response);
										}
									}, function(response) {
										console.log(response);
										ErrorHandlerService.handleRequestFailure(response);
									});
								}
							}
						};

					} ];
		});
