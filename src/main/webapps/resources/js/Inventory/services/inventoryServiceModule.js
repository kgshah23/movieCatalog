define(
		[],
		function() {
			angular
					.module('inventoryServiceModule', [])
					.factory(
							'inventoryService',
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

											/**
											 * ****************CREATE
											 * INVENTORY************
											 */
											// each object in the array will
											// have - siteLocationDeviceId,
											// xPos, yPos
											createInventory : function(
													serialNumber, name,
													username, password,
													batteryStatus, brand,
													locationRemarks,
													batteryDate, deviceTypeId,
													keepAlive, description,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/inventory",
															{},
															{
																"create" : {
																	'method' : 'POST',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													sitesResource
															.create(
																	{},
																	{
																		"serialNumber" : serialNumber,
																		"name" : name,
																		"username" : "usern",
																		"password" : "sdasdas",
																		"betteryStatus" : batteryStatus,
																		"brand" : brand,
																		"locationRemarks" : locationRemarks,
																		"batteryDate" : batteryDate,
																		"deviceTypeId" : deviceTypeId,
																		"keepAlive" : keepAlive,
																		"description" : description,
																		
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			callback(response.response);
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Inventory Added Successfully",
																								Type : "success"
																							});*/
																			NotificationService.show("md","Inventory Added Successfully.","success");
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
											/**
											 * **************** UPDATE
											 * INVENTORY************
											 */
											updateInventory : function(
													id,
													serialNumber,
													name,
													username,
													password,
													betteryStatus,
													brand,
													locationRemarks,
													batteryDate,
													deviceTypeId,
													keepAlive,
													description,
													locationType,
													referenceId,
													inventoryState,
													callback,location,scope,deviceId,deviceInventoryFlag,reload) {
												var loginData = $cookieStore
														.get('loginData');

												
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/inventory/:id",
															{id : "@id"},
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
													console.log
													sitesResource
															.update(
																	{id : id},
																	{
																		"serialNumber": serialNumber,
																		"name": name,
																		/*"username": username,
																		"password": password,*/
																		"batteryStatus": betteryStatus,
																		"brand": brand,
																		"locationRemarks": locationRemarks,
																		"batteryDate": batteryDate,
																		"deviceTypeId": deviceTypeId,
																		"keepAlive": keepAlive,
																		"description": description,
																		"locationType": locationType,
																		"referenceId": referenceId,
																		"inventoryState": inventoryState // added by pragati
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			console.log(reload);
																			callback(response.response,location,scope,reload?deviceId : undefined);
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Inventory Updated Successfully",
																								Type : "success"
																							});*/
																			if(!deviceInventoryFlag)
																				NotificationService.show("md","Inventory Updated Successfully.","success");
																			else{
																				if(!reload)
																					NotificationService.show("md","Device edited successfully.","success");
																			}
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
											/**
											 * **************** GET
											 * INVENTORY************
											 */
											getInventory : function(
													id,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (mapImage == undefined) {
													mapImage = null;
												}
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/inventory/:id",
															{id : "@id"},
															{
																"update" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													sitesResource
															.update(
																	{id : id},
																	{
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			callback(response.response);
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Inventory Updated Successfully",
																								Type : "success"
																							});*/
																			//NotificationService.show("md","Inventory Updated Successfully.","success");
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
											/**
											 * **************** GET
											 * INVENTORIES LIST************
											 */
											getInventoryList : function(
													keyword,
													referanceId,
													referanceType,
													allocationStatus,
													deviceType,
													pageStart,
													pageCount,
													inventoryState,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if (loginData != undefined) {
													var inventoryResource = $resource(
															baseUrl
																	+ "api/inventories",
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
																		"keyword" : keyword,
																		"referanceId" : referanceId,
																		"referanceType": referanceType,
																		"allocationStatus" : allocationStatus,
																		"deviceType" : deviceType,
																		"pageStart" : pageStart,
																		"pageCount" : pageCount,
																		"inventoryState" : inventoryState
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
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
											/**
											 * **************** DELETE INVENTORY
											 * INVENTORY************
											 */
											deleteInventory : function(
													id,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/inventory/:id",
															{id : "@id"},
															{
																"del" : {
																	'method' : 'DELETE',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													sitesResource
															.del(
																	{id : id},
																	{
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			callback(response.response);
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Inventory Deleted Successfully",
																								Type : "success"
																							});*/
																			NotificationService.show("md","Inventory Deleted Successfully.","success");
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