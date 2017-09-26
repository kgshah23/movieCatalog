define(
		[],
		function() {
			angular
					.module('siteServiceModule', [])
					.factory(
							'siteService',
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

											/************************************* GET LIST OF SITES******************/
											getListOfSites : function(keyword,
													referenceId,referenceType, pageStart,
													pageCount, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/sites",
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

													sitesResource
															.list(
																	{},
																	{
																		"keyword" : "",
																		"referenceId" : referenceId,
																		"referenceType": referenceType,
																		"pageStart" : (pageStart - 1)* pageCount,
																		"pageCount" : pageCount
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response,true) == true)
																			callback(response.response);
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

											/****************************** ADD SITE *****************************/
											addSite : function(name, address1,
													address2, city, state,
													pincode, country,
													customerId, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteResource = $resource(
															baseUrl
																	+ "api/site/:site_id",
															{
																site_id : "@site_id"
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
																		"name" : name,
																		"address1" : address1,
																		"address2" : address2,
																		"city" : city,
																		"state" : state,
																		"pincode" : pincode,
																		"country" : country,
																		"customerId" : customerId
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
																			if(response.error == 0 ){
																				NotificationService.show("md","New Site Added.","success");
																			}
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
											/******************************** UPDATE SITE ************************/
											updateSite : function(site_id,
													name, address1, address2,
													city, state, pincode,
													country, siteStage,ftUsers,franchiseUsers, fasComplianceCertificate, hsComplianceCertificate, customerUser, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteResource = $resource(
															baseUrl
																	+ "api/site/:site_id",
															{
																site_id : "@site_id"
															},
															{
																"update" : {
																	'method' : 'PUT',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																},
															});

													siteResource
															.update(
																	{
																		site_id : site_id
																	},
																	{
																		"name" : name,
																		"address1" : address1,
																		"address2" : address2,
																		"city" : city,
																		"state" : state,
																		"pincode" : pincode,
																		"country" : country,
																		"siteStage" : siteStage,
																		"ftUserId" : ftUsers,
																		"franchiseUserId" : franchiseUsers,
																		"fasComplianceCertificate" : fasComplianceCertificate,
																		"hsComplianceCertificate" : hsComplianceCertificate,
																		"customerUserId" : customerUser
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Site edited successfully",
																								Type : "success"
																							});*/
																			if(response.error == 0 ){
																				NotificationService.show("md","Site edited successfully.","success");
																			}
																			
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
											/*************************** DELETE SITE ******************************/
											deleteSite : function(
													site_id, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteResource = $resource(
															baseUrl
																	+ "api/site/:site_id",
															{
																site_id : "@site_id"
															},
															{

																"deleteSite" : {
																	'method' : 'DELETE',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													siteResource
															.deleteSite(
																	{
																		site_id : site_id
																	},
																	{

																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Site deleted successfully",
																								Type : "success"
																							});*/
																			NotificationService.show("md","Site deleted successfully.","success");
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
											
											/*****************GET SITE DETAILS *************************************************/
											getSite : function(site_id,callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteResource = $resource(
															baseUrl
																	+ "api/site/:site_id",
															{
																site_id : "@site_id"
															},
															{
																"getSite" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													siteResource
															.getSite(
																	{
																		site_id : site_id
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
											/*******************Author: PRAGATI***********************************************************/
											/*****************UPDATE SITE Billing Info *************************************************/
											updateSiteBillingInfo : function(site_id,
													commisionDate,
													sitePoDate,
													contractExpiryDate,
													lastBilledDate,
													lastPreventiveMaintDate,
													billingPeriod,
													billingRate,
													preventiveMaintPeriod,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteBillingResource = $resource(
															baseUrl
																	+ "api/site/:site_id/bill",
															{
																site_id : "@site_id"
															},
															{
																"getSite" : {
																	'method' : 'PUT',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													siteBillingResource
															.getSite(
																	{
																		site_id : site_id
																	},
																	{
																		
																			"commisionDate" : commisionDate,
																			"sitePoDate" : sitePoDate,
																			"contractExpiryDate" : contractExpiryDate,
																			"lastBilledDate" : lastBilledDate,
																			"lastPreventiveMaintDate" :lastPreventiveMaintDate,
																			"billingPeriod" : billingPeriod,
																			"billingRate": billingRate,
																			"preventiveMaintPeriod":preventiveMaintPeriod
																			
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true)
																			//$rootScope.$broadcast("myEvent", {Response: "Site Billing Information edited successfully", Type: "success" });
																			NotificationService.show("md","Site Billing Information edited successfully.","success");
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
											/************************Author: Pragati*****************************************/
											/***********************GET SITE BOQ DETAILS*************************************/
											getSiteBoq : function(site_id,callback) {		
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteBoqResource = $resource(
															baseUrl
																	+ "api/siteBoq/:site_id",
															{
																site_id : "@site_id"
															},
															{
																"getSiteBoq" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													siteBoqResource
															.getSiteBoq(
																	{
																		site_id : site_id
																	},
																	{

																	},
																	function(
																			response) {
																		/*if (ErrorHandlerService
																				.handleError(response,true) == true)*/
																			callback(response.response);
																	},
																	function(
																			response) {
																		/*ErrorHandlerService.handleRequestFailure(response);
																		console
																				.log(response);*/
																	});
												}
											},
											/***********************GET SITE AUDIT DETAILS*************************************/
											getSiteAudit : function(site_id,callback) {		
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteBoqResource = $resource(
															baseUrl
																	+ "api/siteAuditBySiteId/:site_id",
															{
																site_id : "@site_id"
															},
															{
																"getSiteBoq" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													siteBoqResource
															.getSiteBoq(
																	{
																		site_id : site_id
																	},
																	{

																	},
																	function(
																			response) {
																		/*if (ErrorHandlerService
																				.handleError(response,true) == true)*/
																			callback(response.response);
																	},
																	function(
																			response) {
																		/*ErrorHandlerService.handleRequestFailure(response);
																		console
																				.log(response);*/
																	});
												}
											},
											/************************Author: Pragati*****************************************/
											/***********************create SITE BOQ DETAILS*************************************/
											createSiteBoq : function(site_id,gateway,repeater,FE,FH,FAS,callback) {		
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var siteBoqResource = $resource(
															baseUrl
																	+ "api/siteBoq",
															{
																
															},
															{
																"createSiteBoq" : {
																	'method' : 'POST',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													siteBoqResource
															.createSiteBoq(
																	{
																		
																	},
																	{
																		
																		"siteId": site_id,
																		"boqDevice": [{
																			"deviceTypeId": 1,
																			"quantity": gateway
																		},{
																			"deviceTypeId": 2,
																			"quantity": repeater
																		},
																		{
																			"deviceTypeId": 3,
																			"quantity": FE
																		}, {
																			"deviceTypeId": 4,
																			"quantity": FH
																		},
																		{
																			"deviceTypeId": 5,
																			"quantity": FAS
																		}]


																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true)
																			//$rootScope.$broadcast("myEvent", {Response: "Site BOQ Information edited successfully", Type: "success" });
																			NotificationService.show("md","Site BOQ Information edited successfully.","success");
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
											/***************** GET SITE INVENTORIES LIST - Karan*************/
											getSiteInventoryList : function(
													siteId,
													keyword,
													pageStart,
													pageCount,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if (loginData != undefined) {
													var inventoryResource = $resource(
															baseUrl
																	+ "api/siteDevices",
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

													inventoryResource
															.list(
																	{},
																	{
																		"siteId":siteId,
																		"keyword":keyword,
																		"pageStart":pageStart,
																		"pageCount":pageCount
																	},
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
											},
											
										};
										

									} ]);
			
		});