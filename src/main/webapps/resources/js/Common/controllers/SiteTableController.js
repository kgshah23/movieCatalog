/**
 * 
 */
define(['angular'],function(){
	 return ['$filter','$scope','$state', 'siteService','$cookieStore','AccessControlService','spinnerService','$location','$rootScope',function($filter,$scope, $state, siteService,$cookieStore,AccessControlService,spinnerService,$location,$rootScope){
		 	
		 	$scope.sites=[];
			//Get data from cookie
			var loginData = $cookieStore.get('loginData');
			
			//set default current page
			$scope.pagination = {
				current : 1
			};
			//set default count per page
			$scope.countPerPage = 10;
			
			//customer id or franchisee id
//			$scope.id = $state.params.id;
			
			$scope.isFTInstaller = AccessControlService.isFTInstaller(loginData.roleId);
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
			
			// array for site status
			$scope.siteStatus = [ {
				id : 1,
				name : 'ACTIVE'
			}, {
				id : 2,
				name : 'INACTIVE'
			}, {
				id : 3,
				name : 'DELETED'
			}];
			//disable add site btn
			$scope.disableAddSiteBtn = true;
			$scope.isCustomerPage= true;
			$scope.isfranchiseePage = true;
			$scope.isFTAdmin = $scope.$parent.isFTAdmin;
			$scope.isFTSupervisor = $scope.$parent.isFTSupervisor;
			$scope.isFTUsers = (loginData.userTypeId ==1) ? true : false;
			var path = new String($location.path());
			if (path.indexOf('customer') >0){
				$scope.isCustomerPage= false;
				//FT admin and supervisor can add site,edit site and delete site
				if($scope.$parent.isFTAdmin || $scope.$parent.isFTSupervisor){
					$scope.disableAddSiteBtn = false;
				}
			}
			else if(path.indexOf('franchise')>0){
				$scope.isfranchiseePage = false;
			}
			
			//get site stage by given id 
			$scope.getSiteStage = function(stage) {
				for (var i = 0; i < $scope.siteStages.length; i++) {
					if (stage == $scope.siteStages[i].id) {
						return $scope.siteStages[i];
					}
				}
			};
			//get site stage by given id 
			$scope.getSiteStatus = function(status) {
				for (var i = 0; i < $scope.siteStatus.length; i++) {
					if (status == $scope.siteStatus[i].id) {
						return $scope.siteStatus[i].name;
					}
				}
			};
			$scope.getSitesList = function(){

				if (loginData.userTypeId != 1) {
					if(AccessControlService.isCustomerAdmin(loginData.roleId)
							|| AccessControlService.isCL2(loginData.roleId) || AccessControlService.isFranchiseAdmin(loginData.roleId)){
						$scope.refId = loginData.referenceId; // cust id or Franchisee id
						$scope.refTypeId = loginData.userTypeId; // customer sites -2
					}
					else if(AccessControlService.isCL3(loginData.roleId) || AccessControlService.isFL2(loginData.roleId)){
						$scope.refId = loginData.userId; //userid
						$scope.refTypeId = 1 ; //user sites - 1
					}
				} 
				else{
					
					//if FTinstaller
					if($scope.isFTInstaller){
						$scope.refId = loginData.userId; // userid
						$scope.refTypeId = 1 ; //user site
					}
					else{
					$scope.refId = $state.params.id;
					if (path.indexOf('/dashboard/franchise') == 0){
						$scope.refTypeId = 3;
					}
					else{
						$scope.refTypeId = 2; //customer sites
					}
					}
				}
				spinnerService.showSpinner();
				$scope.getSites();
				//$rootScope.$broadcast("SiteTableUpdated");
			};
			
			$scope.getSites = function(){
				siteService.getListOfSites("",$scope.refId,$scope.refTypeId,$scope.pagination.current,
						$scope.countPerPage,function(response) {
					if(response != null){
						console.log(response.data);
						$scope.sites = response.data;
						$scope.totalSites = response.total;
				}
				else{
					if($scope.pagination.current > 1){
						$scope.pagination.current--;
						$scope.getSites();
					}
					else{
						$scope.sites = [];
						$scope.totalSites = 0;
					}
				}
				//$scope.updateCsvSites();
			});
			};
			// refresh table on any action like add. update, delete user
			$scope.refreshSitesTable = function() {
				$scope.pagination.current=1;
				$scope.getSitesList();
				$scope.updateCsvSites();
			};
			
			$scope.getSitesList();
			
			
			//Export to csv - Author : Karan Rawal
			
			$scope.csvHeaders =  ['Site Name','Total Open Tickets','Stage','Date Added','Last Preventive Maintenance Date','Next Preventive Maintenance Date','Inventory','Status'];; // this array contains the headers for csv
			$scope.csvSites = []; // data for the csv
			
			$scope.updateCsvSites = function(){
				$scope.csvSites  = [];
				try{
					siteService.getListOfSites("",$scope.refId,$scope.refTypeId,0,
							0,function(response) {
						if(response != null){
							console.log(response.data);
							$scope.Allsites = response.data;
							for(i in $scope.Allsites){
								
								var gateway = 0;
								var repeater = 0;
								var fas = 0;
								var fes = 0;
								var hss = 0;
								
								
								//Fill gateway,repeater,fas,fes and hss count first
								for(j in $scope.Allsites[i].inventory){
									switch($scope.Allsites[i].inventory[j].id){
										case 1:
											gateway = $scope.Allsites[i].inventory[j].count;
											break;
										case 2:
											repeater = $scope.Allsites[i].inventory[j].count;
											break;
										case 3:
											fas = $scope.Allsites[i].inventory[j].count;
											break;
										case 4:
											fes = $scope.Allsites[i].inventory[j].count;
											break;
										case 5:
											hss = $scope.Allsites[i].inventory[j].count;
											break;
									}
								}
								
								var inventoryString = "GATEWAY : " + gateway + ", REPEATER : "+repeater
								+ ", FAS : "+fas
								+ ", FES : "+fes
								+ ", HSS : "+hss;
								
								
								
								//temporary row
								var temp = {
									'Site Name' : $scope.Allsites[i].name,
									'Total Open Tickets': $scope.Allsites[i].openTickets,
									'stage' : $scope.getSiteStage($scope.Allsites[i].siteStage).name,
									'createdDate' : ($scope.Allsites[i].createdDate)? $filter('date')(new Date($scope.Allsites[i].createdDate), "dd/MM/yyyy"): "",
									'lastPreventiveMaintDate' : ($scope.Allsites[i].lastPreventiveMaintDate)? $filter('date')(new Date($scope.Allsites[i].lastPreventiveMaintDate),"dd/MM/yyyy"): "",
									'nextPreventiveMaintDate' : ($scope.Allsites[i].nextPreventiveMaintDate)? $filter('date')(new Date($scope.Allsites[i].nextPreventiveMaintDate),"dd/MM/yyyy"): "",
									'inventory' : inventoryString,
									'status' : $scope.getSiteStatus($scope.Allsites[i].status)
								}
								
								$scope.csvSites.push(temp);//pushing the temporary row in array
							}
							}
						else
							{	
							$scope.Allsites = [];
							}
					});
					
				}catch(exception){
					console.log(exception);
					console.error("In sites update csv");
				}
			}
			$scope.updateCsvSites();
			
	 }];
});
