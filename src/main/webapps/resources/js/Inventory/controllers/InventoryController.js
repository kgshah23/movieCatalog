define(['angular'], function(angular){
    return ['$scope','inventoryService','customerService','siteService','deviceService','$filter',
            function ($scope,inventoryService,customerService,siteService,deviceService,$filter) {

    	
    	/********* Customers Loading - Karan **********/
    	
		$scope.locationTypes = [{id : 0,name : "FIRETWEET"},{id : 1,name : "FRANCHISEE"},{id : 2,name : "SITE"}];
    	$scope.pageChange = false;
    	
		$scope.getLocationTypeName= function(id){
			for(i in $scope.locationTypes){
				if(id == $scope.locationTypes[i].id){
					return $scope.locationTypes[i].name;
				}
			}
		};
		
    	$scope.customers = [];
    	$scope.totalCustomers = 0;
    	$scope.selectedCustomer = null;
    	//status = 1 for Active customers
    	customerService.getListOfCustomers(
				1, "", 0,
				0, function(response){
					$scope.customers = response.data;
					$scope.totalCustomers = response.total;
				});
    	
    	$scope.selectCustomer = function(customer){
    		
    		if(customer != null){
	    		$scope.selectedCustomer = customer;
//	    		$scope.referenceType = $scope.referenceTypes.customers;
	    		$scope.referenceId = customer.id;
    		}else{
    			$scope.selectedCustomer = customer;
//    			$scope.referenceType = $scope.referenceTypes.all;
	    		$scope.referenceId = 0;
    		}
    		$scope.referenceType = $scope.referenceTypes.customers;
    	};
    	
    	
    	/***********************************************/
    	
    	
    	/**************** get site name *************/
    	
    	$scope.setSiteNames = function(inventory){
    		if(inventory == undefined)
    		{
    			for(i in $scope.sites){
    				for(j in $scope.inventories){
    					//console.log($scope.inventories[j].locationReferenceId + " - "+ $scope.sites[i].id);
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
    	
    	/********************************/
    	
    	
    	/********* Sites Loading - Karan **********/
    	
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
    	
    	$scope.selectSite = function(site){
    		if(site!=null){
	    		$scope.selectedSite = site;
	    		$scope.referenceType = $scope.referenceTypes.sites;
	    		$scope.referenceId = site.id;
    		}else{
				$scope.referenceType = $scope.referenceTypes.all;
	    		$scope.referenceId = 0;
    		}
    	};
    	
    	
    	/***********************************************/
    	
    	/********* Device Type Loading - Karan **********/
    	
    	$scope.deviceTypes = [];
    	$scope.totalDeviceTypes = 0;
    	$scope.selectedDeviceType = {name : "All Devices"};
    	
    	deviceService.getDeviceTypes(function(response){
			$scope.deviceTypes = response.data;
			$scope.totaldeviceTypes = response.total;
		});
    	
    	$scope.selectDeviceType = function(deviceType){
    		$scope.selectedDeviceType = deviceType;
    	};
    	
    	
    	/***********************************************/
    	
    	
		$scope.inventories = [];
		$scope.countPerPage = 10;
		$scope.pagination = {
			current : 1
		};
		$scope.totalInventories = 0;
		$scope.keyword = "";
		
		$scope.ALLOCATION_STATUS = 1;
		
		$scope.states = [{no : 0,name : "ALL"},{no : 1,name : "FREE"},{no : 2,name : "INSTALLED"},{no : 3,name : "FAULT"}];
		$scope.selectedState = $scope.states[0];
		
		
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
		
		$scope.setSelectedState = function(state){
			$scope.selectedState = state;
		};
		
		
		$scope.referenceTypes = {all : 0,sites : 3,customers : 4};
		$scope.referenceType = $scope.referenceTypes.customers;// for all customers
		$scope.referenceId = 0;
		
		
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
				$scope.updateInventoryAllottedCSV();
			}
			$scope.pageChange = false;
		};
		
    	$scope.refreshInventories = function(getAll){
    		if(!getAll)
    			inventoryService.getInventoryList($scope.keyword, $scope.referenceId, $scope.referenceType, $scope.ALLOCATION_STATUS, $scope.selectedDeviceType.deviceTypeId==undefined? 0 : $scope.selectedDeviceType.deviceTypeId,
    				($scope.pagination.current-1)*$scope.countPerPage, $scope.countPerPage,$scope.selectedState.no,
    				function(response) {
						setInventories(response);
						$scope.setSiteNames();
    				});
    		else{
    			$scope.pagination.current = 1;
        		inventoryService.getInventoryList($scope.keyword, $scope.referenceId, $scope.referenceType, $scope.ALLOCATION_STATUS, $scope.selectedDeviceType.deviceTypeId==undefined? 0 : $scope.selectedDeviceType.deviceTypeId,
        				0, 0,$scope.selectedState.no,
        				function(response) {
    						setInventories(response);
    						$scope.setSiteNames();
        				});
    		}
    	};
		

		inventoryService.getInventoryList($scope.keyword, $scope.referenceId, $scope.referenceType, $scope.ALLOCATION_STATUS, $scope.selectedDeviceType.deviceTypeId==undefined? 0 : $scope.selectedDeviceType.deviceTypeId,
				($scope.pagination.current-1)*$scope.countPerPage, $scope.countPerPage,$scope.selectedState.no,
				function(response) {
					setInventories(response);
				});
		
		$scope.getInventoriesByPage = function(){
			inventoryService.getInventoryList($scope.keyword, $scope.referenceId, $scope.referenceType, $scope.ALLOCATION_STATUS, $scope.selectedDeviceType.deviceTypeId==undefined? 0 : $scope.selectedDeviceType.deviceTypeId,
					($scope.pagination.current-1)*$scope.countPerPage, $scope.countPerPage,$scope.selectedState.no,
					function(response) {
						setInventories(response);
					});
		};

		/***************Inventory Allotted CSV Author: Pragati *******************/
		$scope.csvHeaders1 =  ['Inventory Name','Description','Device Type','State','Unique SN','Location','Location Remarks','Battery Date','Brand']; // this array contains the headers for csv
		$scope.updateInventoryAllottedCSV = function(){
			
			
			try{
				inventoryService.getInventoryList($scope.keyword, $scope.referenceId, $scope.referenceType, $scope.ALLOCATION_STATUS, $scope.selectedDeviceType.deviceTypeId==undefined? 0 : $scope.selectedDeviceType.deviceTypeId,
        				0, 0,$scope.selectedState.no,
        				function(response) {
    						//setInventories(response);
						$scope.csvInventoryAllotted = []; // data for the csv	
						if(response != null)
						{
							$scope.AllInventories = response.data;
							$scope.setSiteNames($scope.AllInventories);
						}
						else
						{
							$scope.AllInventories = [];
							$scope.csvInventoryAllotted = [];
						}
						
						
					for(i=0;i<$scope.AllInventories.length;i++)
					{
						for(j=0;j<$scope.deviceTypes.length;j++){
							
							if($scope.AllInventories[i].deviceTypeId == $scope.deviceTypes[j].deviceTypeId){
								$scope.deviceName = $scope.deviceTypes[j].name;
								break;
							}
						}
						
						//temporary row
						var temp = {
							'Inventory Name':  $scope.AllInventories[i].name,
							'Description' : $scope.AllInventories[i].description,
							'Device Type': $scope.deviceName,
							'State': ($scope.AllInventories[i].state == 1)?"FREE":($scope.AllInventories[i].state == 2)?"INSTALLED":"FAULT",
							'Unique SN': $scope.AllInventories[i].serialNumber,
							'Location': $scope.AllInventories[i].sitename,
							'Location Remarks': $scope.AllInventories[i].locationRemarks,
							'Battery Date': ($scope.AllInventories[i].batteryDate)? $filter('date')(new Date($scope.AllInventories[i].batteryDate), "dd/MM/yyyy"):" ",
							'Brand': $scope.AllInventories[i].brand,
							
						}
						
						$scope.csvInventoryAllotted.push(temp);//pushing the temporary row in array
				}
						//console.log($scope.csvInventoryAllotted);
        				});
				
			}catch(exception){
				console.log(exception);
				console.error("In allotted Inventory update csv");
			}
		}
		
    }];
});
