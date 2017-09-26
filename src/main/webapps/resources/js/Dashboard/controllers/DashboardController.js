define(['angular'], function(angular){
    return ['$scope','$state','$location','$cookieStore','$log','updateProfile','userService','AccessControlService','$window','Idle','$timeout','$rootScope','customerService','franchiseService','NotificationService',
            function ($scope, $state,$location,$cookieStore,$log,updateProfile,userService,AccessControlService,$window,Idle,$timeout,$rootScope,customerService,franchiseService,NotificationService) {
    	var loginData = $cookieStore.get('loginData');
    	$scope.isloggedIn = $cookieStore.get('loggedin');
    	
    	
    	$log.info('$scope.isloggedIn==='+$scope.isloggedIn);
    	
    	$scope.$on("update_profile", function (event) {
    		$scope.getProfile();
  		});
    	
    	$scope.getProfile = function(){
    		var loginData = $cookieStore.get('loginData');
    		var getResource = updateProfile.get(loginData);
    		getResource.get({
				user_id:loginData.userId
			},{},function(response){
				$scope.profile = response.response;
//				$cookieStore.put('profile',$scope.profile);
				$scope.firstName = $scope.profile.firstName;
		    	$scope.lastName = $scope.profile.lastName;
		    	$scope.contact = $scope.profile.contact;
			});
		};
    	
		console.log("loginglob" + loginData);
    	
    	$scope.logoutCall = function(){
    		userService.logoutUser(function(response){
    			//location.href = 'core/#/login?logout';
    			 $cookieStore.remove('loginData');
    			 $cookieStore.remove('loggedin');
    			 window.location.href = baseUrl + '#/login?logout';
    			 if(timeout!=undefined){
    				 $timeout.cancel($rootScope.timeoutPromise);
    			 	Idle.unwatch();
    			 }
   		});
    	};
    	$scope.loadCustomer = function() {
			customerService.getCustomer(loginData.referenceId, function(
					response) {
				if (response != null) {
					$scope.customerInfoExists = true;
					$scope.customer = response;
					$scope.customername = $scope.customer.name;
					$scope.customerId = $scope.customer.id;
				} else {
					$scope.customerInfoExists = false;
					$scope.name = loginData.firstName;
				}
			});
		};
		$scope.loadFranchise = function() {
			franchiseService.getFranchisee(loginData.referenceId, function(
					response) {
				if (response != null) {
					$scope.franchiseeInfoExists = true;
					$scope.franchise = response;
					$scope.franchiseename = $scope.franchise.name;
					$scope.franchiseeId = $scope.franchise.id;
				} else {
					$scope.franchiseInfoExists = false;
				}
			});
		};
		
		$scope.$on("logout", function (event,message) {
			if(timeout!=undefined){
				 	$timeout.cancel($rootScope.timeoutPromise);
			}
			Idle.unwatch();
    		// $rootScope.$broadcast("myEvent", {Response: "Your session has expired. Please login again." , Type: "danger" , color: "#A9D4E5"});
			
			if( message == 'user_disabled'){
				NotificationService.show("md","You're account has been disabled or deleted.","danger");
			}
			else{
				NotificationService.show("md","Your session has expired. Please login again.","danger");
			}
			
    		window.location.href = baseUrl + '#/login?logout';
    	});
		
		if(loginData != undefined){
			$scope.getProfile();
			$scope.isAdmin = AccessControlService.isAdmin(loginData.roleId);

			if($scope.isAdmin){
				$scope.isFTAdmin = AccessControlService.isFTAdmin(loginData.roleId);

				$scope.isFranchiseAdmin = AccessControlService.isFranchiseAdmin(loginData.roleId);
				$scope.isCustomerAdmin= AccessControlService.isCustomerAdmin(loginData.roleId);
			}
			$scope.isFTSupervisor= AccessControlService.isFTSupervisor(loginData.roleId);
			$scope.isFTOperator = AccessControlService.isFTOperator(loginData.roleId);
			$scope.isFTInstaller = AccessControlService.isFTInstaller(loginData.roleId);
			$scope.isFTCR = AccessControlService.isFTCR(loginData.roleId);
			$scope.isCL2 = AccessControlService.isCL2(loginData.roleId);
			$scope.isCL3 = AccessControlService.isCL3(loginData.roleId);
			$scope.isFL2 = AccessControlService.isFL2(loginData.roleId);


			if($scope.isFTAdmin == true)
			{
				$scope.userType = "FT Admin";
			}
			else if($scope.isFTSupervisor == true)
			{
				$scope.userType = "FT Supervisor";
			}
			else if($scope.isFTOperator == true)
			{
				$scope.userType = "FT Operator";
			}
			else if($scope.isFTInstaller == true)
			{
				$scope.userType = "FT Installer";
			}
			else if($scope.isFTCR == true)
			{
				$scope.userType = "FT CR";
			}
			else if($scope.isCustomerAdmin == true)
			{
				$scope.userType = "CL1";
			}
			else if($scope.isCL2 == true)
			{
				$scope.userType = "CL2";
			}
			else if($scope.isCL3 == true)
			{
				$scope.userType = "CL3";
			}
			else if($scope.isFranchiseAdmin == true)
			{
				$scope.userType = "FL1";
			}
			else if($scope.isFL2 == true)
			{
				$scope.userType = "FL2";
			}


			if($scope.isCustomerAdmin || $scope.isCL2 || $scope.isCL3){
				$scope.loadCustomer();
			}
			if($scope.isFranchiseAdmin || $scope.isFL2){
				$scope.loadFranchise();
			}
			$scope.isActive = function(location){
				var path = new String($location.path());
				return (path.indexOf(location) == 0);
			};
			
			/*
			 * check when password expires
			 */
			if(loginData.passwordExpiresIn <= 10){
				$scope.passwordExpiresIn = loginData.passwordExpiresIn ;
//				NotificationService.show("md","Your password will expires in "+loginData.passwordExpiresIn+" days. Please reset your password.","danger");
			}
		}
    	
    	else{
    		$state.go('common.login');
    	}
			
    }];
});
