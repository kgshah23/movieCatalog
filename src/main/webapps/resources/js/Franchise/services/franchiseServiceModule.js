define(
		[],
		function() {
			angular
					.module('franchiseServiceModule', [])
					.factory(
							'franchiseService',[
									'$resource',
									'$cookieStore',
									'$log',
									'ErrorHandlerService',
									'NotificationService',
									'$location','$rootScope',
									function($resource, $cookieStore, $log,
											ErrorHandlerService,
											NotificationService, $location,$rootScope) {

										return {
											// status = {dummy =1 ,active =
											// 2,inactive = 3}
											
											/************************************* GET LIST OF Franchisee******************/
											getListOfFranchisee : function(
													status, keyword, pageStart,
													pageCount, callback) {
												
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var franchiseeResource = $resource(
															baseUrl
																	+ "api/franchises",
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

													franchiseeResource
															.list(
																	{},
																	{
																		"status" : status,
																		"keyword" : keyword,
																		"pageStart" : (pageStart - 1)
																				* pageCount,
																		"pageCount" : pageCount
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
											},
											/************************************* GET LIST OF Franchisee Details******************/
											getListOfFranchiseeData : function(
													status, keyword, pageStart,
													pageCount, callback) {
												
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var franchiseeResource = $resource(
															baseUrl
																	+ "api/franchiseDataList",
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

													franchiseeResource
															.list(
																	{},
																	{
																		"status" : status,
																		"keyword" : keyword,
																		"pageStart" : (pageStart - 1)
																				* pageCount,
																		"pageCount" : pageCount
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
											},
											
											/***************************** GET Franchise ***************************/
											getFranchisee : function(franchise_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var franchiseeResource = $resource(
															baseUrl
																	+ "api/franchise/:franchise_id",
															{
																franchise_id : "@franchise_id"
															},
															{
																"getFranchise" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													franchiseeResource
															.getFranchise(
																	{
																		franchise_id : franchise_id
																	},
																	{

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
											},
											
											/****************************** ADD Franchise *****************************/
											addFranchise : function(name,
													address1, address2, city,
													state, pincode, country,
													callback) {
												
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var franchiseResource = $resource(
															baseUrl
																	+ "api/franchise/",
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

													franchiseResource
															.add(
																	{},
																	{
																		"name" : name,
																		"address1" : address1,
																		"address2" : address2,
																		"city" : city,
																		"state" : state,
																		"pincode" : pincode,
																		"country" : country
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true){
																			//$rootScope.$broadcast("myEvent", {Response: "Franchisee Added Successfully.", Type: "success" });
																			NotificationService.show("md","Franchisee Added Successfully.","success");	
																			callback(response.response);
																		}
																	},
																	function(
																			response) {
																		ErrorHandlerService.handleRequestFailure(response);
																		console
																				.log(response);
																	});
												}
											},
											/******************************** UPDATE Franchise ************************/
											updateFranchisee : function(
													franchisee_id, name,
													address1, address2, city,
													state, pincode, country,status,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var franchiseeResource = $resource(
															baseUrl
																	+ "api/franchise/:franchisee_id",
															{
																franchisee_id : "@franchisee_id"
															},
															{
																"update" : {
																	'method' : 'POST',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													franchiseeResource
															.update(
																	{
																		franchisee_id : franchisee_id
																	},
																	{
																		"name" : name,
																		"address1" : address1,
																		"address2" : address2,
																		"city" : city,
																		"state" : state,
																		"pincode" : pincode,
																		"country" : country,
																		"status": status,
																	
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true){
																			//$rootScope.$broadcast("myEvent", {Response: "Franchisee edited successfully", Type: "success" });
																			NotificationService.show("md","Franchisee edited successfully.","success");	
																			callback(response);
																		}
																	},
																	function(
																			response) {
																		ErrorHandlerService.handleRequestFailure(response);
																		console
																				.log(response);
																	});
												}
											},
											/*************************** DELETE FRANCHISEE ******************************/
											deleteFranchisee : function(franchise_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var franchiseeResource = $resource(
															baseUrl
																	+ "api/franchise/:franchise_id",
															{
																franchise_id : "@franchise_id"
															},
															{
																"deleteFranchisee" : {
																	'method' : 'DELETE',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													franchiseeResource
															.deleteFranchisee(
																	{
																		franchise_id : franchise_id
																	},
																	{

																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true){
																			//$rootScope.$broadcast("myEvent", {Response: "Franchisee deleted successfully", Type: "success" });
																			NotificationService.show("md","Franchisee deleted successfully.","success");	
																			callback(response.response);
																		}
																	},
																	function(
																			response) {
																		ErrorHandlerService.handleRequestFailure(response);
																		console
																				.log(response);
																	});
												}
											}
										}

									}]);
		});