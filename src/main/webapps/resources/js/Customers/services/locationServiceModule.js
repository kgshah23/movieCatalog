define(
		[],
		function() {
			angular
					.module('locationServiceModule', [])
					.factory(
							'locationService',
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
											 * **************** Create Device
											 * ************
											 */
											
											createSiteLocationDevice : function(
													siteLocationId,
													deviceTypeId,
													parentgatewayId,
													parentdeviceId, XAxis,
													YAxis, inventoryId,scope,
													deviceName,
													communicationMode,
													ssid,
													password,
													apn,
													locationRemarks,
													callback) {
												console.log(apn);
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/siteLocationDevice",
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

													sitesResource
															.add(
																	{},
																	{
																		"siteLocationId" : siteLocationId,
																		"deviceTypeId" : deviceTypeId,
																		"parentgatewayId" : parentgatewayId,
																		"parentdeviceId" : parentdeviceId,
																		"XAxis" : XAxis,
																		"YAxis" : YAxis,
																		"name" : deviceName,
																		"inventoryId" : inventoryId,
																		"communicationMode": communicationMode,
																		"wifiSSID": ssid,
																		"wifiPassword": password,
																		"apn" : apn,
																		"locationRemarks":locationRemarks
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			callback(siteLocationId,"",0,10,scope,response.response);
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "New Device Added Sucessfully.",
																								Type : "success"
																							});*/
																			NotificationService.show("md","New Device Added Sucessfully.","success");
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
											 * **************** Update Device
											 * Map Position ************
											 */
											// each object in the array will
											// have - siteLocationDeviceId,
											// xPos, yPos
											updateSiteDeviceMapPosition : function(
													deviceObjArray, callback,notify) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/updateSiteLocationDevicePosition",
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

													if(deviceObjArray.length != 0){
													sitesResource
															.list(
																	{},
																	{
																		"data" : deviceObjArray
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			if(callback!=undefined){
																				if(notify != false){
																					NotificationService.show("md","Devices Positions Updated Successfully.","success");
																				}
																				callback(response.response);
																				
																			}
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Devices Positions Updated Successfully",
																								Type : "success"
																							});*/
																		}
																	},
																	function(
																			response) {
																		ErrorHandlerService
																				.handleRequestFailure(response);
																		console
																				.log(response);
																	});
													}else{
														if(notify != false){
															NotificationService.show("md","Devices Positions Updated Successfully.","success");
														}
													}

												}
											},
											/**
											 * **************** GET SITE
											 * LOCATIONS************
											 */
											getSiteLocations : function(
													site_id, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/siteLocations/:site_id",
															{
																site_id : "@site_id"
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

													sitesResource
															.list(
																	{
																		site_id : site_id
																	},
																	{},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true)
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
											/**
											 * **************** CREATE SITE
											 * LOCATION************
											 */
											createSiteLocation : function(
													siteId, locationName,
													mapImage, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if(mapImage == undefined){
													mapImage = null;
												}
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/siteLocation",
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
																		"siteId" : siteId,
																		"locationName" : locationName,
																		"mapImage" : mapImage

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
																								Response : "New location added successfully",
																								Type : "success"
																							});*/
																			NotificationService.show("md","New location added successfully.","success");
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
											 * **************** UPDATE SITE
											 * LOCATION************
											 */
											updateSiteLocation : function(
													locationId, siteId,
													locationName, mapImage,location,scope,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if(mapImage == "null")
													mapImage = null;
												console.log(mapImage);

												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/siteLocation/:location_id",
															{
																location_id : "@location_id"
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

													sitesResource
															.update(
																	{
																		location_id : locationId
																	},
																	{
																		"siteId" : siteId,
																		"locationName" : locationName,
																		"mapImage" : mapImage==undefined? null : mapImage
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			if(callback != undefined)
																				callback(location,scope);
																			/*$rootScope
																					.$broadcast(
																							"myEvent",
																							{
																								Response : "Location editted successfully",
																								Type : "success"
																							});*/
																			NotificationService.show("md","Location editted successfully.","success");
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
											getLocationDevices : function(
													locationId, keyword,
													pageStart, pageCount,
													callback) {
												var loginData = $cookieStore
														.get('loginData');

												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/locationDevices",
															{

															},
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
																		"locationId" : locationId,
																		"keyword" : keyword,
																		"pageStart" : (pageStart - 1)* pageCount,
																		"pageCount" : pageCount
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response,true) == true) {
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
											 * **************** UPDATE
											 * LOCATION DEVICE************
											 */
											updateSiteLocationDevice : function(
													id, deviceTypeId,
													parentgatewayId, parentdeviceId,
													XAxis,YAxis,
													name,
													inventoryId,
													communicationMode,
													ssid,
													password,
													apn,
													locationRemarks,
													locationId,
													scope,
													callback,reload) {
												var loginData = $cookieStore
														.get('loginData');
												
												console.log(XAxis);
												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/siteLocationDevice/:id",
															{
																id : "@id"
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

													sitesResource
															.update(
																	{
																		id : id
																	},
																	{
																		"deviceTypeId" : deviceTypeId,
																		"parentgatewayId" : parentgatewayId,
																		"parentdeviceId" : parentdeviceId,
																		"XAxis" : XAxis,
																		"YAxis" : YAxis,
																		"name" : name,
																		"inventoryId" : inventoryId,
																		"communicationMode": communicationMode,
																		"wifiSSID": ssid,
																		"wifiPassword": password,
																		"apn" : apn,
																		"locationRemarks" : locationRemarks
																	},
																	function(
																			response) {
																		if(callback!=undefined){
																			if (ErrorHandlerService
																					.handleError(response) == true) {
																				
																					callback(scope,reload? id : undefined);
																				/*$rootScope
																						.$broadcast(
																								"myEvent",
																								{
																									Response : "Device edited successfully",
																									Type : "success"
																								});*/
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
											 * **************** DELETE
											 * LOCATION DEVICE************
											 */
											deleteSiteLocationDevice : function(
													id,
													locationId,
													scope,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												

												if (loginData != undefined) {
													var sitesResource = $resource(
															baseUrl
																	+ "api/siteLocationDevice/:id",
															{
																id : "@id"
															},
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
																	{
																		id : id
																	},
																	{
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			console.log(locationId);
																			if(locationId != undefined){
																				scope.$parent.pagination2.current = 1;
																				console.log(scope.$parent.pagination2);
																				callback.getDevices(locationId,'',0,0,scope.$parent);
																				callback.pagination(locationId,'',1,10,scope.$parent);
																				/*$rootScope
																				.$broadcast(
																						"myEvent",
																						{
																							Response : "Device deleted successfully",
																							Type : "success"
																						});*/
																				NotificationService.show("md","Device deleted successfully.","success");
																			}
																			else{
																				if(callback != undefined){
																					callback.getDevices(locationId,'',0,0,scope.$parent);
																					callback.pagination(locationId,'',1,10,scope.$parent);
																					console.log(scope);
																				}
																				/*$rootScope
																				.$broadcast(
																						"myEvent",
																						{
																							Response : "Site inventory deleted successfully",
																							Type : "success"
																						});	*/
																				NotificationService.show("md","Site inventory deleted successfully.","success");
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
											 * **************** DELETE
											 * LOCATION DEVICE************
											 */
											deleteSiteLocation : function(
													location,
													scope,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if (loginData != undefined) {
													var locationResource = $resource(
															baseUrl
																	+ "api/siteLocation/:id",
															{
																id : "@id"
															},
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

													locationResource
															.del(
																	{
																		id : location.id
																	},
																	{
																	},
																	function(response) {
																		
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			if(callback != undefined)
																				callback(location,scope);
																			NotificationService.show("md","Location deleted successfully.","success");
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
											 * **************** RELOAD CONFIG OF DEVICE************
											 */
											reloadConfig : function(device,url,
													callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if (loginData != undefined) {
													var locationResource = $resource(url+'controlAction?recipientId='+ device.serialNumber+'&command=reConfig',
															{
															},
															{
																"config" : {
																	'method' : 'POST',
																	'headers': {'Content-Type': 'application/x-www-form-urlencoded'},
																	isArray : false
																}
															});

													locationResource
															.config(
																	{
																	},
																	{
																	},
																	function(response) {
																		
																		if (ErrorHandlerService
																				.handleError(response) == true) {
																			callback(response);
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
											 * **************** MQTT URL ************
											 */
											getMqttUrl : function(callback) {
												var loginData = $cookieStore
														.get('loginData');
												
												if (loginData != undefined) {
													var locationResource = $resource(
															baseUrl
																	+ "api/mqttAuthURL",
															{
															},
															{
																"get" : {
																	'method' : 'GET',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});

													locationResource
															.get(
																	{
																	},
																	{
																	},
																	function(response) {
																		callback(response);
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

									} ]);
		});