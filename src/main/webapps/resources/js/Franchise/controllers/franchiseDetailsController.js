define(
		[ 'angular' ],
		function(angular) {
			return [
					'$scope',
					'$stateParams',
					'$state',
					'franchiseService',
					'contactService',
					'AccessControlService',
					'NotificationService',
					'$cookieStore','focus','$location', 'spinnerService',
					function($scope, $stateParams, $state, franchiseService,
							contactService, AccessControlService,
							NotificationService,$cookieStore,focus,$location,spinnerService) {
						
						$scope.iscollapsedInfo = true;
						$scope.iscollapsedContacts=false;
						$scope.iscollapsedSites=false;
//						$scope.cityState = "";
						$scope.id = $state.params.id;
						
						$scope.fieldDisabled = true;
						$scope.saveDisabled =true;
						$scope.editDisabled =true;
						
						$scope.fieldDisabledContact = true;
						$scope.saveDisabledContact =true;
						$scope.editDisabledContact =false;
						
						$scope.franchise = undefined; // initialize;
						$scope.franchiseeInfoExists = false;
						
						$scope.primaryContact = {
								contactType : 1,
								modified : false
							};
						
						$scope.collapsedInfo= function(){
						$scope.iscollapsedInfo = !$scope.iscollapsedInfo;
							
						}
						$scope.collapsedContacts= function(){
							$scope.iscollapsedContacts= !$scope.iscollapsedContacts;
							if($scope.iscollapsedContacts){
								$scope.loadContacts();
							}
						}
						$scope.collapsedSites= function(){
							$scope.iscollapsedSites= !$scope.iscollapsedSites;
							
						}
						$scope.statuses = [ {
							id : 1,
							name : 'ACTIVE'
						}, {
							id : 2,
							name : 'INACTIVE'
						}, {
							id : 3,
							name : 'DELETE'
						} ] ;
						
						var loginData = $cookieStore.get('loginData');
						
						$scope.isFTAdmin = AccessControlService.isFTAdmin(loginData.roleId);
						$scope.getStatus = function(status) {
							for (var i = 0; i < $scope.statuses.length; i++) {
								if (status == $scope.statuses[i].id) {
									return $scope.statuses[i];
								}
							}
						};
						
						if (AccessControlService.isCustomerAdmin()
								|| AccessControlService.isCL2()
								|| AccessControlService.isCL3())
							$scope.CATEGORY = 2;
						else if (AccessControlService.isFTAdmin()
								|| AccessControlService.isFTSupervisor()
								|| AccessControlService.isFTOperator()
								|| AccessControlService.isFTInstaller()
								|| AccessControlService.isFTCR()) {
							$scope.CATEGORY = 1;								
						}
						else
							{
								$scope.CATEGORY = 3;
							}
						
						// hide edit franchisee details button for franchisee users
						if($scope.isFTAdmin || AccessControlService.isFTSupervisor(loginData.roleId) ){
							$scope.editDisabled = false;
						}
						$scope.enableFormfilelds = function() {
							$scope.fieldDisabled = false;
							$scope.editDisabled = true;
							$scope.saveDisabled = false;
							focus("franchiseeAddress");
						};
						
						$scope.enableFormfileldsContact = function() {
							$scope.contactsubmitted = false;
							$scope.fieldDisabledContact = false;
							$scope.editDisabledContact = true;
							$scope.saveDisabledContact = false;
							focus('contactName');
						};
						
						$scope.loadFranchise = function() {
							$scope.referanceId = loginData.referenceId;
							if(loginData.userTypeId == 1){
								$scope.franchiseId = $scope.id ;
							}
							else{
								$scope.franchiseId = loginData.referenceId;
							}
							franchiseService.getFranchisee($scope.franchiseId, function(
									response) {
								$scope.fieldDisabled = true;
								if (response != null) {
									$scope.franchiseeInfoExists = true;
									$scope.franchise = response;
									$scope.oldFranchiseData = angular.toJson($scope.franchise);
									$scope.currentStatus = $scope.getStatus($scope.franchise.status);
									/*if($scope.franchise.state == "")
									{
										$scope.cityState = $scope.franchise.city;
									}
									else
									{
									$scope.cityState = $scope.franchise.city
											+ ", " + $scope.franchise.state;
									}*/
									$scope.name = $scope.franchise.name;
								} else {
									$scope.franchiseInfoExists = false;
								}
							});
						};
						$scope.saveInfo = function($event) {
							$event.target.blur();
							$scope.submitted = true;
							if($scope.FranchiseeInfo.$valid){
								//$scope.franchise.city = $scope.cityState.split(',')[0];
								//$scope.franchise.state = $scope.cityState.split(',')[1];
								if($scope.franchise.state == null)
								{
									$scope.franchise.state = "";
								}
								spinnerService.showSpinner();
								if ($scope.franchiseeInfoExists == true) {
									franchiseService.updateFranchisee(
											$scope.franchiseId,
											$scope.franchise.name,
											$scope.franchise.address1,
											$scope.franchise.address2,
											$scope.franchise.city,
											$scope.franchise.state,
											$scope.franchise.pincode,
											$scope.franchise.country,
											$scope.currentStatus.id,
//											$scope.loadFranchise
											function(response) {
												var path = $location.path().split('/franchise/')[0] + '/franchise/' +$scope.franchise.id + '/' + $scope.franchise.name;
												$location.path(path);
											}
									);
								} else {
									franchiseService.addFranchise(
											$scope.franchise.name,
											$scope.franchise.address1,
											$scope.franchise.address2,
											$scope.franchise.city,
											$scope.franchise.state,
											$scope.franchise.pincode,
											$scope.franchise.country,
											function(response){
												console.log(response);
												var path = $location.path().split('/franchise/')[0] + '/franchise/' +$scope.franchise.id + '/' + $scope.franchise.name;
												$location.path(path);
											}
									);
								}
								$scope.fieldDisabled = true;
								$scope.saveDisabled = true;
								$scope.editDisabled = false;
							}
						};
						
						// on click of cancel button of franchisee info
						$scope.cancelInfo = function(){
							$scope.saveDisabled = true;
							$scope.editDisabled = false;
							$scope.fieldDisabled = true;
							$scope.franchise = JSON.parse($scope.oldFranchiseData);
//							$scope.cityState = $scope.franchise.city + ", " + $scope.franchise.state;
							$scope.currentStatus = $scope.getStatus($scope.franchise.status);
						};
						
						$scope.setModified = function(){
							$scope.modified = true;
						};
						
						$scope.loadContacts = function() {
							contactService
									.getContact(
											1,
											$scope.franchiseId,
											$scope.CATEGORY,
											function(response) {
												if (response != null)
												{
													$scope.primaryContact = response.data[0];
													$scope.oldContactData = angular.toJson($scope.primaryContact);
													$scope.isContactInfoExist = true;
												}
												/*else{
													$scope.oldContactData =null;
												}*/
											},function(){ $scope.isContactInfoExist = false;});
						};
						
						$scope.saveContact = function($event) {
							$event.target.blur();
							$scope.contactsubmitted = true;
							if($scope.FranchiseeContact.$valid){
								if($scope.modified == true)
								{
									if($scope.isContactInfoExist == true)
									{
										contactService
										.updateContact(
												$scope.primaryContact.id,
												$scope.primaryContact.name,
												$scope.primaryContact.email,
												$scope.primaryContact.cellPhone,
												$scope.primaryContact.officePhone,
												$scope.primaryContact.homePhone,
												$scope.primaryContact.otherPhone,
												$scope.primaryContact.comment,
												$scope.primaryContact.contactType,
												function(response,
														contactType) {
													console
													.log(response);
													$scope.fieldDisabledContact = true;
													
													contactService
													.getContact(
															1,
															$scope.franchiseId,
															$scope.CATEGORY,
															function(response) {
																if (response != null)
																{
																	$scope.primaryContact = response.data[0];
																	$scope.oldContactData = angular.toJson($scope.primaryContact);
																	$scope.isContactInfoExist = true;
																}
																/*else{
																	$scope.oldContactData =null;
																}*/
															},function(){ $scope.isContactInfoExist = false;});

												}
										);
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
												$scope.primaryContact.contactType,
												$scope.franchiseId,
												$scope.CATEGORY,
												function(response,
														contactType) {
													console
													.log(response);
													$scope.fieldDisabledContact = true;
													
													contactService
													.getContact(
															1,
															$scope.franchiseId,
															$scope.CATEGORY,
															function(response) {
																if (response != null)
																{
																	$scope.primaryContact = response.data[0];
																	$scope.oldContactData = angular.toJson($scope.primaryContact);
																	$scope.isContactInfoExist = true;
																}
																/*else{
																	$scope.oldContactData =null;
																}*/
															},function(){ $scope.isContactInfoExist = false;});


												}
										);
									}
								}
								$scope.fieldDisabledContact = true;
								$scope.saveDisabledContact =true;
								$scope.editDisabledContact =false;
							}
						};
						
						// on click of cancel contacts button 
						$scope.cancelContactInfo = function(){
							$scope.fieldDisabledContact = true;
							$scope.saveDisabledContact =true;
							$scope.editDisabledContact = false;
							if($scope.oldContactData){
								$scope.primaryContact = JSON.parse($scope.oldContactData);
							}
							else{
								$scope.primaryContact.name='';
								$scope.primaryContact.cellPhone = '';
								$scope.primaryContact.email='';
							}
						};
						
						$scope.loadFranchise(); // load initially
//						$scope.loadContacts();
						$scope.iscollapsedSites = false;
						//toggle  site collapse
						$scope.collapsedSites= function(){
							$scope.iscollapsedSites= !$scope.iscollapsedSites;
						};

					} ];
		});
