define(['angular'], function(angular){
    return ['$scope','inventoryService','deviceService','franchiseService','siteService','$filter',/*'PdfExporterService',*/
            function ($scope,inventoryService,deviceService,franchiseService,siteService,$filter/*,PdfExporterService*/) {
    	
    	
		$scope.locationTypes = [{id : 0,name : "FIRETWEET"},{id : 1,name : "FRANCHISEE"}/*,{id : 2,name : "SITE"}*/];
    	$scope.pageChange = false;
    	
		$scope.getLocationTypeName= function(id){
			for(i in $scope.locationTypes){
				if(id == $scope.locationTypes[i].id){
					return $scope.locationTypes[i].name;
				}
			}
		};

		
    	/**************** get site name *************/
    	// we get id of the site in inventories(locationReferenceId), this function will find the site name for the id
    	$scope.setSiteNames = function(inventory){
    		if(inventory == undefined)
    		{
    			for(i in $scope.sites){
    				for(j in $scope.inventories){
    					if($scope.inventories[j].locationReferenceId == $scope.sites[i].id){
    						$scope.inventories[j].sitename = $scope.sites[i].name;
    						
    					}
    				}
    			}
    		}
    		else
    		{
    			for(i in $scope.sites){
    				for(j in inventory){
    					if(inventory[j].locationReferenceId == $scope.sites[i].id){
    						inventory[j].sitename = $scope.sites[i].name;
    						
    					}
    				}
    			}
    		}
    		
    	}
    	
    	/*$scope.export = function(){
    		PdfExporterService.exportToPdf('inventoryUnalloted','inventory');
    	}*/
    	
    	
    	$scope.sites = [];
    	$scope.totalSites = 0;
    	$scope.selectedSite = null;
    	
    	siteService.getListOfSites("",
				0,0, 0,
				0,  function(response){
			$scope.sites = response.data;
			$scope.totalSites = response.total;
			$scope.selectedSite = $scope.sites[0];
			$scope.setSiteNames();
		});
    	
    	/********************************/
    	
    	
    	
    	
    	/********* Device Type Loading - Karan **********/
    	
    	$scope.deviceTypes = [];
    	$scope.totalDeviceTypes = 0;
    	
    	deviceService.getDeviceTypes(function(response){
			$scope.deviceTypes = response.data;
			$scope.totaldeviceTypes = response.total;
		});
    	
    	/***********************************************/

		$scope.inventories = [];
		$scope.countPerPage = 10;
		$scope.pagination = {
			current : 1
		};
		$scope.totalInventories = 0;
		$scope.keyword = "";
		
		$scope.ALLOCATION_STATUS = 0;
		
		$scope.states = [{no : 0,name : "ALL"},{no : 1,name : "FREE"},{no : 3,name : "FAULTY"}]; /*{no : 2,name : "INSTALLED"},*/
		$scope.selectedState = $scope.states[0];
		
		
		$scope.setSelectedState = function(state){
			$scope.selectedState = state;
		};
		
		
		$scope.referanceTypes = [{no : 0,name : "ALL"},{no : 5,name : "FIRETWEET + FRANCHISEE"},{no : 1,name : "FIRETWEET ONLY"},{no : 2,name : "FRANCHISEE ONLY"},{no : 3,name : "SITE ONLY"}];
		$scope.selectedRefType = $scope.referanceTypes[0];
		
		
    	/****************Franchise Loading - Karan********************/
    	
    	$scope.franchisees = [];
    	$scope.totalFranchisees = 0;
    	
    	franchiseService.getListOfFranchisee(1,"", 0,0,function(response){
			if(response!=null){
				$scope.franchisees = response.data;
				$scope.totalFranchisees = response.total;
				for(i in $scope.franchisees){
					$scope.referanceTypes.push({no : 2,name : $scope.franchisees[i].name,refId : $scope.franchisees[i].id});
				}
			}else{
				$scope.franchisees = [];
				$scope.totalFranchise = 0;
			}
		});
    	
    	
    	/***********************************************************/
		
		
		$scope.setSelectedRefType = function(refType){
			$scope.selectedRefType = refType;
		};
		
		
		var setInventories = function(response){
			if(response != null){
				$scope.inventories = response.data;
				$scope.totalInventories = response.total;
				
			}else{
				$scope.inventories = [];
				$scope.totalInventories = 0;
			}
			if($scope.pageChange == false)
			{
				$scope.updateInventoryUnallottedCSV();
			}
			$scope.pageChange = false;
		};
		
		
		
		$scope.getStateName = function(no){
			for(i in $scope.states){
				if(no == $scope.states[i].no){
					return $scope.states[i].name;
				}
			}
		};
		
		$scope.getDeviceTypeName = function(deviceId){
			for(i in $scope.deviceTypes){
				if(deviceId == $scope.deviceTypes[i].deviceTypeId){
					return $scope.deviceTypes[i].name;
				}
			}
		};
		
		
		$scope.deleteInventoryCallback = function(){
			$scope.pagination.current = 1;
			$scope.refreshInventories();
		};
		
		
    	$scope.refreshInventories = function(getAll){
    		if(!getAll){
	    		inventoryService.getInventoryList($scope.keyword, $scope.selectedRefType.refId!=undefined? $scope.selectedRefType.refId : 0, $scope.selectedRefType.no, $scope.ALLOCATION_STATUS, 0,
	    				($scope.pagination.current-1)*$scope.countPerPage, $scope.countPerPage,$scope.selectedState.no,
	    				function(response) {
							setInventories(response);
							$scope.setSiteNames();
	    				});
    		}else{
    			$scope.pagination.current = 1;

    			inventoryService.getInventoryList($scope.keyword, $scope.selectedRefType.refId!=undefined? $scope.selectedRefType.refId : 0, $scope.selectedRefType.no, $scope.ALLOCATION_STATUS, 0,
	    				0, 0,$scope.selectedState.no,
	    				function(response) {
							setInventories(response);
							$scope.setSiteNames();
	    				});    			
    		}
    	};
		

		inventoryService.getInventoryList($scope.keyword, $scope.selectedRefType.refId!=undefined? $scope.selectedRefType.refId : 0, $scope.selectedRefType.no, $scope.ALLOCATION_STATUS, 0,
				($scope.pagination.current-1)*$scope.countPerPage, $scope.countPerPage,$scope.selectedState.no,
				function(response) {
					setInventories(response);
				});
		
		$scope.getInventoriesByPage = function(){
			inventoryService.getInventoryList($scope.keyword, $scope.selectedRefType.refId!=undefined? $scope.selectedRefType.refId : 0, $scope.selectedRefType.no, $scope.ALLOCATION_STATUS, 0,
					($scope.pagination.current-1)*$scope.countPerPage, $scope.countPerPage,$scope.selectedState.no,
					function(response) {
						setInventories(response);
					});
			$scope.setSiteNames();
		};
		
		$scope.getInventoriesByKeyword = function(){
			$scope.pagination.current = 1;
			$scope.refreshInventories(true);
		}

		/***************Inventory Unallotted CSV Author: Pragati *******************/
		
		$scope.csvHeaders1 =  ['Inventory Name','Description','Device Type','State','Unique SN','Location','Location Remarks','Battery Date','Brand']; // this array contains the headers for csv
		$scope.updateInventoryUnallottedCSV = function(){
			
			try{
				$scope.AllInventories = [];
				inventoryService.getInventoryList('', $scope.selectedRefType.refId!=undefined? $scope.selectedRefType.refId : 0, $scope.selectedRefType.no, $scope.ALLOCATION_STATUS, 0,
	    				0, 0,$scope.selectedState.no,
	    				function(response) {
						$scope.csvInventoryUnallotted = []; 
							//setInventories(response);
							if(response != null)
							{
								$scope.AllInventories = response.data;
								$scope.setSiteNames($scope.AllInventories);
							}
							else
							{
								$scope.AllInventories = [];
								$scope.csvInventoryUnallotted = []; 
							}
							//console.log($scope.AllInventories);
							
							for(i=0;i<$scope.AllInventories.length;i++)
							{
								//temporary row
								for(j=0;j<$scope.deviceTypes.length;j++){
									
									if($scope.AllInventories[i].deviceTypeId == $scope.deviceTypes[j].deviceTypeId){
										$scope.deviceName = $scope.deviceTypes[j].name;
										break;
									}
								}
								for(j=0;j<$scope.locationTypes.length;j++){
									
										if($scope.AllInventories[i].locationType == $scope.locationTypes[j].id){
											$scope.locationName =  $scope.locationTypes[j].name;
											break;
										}
									
								}
								
								var temp = {
									'Inventory Name':  $scope.AllInventories[i].name,
									'Description' : $scope.AllInventories[i].description,
									'Device Type': $scope.deviceName,
									'State': ($scope.AllInventories[i].state == 1)?"FREE":"FAULTY",
									'Unique SN': $scope.AllInventories[i].serialNumber,
									'Location': ($scope.AllInventories[i].locationType != 2)? $scope.locationName:($scope.AllInventories[i].sitename),
									'Location Remarks': $scope.AllInventories[i].locationRemarks,
									'Battery Date': ($scope.AllInventories[i].batteryDate)?  $filter('date')(new Date($scope.AllInventories[i].batteryDate), "dd/MM/yyyy") : "",
									'Brand': $scope.AllInventories[i].brand,
									
								}
								
								$scope.csvInventoryUnallotted.push(temp);//pushing the temporary row in array
						}
								console.log($scope.csvInventoryUnallotted);
	    				});    	
				
				
			}catch(exception){
				console.log(exception);
				console.error("In Unallotted Inventory update csv");
			}
		}
    }];
});
