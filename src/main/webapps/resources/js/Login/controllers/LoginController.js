define(
		[ 'dashboard_module/controllers/DashboardController', 'angular' ],
		function() {
			return [
			        '$resource',
			        '$scope',
			        '$http',
			        '$state',
			        '$log',
			        'resetPasswordService',
			        '$cookieStore',
			        '$location',
			        'NotificationService',
			        'ErrorHandlerService',
			        'loginService','$timeout','$rootScope','spinnerService',
			        function($resource, $scope, $http, $state, $log,
			        		resetPasswordService, $cookieStore, $location,
			        		NotificationService, ErrorHandlerService,loginService,$timeout,$rootScope,spinnerService) {

			        	$scope.isloggedIn = false;
			        	$scope.firstName = '';
			        	$scope.lastName = '';
			        	$cookieStore.remove('loginData');
			        	$cookieStore.remove('loggedin');
			        	
			        	//handling of tab click and enter click to open popup
			        	$scope.enterKeyEvent = function(event,template)
			        	{
			        		event.target.blur();
			        		if(event.which == 13)
			        			$scope.open('md','forgotPassword.html');
			        	};
			        	
			        	//on click of login button
			        	$scope.login = function() {
			        		$scope.submitted = true;
			        		if($scope.loginForm.$valid)
			        		{
			        			spinnerService.showSpinner();
			        			loginService.login($scope.username,$scope.password,function(response){
			        				$scope.password = "";
			        				$scope.submitted = false;
			        				$scope.tried = true;
			        				if(response.data.error_description == "109"){
			        					//$rootScope.$broadcast("myEvent", {Response: "You're account has been disabled.", Type: "danger", color: "#A9D4E5" });
			        					NotificationService.show("md","You are not allowed to login in to the system.Please contact administrator.","danger");
			        				}
			        				else if(response.data.error_description == "108"){
			        					//password expired
			        					$scope.open('md','forgotPassword.html',{isPasswordExpired:true});
			        				}
			        				else{ 
			        					//$rootScope.$broadcast("myEvent", {Response: "Invalid Credentials.", Type: "danger", color: "#A9D4E5" });
			        					NotificationService.show("md","Invalid Credentials.","danger");
			        				}
			        			});
			        		}
			        	};
			        } ];
		});
