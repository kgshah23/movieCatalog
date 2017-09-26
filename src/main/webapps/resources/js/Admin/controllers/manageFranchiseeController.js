/**
 * 
 */
define(
		[ 'angular' ],
		function(angular) {
			return [
					'$scope',
					'$state',
					'$cookieStore',
					'$location',
					'franchiseService',
					'AccessControlService',
					function($scope, $state, $cookieStore, $location,
							franchiseService, AccessControlService) {
						// Controller related variables
						var loginData = $cookieStore.get('loginData');
						$scope.isloggedIn = $cookieStore.get('loggedin');
						$scope.franchisees = [];
						$scope.countPerPage = 10;
						$scope.totalFranchise = 0;
						$scope.pagination = {
							current : 1
						};
						

						//Export to csv - Author : Karan Rawal
						// *****TODO - When api is updated- sites and openTickets
						
						$scope.csvHeaders =  ['Franchisee','Sites','Open Tickets'];; // this array contains the headers for csv
						$scope.csvfranchisees = []; // data for the csv
						
						$scope.updateCsvcsvfranchisees= function(){
							$scope.csvfranchisees = [];
							try{
								for(i in $scope.franchisees){
									var fas = 0;
									var fes = 0;
									var hss = 0;
									
									
									//temporary row
									var temp = {
										'name' : $scope.franchisees[i].name,
										'sites' : $scope.franchisees[i].totalSites,
										'openTickets': $scope.franchisees[i].openTickets,
									}
									
									$scope.csvfranchisees.push(temp);//pushing the temporary row in array
								}
							}catch(exception){
								console.log(exception);
								console.error("In franchisees update csv");
							}
						}
						
						
						$scope.keyword = "";
						$scope.status = 0; // DUMMY , ACTIVE , INACTIVE
						// ********************************

						$scope.getFranchiseeslist = function() {

							franchiseService
									.getListOfFranchisee(
											$scope.status,
											$scope.keyword,
											$scope.pagination.current,
											$scope.countPerPage,
											function(response) {
												console.log(response)
												if (response != null) {
													console.log(response.data);
													$scope.franchisees = response.data;
													$scope.totalFranchise = response.total;
												} else {
													$scope.franchisees = [];
													$scope.totalFranchise = 0;
												}
												$scope.updateCsvcsvfranchisees();
											});
						};
						// Enter key Press Event on serach field
						$scope.enterKeyEvent = function(event,template)
						{
							if(event.which == 13)
								{
								  $scope.getFranchiseesBySearch(1);
								}
						}
						// key up event on search when it is empty
						$scope.fillFranchiseeTable = function(){
							if($scope.keyword == "")
								{
									franchiseService.getListOfFranchisee($scope.status,
											$scope.keyword, 1, $scope.countPerPage,
											updateFranchisee);
								}
						}
						$scope.getFranchiseesBySearch = function(pageNumber) {
							$scope.pagination.current = (pageNumber != undefined) ? pageNumber
									: $scope.pagination.current;
							$scope.getFranchiseeslist();
						};

						var updateFranchisee = function(response) {
							$scope.franchisees = [];
							if (response != undefined) {
								console.log(response.data);
								$scope.franchisees = response.data;
								$scope.totalFranchise = response.total;
							} else {
								if($scope.pagination.current > 1){ 
									// after deleting all entries on current page and pages are >1
									$scope.pagination.current--;
									$scope.refreshFranchisee();
								}
								else{
									$scope.franchisees = [];
								}
							}
							$scope.updateCsvcsvfranchisees();
						};

						$scope.statuses = [ {
							id : 1,
							name : "ACTIVE"
						}, {
							id : 2,
							name : "INACTIVE"
						}, {
							id : 3,
							name : "DELETED"
						} ];
						$scope.getStatus = function(id)
						{
							for(var i=0;i<$scope.statuses.length;i++)
								{
									if($scope.statuses[i].id==id)
										{
											return $scope.statuses[i].name;
										}
								}
						};
						// on page change
						$scope.getFranchisee = function(pageNumber) {
							franchiseService.getListOfFranchisee($scope.status,
									$scope.keyword, pageNumber,
									$scope.countPerPage, updateFranchisee);
						};
						
						// refresh franchisee table on edit and delete franchisee
						$scope.refreshFranchisee = function() {
							franchiseService.getListOfFranchisee($scope.status,
									$scope.keyword, $scope.pagination.current,
									$scope.countPerPage, updateFranchisee);
						};

						// refresh franchisee table on add new franchisee
						$scope.refreshFranchiseeForDelete = function() {
							 $scope.pagination.current = 1;
							 $scope.keyword = "";
							franchiseService.getListOfFranchisee($scope.status,
									$scope.keyword, $scope.pagination.current,
									$scope.countPerPage, updateFranchisee);
						};
						
						// get all franchisees on page load
						franchiseService.getListOfFranchisee($scope.status,
								$scope.keyword, 1, $scope.countPerPage,
								updateFranchisee);

						/*
						 * if(
						 * AccessControlService.isFranchiseAdmin(loginData.roleId) ||
						 * AccessControlService.isFTCR(loginData.roleId) ||
						 * AccessControlService.isFTSupervisor(loginData.roleId)) {
						 * 
						 * franchiseService .getListOfFranchisee($scope.status,
						 * $scope.keyword, 1, $scope.countPerPage,
						 * updateFranchisee); }
						 */

						/*var path = String($location.path());
						if (AccessControlService
								.isFranchiseAdmin(loginData.roleId)
								|| AccessControlService.isFL2(loginData.roleId)) {
							if (path.indexOf('/dashboard/franchise') == 0)
								$state
										.go(
												'common.dashboard.franchise.franchisedetails',
												{
													id : loginData.referenceId,
													name : loginData.firstName
															+ " "
															+ loginData.lastName
												});
						}
*/
					} ];
		});
