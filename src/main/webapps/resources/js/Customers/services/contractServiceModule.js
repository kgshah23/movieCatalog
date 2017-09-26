define(
		[],
		function() {
			angular
					.module('contractServiceModule', [])
					.factory(
							'contractService',
							[
									'$resource',
									'$cookieStore',
									'$log',
									'ErrorHandlerService',
									'NotificationService',
									'$location',
									'$rootScope',
									function($resource, $cookieStore, $log,
											ErrorHandlerService,
											NotificationService, $location,
											$rootScope) {

										return {
											/****************************** ADD SITE *****************************/
											createContract : function(referenceId1, referenceId2,
													referenceNo, issueDate, startDate,
													endDate, attachment,callback) {

												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteResource = $resource(

															baseUrl
																	+ "api/contract",
															{
																
															},
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

													siteResource
															.add(
																	{},
																	{
																		"referenceId1" : referenceId1,
																		"referenceId2" : referenceId2,
																		"referenceNo" : referenceNo,
																		"issueDate" : issueDate,
																		"startDate" : startDate,
																		"endDate" : endDate,
																		"attachment" : attachment,
																		
																	},

																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "New Site Added",
																								Type : "success"
																							});*/
																			NotificationService.show("md","New contract created successfully.","success");
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
											},
											/**********************Get Contract list *****************/
											getListOfContracts : function(referenceId1,referenceId2,pageStart,pageCount,callback) {
												var loginData = $cookieStore.get('loginData');
												if (loginData != undefined) {
													var contractResource = $resource(
															baseUrl + "api/contracts/",
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
													contractResource.list({}, {
														"referenceId1":referenceId1,
														"referenceId2":referenceId2,
														"pageStart":(pageStart - 1)* pageCount,
														"pageCount":pageCount
													}, function(response) {
														if (ErrorHandlerService
																.handleError(response,true) == true){
															callback(response.response);
														}
															
													}, function(response) {
														console.log(response);
														ErrorHandlerService.handleRequestFailure(response);
													});
												}
											},
											/********************************************************/
											/**********************delete Contract *****************/
											deleteContracts : function(contractId,callback) {
												var loginData = $cookieStore.get('loginData');
												if (loginData != undefined) {
													var contractResource = $resource(
															baseUrl + "api/contract/:contractId",
															{
																contractId : "@contractId"
															},
															{
																"list" : {
																	'method' : 'DELETE',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													contractResource.list({
														'contractId' : contractId
													}, 
													{
	
													}, function(response) {
														if (ErrorHandlerService
																.handleError(response,true) == true){
															NotificationService.show("md","Contract deleted successfully.","success");
															callback(response.response);
														}
															
													}, function(response) {
														console.log(response);
														ErrorHandlerService.handleRequestFailure(response);
													});
												}
											},
											/********************************************************/
											/**********************Download Contract *****************/
											downloadContractFile : function(fileName,callback) {
												var loginData = $cookieStore.get('loginData');
												if (loginData != undefined) {
													var contractResource = $resource(
															baseUrl + "api/contract/download/:fileName",
															{
																fileName : "@fileName"
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
													contractResource.list({
														'fileName' : fileName
													}, 
													{
	
													}, function(response) {
															// NotificationService.show("md","Contract deleted successfully.","success");
															callback(response);
													} , function(response) {
														console.log(response);
														ErrorHandlerService.handleRequestFailure(response);
													});
												}
											},
											/********************************************************/
										}
									}]);
		})