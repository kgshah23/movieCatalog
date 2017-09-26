define(
		[ 'angular' ],
		function(angular) {

			return [
					'$scope',
					'userService',
					'$log',
					'$cookieStore','spinnerService','customerService','AccessControlService',
					function($scope, userService, $log, $cookieStore,spinnerService,customerService,AccessControlService) {
						
						//set default total count to 0
						$scope.totalUsers = 0;
						
						//set default current page
						$scope.pagination = {
							current : 1
						};
						//set default count per page
						$scope.countPerPage = 10;
						
						$scope.customerFilter = "Select Customer";
						//set default search
						$scope.search = "";
						// object for users
						$scope.users = [];
						//Get data from cookie
						var loginData = $cookieStore.get('loginData');
						// Disable to row of user who is logged in
						$scope.hideSelf = function(id) {
							if (loginData.userId == id)
								return true;
							else
								return false;
						};
						
						//customers dropdown is hidden by default
						$scope.isFTUsers = false;
						// by default refId is 0
						/*$scope.refId = 0;
						$scope.refTypeId = 0 ;*/
						//get list of customers if user is FT ADmin or FT supervisor
						if (loginData.userTypeId == 1) {
							$scope.customers= [];
							// show customers dropdown 
							$scope.isFTUsers = true;
							var listAllCustomers = function(response) {
								if (response != undefined) {
									console.log(response.data);
									$scope.customers = response.data;
									$scope.totalCustomers = response.total;
								}else{
									$scope.customers = [];
								}
							};
							customerService.getListOfCustomers(1,"", 0, 0,listAllCustomers);
						}
						
						// check is FranchiseAdmin
						$scope.isFranchiseAdmin = AccessControlService.isFranchiseAdmin(loginData.roleId);
						// check is CustomerAdmin
			    		$scope.isCustomerAdmin= AccessControlService.isCustomerAdmin(loginData.roleId);
						
						// get list of users
						$scope.getUserslist = function(){
							userService.getListOfUsers($scope.search,
									$scope.refId, $scope.refTypeId,
									$scope.pagination.current,
									$scope.countPerPage,
									function(response) {
										if(response != null){
												console.log(response.data);
												$scope.users = response.data;
												$scope.totalUsers = response.total;
										}
										else{
											if($scope.pagination.current > 1){ 
												// after deleting all entries on current page and pages are >1
												$scope.pagination.current--;
												$scope.getUserslist();
											}
											else{
												$scope.users = [];
												$scope.totalUsers = 0;
											}
										}
									});
							
						};
						// on selection of customers dropdown get userslist by customers filter
						$scope.getUserslistByCustomer = function(customer){
							if(customer!= undefined){
								$scope.customerFilter = customer.name;
								$scope.refId =  customer.id ;
//								$scope.pagination.current =1;
							}
							$scope.pagination.current =1;
							
							$scope.refTypeId = 2;
							$scope.getUserslist();
						};
						//get list of users
						$scope.getUsers = function(pageNumber, count ) {
							//set current page number
							$scope.pagination.current = (pageNumber != undefined) ? pageNumber
									: $scope.pagination.current;
							//if not ft users
							if (loginData.userTypeId != 1) {
								$scope.refId = loginData.referenceId;
								$scope.refTypeId = loginData.userTypeId; //cust id or franchisee id
							} 
							else{
								$scope.refId = 0;
								$scope.refTypeId = 0;
							}
							$scope.getUserslist();

						};
						//Get users according to filter
						$scope.getUsersBySearch = function(pageNumber){
							$scope.pagination.current = (pageNumber != undefined) ? pageNumber
									: $scope.pagination.current;
							
							$scope.getUserslist();
						};
						
						$scope.getUsersByFilter = function(countPerPage){
							if(countPerPage != undefined){
							$scope.countPerPage =  countPerPage;
							}
							
							$scope.getUserslist();
						};
						
						//Format role names to display in dropdown
						$scope.formatRoleString = function(arg) {
							var arr = String(arg).split('_');
							return arr[arr.length - 1];
						};
						// Enter key Press Event on serach field
						$scope.enterKeyEvent = function($event,template)
						{
							if($event.which == 13)
								{
								  $scope.getUsersBySearch(1);
								}
						};
						// key up event on search when it is empty
						$scope.fillUsersTable = function()
						{
							if($scope.search == undefined)
								{
//									$scope.getUsers(1, $scope.countPerPage,);
									$scope.getUsersByFilter();
								}
						};
						// refresh table on any action like add. update, delete user
						$scope.refreshUsersTable = function() {
							$scope.refId =0; $scope.refTypeId = 0;
							$scope.customerFilter="Select Customer";
							$scope.search = "";
							$scope.pagination.current = 1;
							$scope.getUsers($scope.pagination.current,
									$scope.countPerPage);
						};
						// get users list on page load
						$scope.getUsers(1, $scope.countPerPage);

					} ];
		});
