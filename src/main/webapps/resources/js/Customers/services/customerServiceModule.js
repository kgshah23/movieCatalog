define(
		[],
		function() {
			angular
					.module('customerServiceModule', [])
					.factory(
							'customerService',[
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
											
											/************************************* GET LIST OF CUSTOMERS******************/
											getListOfCustomers : function(
													status, keyword, pageStart,
													pageCount, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/customers/",
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
													//STATUS HARDCODED - 0
													customersResource
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
											
											/************************************* GET LIST OF CUSTOMERS******************/
											getListOfAllCustomers : function(
													 keyword, pageStart,
													pageCount, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/customerDataList/",
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
													
													customersResource
															.list(
																	{},
																	{																		
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
											
											/***************************** GET CUSTOMER ***************************/
											getCustomer : function(customer_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/customer/:customer_id",
															{
																customer_id : "@customer_id"
															},
															{
																"getCustomer" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													customersResource
															.getCustomer(
																	{
																		customer_id : customer_id
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
											
											/****************************** ADD CUSTOMER *****************************/
											addCustomer : function(name,
													address1, address2, city,
													state, pincode, country,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/customer/",
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

													customersResource
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
																			//$rootScope.$broadcast("myEvent", {Response: "Customer Added Successfully.", Type: "success" });
																			NotificationService.show("md","Customer Added Successfully.","success");	
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
											/******************************** UPDATE CUSTOMER ************************/
											updateCustomer : function(
													customer_id, name,
													address1, address2, city,
													state, pincode, country,
													firedetectionFile,
													firefightingFile, comment,
													other, status, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/customer/:customer_id",
															{
																customer_id : "@customer_id"
															},
															{
																"update" : {
																	'method' : 'PUT',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													customersResource
															.update(
																	{
																		customer_id : customer_id
																	},
																	{
																		"name" : name,
																		"address1" : address1,
																		"address2" : address2,
																		"city" : city,
																		"state" : state,
																		"pincode" : pincode,
																		"country" : country,
																		"firedetectionFile" : firedetectionFile,
																		"firefightingFile" : firefightingFile,
																		"comment" : comment,
																		"other" : other,
																		"status" : status
																	},
																	function(
																			response) {
																		
																		if (ErrorHandlerService
																				.handleError(response) == true){
																			if(response.error == 205 )
																				callback(response);
																			else{
																				//$rootScope.$broadcast("myEvent", {Response: "Customer edited successfully", Type: "success" });
																				NotificationService.show("md","Customer edited successfully.","success");
																				callback(response);
																			}
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
											/*************************** DELETE CUSTOMER ******************************/
											deleteCustomer : function(customer_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/customer/:customer_id",
															{
																customer_id : "@customer_id"
															},
															{
																"deleteCustomer" : {
																	'method' : 'DELETE',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													customersResource
															.deleteCustomer(
																	{
																		customer_id : customer_id
																	},
																	{

																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true){
																			//$rootScope.$broadcast("myEvent", {Response: "Customer deleted successfully", Type: "success" });
																			NotificationService.show("md","Customer deleted successfully.","success");	
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
											
											/***************************** GET Reference User ***************************/
											getRefernceUser : function(customer_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/getReferenceUser",
															{
																
															},
															{
																"getCustomer" : {
																	'method' : 'POST',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													customersResource
															.getCustomer(
																	{
																		
																	},
																	{
																		
																		"userType":2,
																		"referenceId":customer_id
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
											/****************************** ADD refernce user *****************************/
											addReferenceUser : function(userId,custimer_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var customersResource = $resource(
															baseUrl
																	+ "api/referenceUser/",
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

													customersResource
															.add(
																	{},
																	{
																		"userId": userId,
																		"userType":2,
																		"referenceId":custimer_id,
																		
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true){
																			//$rootScope.$broadcast("myEvent", {Response: "Customer Added Successfully.", Type: "success" });
																			NotificationService.show("md","Customer Added Successfully.","success");	
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
											
										}

									}]);
		});