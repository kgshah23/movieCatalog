define(
		[],
		function() {
			angular
			.module('modalModule', [ 'ngAnimate' ])
			.controller(
					'ModalInstanceController',
					[
					 '$scope',
					 '$uibModalInstance',
					 '$log',
					 '$cookieStore',
					 '$state',
					 'resetPasswordService',
					 'userService',
					 'data',
					 'NotificationService',
					 'updateProfile',
					 'ErrorHandlerService',
					 'AccessControlService',
					 'customerService',
					 'franchiseService',
					 'spinnerService',
					 '$rootScope',
					 'siteService',
					 'FileService',
					 'locationService','inventoryService','deviceService','TicketService','contractService','getUsersByRoleService','contactService','$stateParams',
					 function($scope, $uibModalInstance, $log,
							 $cookieStore, $state,
							 resetPasswordService, userService,
							 data, NotificationService,
							 updateProfile, ErrorHandlerService,
							 AccessControlService,
							 customerService, franchiseService,
							 spinnerService, $rootScope,
							 siteService, FileService,
							 locationService,inventoryService,deviceService,TicketService,contractService,getUsersByRoleService,contactService,$stateParams) {
						 // data sent from commoncontroller

						 $scope.format = 'dd/MM/yyyy';
						 $scope.data = data;
						 $scope.countries = [ "Afghanistan",
						                      "Albania", "Algeria",
						                      "Andorra", "Angola",
						                      "Anguilla", "Antigua  Barbuda",
						                      "Argentina", "Armenia",
						                      "Aruba", "Australia",
						                      "Austria", "Azerbaijan",
						                      "Bahamas", "Bahrain",
						                      "Bangladesh", "Barbados",
						                      "Belarus", "Belgium", "Belize",
						                      "Benin", "Bermuda", "Bhutan",
						                      "Bolivia",
						                      "Bosnia  Herzegovina",
						                      "Botswana", "Brazil",
						                      "British Virgin Islands",
						                      "Brunei", "Bulgaria",
						                      "Burkina Faso", "Burundi",
						                      "Cambodia", "Cameroon",
						                      "Cape Verde", "Cayman Islands",
						                      "Chad", "Chile", "China",
						                      "Colombia", "Congo",
						                      "Cook Islands", "Costa Rica",
						                      "Cote D Ivoire", "Croatia",
						                      "Cruise Ship", "Cuba",
						                      "Cyprus", "Czech Republic",
						                      "Denmark", "Djibouti",
						                      "Dominica",
						                      "Dominican Republic",
						                      "Ecuador", "Egypt",
						                      "El Salvador",
						                      "Equatorial Guinea", "Estonia",
						                      "Ethiopia", "Falkland Islands",
						                      "Faroe Islands", "Fiji",
						                      "Finland", "France",
						                      "French Polynesia",
						                      "French West Indies", "Gabon",
						                      "Gambia", "Georgia", "Germany",
						                      "Ghana", "Gibraltar", "Greece",
						                      "Greenland", "Grenada", "Guam",
						                      "Guatemala", "Guernsey",
						                      "Guinea", "Guinea Bissau",
						                      "Guyana", "Haiti", "Honduras",
						                      "Hong Kong", "Hungary",
						                      "Iceland", "India",
						                      "Indonesia", "Iran", "Iraq",
						                      "Ireland", "Isle of Man",
						                      "Israel", "Italy", "Jamaica",
						                      "Japan", "Jersey", "Jordan",
						                      "Kazakhstan", "Kenya",
						                      "Kuwait", "Kyrgyz Republic",
						                      "Laos", "Latvia", "Lebanon",
						                      "Lesotho", "Liberia", "Libya",
						                      "Liechtenstein", "Lithuania",
						                      "Luxembourg", "Macau",
						                      "Macedonia", "Madagascar",
						                      "Malawi", "Malaysia",
						                      "Maldives", "Mali", "Malta",
						                      "Mauritania", "Mauritius",
						                      "Mexico", "Moldova", "Monaco",
						                      "Mongolia", "Montenegro",
						                      "Montserrat", "Morocco",
						                      "Mozambique", "Namibia",
						                      "Nepal", "Netherlands",
						                      "Netherlands Antilles",
						                      "New Caledonia", "New Zealand",
						                      "Nicaragua", "Niger",
						                      "Nigeria", "Norway", "Oman",
						                      "Pakistan", "Palestine",
						                      "Panama", "Papua New Guinea",
						                      "Paraguay", "Peru",
						                      "Philippines", "Poland",
						                      "Portugal", "Puerto Rico",
						                      "Qatar", "Reunion", "Romania",
						                      "Russia", "Rwanda",
						                      "Saint Pierre  Miquelon",
						                      "Samoa", "San Marino",
						                      "Satellite", "Saudi Arabia",
						                      "Senegal", "Serbia",
						                      "Seychelles", "Sierra Leone",
						                      "Singapore", "Slovakia",
						                      "Slovenia", "South Africa",
						                      "South Korea", "Spain",
						                      "Sri Lanka", "St Kitts  Nevis",
						                      "St Lucia", "St Vincent",
						                      "St. Lucia", "Sudan",
						                      "Suriname", "Swaziland",
						                      "Sweden", "Switzerland",
						                      "Syria", "Taiwan",
						                      "Tajikistan", "Tanzania",
						                      "Thailand", "Timor L'Este",
						                      "Togo", "Tonga",
						                      "Trinidad  Tobago", "Tunisia",
						                      "Turkey", "Turkmenistan",
						                      "Turks  Caicos", "Uganda",
						                      "Ukraine",
						                      "United Arab Emirates",
						                      "United Kingdom", "Uruguay",
						                      "Uzbekistan", "Venezuela",
						                      "Vietnam",
						                      "Virgin Islands (US)", "Yemen",
						                      "Zambia", "Zimbabwe" ];

						 $scope.country = 'India';
						 var loginData = $cookieStore.get('loginData');
						 $scope.userTypes = [ {
							 id : 1,
							 name : 'FireTweet User'
						 }, {
							 id : 2,
							 name : 'Customer'
						 }, {
							 id : 3,
							 name : 'Franchisee'
						 }];
						 
						 if(loginData != undefined)
						 $scope.isFTOperator = AccessControlService.isFTOperator(loginData.roleId);
						 /************* For Inventory Tab *******************/
						 $scope.passwordChanged = false;

						 $scope.passwordModified = function(){
							 $scope.passwordChanged = true;
						 };

						 $scope.passwordmatch= function(){
							 if(newPassword.length == 0 && $scope.submitted == true && confirmPassword.length == 0 ){
								 $scope.submitted = true;
							 }
						 };
						 $scope.locationTypes = [{id : 0,name : "FIRETWEET"},{id : 1,name : "FRANCHISEE"},{id : 2,name : "SITE"}];

						 /***** These variables are to be sent to api*****/
						 $scope.selectedLocationType = $scope.locationTypes[0];
						 $scope.referenceId = 0; // 0 for Firetweet location type
						 /*************************************************/

						 $scope.franchises = [];
						 $scope.totalFranchises = 0;
						 $scope.selectedFranchise = null;

						 $scope.sites = [];
						 $scope.totalSites = 0;
						 $scope.selectedSite = null;

						 $scope.selectLocationType = function(type){
							 $scope.selectedLocationType = type;
						 };

						 $scope.setLocationTypeById = function(id){
							 for(i in $scope.locationTypes){
								 if(id == $scope.locationTypes[i].id){
									 $scope.selectedLocationType = $scope.locationTypes[i];
								 }
							 }
						 };

						 $scope.getFranchisees = function(){
							 franchiseService.getListOfFranchisee(1,"", 0,0,function(response){
								 if(response!=null){
									 $scope.franchises = response.data;
									 $scope.totalFranchises = response.total;
									 $scope.selectedFranchise = $scope.franchises[0];
									 if($scope.locationRefId != undefined && $scope.selectedLocationType.id == 1){
										 $scope.selectFranchiseById($scope.locationRefId);
									 }
									 $scope.referenceId = $scope.franchises[0].id;
								 }else{
									 $scope.selectedFranchise = {name : "No franchisees found"};
									 $scope.totalFranchise = 0;
								 }
							 });
						 };

						 $scope.selectFranchise = function(franchise){
							 $scope.selectedFranchise = franchise;
							 $scope.referenceId = franchise.id;
						 };

						 $scope.selectFranchiseById = function(id){
							 for(i in $scope.franchises){
								 if(id == $scope.franchises[i].id){
									 $scope.selectedFranchise = $scope.franchises[i];
								 }
							 }
						 };

						 $scope.getSites = function(){
							 siteService.getListOfSites("",0,0,0,0,function(response){
								 if(response!=null){
									 $scope.sites = response.data;
									 $scope.totalSites = response.total;
									 $scope.selectedSite = $scope.sites[0];
									 if($scope.locationRefId != undefined && $scope.selectedLocationType.id == 2){
										 $scope.selectSiteById($scope.locationRefId);
									 }
									 $scope.referenceId = $scope.sites[0].id;
								 }else{
									 $scope.totalSites = 0;
									 $scope.selectedSite = {name : "No sites found"};
								 }
							 });
						 };

						 $scope.selectSite = function(site){
							 $scope.selectedSite = site;
							 $scope.referenceId = site.id;
						 };


						 $scope.selectSiteById = function(id){
							 for(i in $scope.sites){
								 if(id == $scope.sites[i].id){
									 $scope.selectedSite = $scope.sites[i];
								 }
							 }
						 };

						 /*************** Inventory Tab End ******************/

						 $scope.userType = $scope.userTypes[0];

						 $log.info('$scope.isloggedIn==='
								 + $scope.isloggedIn);

						 manageUsers = function() {
							 $scope.roles = [];

							 var formatRoles = function() {
								 for (var i = 0; i < $scope.roles.length; i++) {
									 var arr = $scope.roles[i].role
									 .split('_');
									 $scope.roles[i].role = arr[arr.length - 1];
								 }
							 };

							 var setCurrentRole = function(
									 roleNumber) {
								 for (var i = 0; i < $scope.roles.length; i++) {
									 if ($scope.roles[i].id == roleNumber) {
										 $scope.currentRole = $scope.roles[i];
										 return;
									 }
								 }
							 };

							 var onRolesLoad = function(data) {
								 $scope.roles = data.data;
								 //format role names to show on UI
								 formatRoles();
								 console.log($scope.roles);

								 if ($scope.data.data.role != undefined)
									 setCurrentRole($scope.data.data.role);
								 else
									 $scope.currentRole = $scope.roles[0];
							 };

							 $scope.loadRoles = function() {
								 //by default show user type
								 $scope.showUserType = true;
								 //If user is customer Admin( CL1 user)
								 if(AccessControlService.isCustomerAdmin(loginData.roleId)){
									 $scope.userType = $scope.userTypes[1];
									 $scope.showUserType = false;
								 }else if(AccessControlService.isFranchiseAdmin(loginData.roleId)){
									 //If user is Franchisee Admin( FL1 user)
									 $scope.userType = $scope.userTypes[2];
									 $scope.showUserType = false;
								 }
								 // get roles by selected usertype
								 userService.getRoles(
										 $scope.userType.id,
										 onRolesLoad);

							 };
							 if ($scope.data.data != undefined)
								 $scope.loadRoles();
							 // function to be called on change of usertype dropdown
							 $scope.changeUserType = function(
									 userTypeArg ,action) {
								 $scope.userType = userTypeArg;

								 //If usertype is Customer
								 if($scope.userType.name == 'Customer')
								 {
									 $scope.isShowCustomerNames = true;
									 $scope.isShowFranchiseNames = false;
									 $scope.customers = [];
									 $scope.isCustomersNotFound = true;
									 var listAllCustomers = function(response) {
										 if (response != undefined) {
											 $scope.customers = response.data;
											 $scope.totalCustomers = response.total;
											 $scope.isCustomersNotFound = false;
											 $scope.currentCustomer = $scope.customers[0];
											 if(action == 'edituser'){
												 for(var i=0; i< $scope.totalCustomers ; i++){
													 if ($scope.customers[i].id == data.data.referanceId) {
														 $scope.currentCustomer = $scope.customers[i];
														 break;
													 }
												 }
											 }

										 }else{
											 $scope.customers = [];
											 $scope.currentCustomer = $scope.customers;
											 $scope.currentCustomer.name = "No customers found";
										 }
									 };
									 customerService.getListOfCustomers(1,"", 0, 0,listAllCustomers);

								 }
								 //If usertype is Franchisee
								 else if($scope.userType.name == 'Franchisee')
								 {
									 $scope.isShowCustomerNames = false;
									 $scope.isShowFranchiseNames = true;
									 $scope.franchises = [];
									 $scope.isFranchiseesNotFound = true;
									 var updateFranchisee = function(response) {
										 if (response != undefined) {
											 $scope.franchises = response.data;
											 $scope.totalFranchise = response.total;
											 $scope.isFranchiseesNotFound = false;
											 $scope.currentFranchise = $scope.franchises[0];
											 if(action == 'edituser'){
												 for(var i=0; i< $scope.totalFranchise ; i++){
													 if ($scope.franchises[i].id == data.data.referanceId) {
														 $scope.currentFranchise = $scope.franchises[i];
														 break;
													 }
												 }
											 }
										 }else{

											 $scope.franchisees = [];
											 $scope.currentFranchise = $scope.franchises;
											 $scope.currentFranchise.name = "No franchisee found";
										 }
									 };
									 // get list of all active franchisee status -1
									 franchiseService.getListOfFranchisee(1,	"", 0,0,updateFranchisee); 

								 }
								 else
								 {	
									 $scope.isShowCustomerNames = false;
									 $scope.isShowFranchiseNames = false;
								 }
								 $scope.loadRoles(); // load roles on change of usertype dropdown
							 };
							 //on change of customer dropdown
							 $scope.changeCustomerName= function(customerName) {
								 $scope.currentCustomer = customerName;
								 $scope.customerChanged = true;

							 }; 
							 // on change of Franchisee dropdown
							 $scope.changeFranchiseName= function(franchiseName) {
								 $scope.currentFranchise = franchiseName;
								 $scope.franchiseeChanged = true;
							 };  
							 // on change of role dropdown
							 $scope.changeCurrentRole = function(
									 roleArg) {
								 $scope.roleChanged = true;
								 $scope.currentRole = roleArg;
							 };
						 };

						 
						 var template = $scope.data.template;
						 switch (template) {
						 case 'forgotPassword':
							 if ($scope.data.data != undefined) {
								 $scope.isPasswordExpired = $scope.data.data.isPasswordExpired;
							 }
							 break;
						 case 'addNewUser': 
							 manageUsers();
							 break;
						 case 'editUser':
							 if ($scope.data.data != undefined) {
								 $scope.firstName = $scope.data.data.firstName;
								 $scope.lastName = $scope.data.data.lastName;
								 $scope.email = $scope.data.data.email;
								 $scope.currentRole = $scope.data.data.roleId;
								 $scope.cellPhone = $scope.data.data.cellPhone;
								 if ($scope.data.data.userType == undefined)
									 $scope.userType = $scope.userTypes[0];
								 else
									 $scope.userType = $scope.userTypes[$scope.data.data.userType - 1];
							 }
							 manageUsers();
							 if(loginData.userTypeId == 1){
								 $scope.changeUserType($scope.userType,'edituser');
							 }
							 break;
						 case 'profile':
							 var profile = $scope.data.data; //profile data to be prefilled 
							 if (profile != undefined) {
								 $scope.fName = profile.firstName;
								 $scope.lName = profile.lastName;
								 $scope.contact = profile.cellPhone;
							 }
							 break;
						 case 'editCustomer':

							 if ($scope.data.data != undefined) {
								 $scope.name = $scope.data.data.name;
								 $scope.address1 = $scope.data.data.address1;
								 $scope.address2 = $scope.data.data.address2;
								 $scope.city = $scope.data.data.city;
								 $scope.state = $scope.data.data.state;
								 $scope.pincode = $scope.data.data.pincode;
								 $scope.country = $scope.data.data.country;
							 }
							 break;
						 case 'editFranchisee':
							 //user data from selected row
							 if ($scope.data.data != undefined) {
								 $scope.name = $scope.data.data.name;
								 $scope.address1 = $scope.data.data.address1;
								 $scope.address2 = $scope.data.data.address2;
								 $scope.city = $scope.data.data.city;
								 $scope.state = $scope.data.data.state;
								 $scope.pincode = $scope.data.data.pincode;
								 $scope.country = $scope.data.data.country;
							 }
							 break;
						 case 'editSite':	

							 if ($scope.data.data != undefined) {
								 $scope.name = $scope.data.data.name;
								 $scope.address1 = $scope.data.data.address1;
								 $scope.address2 = $scope.data.data.address2;
								 $scope.city = $scope.data.data.city;
								 $scope.state = $scope.data.data.state;
								 $scope.pincode = $scope.data.data.pincode;
								 $scope.country = $scope.data.data.country;
							 }
							 break;
						 case 'deleteLocation':
							 if ($scope.data.data != undefined) {
								 
									$scope.openFunc = $scope.data.data.openfunction;
									$scope.locationScope = $scope.data.data.scope;
									$scope.devices = $scope.data.data.devices;
									$scope.location = $scope.data.data.location;
							 }
							 break;
						 case 'addNewLocation':

							 $scope.floorFileUploader = FileService
							 .uploadFile(
									 baseUrl+"api/site/location?grant_type=access_token&access_token="
									 + loginData.access_token,
									 "POST",
									 true,
									 function(item,
											 response,
											 status,
											 headers) {
										 console
										 .log(response);
										 $scope.isFireFightingUploading = false;
										 if (response.statusCode == 200) {
											 $scope.floorFile = response.response;
											 $scope.floorFileUploaded = true;
											 $scope.isFloorFileFailed = false;
										 } else {
											 $scope.isFloorFileFailed = true;
										 }
									 },
									 function(item,
											 response,
											 status,
											 headers) {
										 console
										 .log(response);
										 $scope.isFloorFileUploading = false;
										 $scope.floorFileUploaded = false;
										 $scope.isFloorFileFailed = true;
									 },
									 function(item) {
										 $scope.isFloorFileUploading = true;
										 $scope.isFloorFileFailed = false;
										 $scope.floorFileUploaded = false;
									 },
									 function(item,
											 progress) {
										 if (progress == 100)
											 $scope.isFloorFileUploading = false;
									 },
									 function(filterResult){
										 $scope.isFloorFileUploading = false;
										 $scope.isFloorFileFailed = true;
										 $scope.floorFileUploaded = false;
									 });
							 if ($scope.data.data != undefined) {

								 $scope.site = $scope.data.data;
							 }
							 break;
						 case 'confirmEditLocation':
							 $scope.uploader = $scope.data.data.uploader;

							
							 $scope.cancelFileUpload = function(){
								 
								 $scope.uploader.queue[0].cancel();
								 $scope.uploader.queue[0].remove();
								 $uibModalInstance.dismiss('cancel');
								 $scope.data.data.cancelFunc();
							 };
							 break;
						 case 'editLocation':

								$scope.uploaded = false;
								$scope.uploadedFileName = "";
							 if ($scope.data.data != undefined) {
									$scope.openFunc = $scope.data.data.openfunction;
									$scope.locationScope = $scope.data.data.scope;
									$scope.devices = $scope.data.data.devices;
									
									//To check if any of the device is not "active or not positioned"
									$scope.allDevicesResetable = true;
									console.log($scope.devices);
									for(var i in $scope.devices){
										if($scope.devices[i].deviceStatus != 1 && $scope.devices[i].deviceStatus != 0){
											$scope.allDevicesResetable = false;
											console.log($scope.allDevicesResetable);
											break;
										}
									}
									
									$scope.location = $scope.data.data.location;
									$scope.locationName = $scope.location.locationName;
									$scope.mapImage = $scope.location.mapImage;
									if($scope.mapImage == null){
										$scope.uploadMap = true;
									}
									else
										$scope.uploadMap = false;
									$scope.floorFileUploader = FileService
											.uploadFile(
													baseUrl+"api/site/location?grant_type=access_token&access_token="
															+ loginData.access_token,
													"POST",
													false,
													function(
															item,
															response,
															status,
															headers) {
														console
																.log(response);
														$scope.isFireFightingUploading = false;
														if (response.statusCode == 200) {
															$scope.mapImage = response.response;
															$scope.floorFileEditUploaded = true;
															$scope.isFloorFileFailed = false;
															$scope.uploaded = true;
															$scope.uploadedFileName = angular.element(document.querySelector('#floorFile'))[0].value;
														} else {
															$scope.isFloorFileFailed = true;
														}
													},
													function(
															item,
															response,
															status,
															headers) {
														
														
														
														$scope.isFloorFileUploading = false;
														$scope.isFloorFileFailed = true;
														$scope.floorFileEditUploaded = false;
														
													},
													function(item) {
														if($scope.uploaded == false){
															$scope.isFloorFileUploading = true;
															$scope.isFloorFileFailed = false;
															$scope.floorFileEditUploaded = false;
														}
														if($scope.devices.length > 0){
															$scope.openFunc('md','confirmEditLocation.html',{uploader : $scope.floorFileUploader , cancelFunc : function(){
																if($scope.uploaded == false){
																	$scope.isFloorFileUploading = false;
																	$scope.isFloorFileFailed = false;
																	$scope.floorFileEditUploaded = false;
	
																	angular.element(document.querySelector('#floorFile')).val('');
																	
																
																}else{
																	angular.element(document.querySelector('#floorFile')).val('');
																	
																}
															}},null);
														}
														else
															$scope.floorFileUploader.uploadAll();

													},
													function(item,
															progress) {
														if (progress == 100)
															$scope.isFloorFileUploading = false;
													},
													function(filterResult){
														$scope.isFloorFileUploading = false;
														$scope.isFloorFileFailed = true;
														$scope.floorFileEditUploaded = false;
													},true);
								}
							 break;
						 case 'addDevice':
							 $scope.connection = "G";
							 $scope.passwordValidation = 0;
							 if ($scope.data.data != undefined) {
								 $scope.location = $scope.data.data.location;
								 $scope.site = $scope.data.data.site;
								 $scope.locationScope = $scope.data.data.scope;
								 $scope.devices = $scope.locationScope.devicesList;
								 $scope.gateways = [];
								 for(i in $scope.devices){
									 if($scope.devices[i].deviceTypeId == 1){
										 $scope.gateways.push($scope.devices[i]);
									 }
								 }
								 $scope.currentGateway = undefined;
								 if($scope.gateways.length > 0)
									 $scope.currentGateway = $scope.gateways[0];
								 else if($scope.currentGateway == undefined){
									 $scope.currentGateway = {name : "No gateways found"};
								 }

							 }
							 break;
						 case 'editLocationDevice':
							 $scope.disableChange = false;
							 $scope.connection = "G";
							 $scope.passwordValidation = 0;
							 $scope.reload = false;
							 if ($scope.data.data != undefined) {
								 $scope.location = $scope.data.data.location;
								 $scope.site = $scope.data.data.site;
								 $scope.device = $scope.data.data.device;
								 $scope.name = $scope.device.name;
								 $scope.titlename = $scope.name;
								 $scope.scope = $scope.data.data.scope;
								 $scope.deviceTypeId = $scope.device.deviceTypeId;
								 $scope.devices = $scope.scope.$parent.devicesList;
								 $scope.deviceName = $scope.device.deviceName;
								 $scope.connection = $scope.device.communicationMode;
								 $scope.locationRemarks = $scope.device.locationRemarks;
								 if($scope.connection == "N"){
									 $scope.connection = "G";
									 $scope.passwordValidation = 0;
								 }
								 if($scope.connection == "G"){
									 $scope.passwordValidation = 0;
								 }else{
									 $scope.passwordValidation = 8;
								 }
								$scope.ssn = $scope.device.wifiSSID;
								$scope.ssnpassword = $scope.device.wifiPassword;
								$scope.apn = $scope.device.apn;
								 $scope.gateways = [];
								 $scope.currentGateway = undefined;
								
								 for(i in $scope.devices){

									 if($scope.device.parentGetwayId == $scope.devices[i].id){
										 $scope.currentGateway = $scope.devices[i];
									 }
									 if($scope.devices[i].deviceTypeId == 1 && ($scope.devices[i].id != $scope.device.id)){
										 $scope.gateways.push($scope.devices[i]);
									 }
								 }
								 
								 
								 for(i in $scope.devices){
									 if($scope.devices[i].parentGetwayId == $scope.device.id){
										 $scope.disableChange = true;
									 }
								 }
								 
								 if($scope.currentGateway == undefined && $scope.gateways.length!=0){
									 $scope.currentGateway = $scope.gateways[0];
								 }else if($scope.currentGateway == undefined){
									 $scope.currentGateway = {name : "No gateways found"};
								 }

							 }
							 break;
						 case 'deleteLocationDevice':

							 if ($scope.data.data != undefined) {
								 $scope.device = $scope.data.data.device;
								 $scope.scope = $scope.data.data.scope;
							 }
							 break;
						 case 'addNewInventory':

							 break;
						 case 'editInventory':
							 // Pragati State added into edit inventory Popup
							 $scope.deviceStates = [{no : 1,name : "FREE"},{no : 3,name : "FAULTY"}]; /*{no : 2,name : "INSTALLED"},*/
							 $scope.getStateName = function(no){
								for(i in $scope.deviceStates){
									if(no == $scope.deviceStates[i].no){
										return $scope.deviceStates[i];
									}
								}
							};
							
							$scope.changeDeviceState = function(obj){
								$scope.currentDeviceState =  obj;
							}
							
							$scope.currentDeviceState =  $scope.getStateName($scope.data.data.state);
							
							// end 
							
							 	$scope.reload = false;
								$scope.connection = "G";
								if ($scope.data.data != undefined) {
									$scope.location = $scope.data.data.location;
									$scope.locationScope = $scope.data.data.scope;
									if($scope.locationScope != undefined)
										$scope.deviceInventoryFlag = true;
									else
										$scope.deviceInventoryFlag = false;
									
									if(!$scope.deviceInventoryFlag)
										 $scope.locationTypes = [{id : 0,name : "FIRETWEET"},{id : 1,name : "FRANCHISEE"}];
									
									if($scope.deviceInventoryFlag){
										$scope.editInventory= $scope.data.data.device;
										$scope.devices = $scope.locationScope.devicesList;
										$scope.gateways = [];
										$scope.currentGateway = undefined;
										for(i in $scope.devices){
	
											 if($scope.editInventory.parentGetwayId == $scope.devices[i].id){
												 $scope.currentGateway = $scope.devices[i];
											 }
											 if($scope.devices[i].deviceTypeId == 1 && ($scope.devices[i].id != $scope.editInventory.id)){
												 $scope.gateways.push($scope.devices[i]);
											 }
										 }
										 
										 for(i in $scope.devices){
											 if($scope.devices[i].parentGetwayId == $scope.editInventory.id){
												 $scope.disableChange = true;
											 }
										 }
										 
										 if($scope.currentGateway == undefined)
											 $scope.currentGateway = {name : "No gateways found"};
									}
									
									if($scope.editInventory == undefined){
										$scope.editInventory = $scope.data.data;
									}
							
									$scope.inventoryName = $scope.editInventory.inventoryName;
									if($scope.locationScope != undefined){
										$scope.deviceInventoryFlag = true;
										$scope.inventoryName = $scope.editInventory.inventoryName;
									}
									else{
										$scope.deviceInventoryFlag = false;
										$scope.inventoryName = $scope.editInventory.name;
									}
									
									if($scope.editInventory.allocationStatus == 1){
										 $scope.locationTypes = [{id : 0,name : "FIRETWEET"},{id : 1,name : "FRANCHISEE"},{id : 2,name : "SITE"}];
									}
									
									$scope.inventoryId =  $scope.editInventory.inventoryId,
									$scope.serialNumber = $scope.editInventory.serialNumber,
									$scope.name = $scope.editInventory.name;
									$scope.titlename = $scope.name;
									$scope.username = $scope.editInventory.username;
									$scope.password = $scope.editInventory.password;
									$scope.batteryStatus = $scope.editInventory.batteryStatus;
									$scope.brand = $scope.editInventory.brand;
									$scope.locationRemarks = $scope.editInventory.locationRemarks;
									$scope.batteryDate = $scope.editInventory.batteryDate;
									$scope.deviceTypeId = $scope.editInventory.deviceTypeId;
									$scope.keepAlive = $scope.editInventory.keepAlive;
									$scope.description = $scope.editInventory.description;
									$scope.locationType = $scope.editInventory.locationType;
									$scope.setLocationTypeById($scope.locationType);
									$scope.locationRefId = $scope.editInventory.locationReferenceId;
									$scope.connection = $scope.editInventory.communicationMode;
									 if($scope.connection == "N" && $scope.editInventory.deviceTypeId == 1){
										 $scope.connection = "G";
										 $scope.passwordValidation = 0;
									 }
									 if($scope.connection == "G"){
										 $scope.passwordValidation = 0;
									 }else{
										 $scope.passwordValidation = 8;
									 }
									$scope.ssn = $scope.editInventory.wifiSSID;
									$scope.ssnpassword = $scope.editInventory.wifiPassword;
									$scope.apn = $scope.editInventory.apn;
									if($scope.editInventory.referenceId != undefined)
										$scope.referenceId = $scope.editInventory.referenceId;
								}
								break;
						 case 'deleteSiteInventory':
							 if ($scope.data.data != undefined) {
								 $scope.siteInventory = $scope.data.data;
							 }
							 break;

						 case 'openNewServiceTicket':
							 // Initially No Customers and Users
							 $scope.customers= [];
							 $scope.users = [];

							 // Load Users as per the selection of the customer
							 $scope.loadUsers = function(){
								 // Related Ticket Type
								 $scope.relatedTypes = [{id:1,name:"Related"},{id:2,name:"Parent"},{id:3,name:"Child"},{id:4,name:"Duplicate"}];
								 $scope.currentRelatedType = $scope.relatedTypes[0];

								 //Get data from cookie
								 $scope.refId = loginData.referenceId;
								 $scope.refTypeId = loginData.userTypeId;

								 //set selected ticket type
								 $scope.setTicketType = function(obj){
									 $scope.currentSubtype = obj;
									
										 	if($scope.selectedsite.id  == undefined){
										 		$scope.hasSiteError=true;
										 	}
										 	else
										 	{
										 		$scope.hasSiteError=false;
											 	
										 	}
									
									 if($scope.selectedcustomer.id == undefined){
									 		$scope.hasCustomerError=true;
									 	}
									 	else
									 	{
									 		$scope.hasCustomerError=false;
										 	
									 	}
								 }
								 
								 //set Selected Customer 
								 $scope.setCustomer = function(customer){
									 $scope.selectedcustomer = customer;
									 $scope.hasCustomerError = false;
									 $scope.selectedsite={name :'Select Site'};
									 $scope.currentLocation={locationName : 'Select Location'};
									 $scope.currentDevice={name : 'Select Device'};
									 $scope.loadUsers();
									 $scope.getSiteslistByCustomer($scope.selectedcustomer);
								 };

								 //set Selected User
								 $scope.setSelectedUser = function(user){
									 $scope.selecteduser = user;
								 };

								 // set default sitename
								 $scope.setdeafultSiteName = function(obj){
									 $scope.selectedsite = obj;
									
										 $scope.hasSiteError = true;
								 }
								 //set Selected Site
								 $scope.setSite = function(site){
									 $scope.selectedsite = site;
									 $scope.hasSiteError = false;
									 $scope.currentLocation={locationName : 'Select Location'};
									 $scope.currentDevice={name : 'Select Device'};
									 $scope.getLocations($scope.selectedsite);
								 };

								 // set selected Location
								 $scope.setSelectedLocation = function(location){
									 $scope.currentLocation = location;
									 $scope.currentDevice={name : 'Select Device'};
									 $scope.getSiteLocationDevices($scope.currentLocation);
								 };

								 //set deafult values
								 $scope.setDefaultValues = function(){
									 $scope.hasCustomerError = true;
									 $scope.hasSiteError = true;
									 $scope.selectedcustomer={name :'Select Customer'};
									 $scope.selectedsite={name :'Select Site'};
									 $scope.currentLocation={locationName : 'Select Location'};
									 $scope.currentDevice={name : 'Select Device'};
									 $scope.loadUsers();
								 };

								 //set Selected Location Device
								 $scope.setSelectedDevice =  function(device){
									 $scope.currentDevice = device;
								 };
								 
//								 if($scope.selectedcustomer == undefined || $scope.selectedcustomer.id == undefined){
								 $scope.refTypeId =0;
								 // callback on success of get ft operators
								 var getFTUsers = function(response) {
									 if(response != null){
										 $scope.users = response.data;
										 $scope.selecteduser = $scope.users[0];
										 $scope.totalUsers = response.total;
									 }
									 else
									 {
										 $scope.users= [];
										 $scope.totalUsers = 0;
										 $scope.selecteduser = {firstName:"No records found"};
									 }
								 };
								 // call to get FT operators API
								 getUsersByRoleService.getUsersByRole(4, 0, getFTUsers); // role
//								 }
								 /*else
								    			{
								    				$scope.getUserslistByCustomer($scope.selectedcustomer);
								    			}*/

								 // show customers dropdown 
								 var listAllCustomers = function(response) {
									 if (response != undefined) {
										 $scope.customers = response.data;
										 $scope.totalCustomers = response.total;
									 }else{
										 $scope.customers = [];
									 }
								 };

								 // get list of users
								/* $scope.getUserslist = function(){
									 userService.getListOfUsers("",
											 $scope.refId,$scope.refTypeId,
											 0,
											 0,
											 function(response) {
										 if(response != null){
											 console.log(response.data);
											 $scope.users = response.data;
											 $scope.selecteduser = $scope.users[0];
											 $scope.totalUsers = response.total;
										 }
										 else
										 {
											 $scope.users= [];
											 $scope.selecteduser = {firstName:"NO records found"};
										 }

									 });

								 };

								 // on selection of customers dropdown get userslist by customers 
								 $scope.getUserslistByCustomer = function(customer){
									 if(customer!= undefined){
										 $scope.customerFilter = customer.name;
										 $scope.refId =  customer.id ;
//										 $scope.pagination.current =1;
									 }

									 $scope.refTypeId = 2;
									 $scope.getUserslist();
								 };*/

								 // get all list of the sites as per the customer
								 $scope.getSiteslistByCustomer = function(customer){

									 siteService.getListOfSites("",
											 customer.id,2, 0,
											 0,  function(response){
										 if(response != null)
										 {
											 var sites = [];
											 $scope.sites = [];
											 sites = response.data;
											 var count=0;
//											 $scope.totalSites = response.total;
											 for (var i = 0; i< response.total; i++){
												 if (sites[i].status == 1){
													 $scope.sites[count++] = sites[i];
												 }
											 }
										 }
										 else
										 {
											 $scope.sites = [];
										 }
										 //$scope.selectedsite = $scope.sites[0];
									 });
								 };
								 //get all list of the location as per the site
								 $scope.getLocations = function(site) {
									 locationService.getSiteLocations(site.id,
											 function(response) {
										 if(response != null){
											 $scope.locations = response.data;
										 }
										 else {
											 $scope.locations = [];
										 }

									 });
								 };

								 // get all list fo the location devices as per the site
								 $scope.getSiteLocationDevices = function(location){
									 locationService
									 .getLocationDevices(
											 location.id,
											 "",
											 0,
											 0,
											 function(response) {

												 if (response != null) {

													 if (response.data != undefined) {
														 $scope.siteInventories = response.data;
													 }
												 }
												 else{
													 $scope.siteInventories = [];
												 }
											 });
								 };
								 
								 if(!$scope.isFTOperator){
									 customerService.getListOfCustomers(1,"", 0, 0,listAllCustomers);
								 }
							 };



							 $scope.loadUsers();
							
							 break;
						 case 'contactCustomer':
								$scope.CONTACT_PRIMARY = 1;
								$scope.CONTACT_ESCALATION = 6;
								$scope.referanceId = $scope.data.data.custId;
								if (loginData.userTypeId == 1) {
									$scope.CATEGORY = 1;
								}
								else {
									if (loginData.userTypeId == 2){
										$scope.CATEGORY = 2;
									}
									else {
										$scope.CATEGORY = 3;
									}
									$scope.id = loginData.referenceId;
								}
								
								contactService
								.getContact(
										$scope.CONTACT_PRIMARY,
										$scope.referanceId,
										$scope.CATEGORY,
										function(response) {
											if (response != null && response.data[0].email != null && response.data[0].email != "")
											{
												$scope.primaryContact = response.data[0];
												$scope.currentContact = $scope.primaryContact;
											}
											
										});
								
								$scope.referanceId = $scope.data.data.siteId;
								$scope.SITECATEGORY = 4;
								
								contactService
								.getContact(
										$scope.CONTACT_PRIMARY,
										$scope.referanceId,
										$scope.SITECATEGORY,
										function(response) {
											if (response != null && response.data[0].email != null && response.data[0].email != "")
											{
												$scope.primaryContactForSite = response.data[0];
												if($scope.currentContact == null)
												{
													$scope.currentContact = $scope.primaryContactForSite;
												}
											}
										});
								
								contactService
								.getContact(
										$scope.CONTACT_ESCALATION,
										$scope.referanceId,
										$scope.SITECATEGORY,
										function(response) {
											if (response != null && response.data[0].email != null && response.data[0].email != "")
											{
												$scope.escalationContact = response.data[0];
												if($scope.currentContact == null)
												{
													$scope.currentContact = $scope.escalationContact;
												}
											}
											else if($scope.currentContact == null){
												$scope.currentContact = {name: "No Contact Found"};
											}
											
										});
										$scope.setName = function(obj){
											$scope.currentContact = obj;
										};
								break;
								
							case 'contactVendor':
								$scope.CONTACT_VENDOR = 5;
								$scope.referanceId = $scope.data.data.siteId;
								$scope.SITECATEGORY = 4;
								
								contactService
								.getContact(
										$scope.CONTACT_VENDOR,
										$scope.referanceId,
										$scope.SITECATEGORY,
										function(response) {
											if (response != null && response.data[0].email != null && response.data[0].email != "")
											{
												$scope.vendorContact = response.data[0];
											}
											
										});
								break;
						 case 'contactFt':	
							 $scope.listFTUsers = function(){
							 $scope.ftadmins= [];
							 $scope.ftsupervisors = [];
							 $scope.operators = [];
							 var getFTAdmins = function(response) {
								 if(response != null){
									 $scope.ftadmins = response.data;
									 $scope.ftuser = $scope.ftadmins[0];
								 }
								 else
								 {
									 $scope.ftadmins= [];
								 }
							 };
							 // call to get FT Admins API
							 getUsersByRoleService.getUsersByRole(1, 0, getFTAdmins); // role for ft admin - 1
							 
							 // callback on success of get ft supervisors
							 var getFTSupervisors = function(response) {
								 if(response != null){
									 $scope.ftsupervisors = response.data;
									 if(!$scope.ftadmins.length){
										 $scope.ftuser = $scope.ftsupervisors[0];
									 }
								 }
								 else
								 {
									 $scope.ftsupervisors = [];
								 }
							 };
							 // call to get FT supervisors API
							 getUsersByRoleService.getUsersByRole(2, 0, getFTSupervisors); // role for ft supervisors - 2
							 
							 var getFTOperators = function(response) {
								 if(response != null){
									 $scope.operators = response.data;
									 if(!$scope.ftadmins.length && !$scope.ftsupervisors.length){
										 $scope.ftuser = $scope.operators[0];
									 }
								 }
								 else
								 {
									 $scope.operators= [];
								 }
							 };
							 // call to get FT operators API
							 getUsersByRoleService.getUsersByRole(4, 0, getFTOperators); // role for ft operator - 4
						 };
						 $scope.setFTuser = function(ftuser){
							 $scope.ftuser = ftuser;
						 };
						 $scope.listFTUsers();
						 
						 break;
						 case 'addNewContract':
							 $scope.sites = [];
							 $scope.totalSites = 0;
							 $scope.selectedSite = {name:"No Site Found"}
							 
							 siteService.getListOfSites("",
									 $stateParams.id,2, 0,
									 0,  function(response){
								 var sites = response.data;
								 var count=0;
//								 $scope.totalSites = response.total;
								 for (var i = 0; i< response.total; i++){
									 if (sites[i].status == 1){
										 $scope.sites[count++] = sites[i];
									 }
								 }
								 $scope.selectedSite = $scope.sites[0];

							 });

							 $scope.setSiteName = function(site){
								 $scope.selectedSite = site;
							 };

							 $scope.contractFileUploader = FileService
							 .uploadFile(
									 baseUrl+"api/contract/upload?grant_type=access_token&access_token="
										+ loginData.access_token,
									 "POST",
									 true,
									 function(item,
											 response,
											 status,
											 headers) {
										 console
										 .log(response);
										 $scope.isContractFileUploading = false;
										 if (response.statusCode == 200) {
											 $scope.contractFile = response.response;
											 $scope.contractFileUploaded = true;
											 $scope.iscontractFileFailed = false;
										 } else {
											 $scope.iscontractFileFailed = true;
										 }
									 },
									 function(item,
											 response,
											 status,
											 headers) {
										 console
										 .log(response);
										 $scope.iscontractFileUploading = false;
										 $scope.contractFileUploaded = false;
										 $scope.iscontractFileFailed = true;
									 },
									 function(item) {
										 $scope.iscontractFileUploading = true;
										 $scope.iscontractFileFailed = false;
										 $scope.contractFileUploaded = false;
									 },
									 function(item,
											 progress) {
										 if (progress == 100)
											 $scope.iscontractFileUploading = false;
									 },
									 function(filterResult){
										 $scope.iscontractFileUploading = false;
										 $scope.iscontractFileFailed = true;
										 $scope.contractFileUploaded = false;
									 },false,true);
							 
							 $scope.name = $state.params.name;
							 break;

						 }
						 $scope.ok = function(option,$event) {
							 $log.info('in console ok fn1');
							 if($event != undefined)
								{
									$event.target.blur();
								}
							 $scope.flag = false; 
							 $scope.submitted = true;

							 switch (option) {
							 case 'RESET_PASSWORD': 
								 if($scope.resetForm.$valid)
								 {
//									 $scope.resetpassword($scope.email);
									 $scope.submitted = true;
									 if($scope.resetForm.$valid)
									 {
										 if ($scope.email != undefined) {
											 $uibModalInstance.close();
											 spinnerService.showSpinner();
											 resetPasswordService.resetpassword(
													 {
														 'email' : $scope.email
													 }, {},
													 function(
															 response) {
														 console
														 .log(response);
														 if (ErrorHandlerService.handleError(response,false,"login")) {
															 if(response.error == 0)
																{
																	 
																		 //$rootScope.$broadcast("myEvent", {Response: "Please check your email for new login credentials." , Type: "success",color: "#A9D4E5" });
																		 NotificationService.show("md","Please check your email for new login credentials.","success");
																}
																 
														 }
														


													 });

										 }
									 }

								 }
								 break;
							 case 'ADD_USER':
								 $scope.validate = ($scope.isShowFranchiseNames == true )? ( (!$scope.isFranchiseesNotFound) ? true :false ) : ($scope.isShowCustomerNames == true )? ((!$scope.isCustomersNotFound) ? true :false ) : true;
								 if($scope.addNewUser.$valid && $scope.validate)
								 {
									 $scope.flag = true; 
									 var referanceId = loginData.referenceId; // By default Reference Id should be referenceId of logged in user 
									 if(loginData.userTypeId == 1){ //IF user is FT user

										 if($scope.isShowCustomerNames){
											 referanceId = $scope.currentCustomer.id; //Reference Id should be id of selected customer
										 }
										 else if($scope.isShowFranchiseNames){
											 referanceId = $scope.currentFranchise.id; //Reference Id should be id of selected franchisee
										 }
									 }
									 userService.addUser(
											 $scope.firstName,
											 $scope.lastName,
											 $scope.email,
											 $scope.currentRole.id,
											 $scope.cellPhone,
											 referanceId,
											 data.callback);
									 spinnerService.showSpinner();
								 }	
								 break;
							 case 'DELETE_USER':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 userService.deleteUser(
											 data.data.id,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'EDIT_USER':
								 if($scope.editUser.$valid)
								 {
									 $scope.flag = true; 
									 var referanceId = data.data.referanceId;
									 if(loginData.userTypeId == 1){
										 if($scope.isShowCustomerNames){
											 referanceId = $scope.currentCustomer.id; //Reference Id should be id of selected customer
										 }
										 else if($scope.isShowFranchiseNames){
											 referanceId = $scope.currentFranchise.id; //Reference Id should be id of selected franchisee
										 }
									 }
									 if($scope.editUser.$dirty || $scope.roleChanged==true || $scope.franchiseeChanged == true || $scope.customerChanged == true)
									 {
										 userService.editUser(
												 $scope.firstName,
												 $scope.lastName,
												 $scope.currentRole.id,
												 $scope.cellPhone,
												 $scope.newPassword,
												 data.data.id,
												 referanceId, //referanceId of the user to be edited (selected row )
												 data.callback);
										 spinnerService.showSpinner();
									 }
								 }
								 break;
							 case 'UPDATE_PROFILE':
								 if($scope.myProfile.$valid) 
								 {
									 $scope.flag = true; 
									 if($scope.myProfile.$dirty)
									 {
										 var password = $scope.newPassword;
										 updateProfile.update(loginData)
										 .update(
												 {
													 user_id : loginData.userId
												 },
												 {
													 "firstName" : $scope.fName,
													 "lastName" : $scope.lName,
													 "password" : $scope.newPassword,
													 "cellPhone" : $scope.contact
												 },
												 function(
														 response) {
													 if (ErrorHandlerService.handleError(response)){
														 //data.callback();
														 if(password != undefined && password != ""){
															 $state.go('common.login');
															 NotificationService.show("md","Please log in using new password.","success",false,"Login");
														 }
														 else{
															 $rootScope.$broadcast('update_profile');
															 //$rootScope.$broadcast("myEvent", {Response: "Your profile updated successfully." , Type: "success" });
															 NotificationService.show("md","Your profile updated successfully.","success");
														 }
													 }
												 });
										 spinnerService.showSpinner();
									 }
								 }
								 break;
							 case 'ADD_CUSTOMER' : 
								 if($scope.addNewCustomer.$valid)
								 {
									 $scope.flag = true; 
									 customerService.addCustomer($scope.name,
											 $scope.address1, $scope.address2, $scope.city,
											 $scope.state, $scope.pincode, $scope.country,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'DELETE_CUSTOMER':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 customerService.deleteCustomer(
											 data.data.id,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'EDIT_CUSTOMER':
								 if($scope.editCustomer.$valid)
								 {
									 $scope.flag = true; 
									 if($scope.editCustomer.$dirty)
									 {
										 customerService.updateCustomer(
												 data.data.id, $scope.name,
												 $scope.address1, $scope.address2, $scope.city,
												 $scope.state, $scope.pincode, $scope.country,
												 data.data.firedetectionFile,
												 data.data.firefightingFile, data.data.comment,
												 data.data.other, 1, data.callback);
										 spinnerService.showSpinner();
										 spinnerService.showSpinner();
									 }
								 }
								 break;
							 case 'ADD_FRANCHISEE' : 
								 if($scope.addNewFranchisee.$valid)
								 {
									 $scope.flag = true; 
									 franchiseService.addFranchise($scope.name,
											 $scope.address1, $scope.address2, $scope.city,
											 $scope.state, $scope.pincode, $scope.country,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'EDIT_FRANCHISEE':
								 if($scope.editFranchisee.$valid)
								 {
									 $scope.flag = true; 
									 if($scope.editFranchisee.$dirty)
									 {
										 franchiseService.updateFranchisee(
												 data.data.id, $scope.name,
												 $scope.address1, $scope.address2, $scope.city,
												 $scope.state, $scope.pincode, $scope.country,
												 1, $scope.data.callback);
										 spinnerService.showSpinner();
									 }
								 }
								 break;
							 case 'DELETE_FRANCHISEE':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 franchiseService.deleteFranchisee(
											 data.data.id,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'ADD_SITE':
								 if($scope.addNewSite.$valid)
								 {
									 $scope.flag = true; 
									 siteService.addSite($scope.name,
											 $scope.address1, $scope.address2, $scope.city,
											 $scope.state, $scope.pincode, $scope.country,data.data.id,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'EDIT_SITE': 
								 if($scope.editSite.$valid)
								 {
									 $scope.flag = true; 
									 if($scope.editSite.$dirty)
									 {
										 siteService.updateSite(data.data.id,$scope.name,
												 $scope.address1, $scope.address2, $scope.city,
												 $scope.state, $scope.pincode, $scope.country,data.data.siteStage,data.data.ftUsers,
												 data.data.franchiseUsers,data.data.fasComplianceCertificate,
												 data.data.hsComplianceCertificate,data.data.customerUser,
												 data.callback);
										 //$uibModalInstance.close();
										 spinnerService.showSpinner();
									 }
								 }
								 break;
							 case 'DELETE_SITE':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 siteService.deleteSite(
											 data.data.id,
											 data.callback);
									 spinnerService.showSpinner();

								 }
								 break;
							 case 'ADD_LOCATION':
								 if($scope.addNewLocation.$valid)
								 {
									 $scope.flag = true; 
									 locationService
									 .createSiteLocation(
											 $scope.site.id,
											 $scope.locationName,
											 $scope.floorFile,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'DELETE_LOCATION':
								 locationService
									.deleteSiteLocation(
											$scope.location,
											$scope.locationScope,
											$scope.data.callback);
								 $scope.flag = true;
								 break;
							 case 'EDIT_LOCATION':
									if($scope.editLocation.$valid)
									{
										$scope.flag = true; 
									
									if($scope.mapImage!=null){
										if($scope.mapImage.indexOf('/') > -1)
											$scope.mapImage = $scope.mapImage.split('/')[$scope.mapImage.split('/').length-1];
									}
									
									
									
									if($scope.floorFileEditUploaded){
										var updated = [];
										for(var i=0;i< $scope.devices.length;i++){
											$scope.devices[i].xAxis = 0;
											$scope.devices[i].yAxis = 0;
											var temp = {siteLocationDeviceId : $scope.devices[i].id,xPos : $scope.devices[i].xAxis,yPos : $scope.devices[i].yAxis};
											updated.push(temp);
										}
										
										if($scope.devices.length > 0)
											locationService.updateSiteDeviceMapPosition(updated);
									}
									locationService
									.updateSiteLocation(
											$scope.location.id,
											$scope.location.siteId,
											$scope.locationName,
											$scope.mapImage,$scope.location,
											$scope.locationScope,
											$scope.data.callback);
									
									spinnerService.showSpinner();
									}
									break;
							 case 'ADD_DEVICE':
								 if($scope.addDevice.$valid && !(!$scope.gateways.length && $scope.currentDeviceType.category!=1))
								 {
									 $scope.flag = true;
									 if($scope.currentDeviceType.deviceTypeId != 1)
									 {
										 $scope.connection = 'N';
										 $scope.ssn = undefined;
										 $scope.ssnpassword = undefined;
										 $scope.apn = undefined;
									 }
									 if($scope.currentDeviceType.deviceTypeId == 1){
										 $scope.currentGateway.id = 0;
										 console.log("gateway");
									 }
									 locationService
									 .createSiteLocationDevice(
											 $scope.location.id,
											 $scope.currentDeviceType.deviceTypeId,
											 $scope.currentGateway.id,
											 $scope.currentGateway.id,
											 0, 0,
											 0,$scope.locationScope,
											 $scope.deviceName,
											 $scope.connection,
											 $scope.ssn,
											 $scope.ssnpassword,
											 $scope.apn,
											 $scope.locationRemarks,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'ADD_INVENTORY':
								 if($scope.addNewInventory.$valid)
								 {
									 $scope.flag = true; 
									 inventoryService.createInventory(
											 $scope.serialNumber, $scope.name,
											 $scope.username, $scope.password,
											 $scope.batteryStatus, $scope.brand,
											 $scope.locationRemarks,
											 $scope.batteryDate, $scope.currentDeviceType.deviceTypeId,
											 $scope.keepAlive, $scope.description,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'EDIT_INVENTORY':
								 
									if($scope.editInventoryForm.$valid)
									{
										 console.log($scope.reload);

										$scope.flag = true; 
									/*	if($scope.addNewInventory.$dirty)
										{*/

									if($scope.selectedLocationType.id == 2)
										$scope.referenceId = $scope.selectedSite.id;
									else if($scope.selectedLocationType.id == 1){
										$scope.referenceId = $scope.selectedFranchise.id;
									}else{
										$scope.referenceId = 0;
									}
									
									
									if($scope.deviceInventoryFlag == true){
										locationService
										 .updateSiteLocationDevice(
												 $scope.editInventory.id,
												 $scope.editInventory.deviceTypeId,
												 $scope.editInventory.parentDeviceId,
												 $scope.editInventory.parentGetwayId,
												 $scope.editInventory.xAxis,
												 $scope.editInventory.yAxis,
												 $scope.name,
												 $scope.editInventory.inventoryId,
												 $scope.connection,
												 $scope.ssn,
												 $scope.ssnpassword,
												 $scope.apn,
												 $scope.locationRemarks,
												 $scope.location.id,
												 $scope.locationScope,
												 function(response){
														inventoryService.updateInventory($scope.inventoryId,
																$scope.serialNumber,
																$scope.deviceInventoryFlag == true? $scope.inventoryName : $scope.name,
																$scope.username,
																$scope.password,
																$scope.batteryStatus,
																$scope.brand,
																$scope.locationRemarks,
																$scope.batteryDate,
																$scope.currentDeviceType.deviceTypeId,
																$scope.keepAlive,
																$scope.description,
																$scope.selectedLocationType.id,
																$scope.referenceId,
																($scope.currentDeviceState == undefined)? 2:$scope.currentDeviceState.no, // added by pragati
																data.callback,$scope.location,$scope.locationScope, $scope.editInventory.id,$scope.deviceInventoryFlag,$scope.reload); 
												 }
												 );
										$scope.locationRemarks = null;
									}else{

														inventoryService.updateInventory($scope.inventoryId,
																$scope.serialNumber,
																$scope.deviceInventoryFlag == true? $scope.inventoryName : $scope.name,
																$scope.username,
																$scope.password,
																$scope.batteryStatus,
																$scope.brand,
																$scope.locationRemarks,
																$scope.batteryDate,
																$scope.currentDeviceType.deviceTypeId,
																$scope.keepAlive,
																$scope.description,
																$scope.selectedLocationType.id,
																$scope.referenceId,
																($scope.currentDeviceState == undefined)? 2:$scope.currentDeviceState.no, // added by pragati
																data.callback,$scope.location,$scope.locationScope, $scope.editInventory.id,$scope.deviceInventoryFlag,$scope.reload); 
										$scope.locationRemarks = null;
									}
									

									
									spinnerService.showSpinner();
//										}
										
									}
									break;
							 case 'DELETE_INVENTORY':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 inventoryService.deleteInventory(
											 data.data.inventoryId,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'create_Service_Tickets':
								// $scope.requireCustomerandSite = ($scope.currentSubtype.id == 3) || ($scope.currentSubtype.id == 4); // customer and site is mandatory when ticket type is audit or installion 
								 
								 if($scope.selectedcustomer.id == undefined)
									 {
									 	$scope.hasCustomerError = true;
									 }
								 else
									 {
									 	$scope.hasCustomerError = false;
									 }
								 
								 if($scope.selectedsite.id == undefined)
								 {
								 	$scope.hasSiteError = true;
								 }
							 else
								 {
								 	$scope.hasSiteError = false;
								 }
								 
								 // Priority and severity always low
								 if($scope.openServiceTicket.$valid && $scope.totalUsers !=0 && $scope.hasSiteError == false && $scope.hasCustomerError == false)
								 {
									 $scope.Priority = 1;
									 $scope.Severity= 1;
									 $scope.flag = true;
									 $scope.currentRelatedType.id = 1;


									 TicketService.createServiceTickets($scope.currentSubtype.id,$scope.currentDevice.id,$scope.selectedsite.id,$scope.selecteduser.id,$scope.Priority,$scope.Severity,
											 0,$scope.currentRelatedType.id,$scope.eta,$scope.comment,$scope.description,$scope.serialNumber,$scope.selectedcustomer.id,$scope.currentLocation.id,data.callback);
								 }
								 break;
							 case 'CONTACT_VENDOR':
								 if($scope.contactCustomer.$valid && $scope.vendorContact != undefined){
									 $scope.ftuser = $scope.vendorContact;
									 $scope.flag = true;
									 spinnerService.showSpinner();
									 TicketService.contactUsers($scope.comment,$scope.ftuser.email,data.data.id,loginData.firstName + " " + loginData.lastName,function(){
										 
										 NotificationService.show("md","Email sent to vendor successfully.","success");
									 });
									 
								 }
								 break;
							 case 'CONTACT_CUSTOMER':
								 if($scope.contactCustomer.$valid && ($scope.primaryContact != null || $scope.primaryContactForSite != null || $scope.escalationContact != null)){
									 $scope.ftuser = $scope.currentContact;
									 $scope.flag = true;
									 spinnerService.showSpinner();
									 TicketService.contactUsers($scope.comment,$scope.ftuser.email,data.data.id,loginData.firstName + " " + loginData.lastName,function(){
										 
										 NotificationService.show("md","Email sent to customer successfully.","success");
									 });
								 }
							
								 break;
							 case 'CONTACT_FT' : 
								 if($scope.contactFT.$valid){
									 $scope.flag = true;
									 spinnerService.showSpinner();
									 TicketService.contactUsers($scope.comment,$scope.ftuser.email,data.data.id,loginData.firstName + " " + loginData.lastName,function(){
										 console.log('success');
										 NotificationService.show("md","Email sent to firetweet successfully.","success");
									 });
								 }
								 
								 break;
							 case 'EDIT_LOCATION_DEVICE':
								 var execute = false;
								 
								 if($scope.currentDeviceType.deviceTypeId == 1){
									 execute = $scope.editLocationDevice.$valid;
								 }else{
									 execute = $scope.editLocationDevice.$valid && ($scope.gateways.length > 0);
								 }
								 if($scope.currentDeviceType.deviceTypeId != 1)
										$scope.connection = "N";
								 
								 
								 if(execute)
								 {
									 console.log($scope.reload);
									 $scope.flag = true; 
									if($scope.currentDeviceType.deviceTypeId != 1)
										$scope.connection = "N";
									 locationService
									 .updateSiteLocationDevice(
											 $scope.device.id,
											 $scope.currentDeviceType.deviceTypeId,
											 $scope.currentGateway.id,
											 $scope.currentGateway.id,
											 $scope.device.xAxis,
											 $scope.device.yAxis,
											 $scope.name,
											 $scope.device.inventoryId,
											 $scope.connection,
											 $scope.ssn,
											 $scope.ssnpassword,
											 $scope.apn,
											 $scope.locationRemarks,
											 $scope.location.id,
											 $scope.scope,
											 data.callback,
											 $scope.reload);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'DELETE_LOCATION_DEVICE':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 locationService
									 .deleteSiteLocationDevice(
											 $scope.device.id,
											 $scope.device.siteLocationId,
											 $scope.scope,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;

							 case 'DELETE_SITE_INVENTORY':
								 if($scope.deleteUser.$valid)
								 {
									 $scope.flag = true; 
									 console.log($scope.siteInventory);
									 locationService
									 .deleteSiteLocationDevice(
											 $scope.siteInventory.siteLocationDeviceId,
											 null,
											 null,
											 data.callback);
									 spinnerService.showSpinner();
								 }
								 break;
							 case 'CONFIRM_EDIT_LOCATION':
								 console.log($scope.uploader);
								 $scope.uploader.uploadAll();
								 $scope.flag = true;
								 break;
							 case 'addNewContract':
								 $scope.customerId = $state.params.id; //Customer Id

								 if($scope.addNewContract.$valid && ($scope.startdate <= $scope.enddate) && ($scope.issuedate <= $scope.startdate))
								 {
									 contractService.createContract($scope.customerId,$scope.selectedSite.id,$scope.refNo,$scope.issuedate,
											 $scope.startdate,$scope.enddate,$scope.contractFile,data.callback);
									 $scope.flag = true;	
								 }
								 break;
							 case 'DELETE_CONTRACT':
								 contractService.deleteContracts(data.data.id,data.callback);
								 $scope.flag = true;
								 break;
							
							 case 'create_ticket':
								 if($scope.comment.$valid)
								{
									 console.log($scope.commentTicket);
									 $scope.flag = true;	
									 data.callback($scope.commentTicket);
									 
								}
								 break;
							 } 
							 if($scope.flag == true)
							 {
								 $uibModalInstance.close();

							 }
						 };

						 $scope.enterKeyEvent= function(event,template)
						 {
							 if(event.which == 13)
							 {
								 $scope.submitted = true;
								 $scope.ok(template);
							 }

						 };

						 $rootScope.$on("CloseModals", function () {
								console.log("in CloseModals");	
								 $scope.cancel();
								
							});
						 
						 $scope.cancel = function() {
							 $uibModalInstance.dismiss('cancel');
						 };

						 /**
						  * ***********************************
						  * DEVICE - Author Karan
						  * ******************
						  */

						 $scope.deviceTypes = [];




						 $scope.changeCurrentDeviceByTypeId = function(deviceTypeId){
							 for(i in $scope.deviceTypes){
								 if($scope.deviceTypes[i].deviceTypeId == deviceTypeId){

									 $scope.currentDeviceType = $scope.deviceTypes[i];
								 }
							 }
						 };


						 $scope.getDeviceTypes = function(){
							 deviceService.getDeviceTypes(function(response){
								 console.log(response);
								 $scope.deviceTypes = response.data;
								 $scope.currentDeviceType = $scope.deviceTypes[0];
								 if($scope.deviceTypeId != undefined){
									 $scope.changeCurrentDeviceByTypeId($scope.deviceTypeId);
								 }

							 });
						 };

						 $scope.changeDeviceType = function(
								 deviceType) {
							 $scope.currentDeviceType = deviceType;
						 };

						 $scope.changeGateway = function(gateway) {
							 $scope.currentGateway = gateway;
						 };


						 /**
						  * ***********************************
						  * DEVICE END - Author Karan
						  * ******************
						  */
						 $scope.allowLocationUpload = function(upload){
							 $scope.uploadMap = upload;
						 };
						 
						 $scope.setTrimmedMapImage = function(mapImage){
							 console.log(mapImage);
							var arr = mapImage.split('/');
							 $scope.trimmedMapImage = arr[arr.length-1].split('_')[1];
						 };
						 
						 $scope.makeReload = function(){
							 if($scope.connection == "G"){
								 $scope.passwordValidation = 0;
							 }
							 else if($scope.connection == "W"){
								 $scope.passwordValidation = 8;
							 }
							$scope.reload = true;
						 };

						 $scope.$on("logout", function (event,message) {
							 $scope.cancel();
						 });
						 $scope.$on('IdleTimeout', function() {
							 $scope.cancel();
						 });
					 } ]);
		});