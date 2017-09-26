define(
		[ 'angular' ],
		function(angular) {
			return [
					'$scope',
					'$stateParams',
					'$state',
					'$rootScope',
					'customerService',
					'contactService',
					'AccessControlService',
					'NotificationService','siteService','$cookieStore','FileService','focus','$location','getUsersByRoleService','contractService','FileSaver','Blob',
					function($scope, $stateParams, $state,$rootScope, customerService,
							contactService, AccessControlService,
							NotificationService,siteService,$cookieStore,FileService,focus,$location,getUsersByRoleService,contractService,FileSaver,Blob) {
						$scope.fieldDisabled = true;
						$scope.saveDisabled =true;
						$scope.editDisabled =false;
						$scope.fieldDisabledContact = true;
						$scope.iscollapsedInfo = true;
						$scope.iscollapsedContacts = false;
						$scope.iscollapsedSites = false;
						$scope.saveDisabledContacts = true;
						$scope.editDisabledContacts = false;
						$scope.customerInfoExists = false;

						$scope.fieldDisabledFTCR = true;
						$scope.ftcrFilter = 'Select FT CR user';
						$scope.oldftcrFilter = $scope.ftcrFilter;

						
						//Upload Detection File enabler
						$scope.detectionUpload = function(upload){
							$scope.isFireDetectingUploading = false;
							$scope.detectionFileUploaded = false;
							$scope.isFireDetectingFailed = false;
							$scope.uploadDetection = upload;
						};
						$scope.fightingUpload = function(upload){
							$scope.fightingFileUploaded = false;
							$scope.isFireFightingUploading=false;
							$scope.isFireFightingFailed = false;
							$scope.uploadFighting = upload;
						};
						
						// initialize multiple selection list
						$scope.multipleList = {};
						
						//Get data from cookie
						var loginData = $cookieStore.get('loginData');
						$scope.isFTAdmin = AccessControlService.isFTAdmin(loginData.roleId);
						$scope.isFTSupervisor = AccessControlService.isFTSupervisor(loginData.roleId);
						$scope.isFTCR = AccessControlService.isFTCR(loginData.roleId);
						$scope.isCustomerAdmin = AccessControlService.isCustomerAdmin(loginData.roleId);
						$scope.isCL2 = AccessControlService.isCL2(loginData.roleId);
						$scope.isCL3 = AccessControlService.isCL3(loginData.roleId);
						
						if($scope.isFTCR || $scope.isCL3){
							$scope.editDisabled = true;
							$scope.editDisabledContacts = true;
						}
						if(!$scope.isCL3 && !$scope.isCL2 && !$scope.isCustomerAdmin){
							$scope.showEditInfoBtn = true;
						}
						
						
						// enable customer info fields on click of edit
						$scope.enableFormfilelds = function() {
							$scope.fieldDisabled = false;
							$scope.showEditInfoBtn = false;
							$scope.showSaveInfoBtn = true;
							$scope.showCancelInfoBtn = true;
							
							angular.element(document.querySelector('#fightingFile')).val('');
							angular.element(document.querySelector('#detectionFile')).val('');

							
							$scope.customer.detectionFile = null;
							if($scope.customer.firedetectionFile == null)
								$scope.uploadDetection = true;
							
							$scope.uploadFighting = false;
							if($scope.customer.firefightingFile == null)
								$scope.uploadFighting = true;
							
							if($scope.isFTAdmin || $scope.isFTSupervisor)
							{
								$scope.fieldDisabledFTCR = false;
							}
							
							focus("name");
						},
						
						// on click of cancel show previous data and hide save and cancel buttons
						$scope.cancelInfo = function() {
							
							$scope.nameError = false;
							$scope.fieldDisabledFTCR = true;			
							$scope.customer = JSON.parse($scope.oldCustomerData);
							
							$scope.showSaveInfoBtn = false;
							$scope.showCancelInfoBtn = false;
							$scope.showEditInfoBtn = true;
							$scope.fieldDisabled = true;
							
							angular.element(document.querySelector('#fightingFile')).val('');
							angular.element(document.querySelector('#detectionFile')).val('');
							
							console.log($scope.customer);
							//Reset file upload
							$scope.uploadDetection = false;
							$scope.isFireDetectingUploading = false;
							$scope.detectionFileUploaded = false;
							$scope.isFireDetectingFailed = false;
							
							//Reset file upload
							$scope.uploadFighting = false;
							$scope.fightingFileUploaded = false;
							$scope.isFireFightingUploading=false;
							$scope.isFireFightingFailed = false;
							
							$scope.ftcrFilter = ($scope.NoFTCRUsersFound == true)?"No Users Found.":$scope.oldftcrFilter;
//							$scope.cityState = $scope.customer.city + ", " + $scope.customer.state;
							$scope.currentStatus = $scope.getStatus($scope.customer.status);
						},
						
						$scope.enableFormfileldsContacts = function() {
							$scope.oldPrimaryContact = angular.copy($scope.primaryContact);
							$scope.oldPurchaseContact = angular.copy($scope.purchaseContact);
							$scope.oldBillingContact = angular.copy($scope.billingContact);
							$scope.oldFinanceContact = angular.copy($scope.financeContact);
							
							$scope.submitcontact=false;
							$scope.saveDisabledContacts = false;
							$scope.fieldDisabledContact = false;
							$scope.editDisabledContacts = true;
							focus("primarycontact");

						}, 
						
						$scope.collapsedInfo= function(){
							$scope.iscollapsedInfo = !$scope.iscollapsedInfo;
							
						},
						$scope.collapsedContacts= function(){
							$scope.iscollapsedContacts= !$scope.iscollapsedContacts;
							
						};
						//customer id
						$scope.id = $state.params.id;
						//toggle  site collapse
						$scope.collapsedSites= function(){
							$scope.iscollapsedSites= !$scope.iscollapsedSites;
						};
						
						// variables used in this controller
						/* ID and name passed in the $state.params */

						
						$scope.name = "";
						$scope.customer = undefined; // initialize;
//						$scope.cityState = "";
						$scope.detectionFileUploaded = false;
						$scope.fightingFileUploaded = false;
						$scope.uploadError = false;
						
						if ($scope.isCustomerAdmin
								|| $scope.isCL2
								|| $scope.isCL3){
							$scope.CATEGORY = 2;
							$scope.id = loginData.referenceId,
							$scope.name = loginData.firstName + " " + loginData.lastName;
						}
						else if (loginData.userTypeId == 1) {
							$scope.CATEGORY = 1;
						}
						
						//upload certicicates
						
						$scope.firedetectionUploader = FileService
								.uploadFile(
										baseUrl+"api/customer/certificate?grant_type=access_token&access_token="
												+ loginData.access_token,
										"POST",
										true,
										function(item, response, status,
												headers) {
											$scope.isFireDetectingUploading = false;
											if (response.statusCode == 200) {
												$scope.detectionFileUploaded = true;
												$scope.customer.firedetectionFile = response.response;
												$scope.isFireDetectingFailed = false;
											}else{
												$scope.isFireDetectingFailed = true;
												
											}
										},
										function(item, response, status,
												headers) {
											console.log(item);
											$scope.isFireDetectingUploading = false;
											$scope.detectionFileUploaded = false;
											$scope.isFireDetectingFailed = true;
										},function(item){
											$scope.isFireDetectingUploading = true;
											$scope.isFireDetectingFailed = false;
										},function(item,progress){
											$scope.firedetectingUploadStatus = progress;
											if(progress == 100)
												$scope.isFireDetectingUploading = false;
										},function(filterResult){
											$scope.isFireDetectingUploading = false;
											$scope.detectionFileUploaded = false;
											$scope.isFireDetectingFailed = true;
										});
						
						$scope.firefightingUploader = FileService
								.uploadFile(
										baseUrl+"api/customer/certificate?grant_type=access_token&access_token="
												+ loginData.access_token,
										"POST",
										true,
										function(item, response, status,
												headers) {
											console.log(response);
											$scope.isFireFightingUploading=false;
											if (response.statusCode == 200) {
												$scope.fightingFileUploaded = true;
												$scope.customer.firefightingFile = response.response;					
												$scope.isFireFightingFailed = false;
											}else{
												$scope.isFireFightingFailed = true;
											}
										},
										function(item, response, status,
												headers) {
											console.log(response);
											$scope.fightingFileUploaded = false;
											$scope.isFireFightingUploading=false;
											$scope.isFireFightingFailed = true;
										},function(item){
											$scope.isFireFightingUploading = true;
											$scope.isFireFightingFailed = false;
										},function(item,progress){
											$scope.firefightingUploadStatus = progress;
											if(progress == 100)
												$scope.isFireFightingUploading = false;
										},function(filterResult){
											$scope.isFireFightingUploading = false;
											$scope.fightingFileUploaded = false;
											$scope.isFireFightingFailed = true;
										});
						
						/*
						 * GET FT CR USERS
						 */
						
						// set selected FT CR users
						/*$scope.multipleList.selectedFTCRUsers = [];
						$scope.setSelectedFTCRUsers = function(FTcrusers) {
							if (FTcrusers.length > 0) {
								for (var i = 0; i < FTcrusers.length; i++) {
									for (var userid = 0; userid < $scope.FTCRUsers.length; userid++) {
										if (FTcrusers[i].id == $scope.FTCRUsers[userid].id) {
											$scope.multipleList.selectedFTCRUsers = $scope.multipleList.selectedFTCRUsers
													.concat($scope.FTCRUsers[userid]);

										}
									}
								}
								;
							}

						};*/
						
						
						// get selected FT CR users
						/*$scope.getSelectedFTCRUsers = function() {
							$scope.selectedftcrusers = [];
							for (var i = 0; i < $scope.multipleList.selectedFTCRUsers.length; i++) {
								$scope.selectedftcrusers = $scope.selectedftcrusers
										.concat($scope.multipleList.selectedFTCRUsers[i].id);
							}
							
							return $scope.selectedftcrusers;
						};*/
						
						
						$scope.updateCR = function(cruser) {
							if(cruser != undefined || cruser != null){
								$scope.oldftcrFilter = $scope.ftcrFilter;
								$scope.ftcrFilter = cruser.firstName + " "
								+ cruser.lastName;
								$scope.ftCrUser = cruser;
							}
							else{
								$scope.ftcrFilter = 'Select FT CR user';
								$scope.ftCrUser = '';
							}

						};
						// initialize ftusers array
						$scope.FTCRUsers = [];

						// callback on success of get ft installers
						$scope.NoFTCRUsersFound = true;
						$scope.getFTCRUsers = function(response) {
							if (response != undefined) {
								$scope.FTCRUsers = response.data;
//								$scope.totalFTCRUsers = response.total;
								$scope.NoFTCRUsersFound = false;
							} else {
								$scope.FTCRUsers = [];
								$scope.NoFTCRUsersFound = true;
								$scope.ftcrFilter = "No Users Found."
							}
						};
						// call to get FT installers API
						getUsersByRoleService.getUsersByRole(5, 0, $scope.getFTCRUsers); // role for FT CR USERS -
						$scope.primaryContact = {
							contactType : 1,
							modified : false,
							infoExist: false,
							valid: false
						};
						$scope.purchaseContact = {
							contactType : 2,
							modified : false,
							infoExist: false,
							valid: false
						};
						$scope.billingContact = {
							contactType : 3,
							modified : false,
							infoExist: false,
							valid: false
						};
						$scope.financeContact = {
							contactType : 4,
							modified : false,
							infoExist: false,
							valid: false
						};

						$scope.allContacts = [];
						$scope.allContacts.push($scope.primaryContact);
						$scope.allContacts.push($scope.purchaseContact);
						$scope.allContacts.push($scope.billingContact);
						$scope.allContacts.push($scope.financeContact);

						/** ************************** */

						// default variables for contact
						$scope.referanceId = $scope.id;
						$scope.CATEGORY = 1; // for now
						$scope.CONTACT_PRIMARY = 1;
						$scope.CONTACT_PURCHASE = 2;
						$scope.CONTACT_BILLING = 3;
						$scope.CONTACT_FINANCE = 4;
						$scope.CONTACT_POLICE = 5;
						$scope.CONTACT_HOSPITAL = 6;

						$scope.statuses = [ {
							id : 1,
							name : 'ACTIVE'
						}, {
							id : 2,
							name : 'INACTIVE'
						}/*, {
							id : 3,
							name : 'DELETE'
						} */];

						$scope.currentStatus = $scope.statuses[0];

						// Functions used in controller

						$scope.getStatus = function(status) {
							for (var i = 0; i < $scope.statuses.length; i++) {
								if (status == $scope.statuses[i].name) {
									return $scope.statuses[i];
								}
							}
						};

						
						$scope.loadRefernceUser = function(){
							
								customerService.getRefernceUser($scope.id, function(response) {
									console.log("get reference user success");
									if(response != null)
									{
										$scope.ftcrFilter = response.firstName + " " + response.lastName ;
										$scope.oldftcrFilter = $scope.ftcrFilter;
									}
									
								});
							
							
						}
						
						
						
						$scope.loadCustomer = function() {
							customerService.getCustomer($scope.id, function(
									response) {
								$scope.fieldDisabled = true;
								if (response != null) {
									$scope.customerInfoExists = true;
									$scope.customer = response; 
									if($scope.customer.firedetectionFile == null)
										$scope.uploadDetection = true;
									else{
										$scope.uploadDetection = false;
										var start = $scope.customer.firedetectionFile.indexOf("_");
										$scope.firedetectionFile = ($scope.customer.firedetectionFile).substring(start+1);
									}
										
									console.log($scope.customer);
									if($scope.customer.firefightingFile == null)
										$scope.uploadFighting = true;
									else{
										$scope.uploadFighting = false;
										var start = $scope.customer.firefightingFile.indexOf("_");
										($scope.firefightingFile) = ($scope.customer.firefightingFile).substring(start+1);
										}
										
									console.log($scope.uploadFighting);
									// store success response to show on click of cancel btn 
									$scope.oldCustomerData = angular.toJson($scope.customer);
									
									$scope.currentStatus = $scope
											.getStatus($scope.customer.status);
									/*if($scope.customer.state == "")
									{
										$scope.cityState = $scope.customer.city;
									}
									else
									{
									$scope.cityState = $scope.customer.city
											+ ", " + $scope.customer.state;
									}*/
									$scope.name = $scope.customer.name;
									/*if ($scope.customer.ftCrUsers == undefined) {
										$scope.setSelectedFTCRUsers($scope.customer.ftCrUsers);
									}*/
//									alert($scope.name);
								} else {
									$scope.customerInfoExists = false;
								}
							});
						};

						$scope.setModified = function(contactType) {
							$scope.saveDisabledContacts = false;
							console.log(contactType);
							switch (contactType) {
							case 1:
								$scope.primaryContact.modified = true;
								break;
							case 2:
								$scope.purchaseContact.modified = true;
								break;
							case 3:
								$scope.billingContact.modified = true;
								break;
							case 4:
								$scope.financeContact.modified = true;
								break;
							}
						};
						
						$scope.changeNameError = function(){
							$scope.nameError = false;
						};

						$scope.saveInfo = function($event) {
							$event.target.blur();
							$scope.submitted = true;
							//$scope.ftCrUsers = $scope.getSelectedFTCRUsers();
							//console.log("FTCR _____________+++" + $scope.ftCrUsers);
							if($scope.CustomersInfo.$valid){
								//$scope.customer.city = $scope.cityState.split(', ')[0];
								// $scope.customer.state = $scope.cityState.split(', ')[1];
								if($scope.customer.state == null)
								{
									$scope.customer.state = "";
								}

								if ($scope.customerInfoExists == true) {
									customerService.updateCustomer(
											$scope.customer.id,
											$scope.customer.name,
											$scope.customer.address1,
											$scope.customer.address2,
											$scope.customer.city,
											$scope.customer.state,
											$scope.customer.pincode,
											$scope.customer.country,
											$scope.customer.firedetectionFile,
											$scope.customer.firefightingFile,
											$scope.customer.comment,
											$scope.customer.other,
											$scope.currentStatus.id,
											
											function(response){
												console.log(response);
												$scope.response = response;
												if(response.response == null){
													if(response.error == 205){
														$scope.nameError = true;
														$scope.nameErrorMessage = "Customer with the given name already exists.";
													}else{
														$scope.nameError = false;
														
														
														//Reset file upload
														$scope.uploadDetection = false;
														$scope.isFireDetectingUploading = false;
														$scope.detectionFileUploaded = false;
														$scope.isFireDetectingFailed = false;
														
														//Reset file upload
														$scope.uploadFighting = false;
														$scope.fightingFileUploaded = false;
														$scope.isFireFightingUploading=false;
														$scope.isFireFightingFailed = false;
														
//														$scope.loadCustomer();
														
														/*$scope.oldCustomerData.firefightingFile = $scope.customer.firefightingFile;
														$scope.oldCustomerData.firedetectionFile = $scope.customer.firedetectionFile;
														alert("asdss");*/
														var path = $location.path().split('/customer/')[0] + '/customer/' +$scope.customer.id + '/' + $scope.customer.name;
														$location.path(path);
														$scope.loadCustomer();
														
														
														/*$scope.saveDisabled = true;
													$scope.editDisabled = false;
													$scope.fieldDisabled = true;*/
													}
												}
												
												if($scope.response != null || $scope.response != undefined)
												{
													if($scope.response.error != 205){
														$scope.showSaveInfoBtn = false;
														$scope.showCancelInfoBtn = false;
														$scope.showEditInfoBtn = true;
														$scope.fieldDisabled = true;
														$scope.fieldDisabledFTCR = true;
														
														$scope.uploadDetection = false;
														$scope.uploadFighting = false;
													}
													
												}
											});
								} else {

									customerService.addCustomer(
											$scope.customer.name,
											$scope.customer.address1,
											$scope.customer.address2,
											$scope.customer.city,
											$scope.customer.state,
											$scope.customer.pincode,
											$scope.customer.country,
											function(response){
												console.log(response);
												$scope.response = response;
												if(response.response == null){
													if(response.error == 205){
														$scope.nameError = true;
														$scope.nameErrorMessage = "Customer with the given name already exists.";
													}
												}else{
//													$scope.loadCustomer();
													
													
													//Reset file upload
													$scope.uploadDetection = false;
													$scope.isFireDetectingUploading = false;
													$scope.detectionFileUploaded = false;
													$scope.isFireDetectingFailed = false;
													
													//Reset file upload
													$scope.uploadFighting = false;
													$scope.fightingFileUploaded = false;
													$scope.isFireFightingUploading=false;
													$scope.isFireFightingFailed = false;
													
													var path = $location.path().split('/customer/')[0] + '/customer/' +$scope.customer.id + '/' + $scope.customer.name;
													$location.path(path);
													/*$scope.saveDisabled = true;
												$scope.editDisabled = false;
												$scope.fieldDisabled = true;*/
//													$scope.nameError = false;
												}
												
												if($scope.response != null || $scope.response != undefined)
												{
													if($scope.response.error != 205){
														$scope.showSaveInfoBtn = false;
														$scope.showCancelInfoBtn = false;
														$scope.showEditInfoBtn = true;
														$scope.fieldDisabled = true;
														$scope.fieldDisabledFTCR = true;
														
														$scope.uploadDetection = false;
														$scope.uploadFighting = false;
													}
													
												}
											});
								}
								
								if($scope.ftCrUser != undefined && ($scope.isFTAdmin || $scope.isFTSupervisor))
								{
									customerService.addReferenceUser($scope.ftCrUser.id,$scope.id, function(response) {
										console.log("create reference user success");
									});
									
								}
								
								
							}
						};

						$scope.loadContacts = function() {
							contactService
									.getContact(
											$scope.CONTACT_PRIMARY,
											$scope.referanceId,
											$scope.CATEGORY,
											function(response) {
												if (response != null)
												{
													$scope.primaryContact = response.data[0];
													$scope.primaryContact.infoExist = true;
													$scope.primaryContactinfoExist = true;
												}
												else{
													$scope.primaryContactinfoExist = false;
													$scope.primaryContact.infoExist = false;
												}
												
											});

							contactService
									.getContact(
											$scope.CONTACT_PURCHASE,
											$scope.referanceId,
											$scope.CATEGORY,
											function(response) {
												if (response != null)
												{
													$scope.purchaseContact = response.data[0];
													$scope.purchaseContact.infoExist = true;
													$scope.purchaseContactinfoExist = true;
												}
												else{
													$scope.purchaseContactinfoExist = false;
													$scope.purchaseContact.infoExist = false;
												}
											});

							contactService
									.getContact(
											$scope.CONTACT_BILLING,
											$scope.referanceId,
											$scope.CATEGORY,
											function(response) {
												if (response != null)
												{
													$scope.billingContact = response.data[0];
													$scope.billingContact.infoExist = true;
													$scope.billingContactinfoExist = true;
												}
												else{
													$scope.billingContactinfoExist = false;
													$scope.billingContact.infoExist = false;
												}
											});

							contactService
									.getContact(
											$scope.CONTACT_FINANCE,
											$scope.referanceId,
											$scope.CATEGORY,
											function(response) {
												if (response != null)
												{
													$scope.financeContact = response.data[0];
													$scope.financeContact.infoExist = true;
													$scope.financeContactinfoExist = true;
												}
												else{
													$scope.financeContactinfoExist = false;
													$scope.financeContact.infoExist = false;
												}
											});
						};

						$scope.cancelContactsInfo = function(){
							var contact = {name:"",email:"",cellPhone:"",infoExist : false,modified : false};
							$scope.saveDisabledContacts = true;
							$scope.fieldDisabledContact = true;
							$scope.editDisabledContacts = false;
							$scope.submitcontact=false;
							console.log($scope.oldPrimaryContact);
							$scope.primaryContact = ($scope.primaryContact.infoExist == true) ? angular.copy($scope.oldPrimaryContact):angular.copy(contact);
							$scope.primaryContact.contactType = 1; 
							$scope.purchaseContact = ($scope.purchaseContact.infoExist == true) ? angular.copy($scope.oldPurchaseContact):angular.copy(contact);
							$scope.purchaseContact.contactType = 2; 
							$scope.billingContact = ($scope.billingContact.infoExist == true) ? angular.copy($scope.oldBillingContact):angular.copy(contact);
							$scope.billingContact.contactType = 3; 
							$scope.financeContact = ($scope.financeContact.infoExist == true) ? angular.copy($scope.oldFinanceContact):angular.copy(contact);
							$scope.financeContact.contactType = 4; 
						
						};
						
						
						$scope.contactHasError = function(type, error, val) {
							switch (type) {
							case 1:

								$scope.primaryErrorMessage = error;
								$scope.primaryError = val;
								break;
							case 2:

								$scope.purchaseErrorMessage = error;
								$scope.purchaseError = val;
								break;
							case 3:

								$scope.billingErrorMessage = error;
								$scope.billingError = val;
								break;
							case 4:

								$scope.financeErrorMessage = error;
								$scope.financeError = val;
								break;
							}
						};

						var isEmailInvalid = function(email) {
							var x = new String(email);
							var atpos = x.indexOf("@");
							if (x.length == 0)
								return false;
							var dotpos = x.lastIndexOf(".");
							if (atpos < 1 || dotpos < atpos + 2
									|| dotpos + 2 >= x.length) {

								return true;
							}
							return false;
						};
						$scope.compareCreationandContractDate = function() {
//						    $scope.haserror = false;
						    $scope.creationcomperror = false;
						    if(new Date($scope.contractStart) < new Date($scope.customer.createdDate)){
						      $scope.creationcomperror = true;
						      return false;
						    }
						    $scope.compareContractDate();
						};
						$scope.compareContractDate = function() {
						    $scope.haserror = false;
						    if(new Date($scope.contractStart) > new Date($scope.contractEnd)){
						      $scope.haserror = true;
						      return false;
						    }
						};

						$scope.checkValidity = function(contact){
							if(contact == $scope.primaryContact)
							{
								if($scope.primaryForm.$valid)
									{
										return true;
									}
								else
									{
										return false;
									}
							}
							if(contact == $scope.financeContact)
							{
								if($scope.financeForm.$valid)
									{
										return true;
									}
								else
									{
										return false;
									}
							}
							if(contact == $scope.purchaseContact)
							{
								if($scope.purchaseForm.$valid)
									{
										return true;
									}
								else
									{
										return false;
									}
							}
							if(contact == $scope.billingContact)
							{
								if($scope.billingForm.$valid)
									{
										return true;
									}
								else
									{
										return false;
									}
							}
						};
						$scope.submitcontact = false;
						
						$scope.saveContacts = function($event) {
							$scope.submitcontact = true;
							$event.target.blur();
							/*$scope.fieldDisabledContact = true;
							$scope.saveDisabledContacts = true;
							$scope.editDisabledContacts = false;*/

							$scope.allContacts = [];
							$scope.allContacts.push($scope.primaryContact);
							$scope.allContacts.push($scope.purchaseContact);
							$scope.allContacts.push($scope.billingContact);
							$scope.allContacts.push($scope.financeContact);
							
							$scope.flag=false;
							for ( var Index in $scope.allContacts) {
								var contact = $scope.allContacts[Index];
								if($scope.checkValidity(contact)!= true)
									{
										$scope.flag=true;
										break;
									}
							}
							
							
							for ( var contactIndex in $scope.allContacts) {
								var contact = $scope.allContacts[contactIndex];
								if($scope.flag==false)
									{
									
									if( contact.infoExist == false )
									{
									if (contact.modified==true && $scope.checkValidity(contact)==true && contact.name) {
										/*if (contact.name == undefined
												|| contact.name == "") {
											$scope.contactHasError(
													contact.contactType,
													"Name is required", true);
										} else if (contact.email != undefined
												&& isEmailInvalid(contact.email)) {
											$scope.contactHasError(
													contact.contactType,
													"Email is invalid", true);
										}else {*/
											console.log("create contact" + contact);
											 console.log(contact);
											contactService
													.createContact(
															contact.name,
															contact.email,
															contact.cellPhone,
															contact.officePhone,
															contact.homePhone,
															contact.otherPhone,
															contact.comment,
															contact.contactType,
															$scope.referanceId,
															$scope.CATEGORY,
															function(response,
																	contactType,contact) {
																if (response.response == null) {
																	$scope.loadContacts();
																	if (response.error == 104) {
																		$scope
																				.contactHasError(
																						contactType,
																						"Name is required",
																						true);
																	} else {
																		$scope
																				.contactHasError(
																						contactType,
																						"",
																						false);
																		contact.infoExist = true;
																		switch(contact.contactType){
																		case 1:
																			$scope.oldPrimaryContact = contact;
																			$scope.primaryContact = contact;
																			break;
																		case 2:
																			$scope.oldPurchaseContact = contact;
																			$scope.purchaseContact = contact;
																			break;
																		case 3:
																			$scope.oldBillingContact = contact;
																			$scope.billingContact = contact;
																			break;
																		case 4:
																			$scope.oldFinanceContact = contact;
																			$scope.financeContact = contact;
																			break;
																		}
																		console.log(contact);
																	}
																	$scope.submitcontact=false;
																	contact.modified = false;
																	/*$scope.saveDisabledContacts = true;
																	$scope.fieldDisabledContact = true;
																	$scope.editDisabledContacts = false;*/
																}
																
															},contact);
										//}
									}
									}
								 else if(contact.modified==true && $scope.checkValidity(contact)==true && contact.name){
									// update
									/*if (contact.modified) {
										if (contact.name == undefined
												|| contact.name == "") {
											$scope.contactHasError(
													contact.contactType,
													"Name is required", true);
										} else if (contact.email != undefined
												&& isEmailInvalid(contact.email)) {
											$scope.contactHasError(
													contact.contactType,
													"Email is invalid", true);
										} else {*/
									 console.log("update contact");
									 console.log(contact);
											contactService
													.updateContact(
															contact.id,
															contact.name,
															contact.email,
															contact.cellPhone,
															contact.officePhone,
															contact.homePhone,
															contact.otherPhone,
															contact.comment,
															contact.contactType,
															function(response,
																	contactType,contact) {
																
																console.log(response);
																
																if (response.response == null) {

																	if (response.error == 104) {
																		$scope
																				.contactHasError(
																						contactType,
																						"name required",
																						true);
																	} else {
																		$scope
																				.contactHasError(
																						contactType,
																						"",
																						false);
																		contact.infoExist = true;
																		switch(contact.contactType){
																		case 1:
																			$scope.oldPrimaryContact = contact;
																			$scope.primaryContact = contact;
																			break;
																		case 2:
																			$scope.oldPurchaseContact = contact;
																			$scope.purchaseContact = contact;
																			break;
																		case 3:
																			$scope.oldBillingContact = contact;
																			$scope.billingContact = contact;
																			break;
																		case 4:
																			$scope.oldFinanceContact = contact;
																			$scope.financeContact = contact;
																			break;
																		}
																	}
																	
																	$scope.submitcontact=false;
																	contact.modified = false;
																	console.log(contact);
																	/*$scope.saveDisabledContacts = true;
																	$scope.fieldDisabledContact = true;
																	$scope.editDisabledContacts = false;*/
																}
																	
															},contact);
										//}
								//	}
								}
									$scope.saveDisabledContacts = true;
									$scope.fieldDisabledContact = true;
									$scope.editDisabledContacts = false;
									}	
								
							}
							
								
						//	}
							
						};

						/** ******************************** */
						/**********contract Start*******************/
						$scope.customerId = $state.params.id; //Customer Id
						
						
						$scope.iscollapsedContract = false;
						$scope.countPerPage = 10;
						
						$scope.updateContract = false;
						
						// Show hide logic for Contract
						if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTCR)
						{
							if($scope.isFTAdmin || $scope.isFTSupervisor)
							{
								$scope.updateContract = true;
							}
							else
							{
								$scope.updateContract = false;
							}
							
							$scope.contractShow = true;
						}
						else
						{
							$scope.contractShow = false;
						}

						/*// contract start and end date validation
						$scope.compareStartAndEndDate = function() {
						    $scope.haserror = false;
						    if($scope.startdate != undefined && $scope.enddate != undefined)
						    {
							    if(new Date($scope.startdate) > new Date($scope.enddate)){
							      $scope.haserror = true;
							      return false;
							    }
						    }
						};*/
						
						
						$scope.collapsedContract= function(){
							$scope.iscollapsedContract= !$scope.iscollapsedContract;
							if($scope.iscollapsedContract){
								$scope.getcontracts()
							}
							
						};
						
						$scope.contracts = [];
						$scope.pageCount = 10;
						$scope.totalContracts = 0;
						
						$scope.pagination1 = {
								current : 1
						};
						
						$scope.getSitesListForCustomer = function(){
							$scope.sites = [];
					    	$scope.totalSites = 0;
					    	$scope.selectedSite ={ id:0,name: 'All Sites' };
					    	
					    	siteService.getListOfSites("",
					    			$stateParams.id,2, 0,
									0,  function(response){
					    		if(response != null)
					    		{
					    			var sites = response.data;
									var count=0;
//									$scope.totalSites = response.total;
									for (var i = 0; i< response.total; i++){
										if (sites[i].status == 1){
											$scope.sites[count++] = sites[i];
										}
									}
					    		}
								
							});
						}
						
						/*$rootScope.$on("SiteTableUpdated", function () {
							console.log("in SiteTableUpdated");	
							$scope.getSitesListForCustomer();
							
						});*/
						
						$scope.getSitesListForCustomer();
						
						$scope.getcontracts = function(){
							contractService.getListOfContracts($scope.customerId,$scope.selectedSite.id,$scope.pagination1.current,$scope.pageCount,function(response){
								if(response != null)
								{
									console.log("Success Contract");
									$scope.contracts = response.data;
									$scope.totalContracts = response.total;
								}
								else
								{
									$scope.contracts = [];
									$scope.totalContracts = 0;
								}
							});
						
						};
						
						$scope.downloadContractFile = function(contract,$event){
							$event.target.blur();
							var element = document.createElement('a');
							  element.setAttribute('href', contract.attachment);
							  element.setAttribute('download', contract.attachment);
							  element.style.display = 'none';
							  document.body.appendChild(element);
							  element.click();
							  document.body.removeChild(element);
							
						}
					
						// refresh table on any action like add. update, delete contract
						$scope.refreshContractTable = function() {
							$scope.contracts = [];
							$scope.getcontracts();
						};
						
						// set selected site name
				    	$scope.setSiteName = function(site){
				    		$scope.contracts = [];
				    		$scope.selectedSite = site;
				    		$scope.getcontracts();
				    	}			    	
							
						
						/*******************************************/

						$scope.loadCustomer(); // load initially
						$scope.loadContacts();
						$scope.loadRefernceUser();
						
						
						
						

					}];
		});
