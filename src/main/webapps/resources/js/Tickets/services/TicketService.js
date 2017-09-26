define(
		[ 'angular' ],
		function(angular) {
			return [
					'$resource',
					'$cookieStore',
					'$log',
					'ErrorHandlerService',
					'NotificationService','$location','$rootScope',
					'$q','spinnerService','$filter',
					function($resource, $cookieStore, $log,
							ErrorHandlerService, NotificationService,$location,$rootScope, 
							$q, spinnerService,$filter) {
							var _this = this;
							var ticketController = null;
						return {
							registerCtrlr : function (ctrlr) {
								_this.ticketController = ctrlr;
							},
							
							unRegisterCtrlr : function () {
								_this.ticketController = null;
							},
							
							getListOfTickets : function(ticketType,/*ticketSubType,*/deviceTypeId,customerId,siteId,
									assigneeId,ticketState,priority,severity,eta,sortingType,ticketTypeOtherThan,ticketStateOtherThan,keyword, 
									pageStart, pageCount,callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var ticketsResource = $resource(
											baseUrl + "api/tickets/",
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
									ticketsResource.list({}, {
										"ticketType":ticketType,
										/*"ticketSubType":ticketSubType,*/
										"deviceTypeId":deviceTypeId,
										"customerId":customerId,
										"siteId":siteId,
										"assigneeId":assigneeId,
										"ticketState":ticketState,
										"priority":priority,
										"severity":severity,
										"eta":eta,
										"sortingType":sortingType,
										"ticketTypeOtherThan":ticketTypeOtherThan,
										"ticketStateOtherThan":ticketStateOtherThan,
										"keyword":keyword,
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
						/******************************Fetch Tickets sychronously for csv download *************************/
						fetchTicketsForCsv : function(ticketType,deviceTypeId,customerId,siteId,
									assigneeId,ticketState,priority,severity,eta,sortingType,ticketTypeOtherThan,ticketStateOtherThan,keyword, 
									pageStart, pageCount, columns) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var ticketsResource = $resource(
											baseUrl + "api/tickets/",
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
									var deferred = $q.defer();
									spinnerService.showSpinner();
									ticketsResource.list({}, {
										"ticketType":ticketType,
										"deviceTypeId":deviceTypeId,
										"customerId":customerId,
										"siteId":siteId,
										"assigneeId":assigneeId,
										"ticketState":ticketState,
										"priority":priority,
										"severity":severity,
										"eta":eta,
										"sortingType":sortingType,
										"ticketTypeOtherThan":ticketTypeOtherThan,
										"ticketStateOtherThan":ticketStateOtherThan,
										"keyword":keyword,
										"pageStart":(pageStart - 1)* pageCount,
										"pageCount":pageCount
									}, function(response) {
										spinnerService.dismissSpinner();
										if (ErrorHandlerService
												.handleError(response,true) == true) {
											if(response != null && response.response != null) {
												var tickets = response.response.data;
												var eventTickets = [];
												try {
													for(i in tickets) {					    		
														//temporary row
														var temp = {};
														for(var j = 0; j < columns.length; j++) {
															switch(columns[j]) {
																case "id":
																	temp[columns[j]] = 'T' + tickets[i].id;
																	break;
																case "createdDate":
																	temp[columns[j]] = (tickets[i].createdDate) ? $filter('date')(new Date(tickets[i].createdDate), "dd/MM/yyyy HH:mm:ss").toString() : "";
																	break;
																case "deviceType":
																	temp[columns[j]] = tickets[i].sensor;
																	break;
																case "Serial Number":
																	temp[columns[j]] = tickets[i].serialNumber;
																	break;
																case "Category":
																	temp[columns[j]] = tickets[i].alertCondition == 1 ? "ALARM" :
																tickets[i].alertCondition == 2 ? "FAULT" : "";
																	break;
																case "description":
																	temp[columns[j]] = tickets[i].description;
																	break;
																case "ticketType":
																	temp[columns[j]] = _this.ticketController.getTicketType(tickets[i].ticketType) == undefined ? '' : _this.ticketController.getTicketType(tickets[i].ticketType).name
																	break;
																case "customerName":
																	temp[columns[j]] = tickets[i].customerName;
																	break;
																case "siteandlocation":
																	temp[columns[j]] = (tickets[i].siteName == null ? '-' : tickets[i].siteName) + '/' 
																	+ (tickets[i].locationName == null ? '-' : tickets[i].locationName);
																	break;
																case "Expected Time":
																	temp[columns[j]] = tickets[i].eta + ' h';
																	break;
																case "state":
																	temp[columns[j]] = _this.ticketController.getTicketState(tickets[i].state);
																	break;
																case "restoredTimestamp":
																case "Restored Timestamp":
																	temp[columns[j]] = (tickets[i].restoreDate) ? $filter('date')(new Date(tickets[i].restoreDate), "dd/MM/yyyy HH:mm:ss").toString() : "";
																	break;
																case "assignedTo":
																case "Assigned To":
																case "Last Assignee":
																	temp[columns[j]] = tickets[i].assignee;
																	break;
															}
														}
														eventTickets.push(temp);//pushing the temporary row in array
													}
												} catch(exception) {
													console.error(exception);
												}
												deferred.resolve(eventTickets);
												_this.unRegisterCtrlr()
											} else {
												deferred.reject();
												_this.unRegisterCtrlr()
											}
										}
											
									}, function(response) {
										spinnerService.dismissSpinner();
										console.log(response);
										ErrorHandlerService.handleRequestFailure(response);
										deferred.reject();
									});
									return deferred.promise;
								}
								
							},
						/******************************Get Ticket Details*************************/
							getTicket : function(ticket_id,callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var ticketsResource = $resource(
											baseUrl + "api/ticket/:ticketId",
											{
												ticketId : "@ticket_id"
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

									ticketsResource.list(
											{
												ticketId : ticket_id
											}, 
											{},
											function(response) {
										if (ErrorHandlerService
												.handleError(response,true) == true)
											callback(response.response);
									}, function(response) {
										console.log(response);
										ErrorHandlerService.handleRequestFailure(response);
									});
								}
							},
							/**********************************************************************/
							/*****************get ticket expense***********************************/
							getTicketExpense : function(userId,referenceId,pageStart, pageCount,callback) {
								var loginData = $cookieStore.get('loginData');
								if (loginData != undefined) {
									var ticketsResource = $resource(
											baseUrl + "api/expenses/getByReferenceId",
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
									ticketsResource.list({}, {
										"userId": userId,
										"referenceId": referenceId,
										"pageStart":pageStart,
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
							/*************************************************************************/
						createServiceTickets : function(ticketTypeId,siteLocationDeviceId,siteId,assigneeId,priority,severity,relatedTicket,relatedType,eta,comment,description,serialNumber,customerId,locationId,callback) {
							var loginData = $cookieStore.get('loginData');
							if (loginData != undefined) {
								var ticketsResource = $resource(
										baseUrl + "api/ticket/",
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

								ticketsResource.list({}, {
							
									"ticketTypeId":ticketTypeId,
									"state":2,
									"siteLocationDeviceId":siteLocationDeviceId,
									"siteId":siteId,
									"assigneeId":assigneeId,
									"priority":priority,
									"severity":severity,
									"relatedTicket":relatedTicket,
									"relatedType":relatedType,
									"eta":eta,
									"actionStatus":0,
									"comment":comment,
									"description":description,
									"serialNumber":serialNumber,
									"referenceId": customerId,
									"referenceType": 2,
									"locationId": locationId,

								}, function(response) {
									if (ErrorHandlerService
											.handleError(response,true) == true)
										callback(response.response);
									if(response.error == 0 )
									NotificationService.show("md","Service Ticket created Successfully.","success");
								}, function(response) {
									console.log(response);
									ErrorHandlerService.handleRequestFailure(response);
								});
							}
						},
						/****************************************************************************/
						/******************************Get Sensor Details*************************/
						getSensorDetails : function(ticket_id,callback) {
							var loginData = $cookieStore.get('loginData');
							if (loginData != undefined) {
								var ticketsResource = $resource(
										baseUrl + "api/ticketSensorDetail/:ticketId",
										{
											ticketId : "@ticket_id"
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

								ticketsResource.list(
										{
											ticketId : ticket_id
										}, 
										{},
										function(response) {
									if (ErrorHandlerService
											.handleError(response,true) == true)
										callback(response.response);
								}, function(response) {
									console.log(response);
									ErrorHandlerService.handleRequestFailure(response);
								});
							}
						},
						
						/**********************************************************************/
						/******************************Get Ticket History*************************/
						getTicketHistory : function(ticket_id,callback) {
							var loginData = $cookieStore.get('loginData');
							if (loginData != undefined) {
								var ticketsResource = $resource(
										baseUrl + "api/ticketHistory/:ticketId",
										{
											ticketId : "@ticket_id"
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

								ticketsResource.list(
										{
											ticketId : ticket_id
										}, 
										{},
										function(response) {
									if (ErrorHandlerService
											.handleError(response,true) == true)
										callback(response.response);
								}, function(response) {
									console.log(response);
									ErrorHandlerService.handleRequestFailure(response);
								});
							}
						},
						/**********************************************************************/
						/******************************Update ticket details*************************/
						updateTicketDetails : function(ticket_id,ticket_state,ticket_siteLocationDeviceId,
								ticket_siteId,ticket_assigneeId,ticket_eta,ticket_action_status,
								ticket_comment,description,ticket_serialNumber,callback) {
							var loginData = $cookieStore.get('loginData');
							if (loginData != undefined) {
								var ticketsResource = $resource(
										baseUrl + "api/ticket",
										{
											
										},
										{
											"list" : {
												'method' : 'PUT',
												'params' : {
													'grant_type' : 'access_token',
													'access_token' : loginData.access_token
												},
												isArray : false
											}
										});

								ticketsResource.list(
										{
											
										}, 
										{
											
												"state":ticket_state,
												"id":ticket_id,
												"siteLocationDeviceId":ticket_siteLocationDeviceId,
												"siteId":ticket_siteId,
												"assigneeId":ticket_assigneeId,
												"priority":1,
												"severity":1,
												"relatedTicket":0,
												"relatedType":1,
												"eta":ticket_eta,
												"actionStatus":ticket_action_status,
												"comment":ticket_comment,
												"description":description,
												"serialNumber":ticket_serialNumber,
												
										},
										function(response) {
									if (ErrorHandlerService
											.handleError(response,true) == true)
										if(response.error == 0 )
											NotificationService.show("md","Ticket Updated Successfully.","success");
										callback(response.response);
								}, function(response) {
									console.log(response);
									ErrorHandlerService.handleRequestFailure(response);
								});
							}
						},
						/**********************************************************************/
						/******************************Get Site Users*************************/
						getSiteUsers : function(keyword,siteId,roleId,userTypeId,pageStart,pageCount,callback) {
							var loginData = $cookieStore.get('loginData');
							if (loginData != undefined) {
								var ticketsResource = $resource(
										baseUrl + "api/usersBySite",
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

								ticketsResource.list(
										{
											
										}, 
										{
											  "keyword":keyword,
											  "siteId":siteId,
											  "roleId":roleId,
											  "userTypeId":userTypeId,
											  "pageStart":pageStart,
											  "pageCount":pageCount

										},
										function(response) {
									if (ErrorHandlerService
											.handleError(response,true) == true)
										callback(response.response);
								}, function(response) {
									console.log(response);
									ErrorHandlerService.handleRequestFailure(response);
								});
							}
						},
						
						/******************************Get Site Users*************************/
						contactUsers : function(mailContents,userEmailIds,ticketId,fromAsigneeName,callback) {
							var loginData = $cookieStore.get('loginData');
							if (loginData != undefined) {
								var ticketsResource = $resource(
										baseUrl + "api/mailToUsers",
										{
										},
										{
											"contact" : {
												'method' : 'POST',
												'params' : {
													'grant_type' : 'access_token',
													'access_token' : loginData.access_token
												},
												isArray : false
											}
										});

								ticketsResource.contact(
										{
											
										}, 
										{
											"mailContents":mailContents,
											"userEmailIds":[userEmailIds],
											"ticketId":ticketId,
											"fromAsigneeName":fromAsigneeName


										},
										function(response) {
									if (ErrorHandlerService
											.handleError(response,true) == true)
										callback(response.response);
								}, function(response) {
									console.log(response);
									ErrorHandlerService.handleRequestFailure(response);
								});
							}
						}
						};

					} ];
		});
