define([ 'angular' ], function(angular) {
	return [
			'$scope','$state','$cookieStore','$location',
			'customerService','AccessControlService',
			function($scope,$state,$cookieStore,$location, customerService,AccessControlService) {
				// Controller related variables
				var loginData = $cookieStore.get('loginData');
		    	$scope.isloggedIn = $cookieStore.get('loggedin');
				
				$scope.customers = [];
				$scope.countPerPage = 10;
				$scope.totalCustomers = 0;
				$scope.pagination = {
					current : 1
				};
				
				$scope.keyword = "";
				$scope.status = 0; // DUMMY , ACTIVE -1  , INACTIVE-2, All-0
				// ********************************
				
				

				var updateCustomers = function(response) {
					$scope.customers = [];
					if (response != undefined) {
						console.log(response.data);
						$scope.customers = response.data;
						$scope.totalCustomers = response.total;
					}else{
						if($scope.pagination.current > 1){ 
							// after deleting all entries on current page and pages are >1
							$scope.pagination.current--;
							$scope.refreshCustomers();
						}
						else{
							$scope.customers = [];
						}
					}
				};
				
				$scope.enterKeyEvent = function($event,template)
				{
					if($event.which == 13)
						{
						  $scope.getCustomersBySearch(1);
						}
				};
				
				// key up event on search when it is empty
				$scope.fillCustomersTable = function() {

					if ($scope.keyword == "") {
						customerService.getListOfCustomers(
								$scope.status, $scope.keyword, 1,
								$scope.countPerPage, updateCustomers);
					}
				};
				
				$scope.getCustomers = function(pageNumber) {
					customerService.getListOfCustomers($scope.status,
							$scope.keyword, pageNumber, $scope.countPerPage,
							updateCustomers);
				}
				$scope.refreshCustomers = function() {
					customerService.getListOfCustomers($scope.status,
							$scope.keyword, $scope.pagination.current,
							$scope.countPerPage, updateCustomers);
				};
				$scope.refreshCustomersforDelete = function() { //on adding and deleting customer
					$scope.pagination.current = 1;
					$scope.keyword == ""
					customerService.getListOfCustomers($scope.status,
							$scope.keyword, $scope.pagination.current,
							$scope.countPerPage, updateCustomers);
				};
				
				$scope.getCustomerslist = function(){
					customerService.getListOfCustomers($scope.status,
							$scope.keyword, $scope.pagination.current,
							$scope.countPerPage, function(response) {
							console.log(response);
								if(response != null){
									console.log(response.data);
									$scope.customers = response.data;
									$scope.totalCustomers = response.total;
							}
							else{
								$scope.customers = [];
								$scope.totalCustomers = 0;
							}
						});
				};
	
				
				$scope.getCustomersBySearch = function(pageNumber){
					$scope.pagination.current = (pageNumber != undefined) ? pageNumber
							: $scope.pagination.current;
					$scope.getCustomerslist();
				};

				
				if( AccessControlService.isFTAdmin(loginData.roleId) ||  AccessControlService.isFTCR(loginData.roleId) || AccessControlService.isFTSupervisor(loginData.roleId))
					customerService
						.getListOfCustomers($scope.status, $scope.keyword, 1,
								$scope.countPerPage, updateCustomers);
				
				/*var path = String($location.path());
				if(AccessControlService.isCustomerAdmin(loginData.roleId) || AccessControlService.isCL2(loginData.roleId) || AccessControlService.isCL3(loginData.roleId)){
					if(path.indexOf('/dashboard/customers') == 0)
						$state.go('common.dashboard.customers.customerdetails', {id : loginData.referenceId,name: loginData.firstName+" "+loginData.lastName});
				}
*/
			} ];
});
