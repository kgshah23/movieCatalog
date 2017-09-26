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
				
				
				
				//Export to csv - Author : Karan Rawal
				
				$scope.csvHeaders = ['Customers','Sites','Open Tickets','FAS','FES','HSS']; // this array contains the headers for csv
				
				
				$scope.updateCsvCustomers= function(){
					try{
						customerService.getListOfAllCustomers(
								'', 0,
								0, function(response) {
								console.log(response);
								$scope.csvCustomers = []; // data for the csv
									if(response != null){
										$scope.AllCustomers = response.data;
										for(i in $scope.AllCustomers){
											var fas = 0;
											var fes = 0;
											var hss = 0;
											
											
											//Fill fas,fes and hss count first
											for(j in $scope.AllCustomers[i].inventory){
												if($scope.AllCustomers[i].inventory[j].id == 3){
													fes = $scope.AllCustomers[i].inventory[j].count;
												}
												if($scope.AllCustomers[i].inventory[j].id == 4){
													hss = $scope.AllCustomers[i].inventory[j].count;
												}
												if($scope.AllCustomers[i].inventory[j].id == 5){
													fas = $scope.AllCustomers[i].inventory[j].count;
												}
											}
											
											//temporary row
											var temp = {
												'Customers' : $scope.AllCustomers[i].name,
												'sites' : $scope.AllCustomers[i].totalSites,
												'openTickets': $scope.AllCustomers[i].openTickets,
												'fas' : fas,
												'fes' : fes,
												'hss' : hss
											}
											
											$scope.csvCustomers.push(temp);//pushing the temporary row in array
										}
										}
									else
										{
										$scope.AllCustomers = [];
										}
									});
						
						
					}catch(exception){
						console.log(exception);
						console.error("In customers update csv");
					}
				}
				
				$scope.updateCsvCustomers();
				var updateCustomers = function(response) {
					$scope.customers = [];
					if (response != undefined) {
						console.log(response.data);
						$scope.customers = response.data;
						/*$scope.csvCustomers = [];
						
						$scope.updateCsvCustomers(); //update the csv data - Karan Rawal
*/						$scope.totalCustomers = response.total;
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
						customerService.getListOfAllCustomers(
								$scope.keyword, 1,
								$scope.countPerPage, updateCustomers);
					}
				};
				
				$scope.getCustomers = function(pageNumber) {
					customerService.getListOfAllCustomers(
							$scope.keyword, pageNumber, $scope.countPerPage,
							updateCustomers);
				}
				$scope.refreshCustomers = function() {
					customerService.getListOfAllCustomers(
							$scope.keyword, $scope.pagination.current,
							$scope.countPerPage, updateCustomers);
				};
				$scope.refreshCustomersforDelete = function() { //on adding and deleting customer
					$scope.pagination.current = 1;
					$scope.keyword == ""
					customerService.getListOfAllCustomers(
							$scope.keyword, $scope.pagination.current,
							$scope.countPerPage, updateCustomers);
				};
				
				$scope.getCustomerslist = function(){
					customerService.getListOfAllCustomers(
							$scope.keyword, $scope.pagination.current,
							$scope.countPerPage, function(response) {
							console.log(response);
								if(response != null){
									console.log(response.data);
									$scope.customers = response.data;
									/*$scope.csvCustomers = [];
									$scope.updateCsvCustomers(); //update the csv data - Karan Rawal
*/									$scope.totalCustomers = response.total;
							}
							else{
								$scope.customers = [];
								$scope.totalCustomers = 0;
							}
						});
				};
	
				$scope.getCount = function (inventory,id){
					console.log(id);
					for(var i=0;i<inventory.length;i++)
					{
						if(inventory[i].id == id)
						{
							return inventory[i].count;
						}
					}
					
				};
				
				$scope.getCustomersBySearch = function(pageNumber){
					$scope.pagination.current = (pageNumber != undefined) ? pageNumber
							: $scope.pagination.current;
					$scope.getCustomerslist();
				};

				
				if( AccessControlService.isFTAdmin(loginData.roleId) ||  AccessControlService.isFTCR(loginData.roleId) || AccessControlService.isFTSupervisor(loginData.roleId))
					customerService
						.getListOfAllCustomers( $scope.keyword, 1,
								$scope.countPerPage, updateCustomers);
				
				
			} ];
});
