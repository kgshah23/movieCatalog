define(
		[ 'angular' ],
		function(angular) {
			return [
					'$scope',
					'$stateParams',
					'$state',
					'AccessControlService',
					'NotificationService',
					'siteService',
					'locationService',
					'FileService',
					'$cookieStore',
					'getUsersByRoleService',
					'contactService',
					'$document',
					'spinnerService',
					'siteService','deviceService','focus','$location','$filter',
					function($scope, $stateParams, $state,
							AccessControlService, NotificationService,
							siteService, locationService, FileService,
							$cookieStore, getUsersByRoleService, contactService,$document,spinnerService,inventoryService,deviceService,focus,$location,$filter) {

						
						$scope.makeFasUpload = function(upload){
							$scope.fascertFileUploaded = false;
							$scope.isfasComplianceCertificateUploading = false;
							$scope.fascertFileUploaded = false;
							$scope.isfasComplianceCertificateFailed = false;
							$scope.uploadFas = upload;
						};
						
						$scope.makeHsUpload = function(upload){
							$scope.hsFileUploaded = false;
							$scope.ishsComplianceCertificateUploading = false;
							$scope.hsFileUploaded = false;
							$scope.ishsComplianceCertificateFailed = false;
							$scope.uploadHs = upload;
						}
						
						
						// site id from parametres
						$scope.id = $state.params.siteid;

						// Initially site is undefined
						$scope.site = undefined;

						// Get login data from cookie
						var loginData = $cookieStore.get('loginData');

						// Initially site info is visible to user on page load
						$scope.iscollapsedInfo = true;

						// toggle collapse of site info
						$scope.collapsedInfo = function() {
							$scope.iscollapsedInfo = !$scope.iscollapsedInfo;
						},

						// initialize multiple selection list
						$scope.multipleList = {};

						// set siteInfoExists to false asit dosen't exist
						$scope.siteInfoExists = false;
						
						// array for site stages
						$scope.siteStages = [ {
							id : 1,
							name : 'Audit'
						}, {
							id : 2,
							name : 'Installation'
						}, {
							id : 3,
							name : 'Online'
						}, {
							id : 4,
							name : 'Test'
						} ];
						
						$scope.isFTAdmin = AccessControlService.isFTAdmin(loginData.roleId);
						$scope.isFTSupervisor= AccessControlService.isFTSupervisor(loginData.roleId);
				    	$scope.isFTOperator = AccessControlService.isFTOperator(loginData.roleId);
						$scope.isFTCR = AccessControlService.isFTCR(loginData.roleId);
						$scope.isFTInstaller = AccessControlService.isFTInstaller(loginData.roleId);
						$scope.isFranchiseAdmin = AccessControlService.isFranchiseAdmin(loginData.roleId);
						$scope.isFL2 = AccessControlService.isFL2(loginData.roleId);
						$scope.isCustomerAdmin= AccessControlService.isCustomerAdmin(loginData.roleId);
						$scope.isCL2 = AccessControlService.isCL2(loginData.roleId);
						$scope.isCL3 = AccessControlService.isCL3(loginData.roleId);
						// get site stage by given id
						$scope.getSiteStage = function(stage) {
							for (var i = 0; i < $scope.siteStages.length; i++) {
								if (stage == $scope.siteStages[i].id) {
									return $scope.siteStages[i];
								}
							}
						};

						$scope.setSelectedFranchisees = function(
								franchisseusers) {
							// set selected franchisees
							$scope.multipleList.selectedfranchiseUsers = [];
							if (franchisseusers.length > 0) {
								if($scope.isFL2){
									for (var i = 0; i < franchisseusers.length; i++) {
										for (var userid = 0; userid < $scope.FL2Users.length; userid++) {
											
											if (franchisseusers[i].id == $scope.FL2Users[userid].id) {
												$scope.multipleList.selectedfranchiseUsers
														.push($scope.FL2Users[userid]);
												
												break;
											}
										}
										
									}
							
								}
									for (var i = 0; i < franchisseusers.length; i++) {
										for (var userid = 0; userid < $scope.franchiseUsers.length; userid++) {
											
											if (franchisseusers[i].id == $scope.franchiseUsers[userid].id) {
												var flag = 0;
												for(var j = 0;j < $scope.multipleList.selectedfranchiseUsers.length; j++){
													if($scope.multipleList.selectedfranchiseUsers[j] == undefined){
														$scope.multipleList.selectedfranchiseUsers = $scope.multipleList.selectedfranchiseUsers.splice(j, 1);
													}
													if($scope.multipleList.selectedfranchiseUsers[j].id == $scope.franchiseUsers[userid].id){
														flag = 1;
														break;
													}
												}
												if(flag == 0)
													$scope.multipleList.selectedfranchiseUsers
															.push($scope.franchiseUsers[userid]);
												console.log($scope.multipleList.selectedfranchiseUsers);
												break;
	
											}
										}
									}
								}

						};
						// get selected franchisees
						$scope.getSelectedFranchisses = function() {
							$scope.selectedfranchisees = [];
							if($scope.isFranchiseAdmin){
								for (var i = 0; i < $scope.site.franchiseUsers.length; i++) {
									for (var userid = 0; userid < $scope.FL2Users.length; userid++) {
										if ($scope.site.franchiseUsers[i].id == $scope.FL2Users[userid].id) {
											$scope.selectedfranchisees = $scope.selectedfranchisees.concat($scope.site.franchiseUsers[i].id);
										}
									}
									
								}
							
							}
							for (var i = 0; i < $scope.multipleList.selectedfranchiseUsers.length; i++) {
								var flag = 0;
								for(var j = 0; j < $scope.selectedfranchisees.length; j++){
									if($scope.selectedfranchisees[j] == $scope.multipleList.selectedfranchiseUsers[i].id){
										flag = 1;
										break;
									}
								}
								if(flag == 0)
									$scope.selectedfranchisees = $scope.selectedfranchisees
											.concat($scope.multipleList.selectedfranchiseUsers[i].id);
								console.log($scope.selectedfranchisees);
							};
							
							return $scope.selectedfranchisees;
						};

						$scope.setSelectedFTUsers = function(FTusers) {
							// set selected FT users
							$scope.multipleList.selectedFTUsers = [];
							if (FTusers.length > 0) {
								for (var i = 0; i < FTusers.length; i++) {
									for (var userid = 0; userid < $scope.FTUsers.length; userid++) {
										if (FTusers[i].id == $scope.FTUsers[userid].id) {
											$scope.multipleList.selectedFTUsers = $scope.multipleList.selectedFTUsers
													.concat($scope.FTUsers[userid]);

										}
									}
								}
								;
							}

						};
						// get selected FT users
						$scope.getSelectedFTUsers = function() {
							$scope.selectedftusers = [];
							for (var i = 0; i < $scope.multipleList.selectedFTUsers.length; i++) {
								$scope.selectedftusers = $scope.selectedftusers
										.concat($scope.multipleList.selectedFTUsers[i].id);
							}
							return $scope.selectedftusers;
						};
						
						// disable or hide mode of site info inputs
						$scope.initializeInputStates = function(){
							$scope.disableCustomer = true;
							$scope.disableFTUsers = true;
							$scope.disableFranchisee = true;
							$scope.editSiteInfoDisabled = false;
							// Initially all input fields of site info are disabled
							$scope.siteInfofieldDisabled = true;
							// disable save button
							$scope.saveSiteInfoDisabled = true;
							//site stage (status)disabled by default
							$scope.siteStageDisabled = true;
						};
						$scope.initializeInputStates();
						
						// on click of edit site info button
						$scope.editSiteInfo = function() {
							
							$scope.uploadFas = false;
							if($scope.site.fasComplianceCertificate == null)
								$scope.uploadFas = true;

							$scope.uploadHs = false;
							if($scope.site.hsComplianceCertificate == null)
								$scope.uploadHs = true;
							
							$scope.siteStageDisabled = false;
							if($scope.NoCustomersFound == false){
								$scope.disableCustomer = false;
							}
							if($scope.NoFTUsersFound == false){
								$scope.disableFTUsers = false;
							}
							if($scope.isFranchiseesNotFound == false){
								$scope.disableFranchisee = false;
							}
							if(!$scope.isFTInstaller && !$scope.isFranchiseAdmin && !$scope.isFL2){
								$scope.siteInfofieldDisabled = false;
							}
							else{
								$scope.disableCustomer = true;
								$scope.disableFTUsers = true;
								if($scope.isFranchiseAdmin){
									$scope.disableFranchisee = false;
								}
								else{
									$scope.disableFranchisee = true;
								}
							}
							// check page is franchisee or not 
							if(path.indexOf('franchise')>0){
//								alert(path.indexOf('franchise'));
								$scope.disableCustomer = true;
							}
							focus('sitename');
							$scope.editSiteInfoDisabled = true;
							$scope.saveSiteInfoDisabled = false;
						},

						/*
						 * Get FT installers
						 */
						// initialize ftusers array
						$scope.FTUsers = [];

						// callback on success of get ft installers
						$scope.NoFTUsersFound = true;
						var getFTUsers = function(response) {
							if (response != undefined) {
								$scope.FTUsers = response.data;
								$scope.totalFTUsers = response.total;
								$scope.NoFTUsersFound = false;
							} else {
								$scope.FTUsers = [];
								$scope.NoFTUsersFound = true;
							}
						};
						// call to get FT installers API
						getUsersByRoleService.getUsersByRole(3, 0, getFTUsers); // role
						// for
						// FT
						// installer-3


						/*
						 * Get CL3 users
						 */
						// initialize customer Users array
						$scope.customerUsers = [];
						$scope.NoCustomersFound = true;
						$scope.customerFilter = "Select customer user";
						$scope.updateCustomer = function(customer) {
							if(customer != undefined){
								$scope.customerFilter = customer.firstName + " "
								+ customer.lastName;
								$scope.customerUser = customer;
							}
							else{
								$scope.customerFilter = 'Select customer user';
								$scope.customerUser = '';
							}

						};
						// callback on success of get ft installers
						var getcustomerUsers = function(response) {
							if (response != undefined) {
								$scope.customerUsers = response.data;
								$scope.NoCustomersFound = false;
								$scope.totalcustomerUsers = $scope.customerUsers.length;//response.total;
							} else {

								$scope.customerUsers = [];
								$scope.NoCustomersFound = true;
								$scope.customerFilter = "No Users Found.";
							}
						};
						// call to get CL3 users API
						var path = $location.path();
						if (path.indexOf('/customer/') > 0){
							$scope.customerId = $stateParams.id;
							console.log("CUSTOMER ID____ " +$scope.customerId);
							getUsersByRoleService.getUsersByRole(8, $scope.customerId ,
									getcustomerUsers); // role for cl3 -8
						}
						else{
							getUsersByRoleService.getUsersByRole(8, 0 ,
									getcustomerUsers); // role for cl3 -8
						}

						/*
						 * Get franchisee FL1 users
						 */

						$scope.getFlUsers = function(){
							// initialize franchisee users array
							$scope.franchiseUsers = [];
							$scope.franchisee = {};
							$scope.isFranchiseesNotFound = true;
							// callback on success of get FL1 users
							var updatefranchiseUsers = function(response) {
								console.log(response);
								if (response != undefined) {
									$scope.franchiseUsers = response.data;
									$scope.totalFranchise = response.total;
									$scope.isFranchiseesNotFound = false;
								} else {
									$scope.franchiseUsers = [];
									$scope.isFranchiseesNotFound = true;
								}
							};
							var updateFL2Users = 	function(response) {
								if (response != undefined) {
									$scope.FL2Users = response.data;
//									$scope.totalFranchise = response.total;
									$scope.isFL2UsersNotFound = false;
								} else {
									$scope.FL2Users = [];
									$scope.isFL2UsersNotFound = true;
								}
							};
							 if(!$scope.isFranchiseAdmin){
								// call to get FL1 users API
								getUsersByRoleService.getUsersByRole(9, 0,
										updatefranchiseUsers); // role for fl1-9
								 //when user is fl2 get both fl1 and fl2 list
								 if($scope.isFL2 ){
										// call to get FL2 users API
										getUsersByRoleService.getUsersByRole(10, 0,
												updateFL2Users); // role for fl2-10
								 }
							 }
							 else{
//								 if (path.indexOf('/franchise/') >-1){
//										$scope.franchiseId = ($location.path().split('/franchise/')[1]).split('/')[0];
									 $scope.franchiseId = $stateParams.id;
										console.log("franchise ID____ " +$scope.franchiseId);
										getUsersByRoleService.getUsersByRole(10, $scope.franchiseId ,
												updatefranchiseUsers); // role for fl2 -10
								/*}
								 else{
									// call to get FL2 users API
										getUsersByRoleService.getUsersByRole(10, 0,
												updatefranchiseUsers); // role for fl2-10
								 }*/
									getUsersByRoleService.getUsersByRole(9, 0,
											updateFL2Users); // role for fl1-9
							 }
						};
						
						

						/*
						 * Get site details
						 */

						$scope.getSiteDetails = function() {
							$scope.getFlUsers();
							spinnerService.showSpinner();
							siteService
									.getSite(
											$scope.id,
											function(response) {
												if (response != null) {
													$scope.siteInfoExists = true;
													$scope.site = response;
													$scope.oldSiteData = angular.toJson($scope.site);
													
													$scope.uploadFas = false;
													if($scope.site.fasComplianceCertificate == null)
														$scope.uploadFas = true;
													else
														{
															var start = $scope.site.fasComplianceCertificate.indexOf("_");
															($scope.fasComplianceCertificate) = ($scope.site.fasComplianceCertificate).substring(start+1);
														}
													
													$scope.uploadHs = false;
													if($scope.site.hsComplianceCertificate == null)
														$scope.uploadHs = true;
													else
													{
														var start = $scope.site.hsComplianceCertificate.indexOf("_");
														($scope.hsComplianceCertificate) = ($scope.site.hsComplianceCertificate).substring(start+1);
													}
												
													/*$scope.cityState = $scope.site.city
															+ ", "
															+ $scope.site.state;*/
													$scope.siteStage = $scope
															.getSiteStage($scope.site.siteStage);
													if ($scope.site.ftUsers != null) {
														$scope.setSelectedFTUsers($scope.site.ftUsers);
													}
													$scope.setSelectedFranchisees($scope.site.franchiseUsers);
													// $scope.site.customerUser
													// = null;
													if ($scope.site.customerUser != null) {
														$scope.customerUser = $scope.site.customerUser;
														$scope.customerFilter = $scope.site.customerUser.name;
													}
													$scope.site.hsComplianceCertificate = $scope.site.hsComplianceCertificate;
													$scope.getLocations();
												} else {
													$scope.siteInfoExists = false;
												}
											});
						};

						$scope.getSiteDetails();

						// on click of save site info button

						$scope.saveSiteInfo = function($event) {
							$scope.SiteInfoSubmitted = true;
							if($scope.SiteInfo.$valid)
							{ 	
								$scope.initializeInputStates();
								
								$event.target.blur();
								// $scope.site.city = $scope.cityState.split(', ')[0];
								// $scope.site.state = $scope.cityState.split(', ')[1];
								$scope.selectedfranchisees = [];
								$scope.selectedftusers =[];
								$scope.franchiseUsers = $scope
										.getSelectedFranchisses();
								$scope.ftUsers = $scope.getSelectedFTUsers();
//								$scope.multipleList.selectedfranchiseUsers = [];
								if($scope.customerUser == undefined || $scope.customerUser == null ){
									customerId = "";
								}
								else{
									customerId = $scope.customerUser.id;
								}
								if ($scope.siteInfoExists == true) {
									siteService
											.updateSite(
													$scope.site.id,
													$scope.site.name,
													$scope.site.address1,
													$scope.site.address2,
													$scope.site.city,
													$scope.site.state,
													$scope.site.pincode,
													$scope.site.country,
													$scope.siteStage.id,
													$scope.ftUsers,
													$scope.franchiseUsers,
													$scope.site.fasComplianceCertificate,
													$scope.site.hsComplianceCertificate,
													customerId,
													function(response) {
														
														//Reset File uploads
														$scope.uploadFas = false;
														$scope.fascertFileUploaded = false;
														$scope.isfasComplianceCertificateUploading = false;
														$scope.fascertFileUploaded = false;
														$scope.isfasComplianceCertificateFailed = false;
														
														//Reset File uploads
														$scope.uploadHs = false;
														$scope.hsFileUploaded = false;
														$scope.ishsComplianceCertificateUploading = false;
														$scope.hsFileUploaded = false;
														$scope.ishsComplianceCertificateFailed = false;
														
														var lpath = $location.path().split('/site/')[0] + '/site/' +$scope.site.id + '/' + $scope.site.name;
														$location.path(lpath);
														$scope.getSiteDetails();
													
													});
								} else {
	
									siteService
											.addSite(
													$scope.site.name,
													$scope.site.address1,
													$scope.site.address2,
													$scope.site.city,
													$scope.site.state,
													$scope.site.pincode,
													$scope.site.country,
													function(response) {
														//Reset File uploads
														$scope.uploadFas = false;
														$scope.fascertFileUploaded = false;
														$scope.isfasComplianceCertificateUploading = false;
														$scope.fascertFileUploaded = false;
														$scope.isfasComplianceCertificateFailed = false;
														
														//Reset File uploads
														$scope.uploadHs = false;
														$scope.hsFileUploaded = false;
														$scope.ishsComplianceCertificateUploading = false;
														$scope.hsFileUploaded = false;
														$scope.ishsComplianceCertificateFailed = false;
														
														
															/*$scope.saveSiteInfoDisabled = true;
															$scope.editSiteInfoDisabled = false;
															$scope.editSiteInfoDisabled = false;*/
//														var path = $location.path().split('/site/')[0] + '/site/' +$scope.site.id + '/' + $scope.site.name;
//														$location.path(path);
													});
								}
							}
						};
						
						// on click of cancel site info
						$scope.cancelSiteInfo = function(){
							
							angular.element(document.querySelector('#hsFile')).val('');
							angular.element(document.querySelector('#fasFile')).val('');

							
							$scope.initializeInputStates();
							$scope.site = JSON.parse($scope.oldSiteData);
							$scope.siteStage = $scope.getSiteStage($scope.site.siteStage);
							$scope.multipleList.selectedFTUsers = [];
							$scope.multipleList.selectedfranchiseUsers = [];
							
							//Reset File uploads
							$scope.uploadFas = false;
							if($scope.site.fasComplianceCertificate == null)
								$scope.uploadFas = true;
							
							$scope.fascertFileUploaded = false;
							$scope.isfasComplianceCertificateUploading = false;
							$scope.fascertFileUploaded = false;
							$scope.isfasComplianceCertificateFailed = false;
							
							//Reset File uploads

							$scope.uploadHs = false;
							if($scope.site.hsComplianceCertificate == null)
								$scope.uploadHs = true;
							
							$scope.hsFileUploaded = false;
							$scope.ishsComplianceCertificateUploading = false;
							$scope.hsFileUploaded = false;
							$scope.ishsComplianceCertificateFailed = false;
							
							if ($scope.site.ftUsers != null) {
								$scope.setSelectedFTUsers($scope.site.ftUsers);
							}
							if ($scope.site.franchiseUsers != null) {
								$scope.setSelectedFranchisees($scope.site.franchiseUsers);
							}
							// $scope.site.customerUser
							// = null;
							if ($scope.site.customerUser != null) {
								$scope.customerUser = $scope.site.customerUser;
								$scope.customerFilter = $scope.site.customerUser.name;
							}
							else{
								$scope.customerFilter = "Select customer user";
							}
						};
						
						// upload fas CompCertificate
						$scope.fasComplianceCertificateUploader = FileService
								.uploadFile(
										baseUrl+"api/site/certificate?grant_type=access_token&access_token="
												+ loginData.access_token,
										"POST",
										true,
										function(item, response, status,
												headers) {
											$scope.isFireDetectingUploading = false;
											if (response.statusCode == 200) {
												$scope.fascertFileUploaded = true;
												$scope.site.fasComplianceCertificate = response.response;
												$scope.isfasComplianceCertificateFailed = false;
											} else {
												$scope.isfasComplianceCertificateFailed = true;

											}
										},
										function(item, response, status,
												headers) {
											$scope.fascertFileUploaded = false;
											$scope.isfasComplianceCertificateUploading = false;
											$scope.fascertFileUploaded = false;
											$scope.isfasComplianceCertificateFailed = true;
										},
										function(item) {
											$scope.isfasComplianceCertificateUploading = true;
											$scope.isfasComplianceCertificateFailed = false;
										},
										function(item, progress) {
											$scope.isfasComplianceCertificateUploadStatus = progress;
											if (progress == 100)
												$scope.isfasComplianceCertificateUploading = false;
										},
										function(item, response, status,
												headers) {
											$scope.isfasComplianceCertificateUploading = false;
											$scope.fascertFileUploaded = false;
											$scope.isfasComplianceCertificateFailed = true;
										});

						// upload hs Compliance certificate
						$scope.hsComplianceCertificateUploader = FileService
								.uploadFile(
										baseUrl+"api/site/certificate?grant_type=access_token&access_token="
												+ loginData.access_token,
										"POST",
										true,
										function(item, response, status,
												headers) {
											$scope.ishsComplianceCertificateUploading = false;
											if (response.statusCode == 200) {
												$scope.hsFileUploaded = true;
												$scope.site.hsComplianceCertificate = response.response;
												$scope.ishsComplianceCertificateFailed = false;
											} else {
												$scope.ishsComplianceCertificateFailed = true;

											}
										},
										function(item, response, status,
												headers) {
											$scope.hsFileUploaded = false;
											$scope.ishsComplianceCertificateUploading = false;
											$scope.hsFileUploaded = false;
											$scope.ishsComplianceCertificateFailed = true;
										},
										function(item) {
											$scope.ishsComplianceCertificateUploading = true;
											$scope.ishsComplianceCertificateFailed = false;
										},
										function(item, progress) {
											$scope.firedetectingUploadStatus = progress;
											if (progress == 100)
												$scope.ishsComplianceCertificateUploading = false;
										},
										function(item, response, status,
												headers) {
											$scope.ishsComplianceCertificateUploading = false;
											$scope.hsFileUploaded = false;
											$scope.ishsComplianceCertificateFailed = true;
										});

						// PRAGATI
						/***************************** BILLING INFO ****************************************/
						
						$scope.format = 'dd/MM/yyyy';
						$scope.iscollapsedBillingInfo = false;
						$scope.editBillingDisable = false;
						$scope.saveBillingDisabled = true;
						$scope.billingFieldDisable = true;
						$scope.BillingInfoExists = false;
						$scope.haserror = false;
						$scope.haserrorInContract = false;
						$scope.haserrorInBilling = false; 
						$scope.haserrorInPreventive = false;
						$scope.hasContracterrorwithlastBilled = false;

						$scope.collapsedBillingInfo = function() {
							$scope.iscollapsedBillingInfo = !$scope.iscollapsedBillingInfo;

						};

						$scope.enableBillingFormfilelds = function() {
							$scope.billingFieldDisable = false;
							$scope.editBillingDisable = true;
							$scope.saveBillingDisabled = false;
							focus("commisionDate");
						};
						
						$scope.compareCommisionandSitePO= function() {
							$scope.hasContracterror = false;
							
							if($scope.site.contractExpiryDate != undefined && $scope.site.commisionDate!= undefined){
								if(new Date($scope.site.contractExpiryDate) <= new Date($scope.site.commisionDate)){
									$scope.hasContracterror = true;
								     
								}
							}
							
							$scope.hasContracterrorwithSitePO = false;
							if($scope.site.contractExpiryDate != undefined && $scope.site.sitePoDate!= undefined){
								if(new Date($scope.site.contractExpiryDate) <= new Date($scope.site.sitePoDate)){
									$scope.hasContracterrorwithSitePO = true;
								     
								}
							}
							
							$scope.haserror = false;
						    if($scope.site.sitePoDate != undefined && $scope.site.commisionDate!= undefined)
						    {
						    if(new Date($scope.site.sitePoDate) > new Date($scope.site.commisionDate)){
						      $scope.haserror = true;
						     
						    }
						    }
						    /*if($scope.site.contractExpiryDate != undefined){
						    $scope.compareDateForContract();
						    }*/
						    if($scope.site.lastBilledDate != undefined){
						    	$scope.compareDateForBilling();
							}
						    if($scope.site.lastPreventiveMaintDate != undefined){
						    	$scope.compareDateForPrevetive();
							}
						};
						
						/*$scope.compareDateForContract = function(){
							 $scope.haserrorInContract = false;
							    if((new Date($scope.site.contractExpiryDate) <= new Date($scope.site.commisionDate)) || 
							    		(new Date($scope.site.contractExpiryDate) <= new Date($scope.site.sitePoDate))){
							      $scope.haserrorInContract = true;
							      return false;
							    }
						};*/
						
						$scope.compareDateForBilling = function(){
							 $scope.haserrorInBilling = false;
							    if((new Date($scope.site.lastBilledDate) < new Date($scope.site.commisionDate)) || 
							    		(new Date($scope.site.lastBilledDate) < new Date($scope.site.sitePoDate))){
							      $scope.haserrorInBilling = true;
							      return false;
							    }
							    
							 $scope.hasContracterrorwithlastBilled = false;
								if($scope.site.contractExpiryDate != undefined && $scope.site.lastBilledDate!= undefined){
									if(new Date($scope.site.contractExpiryDate) < new Date($scope.site.lastBilledDate)){
										$scope.hasContracterrorwithlastBilled = true;
									      return false;
									}
								} 
						};
						
						$scope.compareDateForPrevetive = function(){
							 $scope.haserrorInPreventive = false;
							    if((new Date($scope.site.lastPreventiveMaintDate) <= new Date($scope.site.commisionDate)) || 
							    		(new Date($scope.site.lastPreventiveMaintDate) <= new Date($scope.site.sitePoDate))){
							      $scope.haserrorInPreventive = true;
							      return false;
							    }
						};
						
						$scope.saveBillingInfo = function($event) {
							$scope.BillingInfoSubmitted = true;
							if($scope.BillingInfo.$dirty && $scope.BillingInfo.$valid && $scope.haserror == false && $scope.haserrorInContract == false && $scope.haserrorInBilling == false && $scope.haserrorInPreventive == false &&
									$scope.hasContracterrorwithlastBilled==false && $scope.hasContracterrorwithSitePO==false && $scope.hasContracterror==false)
							{
								$event.target.blur();
								siteService.updateSiteBillingInfo($scope.site.id,
										$scope.site.commisionDate,
										$scope.site.sitePoDate,
										$scope.site.contractExpiryDate,
										$scope.site.lastBilledDate,
										$scope.site.lastPreventiveMaintDate,
										/*$scope.site.billingPeriod*/30,
										$scope.site.billingRate,
										$scope.site.preventiveMaintPeriod,
										$scope.getSiteDetails);
	
								$scope.billingFieldDisable = true;
								$scope.saveBillingDisabled = true;
								$scope.editBillingDisable = false;
							}
							if(!$scope.BillingInfo.$dirty)
							{
								$scope.billingFieldDisable = true;
								$scope.saveBillingDisabled = true;
								$scope.editBillingDisable = false;
							}
						};

						// on click of cancel site billing info
						$scope.cancelBillingInfo = function(){
							$scope.billingFieldDisable = true;
							$scope.saveBillingDisabled = true;
							$scope.editBillingDisable = false;
							$scope.site = JSON.parse($scope.oldSiteData);
							$scope.haserror = false;
							$scope.haserrorInContract = false;
							$scope.haserrorInBilling = false; 
							$scope.haserrorInPreventive = false;
							
						};
						
						/************************** Contact Section ***********************/
						$scope.iscollapsedContacts = false;
						$scope.saveDisabledContacts = true;
						$scope.editDisabledContacts = true;
						$scope.fieldDisabledContact = true;
						$scope.submitcontact = false;

						$scope.primaryContact = {
								contactType : 1,
								modified : false
							};
							$scope.escalationContact = {
								contactType : 2,
								modified : false
							};
							$scope.vendorContact = {
								contactType : 3,
								modified : false
							};
							$scope.fireBrigadeContact = {
								contactType : 4,
								modified : false
							};
							$scope.policeCRContact = {
									contactType : 5,
									modified : false
							};
							$scope.ambulanceContact = {
									contactType : 6,
									modified : false
							};
							$scope.hospitalContact = {
									contactType : 7,
									modified : false
							};
							
							
							$scope.referanceId = $scope.id;
							$scope.CONTACT_PRIMARY = 1;
							$scope.CONTACT_ESCALATION = 6;
							$scope.CONTACT_VENDOR = 5;
							$scope.CONTACT_POLICECR = 7;
							$scope.CONTACT_FIREBRIGADE = 8;
							$scope.CONTACT_AMBULANCE = 4;
							$scope.CONTACT_HOSPITAL = 3;
							$scope.CATEGORY = 4;
	
							
							$scope.setModified = function(contactType,$event) {
								//$scope.saveDisabledContacts = false;
								switch (contactType) {
								case 1:
									$scope.primaryContact.modified = true;
									break;
								case 2:
									$scope.escalationContact.modified = true;
									break;
								case 3:
									$scope.vendorContact.modified = true;
									break;
								case 4:
									$scope.fireBrigadeContact.modified = true;
									break;
								case 5: 
									$scope.policeCRContact.modified = true;
									break;
								case 6: 
									$scope.ambulanceContact.modified = true;
									break;
								case 7:
									$scope.hospitalContact.modified = true;
									break;
								}
//								}
							};

								$scope.enableFormfileldsContacts = function() {
									$scope.submitcontact = false;
									$scope.fieldDisabledContact = false;
									$scope.editDisabledContacts = true;
									$scope.saveDisabledContacts = false;
									focus('primaryContact');

								},
								$scope.collapsedContacts = function() {
									$scope.iscollapsedContacts = !$scope.iscollapsedContacts;
									if($scope.iscollapsedContacts){
										$scope.getSiteContact();
									}

								};
								$scope.saveContacts = function($event){
									$scope.submitcontact = true;
									$event.target.blur();
									/*********************PRIMARY CONTACT***********************/
									if($scope.primaryForm.$valid && $scope.EscalationForm.$valid && $scope.VendorForm.$valid && $scope.ImportantContactForm.$valid)
									{
									if($scope.primaryContact.modified == true && $scope.primaryForm.$valid && $scope.primaryContact.name)
									{
									if($scope.sitePrimaryContactInfoExists == true)
										{
										contactService.updateContact(
												$scope.primaryContact.id,
												$scope.primaryContact.name,
												$scope.primaryContact.email,
												$scope.primaryContact.cellPhone,
												$scope.primaryContact.officePhone,
												$scope.primaryContact.homePhone,
												$scope.primaryContact.otherPhone,
												$scope.primaryContact.comment,
												$scope.CONTACT_PRIMARY,
													function(response) {
													contactService
													.getContact(
															$scope.CONTACT_PRIMARY,
															$scope.id,
															$scope.CATEGORY,
															function(response) {
																if (response != null) {
																	$scope.sitePrimaryContactInfoExists = true;
																	$scope.primaryContact = response.data[0];
																	$scope.oldPrimaryContact =  angular.toJson($scope.primaryContact);
																	
																} 
																else
																{
																	$scope.sitePrimaryContactInfoExists = false;
																}
															});
													});
										
										}
									else
										{
										
										contactService.createContact(
												$scope.primaryContact.name,
												$scope.primaryContact.email,
												$scope.primaryContact.cellPhone,
												$scope.primaryContact.officePhone,
												$scope.primaryContact.homePhone,
												$scope.primaryContact.otherPhone,
												$scope.primaryContact.comment,
												$scope.CONTACT_PRIMARY,
												$scope.id,
												$scope.CATEGORY,
													function(response) {
													contactService
													.getContact(
															$scope.CONTACT_PRIMARY,
															$scope.id,
															$scope.CATEGORY,
															function(response) {
																if (response != null) {
																	$scope.sitePrimaryContactInfoExists = true;
																	$scope.primaryContact = response.data[0];
																	$scope.oldPrimaryContact =  angular.toJson($scope.primaryContact);
																	
																} 
																else
																{
																	$scope.sitePrimaryContactInfoExists = false;
																}
															});
													});
										}
									
									$scope.primaryContact.modified = false;
									
									}
									/*********************PRIMARY CONTACT END***********************/
									/********************* Escalation CONTACT***********************/
									if($scope.escalationContact.modified == true && $scope.EscalationForm.$valid && $scope.escalationContact.name)
									{
									if($scope.siteEscalationContactInfoExists == true)
										{
										contactService.updateContact(
												$scope.escalationContact.id,
												$scope.escalationContact.name,
												$scope.escalationContact.email,
												$scope.escalationContact.cellPhone,
												$scope.escalationContact.officePhone,
												$scope.escalationContact.homePhone,
												$scope.escalationContact.otherPhone,
												$scope.escalationContact.comment,
												$scope.CONTACT_ESCALATION,
													function(response) {
													contactService
													.getContact(
															$scope.CONTACT_ESCALATION,
															$scope.id,
															$scope.CATEGORY,
															function(response) {
																if (response != null) {
																	$scope.siteEscalationContactInfoExists = true;
																	$scope.escalationContact = response.data[0];
																	$scope.oldEscalationContact = angular.toJson($scope.escalationContact);
																} 
																else
																{
																	$scope.siteEscalationContactInfoExists = false;
																}
															});
													});
													
										}
									else
										{
										
										contactService.createContact(
												$scope.escalationContact.name,
												$scope.escalationContact.email,
												$scope.escalationContact.cellPhone,
												$scope.escalationContact.officePhone,
												$scope.escalationContact.homePhone,
												$scope.escalationContact.otherPhone,
												$scope.escalationContact.comment,
												$scope.CONTACT_ESCALATION,
												$scope.id,
												$scope.CATEGORY,
													function(response) {
													contactService
													.getContact(
															$scope.CONTACT_ESCALATION,
															$scope.id,
															$scope.CATEGORY,
															function(response) {
																if (response != null) {
																	$scope.siteEscalationContactInfoExists = true;
																	$scope.escalationContact = response.data[0];
																	$scope.oldEscalationContact = angular.toJson($scope.escalationContact);
																} 
																else
																{
																	$scope.siteEscalationContactInfoExists = false;
																}
															});
													});
										}
									
									$scope.escalationContact.modified = false;
									}
									/********************* Escalation CONTACT END***********************/
									/********************* Vendor CONTACT***********************/
									if($scope.vendorContact.modified == true && $scope.VendorForm.$valid && $scope.vendorContact.name)
									{
									if($scope.siteVendorContactInfoExists == true)
										{
										contactService.updateContact(
												$scope.vendorContact.id,
												$scope.vendorContact.name,
												$scope.vendorContact.email,
												$scope.vendorContact.cellPhone,
												$scope.vendorContact.officePhone,
												$scope.vendorContact.homePhone,
												$scope.vendorContact.otherPhone,
												$scope.vendorContact.comment,
												$scope.CONTACT_VENDOR,
													function(response) {
													contactService
													.getContact(
													        $scope.CONTACT_VENDOR,
													        $scope.id,
															$scope.CATEGORY,
															function(response) {
																if (response != null) {
																	$scope.siteVendorContactInfoExists = true;
																	$scope.vendorContact = response.data[0];
																	$scope.oldVendorContact = angular.toJson($scope.vendorContact);
																	
																} 
																else
																	{
																	$scope.siteVendorContactInfoExists = false;
																	}
															});
													});
										
										}
									else
										{
										
										contactService.createContact(
												$scope.vendorContact.name,
												$scope.vendorContact.email,
												$scope.vendorContact.cellPhone,
												$scope.vendorContact.officePhone,
												$scope.vendorContact.homePhone,
												$scope.vendorContact.otherPhone,
												$scope.vendorContact.comment,
												$scope.CONTACT_VENDOR,
												$scope.id,
												$scope.CATEGORY,
													function(response) {
													contactService
													.getContact(
													        $scope.CONTACT_VENDOR,
													        $scope.id,
															$scope.CATEGORY,
															function(response) {
																if (response != null) {
																	$scope.siteVendorContactInfoExists = true;
																	$scope.vendorContact = response.data[0];
																	$scope.oldVendorContact = angular.toJson($scope.vendorContact);
																	
																} 
																else
																	{
																	$scope.siteVendorContactInfoExists = false;
																	}
															});
													});
										}
									$scope.vendorContact.modified = false;
									}
									/******************Vendor Contact ends**************/
									/******************POLICE CR CONTACT START********/
									if($scope.policeCRContact.modified == true && $scope.ImportantContactForm.policeCr.$valid)
									{
										if($scope.policeCRContactInfoExists == true)
										{
											contactService.updateContact(
													$scope.policeCRContact.id,
													"Police",
													$scope.policeCRContact.email,
													$scope.policeCRContact.cellPhone,
													$scope.policeCRContact.officePhone,
													$scope.policeCRContact.homePhone,
													$scope.policeCRContact.otherPhone,
													$scope.policeCRContact.comment,
													$scope.CONTACT_POLICECR ,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_POLICECR ,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.policeCRContactInfoExists = true;
																		$scope.policeCRContact = response.data[0];
																		$scope.oldPoliceCRContact = angular.toJson($scope.policeCRContact);
																	} 
																	else
																		{
																			$scope.policeCRContactInfoExists = false;
																		}
																});
														});
											
										}
										else
										{
											contactService.createContact(
													"Police",
													$scope.policeCRContact.email,
													$scope.policeCRContact.cellPhone,
													$scope.policeCRContact.officePhone,
													$scope.policeCRContact.homePhone,
													$scope.policeCRContact.otherPhone,
													$scope.policeCRContact.comment,
													$scope.CONTACT_POLICECR ,
													$scope.id,
													$scope.CATEGORY,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_POLICECR ,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.policeCRContactInfoExists = true;
																		$scope.policeCRContact = response.data[0];
																		$scope.oldPoliceCRContact = angular.toJson($scope.policeCRContact);
																	} 
																	else
																		{
																			$scope.policeCRContactInfoExists = false;
																		}
																});
														});
											
										}
										
										$scope.policeCRContact.modified = false;
									}
									/******************POLICE CR CONTACT ENDS********/
									/******************FireBrigade CONTACT START********/
									if($scope.fireBrigadeContact.modified == true && $scope.ImportantContactForm.fireBrigade.$valid)
									{
										if($scope.fireBrigadeContactInfoExists == true)
										{
											contactService.updateContact(
													$scope.fireBrigadeContact.id,
													"Fire Brigade",
													$scope.fireBrigadeContact.email,
													$scope.fireBrigadeContact.cellPhone,
													$scope.fireBrigadeContact.officePhone,
													$scope.fireBrigadeContact.homePhone,
													$scope.fireBrigadeContact.otherPhone,
													$scope.fireBrigadeContact.comment,
													$scope.CONTACT_FIREBRIGADE ,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_FIREBRIGADE  ,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.fireBrigadeContactInfoExists = true;
																		$scope.fireBrigadeContact = response.data[0];
																		$scope.oldFireBrigadeContact = angular.toJson($scope.fireBrigadeContact);
																	} 
																	else
																		{
																		$scope.fireBrigadeContactInfoExists = false;
																		}
																});
														});
											
										}
										else
										{
											contactService.createContact(
													"Fire Brigade",
													$scope.fireBrigadeContact.email,
													$scope.fireBrigadeContact.cellPhone,
													$scope.fireBrigadeContact.officePhone,
													$scope.fireBrigadeContact.homePhone,
													$scope.fireBrigadeContact.otherPhone,
													$scope.fireBrigadeContact.comment,
													$scope.CONTACT_FIREBRIGADE ,
													$scope.id,
													$scope.CATEGORY,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_FIREBRIGADE  ,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.fireBrigadeContactInfoExists = true;
																		$scope.fireBrigadeContact = response.data[0];
																		$scope.oldFireBrigadeContact = angular.toJson($scope.fireBrigadeContact);
																	} 
																	else
																		{
																		$scope.fireBrigadeContactInfoExists = false;
																		}
																});
														});
											
										}
										$scope.fireBrigadeContact.modified = false;
									}
									/******************FireBrigade CONTACT ENDS********/
									/****************** Ambulance CONTACT START********/
									
									if($scope.ambulanceContact.modified == true && $scope.ImportantContactForm.ambulance.$valid)
									{
										if($scope.ambulanceContactInfoExists == true)
										{
											contactService.updateContact(
													$scope.ambulanceContact.id,
													"Ambulance",
													$scope.ambulanceContact.email,
													$scope.ambulanceContact.cellPhone,
													$scope.ambulanceContact.officePhone,
													$scope.ambulanceContact.homePhone,
													$scope.ambulanceContact.otherPhone,
													$scope.ambulanceContact.comment,
													$scope.CONTACT_AMBULANCE ,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_AMBULANCE,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.ambulanceContactInfoExists  = true;
																		$scope.ambulanceContact = response.data[0];
																		$scope.oldAmbulanceContact = angular.toJson($scope.ambulanceContact);
																	} 
																	else
																		{
																		$scope.ambulanceContactInfoExists = false;
																		}
																});
														});
										
										}
										else
										{
											contactService.createContact(
													"Ambulance",
													$scope.ambulanceContact.email,
													$scope.ambulanceContact.cellPhone,
													$scope.ambulanceContact.officePhone,
													$scope.ambulanceContact.homePhone,
													$scope.ambulanceContact.otherPhone,
													$scope.ambulanceContact.comment,
													$scope.CONTACT_AMBULANCE ,
													$scope.id,
													$scope.CATEGORY,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_AMBULANCE,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.ambulanceContactInfoExists  = true;
																		$scope.ambulanceContact = response.data[0];
																		$scope.oldAmbulanceContact = angular.toJson($scope.ambulanceContact);
																	} 
																	else
																		{
																		$scope.ambulanceContactInfoExists = false;
																		}
																});
														});
											
										}
									
										$scope.ambulanceContact.modified = false;
									}
									/******************Ambulance  CONTACT ENDS********/
									/******************Hospital CONTACT START********/
									
									if($scope.hospitalContact.modified == true && $scope.ImportantContactForm.hospital.$valid)
									{
										if($scope.hospitalContactInfoExists == true)
										{
											contactService.updateContact(
													$scope.hospitalContact.id,
													"Hospital",
													$scope.hospitalContact.email,
													$scope.hospitalContact.cellPhone,
													$scope.hospitalContact.officePhone,
													$scope.hospitalContact.homePhone,
													$scope.hospitalContact.otherPhone,
													$scope.hospitalContact.comment,
													$scope.CONTACT_HOSPITAL ,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_HOSPITAL,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.hospitalContactInfoExists  = true;
																		$scope.hospitalContact = response.data[0];
																		$scope.oldHospitalContact = angular.toJson($scope.hospitalContact);
																	} 
																	else
																		{
																		$scope.hospitalContactInfoExists = false;
																		}
																});
														});
											
										}
										else
										{
											contactService.createContact(
													"Hospital",
													$scope.hospitalContact.email,
													$scope.hospitalContact.cellPhone,
													$scope.hospitalContact.officePhone,
													$scope.hospitalContact.homePhone,
													$scope.hospitalContact.otherPhone,
													$scope.hospitalContact.comment,
													$scope.CONTACT_HOSPITAL,
													$scope.id,
													$scope.CATEGORY,
														function(response) {
														contactService
														.getContact(
																$scope.CONTACT_HOSPITAL,
														        $scope.id,
																$scope.CATEGORY,
																function(response) {
																	if (response != null) {
																		$scope.hospitalContactInfoExists  = true;
																		$scope.hospitalContact = response.data[0];
																		$scope.oldHospitalContact = angular.toJson($scope.hospitalContact);
																	} 
																	else
																		{
																		$scope.hospitalContactInfoExists = false;
																		}
																});
														});
											
										}
										
										$scope.hospitalContact.modified = false;
									}
									/******************Hospital  CONTACT ENDS********/
									
									if($scope.primaryForm.$valid && $scope.EscalationForm.$valid && $scope.VendorForm.$valid && $scope.ImportantContactForm.$valid)
									{
										$scope.fieldDisabledContact = true;
										$scope.saveDisabledContacts = true;
										$scope.editDisabledContacts = false;
									}
									//$scope.getSiteContact();
									}
									
								};
								
								$scope.getSiteContact = function() {
									contactService
											.getContact(
													$scope.CONTACT_PRIMARY,
													$scope.id,
													$scope.CATEGORY,
													function(response) {
														if (response != null) {
															$scope.sitePrimaryContactInfoExists = true;
															$scope.primaryContact = response.data[0];
															$scope.oldPrimaryContact =  angular.toJson($scope.primaryContact);
															
														} 
														else
														{
															$scope.sitePrimaryContactInfoExists = false;
														}
													});
									contactService
									.getContact(
											$scope.CONTACT_ESCALATION,
											$scope.id,
											$scope.CATEGORY,
											function(response) {
												if (response != null) {
													$scope.siteEscalationContactInfoExists = true;
													$scope.escalationContact = response.data[0];
													$scope.oldEscalationContact = angular.toJson($scope.escalationContact);
												} 
												else
												{
													$scope.siteEscalationContactInfoExists = false;
												}
											});
									contactService
									.getContact(
									        $scope.CONTACT_VENDOR,
									        $scope.id,
											$scope.CATEGORY,
											function(response) {
												if (response != null) {
													$scope.siteVendorContactInfoExists = true;
													$scope.vendorContact = response.data[0];
													$scope.oldVendorContact = angular.toJson($scope.vendorContact);
													
												} 
												else
													{
													$scope.siteVendorContactInfoExists = false;
													}
											});
									contactService
									.getContact(
											$scope.CONTACT_POLICECR ,
									        $scope.id,
											$scope.CATEGORY,
											function(response) {
												if (response != null) {
													$scope.policeCRContactInfoExists = true;
													$scope.policeCRContact = response.data[0];
													$scope.oldPoliceCRContact = angular.toJson($scope.policeCRContact);
												} 
												else
													{
														$scope.policeCRContactInfoExists = false;
													}
											});
									contactService
									.getContact(
											$scope.CONTACT_FIREBRIGADE  ,
									        $scope.id,
											$scope.CATEGORY,
											function(response) {
												if (response != null) {
													$scope.fireBrigadeContactInfoExists = true;
													$scope.fireBrigadeContact = response.data[0];
													$scope.oldFireBrigadeContact = angular.toJson($scope.fireBrigadeContact);
												} 
												else
													{
													$scope.fireBrigadeContactInfoExists = false;
													}
											});
									contactService
									.getContact(
											$scope.CONTACT_AMBULANCE,
									        $scope.id,
											$scope.CATEGORY,
											function(response) {
												if (response != null) {
													$scope.ambulanceContactInfoExists  = true;
													$scope.ambulanceContact = response.data[0];
													$scope.oldAmbulanceContact = angular.toJson($scope.ambulanceContact);
												} 
												else
													{
													$scope.ambulanceContactInfoExists = false;
													}
											});
									contactService
									.getContact(
											$scope.CONTACT_HOSPITAL,
									        $scope.id,
											$scope.CATEGORY,
											function(response) {
												if (response != null) {
													$scope.hospitalContactInfoExists  = true;
													$scope.hospitalContact = response.data[0];
													$scope.oldHospitalContact = angular.toJson($scope.hospitalContact);
												} 
												else
													{
													$scope.hospitalContactInfoExists = false;
													}
											});
									$scope.fieldDisabledContact = true;
									$scope.saveDisabledContacts = true;
//									$scope.editDisabledContacts = false;
									
								};
								
								$scope.cancelContactsInfo = function(){
									var contact = {name:"",email:"",cellPhone:""};
									$scope.fieldDisabledContact = true;
									$scope.saveDisabledContacts = true;
									$scope.editDisabledContacts = false;
									$scope.primaryContact = ($scope.sitePrimaryContactInfoExists == true) ? JSON.parse($scope.oldPrimaryContact):angular.copy(contact);
									$scope.escalationContact = ($scope.siteEscalationContactInfoExists == true)? JSON.parse($scope.oldEscalationContact):angular.copy(contact);
									$scope.vendorContact = ($scope.siteVendorContactInfoExists == true)? JSON.parse($scope.oldVendorContact):angular.copy(contact);
									$scope.policeCRContact = ($scope.policeCRContactInfoExists == true)? JSON.parse($scope.oldPoliceCRContact):angular.copy(contact);
									$scope.fireBrigadeContact = ($scope.fireBrigadeContactInfoExists == true)? JSON.parse($scope.oldFireBrigadeContact):angular.copy(contact);
									$scope.ambulanceContact = ($scope.ambulanceContactInfoExists == true)? JSON.parse($scope.oldAmbulanceContact):angular.copy(contact);
									$scope.hospitalContact = ($scope.hospitalContactInfoExists == true)? JSON.parse($scope.oldHospitalContact):angular.copy(contact);

								};		
						/******************************* BOQ Section **************************************/
						$scope.iscollapsedBoqInfo = false;
						$scope.fieldBoqDisabled = true;
						$scope.saveBoqDisabled = true;
						$scope.editBoqDisable = false;
						$scope.showBoq = true;

						$scope.enableBoqFormfilelds = function() {
							$scope.fieldBoqDisabled = false;
							$scope.saveBoqDisabled = false;
							$scope.editBoqDisable = true;
							focus('boqGateway');
						};
						
						$scope.collapsedBoqInfo = function() {
							$scope.iscollapsedBoqInfo = !$scope.iscollapsedBoqInfo;
							if($scope.iscollapsedBoqInfo){
								$scope.getSiteBoqDetails();
							}
						};
						
						$scope.getBoqDeviceTypes = function(siteBoq) {
							$scope.siteBoq.gateway = 0;
							$scope.siteBoq.repeater = 0;
							$scope.siteBoq.FE = 0;
							$scope.siteBoq.FH = 0;
							$scope.siteBoq.FAS = 0;
							if(siteBoq != undefined){
								for(var i=0;i<$scope.siteBoq.siteBoqResponse.length;i++)
								{
									switch($scope.siteBoq.siteBoqResponse[i].name)
									{
									case "Gateway":
													$scope.siteBoq.gateway = $scope.siteBoq.siteBoqResponse[i].quantity;
													break;
									case "Repeater":
													$scope.siteBoq.repeater = $scope.siteBoq.siteBoqResponse[i].quantity;
													break;
									case "FES":
													$scope.siteBoq.FE = $scope.siteBoq.siteBoqResponse[i].quantity;
													break;
									case "HSS":
													$scope.siteBoq.FH = $scope.siteBoq.siteBoqResponse[i].quantity;
													break;
									default:
													$scope.siteBoq.FAS = $scope.siteBoq.siteBoqResponse[i].quantity;
									}
								}
							}
							
							$scope.siteBoq.total = $scope.siteBoq.gateway + $scope.siteBoq.repeater + $scope.siteBoq.FE + $scope.siteBoq.FH +  $scope.siteBoq.FAS ;
						};
						
						$scope.ChangeTotal = function()
						{
							$scope.siteBoq.total = parseInt(($scope.siteBoq.gateway == "" || $scope.siteBoq.gateway == undefined)? 0 : $scope.siteBoq.gateway) + parseInt(($scope.siteBoq.repeater == "" || $scope.siteBoq.repeater == undefined)? 0 : $scope.siteBoq.repeater) +  
												   parseInt(($scope.siteBoq.FE == "" || $scope.siteBoq.FE == undefined)? 0 : $scope.siteBoq.FE)  + parseInt(($scope.siteBoq.FH == "" || $scope.siteBoq.FH == undefined)? 0 : $scope.siteBoq.FH)
												   +  parseInt(($scope.siteBoq.FAS == "" || $scope.siteBoq.FAS == undefined)? 0 : $scope.siteBoq.FAS) ;
						};
						
						// get site boq details
						$scope.getSiteBoqDetails = function() {
							
							siteService
									.getSiteBoq(
											$scope.id,
											function(response) {
												if (response != null) {
													$scope.siteBoqInfoExists = true;
													$scope.siteBoq = response;
													$scope.oldsiteBoq = angular.toJson(response);
													$scope.getBoqDeviceTypes(response);
												} else {
													$scope.siteBoqInfoExists = false;
												}
											});
						};
						
						//save boq
						$scope.saveBoqInfo = function($event) {
							$scope.BOQSubmitted = true;
							if($scope.BOQ.$valid)
							{ 
								$event.target.blur();
									siteService.createSiteBoq($scope.id,$scope.siteBoq.gateway,$scope.siteBoq.repeater,$scope.siteBoq.FE,$scope.siteBoq.FH,$scope.siteBoq.FAS,
											function(response) {
										if (response != null) {
											$scope.siteBoq = response;
										} 
										$scope.getSiteBoqDetails();	
									});
							
								$scope.fieldBoqDisabled = true;
								$scope.saveBoqDisabled = true;
								$scope.editBoqDisable = false;
							}
						};
						
						/* Cancel boq */
						$scope.cancelBoqInfo = function(){
							$scope.fieldBoqDisabled = true;
							$scope.saveBoqDisabled = true;
							$scope.editBoqDisable = false;
							if($scope.siteBoqInfoExists){
								$scope.siteBoq = JSON.parse($scope.oldsiteBoq);
								$scope.getBoqDeviceTypes($scope.siteBoq);
							}
							else{
								$scope.getBoqDeviceTypes();
							}
							$scope.BOQSubmitted = false;
							
						};
						
						/*********************************CSV AUDIT**********************************/
						$scope.AuditDownload = function(){
			    			siteService
							.getSiteAudit(
									$scope.id,
									function(response) {
										if (response != null) {
											$scope.siteAudit = response;
											$scope.updateCsvAudit();
										}
										else
										{
											$scope.showBoq = false;
										}
									});
			    		}
						
						$scope.csvHeaders1 =  ['Audit Date','Site Remark','Product Type','Status','Location Remark','Comment'];; // this array contains the headers for csv
						
						$scope.updateCsvAudit = function(){
							
							$scope.csvSiteAudit = []; // data for the csv
							try{
								
								for(i=0;i<$scope.siteAudit.siteAuditDeviceResponse.length;i++)
								{
									//temporary row
									var temp = {
											'Audit Date':  ($scope.siteAudit.auditDate)?  $filter('date')(new Date($scope.siteAudit.auditDate), "dd/MM/yyyy") : "",
											'Site Remark' : $scope.siteAudit.remarks,
											'Product Type': ($scope.siteAudit.siteAuditDeviceResponse[i].productTypeId == 1)? "FES":($scope.siteAudit.siteAuditDeviceResponse[i].productTypeId == 2)?"HSS":"FAS",
											'Status': ($scope.siteAudit.siteAuditDeviceResponse[i].status == 1)? "FUNCTIONAL":"NON_FUNCTIONAL",
											'Location Remark': $scope.siteAudit.siteAuditDeviceResponse[i].location,
											'Comment': $scope.siteAudit.siteAuditDeviceResponse[i].remarks,
										}
									
									$scope.csvSiteAudit.push(temp);//pushing the temporary row in array
							}
							if($scope.siteAudit.siteAuditDeviceResponse.length == 0)
							{
								var temp = {
										'Audit Date':  ($scope.siteAudit.auditDate)?  $filter('date')(new Date($scope.siteAudit.auditDate), "dd/MM/yyyy") : "",
										'Site Remark' : $scope.siteAudit.remarks
								}
								$scope.csvSiteAudit.push(temp);
							}
							console.log($scope.csvSiteAudit);
							}catch(exception){
								console.log(exception);
								console.error("In sites inventories update csv");
							}
						}
						$scope.AuditDownload ();
						/************************************* Site Inventory - Author Karan *****************************/
						$scope.iscollapsedSiteInventory = false;
						$scope.countPerPage = 10;
						$scope.collapsedSiteInventory = function(){
							$scope.iscollapsedSiteInventory = !$scope.iscollapsedSiteInventory;
						};
						$scope.siteInventories = [];
						$scope.keyword = "";
						$scope.pageCount = 10;
						$scope.totalSiteInventories = 0;
						$scope.pagination = {
								current : 1
						};
						
						$scope.getSiteInventories = function(callback, location,scope){
							siteService.getSiteInventoryList(
									$scope.id, //siteId
									$scope.keyword,
									($scope.pagination.current-1)*$scope.pageCount,
									$scope.pageCount,
									function(response){
										if(response != null){
											$scope.siteInventories = response.data;
											$scope.totalSiteInventories = response.total;
											$scope.setLocationNames();
										}else{
											$scope.siteInventories = [];
											$scope.totalSiteInventories = 0;
										}
										if(callback != undefined)
											callback(location,scope);
										$scope.updateCsvSiteInventories();
									});
						};
						
						$scope.refreshSiteInventories = function(response,location,scope){
							$scope.getSiteInventories($scope.getLocations,location,scope);
						}
						
						$scope.getInventories = function(pageNumber) {
							$scope.pagination.current = pageNumber;
							$scope.getSiteInventories();
						};
						
						$scope.siteDeleteCallback = function(){
							siteService.getSiteInventoryList(
									$scope.id, //siteId
									$scope.keyword,
									($scope.pagination.current-1)*$scope.pageCount,
									$scope.pageCount,
									function(response){
										if(response != null){
											$scope.siteInventories = response.data;
											$scope.totalSiteInventories = response.total;
											$scope.pagination.current = 1;
										}else{
											$scope.siteInventories = [];
											$scope.totalSiteInventories = 0;
											$scope.pagination.current = 1;
										}
										$scope.getLocations();
										//$scope.updateCsvSiteInventories();
									});
						};
						
						
						/*******************************************************************************

						/****************************** Locations - Author Karan ******************************/
						//device states
						$scope.states = [{no : 0,name : "ALL"},{no : 1,name : "FREE"},{no : 2,name : "INSTALLED"},{no : 3,name : "FAULT"}];
						$scope.deviceState=[{ no: 0, name : "Not Positioned"},{ no:1, name: "Assigned/Disabled"}, {no:2, name:"Commissioned"}, { no:3, name:"Active and Normal"},{ no:4 , name:"Active and Alarm "},{ no: 5, name : "Active and Fault"}];


						$scope.deviceTypes = [];
						//get device types
						deviceService.getDeviceTypes(function(response){
							if(response!=null){
								$scope.deviceTypes = response.data;
							}
						});
						//get device status
						$scope.getDeviceStatus = function(deviceStatus){
							for(var i=0;i<$scope.deviceState.length;i++)
								{
									if($scope.deviceState[i].no == deviceStatus)
										return $scope.deviceState[i].name;
								}
						}
						// get device type by id 
						$scope.getDeviceTypeById = function(deviceTypeId){
							for(var i in $scope.deviceTypes){
								if($scope.deviceTypes[i].deviceTypeId == deviceTypeId){
									return $scope.deviceTypes[i].name;
								}
							}
						};
						
						//get device state names
						$scope.getStateName = function(no){
							for(i in $scope.states){
								if(no == $scope.states[i].no){
									return $scope.states[i].name;
								}
							}
						};
						
						
						
						/* Locations - Author Karan */
				
						$scope.iscollapsedLocations = false;
						$scope.addNewLocationDisabled = false;
						$scope.addNewIemDisabled = false;
						$scope.EditLocationDisabled = false;
						$scope.editDeviceDisabled = false;
						$scope.siteInventorybtndisabled = false;
						$scope.locationInventorybtndisabled = false;
						// toggle collapse of locations
						$scope.collapsedLocations = function() {
							$scope.iscollapsedLocations = !$scope.iscollapsedLocations;

						};

						$scope.locations = [];
						$scope.toggleLocation = function(location,scope) {
							console.log(scope);
							location.isCollapsed ? location.isCollapsed = false
									: location.isCollapsed = true;
							if(!location.isCollapsed){
								$scope.getDevices(location.id,'',0,0,this);								
								$scope.getPaginationDevices(location.id,'',scope.pagination2.current,10,this);
							}
						};
						
						
						
						$scope.setLocationNames = function(inventory){
							if(inventory == undefined)
							{
								for(var i in $scope.locations){
									for(var j in $scope.siteInventories){
										if($scope.locations[i].id == $scope.siteInventories[j].siteLocationId){
											$scope.siteInventories[j].locationName = $scope.locations[i].locationName;
											
										}
									}
									console.log($scope.siteInventories);
								}
							}
							else
							{
								for(var i in $scope.locations){
									for(var j in inventory){
										if($scope.locations[i].id == inventory[j].siteLocationId){
											inventory[j].locationName = $scope.locations[i].locationName;
											
										}
									}
									console.log($scope.siteInventories);
								}
							}
							
						}
						
						
						/*
						 * Get all locations of site
						 */
						$scope.getLocations = function(updatedLocation,scope) {
							locationService.getSiteLocations($scope.site.id,
									function(response) {

										$scope.locations = [];
										if(response != null){

											$scope.locations = response.data;
										}
										console.log($scope.locations);
										$scope.setLocationNames();
										console.log(updatedLocation);
										for(var i in $scope.locations){
											$scope.locations[i].isCollapsed = true;
											if(updatedLocation != undefined){
												if(updatedLocation.id == $scope.locations[i].id){
													$scope.locations[i].isCollapsed = false;
													updatedLocation.locationName = $scope.locations[i].locationName;
													updatedLocation.mapImage = $scope.locations[i].mapImage;
													$scope.locations[i] = updatedLocation;
													$scope.getDevices(updatedLocation.id ,'',0,0,updatedLocation.scope);								
													$scope.getPaginationDevices(updatedLocation.id,'',scope.pagination2.current,10,updatedLocation.scope);
												}
											}
										}
										

										console.log(scope);
										if(updatedLocation != undefined){
											for(var i in $scope.locations){
												for(var j in $scope.siteInventories){
													if($scope.locations[i].id == $scope.siteInventories[j].siteLocationId){
														$scope.siteInventories[j].locationName = $scope.locations[i].locationName;
														
													}
												}
												console.log($scope.siteInventories);
												if($scope.locations[i].id == updatedLocation.id){
													$scope.getPaginationDevices($scope.locations[i].id,'',scope.pagination2.current,10,scope);
												}
											}
											console.log(scope);
											$scope.updatedLocation = undefined;

										}
							
									});
						};
						
						/*
						 * get locations on add new location
						 */
						
						$scope.addNewLocationCallback = function(response,location) {
							if(location!=undefined){
								$scope.updatedLocation = location;
							}
							$scope.getLocations();
						};

						
						$scope.onDrag = function() {
//							alert("sad");
						};

						$scope.devices = [];
						
						/*
						 * set location scope
						 */
						$scope.setLocationScope = function(location,locationScope) {
							locationScope.devicesList = [];
							locationScope.totalDevices = 0;
							locationScope.saveCancelDevicesEnabled = false;
							locationScope.offset = 0;
							locationScope.yoffset = 0;
							locationScope.editted = [];

							locationScope.pagination2 = {
									current : 1
								};
							location.scope = locationScope;
							
						};
						
						/* Get gatewayName */
						$scope.getGatewayName = function(device,scope){
							if(device.deviceTypeId == 1)
								return "-";
							for(i in scope.$parent.devicesList){
								//console.log(devices[i].id+"+" + device.parentGetwayId);
								if(scope.$parent.devicesList[i].id == device.parentGetwayId){
									return scope.$parent.devicesList[i].name;
								}
							}
						}
						
						/*
						 * Get all devices of location by location id
						 */
						$scope.getDevices = function(locationId, keyword,
								start, count, repeatScope) {
							locationService
									.getLocationDevices(
											locationId,
											keyword,
											start,
											count,
											function(response) {
												
												if (response != null) {
													if (response.data != undefined) {

														repeatScope.devicesList = response.data;
														repeatScope.updatedDevices = [];
														repeatScope.totalDevices = response.data.length;
														repeatScope.offset = 0;
														repeatScope.yoffset = 0;
														$scope.getSiteInventories();
														for(i in repeatScope.editted){
															for(j in repeatScope.devicesList){
																if(repeatScope.editted[i] == repeatScope.devicesList[j].id){
																	repeatScope.devicesList[j].editted = true
																}
															}
														}
														
														console.log(repeatScope);
													}else{
														repeatScope.editted = [];
														repeatScope.devicesList = [];
														repeatScope.updatedDevices = [];
														repeatScope.totalDevices = 0;
														$scope.getSiteInventories();
													}
												}else{
													repeatScope.editted = [];
													repeatScope.devicesList = [];
													repeatScope.updatedDevices = [];
													repeatScope.totalDevices = 0;
													$scope.getSiteInventories();
												}
									});
						};
						
						$scope.getPaginationDevices = function(locationId, keyword,
								start, count, repeatScope){
							locationService
							.getLocationDevices(
									locationId,
									keyword,
									start,
									count,
									function(response) {

										if (response != null) {

											if (response.data != undefined) {

												repeatScope.paginationDevicesList = response.data;
												repeatScope.paginationTotalDevices = response.total;
												for(i in repeatScope.editted){
													for(j in repeatScope.paginationDevicesList){
														if(repeatScope.editted[i] == repeatScope.paginationDevicesList[j].id){
															repeatScope.paginationDevicesList[j].editted = true
														}
													}
												}
												
											}else{
												repeatScope.paginationDevicesList = response.data;
												repeatScope.paginationTotalDevices = response.total;
												for(i in repeatScope.editted){
													for(j in repeatScope.paginationDevicesList){
														if(repeatScope.editted[i] == repeatScope.paginationDevicesList[j].id){
															repeatScope.paginationDevicesList[j].editted = true
														}
													}
												}
											}
										}
										else
										{
											
											repeatScope.paginationDevicesList = [];
											repeatScope.paginationTotalDevices = 0;
											repeatScope.editted = [];

										}
										$scope.getSiteInventories();
									//	$scope.getDevices(locationId, "",
									//			0, 0, repeatScope);
									});							
						}
						
						
						$scope.editLocationCallback = function(location,scope){
							
							if(location.mapImage != null){
								scope.devicesPositionEditable = true;
							}
							console.log(scope);
							//locationScope.devicesPositionEditable = false;
							$scope.getLocations(location,scope);
						};
						
						$scope.editLocationDeviceCallback = function(scope,deviceId){
							console.log(deviceId);
							if(deviceId != undefined){
								scope.$parent.$parent.editted.push(deviceId);
							}
							$scope.getDevices(scope.$parent.$parent.location.id,"",0,0,scope.$parent.$parent);
							$scope.getPaginationDevices(scope.$parent.$parent.location.id,"",scope.$parent.$parent.pagination2.current,10,scope.$parent.$parent);
						
						};
						
						/*
						 * Callback on add new device to fetch all devices
						 */
						$scope.addDeviceCallback = function(locationId,
								keyword, start, count, repeatScope, response) {
							
							console.log(repeatScope);
							if(repeatScope.location.mapImage == null){
								locationService.updateSiteDeviceMapPosition([{siteLocationDeviceId : response.siteLocationDeviceId,xPos : 0,yPos : 0,deviceStatus : 1}], function(
												response) {
											$scope.getDevices(locationId, keyword, start,
													100, repeatScope);
											$scope.getPaginationDevices(locationId, keyword, repeatScope.pagination2.current,
													10, repeatScope);
											angular.element(document
													.querySelector('#' + 'l'
															+ locationId)).removeClass('in');
										},false);
							}else{
								$scope.getDevices(locationId, keyword, start,
										100, repeatScope);
								$scope.getPaginationDevices(locationId, keyword, repeatScope.pagination2.current,
										10, repeatScope);
								angular.element(document
										.querySelector('#' + 'l'
												+ locationId)).removeClass('in');
							}
							
							
						};
						
						
						$scope.editSiteInventoryCallback = function(response,location,scope,deviceId){
								/*$scope.getPaginationDevices(location.id, "", scope.$parent.pagination2.current,
									10, scope.$parent);*/

							$scope.editLocationDeviceCallback(scope,deviceId);
							if(deviceId != undefined){
								locationService.getMqttUrl(function(response){
									var url = response.response.value;
									if(response.response == null){
										console.error("Some error occured : ");
										console.error(response);
									}
									locationService.reloadConfig(scope.$parent.device,url,function(response){
										console.log(response);
									});
								});
							};
							
							
						};
						
						/*
						 * On device move track position of devices
						 */
						$scope.onDevicesMoved = function(scope) {
							var device = scope.device;
							console.log("moved");
							var flag = 0;
							
							if(scope.$parent.updatedDevices.length == 0)
							{
								console.log(device.deviceStatus);
								scope.$parent.updatedDevices.push({
									siteLocationDeviceId : device.id,
									xPos : device.xAxis,
									yPos : device.yAxis,
									deviceStatus : device.deviceStatus == 0? 1 : device.deviceStatus
								});
							}
							else
							{
								for ( var i in scope.$parent.updatedDevices) {
									if (scope.$parent.updatedDevices[i].siteLocationDeviceId == device.id){
										flag = 1;
										scope.$parent.updatedDevices[i].xPos = device.xAxis;
										scope.$parent.updatedDevices[i].yPos = device.yAxis;
										break;
									}
								}
								if(flag == 0)
								{
									scope.$parent.updatedDevices.push({
										siteLocationDeviceId : device.id,
										xPos : device.xAxis,
										yPos : device.yAxis,
										deviceStatus : device.deviceStatus == 0? 1 : device.deviceStatus
									});
								}
							}
							angular.element(document.querySelector('#' + 'l' + scope.$parent.location.id)).addClass('in');
							
							console.log(scope);
						};
						
						/* 
						 * Update device position on click of save button
						 */
						$scope.updateDevices = function(locationScope,location) {
							locationService.updateSiteDeviceMapPosition(
									locationScope.updatedDevices, function(
											response) {
										$scope.getDevices(location.id, "",
												0, 0, locationScope);
										$scope.getPaginationDevices(location.id, "", locationScope.pagination2.current,
												10, locationScope);
										locationScope.updatedDevices = [];
									});
							angular.element(document
									.querySelector('#' + 'l'
											+ location.id)).removeClass('in');
							angular.element(document
									.querySelector('#' + 'edit'
											+ location.id)).addClass('in');
							locationScope.devicesPositionEditable = false;
							console.log(locationScope);
						};
						
						/*
						 * Cancel device position on click of cancel to get previous data
						 */
						$scope.cancelDevicePositioning = function(location,repeatScope){
							angular.element(document
									.querySelector('#' + 'l'
											+ location.id)).removeClass('in');
							angular.element(document
									.querySelector('#' + 'edit'
											+ location.id)).addClass('in');
							console.log(repeatScope);
							repeatScope.devicesPositionEditable = false;
							$scope.getDevices(location.id, null,
									0, 100, repeatScope);
						};

						$scope.setXY = function(device, $event) {
							console.log($event);
						};
						
						// on click of edit device positiion
						$scope.makeDevicesPositionEditable = function(scope,location){
							angular.element(document
									.querySelector('#' + 'edit'
											+ location.id)).removeClass('in');
							angular.element(document
									.querySelector('#' + 'l'
											+ location.id)).addClass('in');
							scope.devicesPositionEditable = true;
						};

						/* Locations End - Author Karan */
						
						
						
						//Export to csv - Author : Karan Rawal
						
						$scope.csvHeaders =  ['Device Name','Description','Device Type','State','Unique SN','Location','Device Position Remarks','Battery Date','Brand'];; // this array contains the headers for csv
						$scope.csvSiteInventories = []; // data for the csv
						
						$scope.updateCsvSiteInventories = function(){
							
							$scope.csvSiteInventories  = [];
							try{
								siteService.getSiteInventoryList(
										$scope.id, //siteId
										'',
										0,
										0,
										function(response){
											if(response != null){
												$scope.siteAllInventories = response.data;
												$scope.setLocationNames($scope.siteAllInventories);
											}else{
												$scope.siteInventories = [];
												$scope.csvSiteInventories  = [];
											}
											
										});
								for(i in $scope.siteAllInventories){
									
									//temporary row
									var temp = {
										'Device Name' : $scope.siteAllInventories[i].name,
										'Description': $scope.siteAllInventories[i].description,
										'Device Type' : $scope.getDeviceTypeById($scope.siteAllInventories[i].deviceTypeId),
										'State' : $scope.siteAllInventories[i].siteLocationDeviceStatusName,
										'Unique SN' : $scope.siteAllInventories[i].serialNumber,
										'Location' : $scope.siteAllInventories[i].locationName,
										'Device Position Remarks' :  $scope.siteAllInventories[i].locationRemarks,
										'Battery Date' : ($scope.siteAllInventories[i].batteryDate)? $filter('date')(new Date($scope.siteAllInventories[i].batteryDate), "dd/MM/yyyy") :"",
										'Brand' :  $scope.siteAllInventories[i].brand
									}
									
									$scope.csvSiteInventories.push(temp);//pushing the temporary row in array
								}
							}catch(exception){
								console.log(exception);
								console.error("In sites inventories update csv");
							}
						}
						$scope.updateCsvSiteInventories();
				
						
						
						/* 
						 * Role based access
						 */
						if($scope.isCustomerAdmin || $scope.isCL2 || $scope.isCL3){
							$scope.editSiteInfoDisabled = true; //can not edit site info
							$scope.editBillingDisable = true;  // can not edit billing
						}
						if($scope.isFTCR){
							$scope.editSiteInfoDisabled = true; //can not edit site info
						}
//						if($scope.isFTInstaller || $scope.isFTCR || $scope.isFTOperator || $scope.isCustomerAdmin || $scope.isCL2 || $scope.isCL3 ||$scope.isFranchiseAdmin || $scope.isFL2 ){
						if(!$scope.isFTAdmin && !$scope.isFTSupervisor){
							if($scope.isFTInstaller){
								$scope.editBoqDisable = false; // can  edit boq
							}
							else{
								$scope.editBoqDisable = true;  //can not edit boq
							}
							$scope.addNewLocationDisabled = true; // can not add new location
							$scope.addNewIemDisabled = true;  // can not add new item under location
							$scope.EditLocationDisabled = true; // can not edit location
							$scope.editDeviceDisabled = true;  // can not edit device
							$scope.siteInventorybtndisabled = true; //can not edit and delete site inventory
							$scope.locationInventorybtndisabled = true; //can not edit and delete  location inventory
						}
						
						if($scope.isCustomerAdmin || $scope.isCL2 || $scope.isCL3 || $scope.isFTAdmin || $scope.isFTSupervisor ){
							$scope.editDisabledContacts = false; // can edit contacts
						}
						
						
					} ];
		});
