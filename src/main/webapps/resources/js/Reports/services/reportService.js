define(
		[],
		function() {
			angular
					.module('reportSeviceModule', [])
					.factory(
							'reportService',[
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
											
											/************************************* GET LIST OF CUSTOMERS******************/
											getReport : function(keyword,custId,siteId,Aging,pageStart,
													pageCount, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var reportResource = $resource(

															baseUrl
																	+ "api/ticketsByAgingPeriod/",
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
													reportResource
															.list(
																	{},
																	{
																		
																			"keyword" : keyword,
																			"customerId" :custId,
																			"siteId":siteId,
																			"agingInDays":Aging,
																			"pageStart" : pageStart,
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
											getPDF : function(keyword,custId,siteId,Aging,pageStart,
													pageCount, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var reportResource = $resource(

															baseUrl
																	+ "api/ticket/reportByAging",
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
													reportResource
															.list(
																	{},
																	{
																		
																			"keyword" : keyword,
																			"customerId" :custId,
																			"siteId":siteId,
																			"agingInDays":Aging,
																			"pageStart" : pageStart,
																			"pageCount" : pageCount
																			
																	},
																	function(
																			response) {
																		/*if (ErrorHandlerService
																				.handleError(response) == true)*/
																			callback(response);
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
										
									}])
									
		})			