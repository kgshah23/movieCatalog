define(
		[],
		function() {
			angular
					.module('errorHandlerModule', [ 'notificationModule' ])
					.factory(
							'ErrorHandlerService',
							[
									'NotificationService','spinnerService','$rootScope','$window','$cookieStore','$location',
									function(NotificationService,spinnerService,$rootScope,$window,$cookieStore,$location) {
										
										return {
											handleError : function(response,scrollflag,pageName) {
												var sCode = response.statusCode;
												var eCode = response.error;
												var eDesc = response.error_description;
												spinnerService.dismissSpinner();
												/*if(!scrollflag){
													$window.scrollTo(0,0);
												}*/
												
												switch (sCode) {
												case 400:
													switch (eCode) {
													case 102:
														if(pageName == "login"){
															NotificationService.show("md","The specified user account does not exist/has been disabled.","danger","Login");
														}
														else{
															//$rootScope.$broadcast("myEvent", {Response: "The specified user account does not exist/has been disabled." , Type: "danger" });
															NotificationService.show("md","The specified user account does not exist/has been disabled.","danger");
														}
														break;
													case 103:
														//$rootScope.$broadcast("myEvent", {Response: "You don't have enough permissions." , Type: "danger" });
														NotificationService.show("md","You don't have enough permissions.","danger");
														break;
													case 104:
														//$rootScope.$broadcast("myEvent", {Response: "Please provide required data." , Type: "danger" });
														NotificationService.show("md","Please provide required data.","danger");
														break;
													case 107:
														//$rootScope.$broadcast("myEvent", {Response: "Email Id already exists." , Type: "danger" });
														NotificationService.show("md","Email Id already exists.","danger");
														break;
													case 105:
														//$rootScope.$broadcast("myEvent", {Response: "Invalid email address provided." , Type: "danger" });
														NotificationService.show("md","Invalid email address provided.","danger");
														break;
													case 106:
														//$rootScope.$broadcast("myEvent", {Response: "Please provide a valid role." , Type: "danger" });
														NotificationService.show("md","Please provide a valid role.","danger");
														break;
													case 109: 
														$rootScope.$broadcast('logout','user_disabled');
														break;
													case 202:
														return true;
													case 205:
														return true;
													case 204:
														//$rootScope.$broadcast("myEvent", {Response: "Customer with same name already exists." , Type: "danger" });
														NotificationService.show("md","Customer with same name already exists.","danger");
														break;
													case 208:
														NotificationService.show("md","Please delete site for the customer first.","danger");
														break;
													case 404:
														//$rootScope.$broadcast("myEvent", {Response: "Franchisee with same name already exists." , Type: "danger" });
														NotificationService.show("md","Franchisee with same name already exists.","danger");
														break;
													case 603:
														//$rootScope.$broadcast("myEvent", {Response: "Inventory with the given Serial Number already exists" , Type: "danger" });
														NotificationService.show("md","Inventory with the given Serial Number already exists.","danger");
														break;
													case 506 :
														NotificationService.show("md","Site with the given name already exists.","danger");
														return true;
														break;
													case 516:
														//$rootScope.$broadcast("myEvent", {Response: "Device does not exist." , Type: "danger" });
														NotificationService.show("md","Device does not exist.","danger");
													return true;
													case 604:
														//$rootScope.$broadcast("myEvent", {Response: "Device type change not allowed." , Type: "danger" });
														NotificationService.show("md","Device type change not allowed.","danger");
														break;
													case 523:
														//$rootScope.$broadcast("myEvent", {Response: "Unassociate child devices." , Type: "danger" });
														NotificationService.show("md","Unassociate child devices.","danger");
													break;
													case 514:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","File does not exist.","danger");
													break;
													case 706:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","Invalid Comment.","danger");
													break;
													case 707:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","Invalid ETA.","danger");
													break;
													case 708:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","Invalid Assignee.","danger");
													break;
													case 525:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","Site device with same name already exists.","danger");
													break;
													case 536:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","This device is assigned to an inventory and cannot be deleted.","danger");
													break;
													case 537:
														//$rootScope.$broadcast("myEvent", {Response: "File does not exist." , Type: "danger" });
														NotificationService.show("md","Please delete the devices for this location first.","danger");
													break;
													default:
														//$rootScope.$broadcast("myEvent", {Response: "Some error occurred." , Type: "danger" });
														NotificationService.show("md","Internal server error occurred.","danger");
													}
													
													return false;
												case 200:
														
													return true;
												case 204:
													switch (eCode) {
													case 542:
														NotificationService.show("md","Please delete the locations for this site first.","danger");
														return false;
														break;
													}
													return true;
												case 406:
													switch (eCode) {
													case 607:
														//$rootScope.$broadcast("myEvent", {Response: "Inventory is allotted." , Type: "danger" });
														NotificationService.show("md","Inventory is allotted.","danger");
														break;
													case 606:
														//$rootScope.$broadcast("myEvent", {Response: "Inventory is not empty." , Type: "danger" });
														NotificationService.show("md","Inventory is not empty.","danger");
														break;
													}
													return false;
												case 502:
													switch (eCode) {
													case 604:
														//$rootScope.$broadcast("myEvent", {Response: "Location type change not allowed." , Type: "danger" });
														NotificationService.show("md","Location type change not allowed.","danger");
													}
													return false;
													
												default:
													/*if(pageName == "login"){
													//$rootScope.$broadcast("myEvent", {Response: "Some error occurred ." , Type: "danger" ,color: "#A9D4E5" });
													}
													else
													{*/
														//$rootScope.$broadcast("myEvent", {Response: "Some error occurred ." , Type: "danger" });
														NotificationService.show("md","Internal server error occurred.","danger");
//													}
													return false;
												}
											},
											handleRequestFailure : function(response){
												spinnerService.dismissSpinner();
												//$window.scrollTo(0,0);
												switch(response.status){
													case 403:
														//$rootScope.$broadcast("myEvent", {Response: "Sorry, you do not have enough permissions to perform the task." , Type: "danger" });
														NotificationService.show("md","Sorry, you do not have enough permissions to perform the task.","danger");
														break;
													case 500:
														//$rootScope.$broadcast("myEvent", {Response: "Internal Server Error." , Type: "danger" });
														NotificationService.show("md","Internal server error occurred.","danger");
														break;
													case 401:
														$rootScope.$broadcast('logout','session_expired');
														//NotificationService.show("md","session_expired.","danger");
														break;
														/*$location.path("/login");
														
														break;*/
												}
											}

										};
									} ]);
		})