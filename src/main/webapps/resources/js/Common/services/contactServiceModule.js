define(
		[],
		function() {
			angular
					.module('contactServiceModule', [])
					.factory(
							'contactService',
							[
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

											/**
											 * ***********************************
											 * GET LIST OF
											 * CUSTOMERS*****************
											 */
											getContact : function(contactType,
													referanceId,
													contactCategory, callback) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var contactResource = $resource(
															baseUrl
																	+ "api/contacts/",
															{},
															{
																"get" : {
																	'method' : 'POST',
																	'params' : {
																		'grant_type' : 'access_token',
																		'access_token' : loginData.access_token
																	},
																	isArray : false
																}
															});
													contactResource
															.get(
																	{},
																	{
																		"contactType" : contactType,
																		"referanceId" : referanceId,
																		"contactCategory" : contactCategory
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
											createContact : function(name,
													email, cellPhone,
													officePhone, homePhone,
													otherPhone, comment,
													contactType, referanceId,
													contactCategory, callback,contact) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var contactResource = $resource(
															baseUrl
																	+ "api/contact/",
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
													contactResource
															.create(
																	{},
																	{
																		"name" : name,
																		"email" : email,
																		"cellPhone" : cellPhone,
																		"officePhone" : officePhone,
																		"homePhone" : homePhone,
																		"otherPhone" : otherPhone,
																		"comment" : comment,
																		"contactType" : contactType,
																		"referanceId" : referanceId,
																		"contactCategory" : contactCategory
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true)

																			console
																					.log(contactType);
																		/*$rootScope
																		.$broadcast(
																				"myEvent",
																				{
																					Response : "Contact saved successfully.",
																					Type : "success"
																				});*/
																		NotificationService.show("md","Contact saved successfully.","success");
																		if (response.response == null)
																			callback(response,contactType,contact);
																		else
																			callback(response.response,contactType,contact);
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
											updateContact : function(id, name,
													email, cellPhone,
													officePhone, homePhone,
													otherPhone, comment,
													contactType, callback,contact) {
												var loginData = $cookieStore
														.get('loginData');
												if (loginData != undefined) {
													var contactResource = $resource(
															baseUrl
																	+ "api/contact/:id",
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
													contactResource
															.update(
																	{
																		id : id
																	},
																	{
																		"name" : name,
																		"email" : email,
																		"cellPhone" : cellPhone,
																		"officePhone" : officePhone,
																		"homePhone" : homePhone,
																		"otherPhone" : otherPhone,
																		"comment" : comment,
																		"contactType" : contactType
																	},
																	function(
																			response) {
																		if (ErrorHandlerService
																				.handleError(response) == true)

																			console
																					.log(response);
																		/*$rootScope
																		.$broadcast(
																				"myEvent",
																				{
																					Response : "Contact saved successfully.",
																					Type : "success"
																				});*/
																		NotificationService.show("md","Contact saved successfully.","success");
																		if (response.response == null)
																			callback(response,contactType,contact);
																		else
																			callback(response.response,contactType,contact);
																	},
																	function(
																			response) {
																		ErrorHandlerService
																				.handleRequestFailure(response);
																	});
												}
											}
										}

									} ])
		});