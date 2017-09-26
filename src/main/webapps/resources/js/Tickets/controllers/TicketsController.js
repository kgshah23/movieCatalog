/**
 * 
 */
define(['angular'], function(angular){
	return ['$filter','$scope','TicketService','$interval','customerService','siteService','deviceService','userService','$cookieStore','AccessControlService','spinnerService',
	        function ($filter,$scope,ticketService,$interval,customerService,siteService,deviceService,userService,$cookieStore,AccessControlService,spinnerService) {
		
		var loginData = $cookieStore.get('loginData');
		// For my tickets set assigneeId;
		$scope.assigneeId = $scope.CTAssigneeId = loginData.userId;
		

		$scope.isFTAdmin = AccessControlService.isFTAdmin(loginData.roleId);
		$scope.isFranchiseAdmin = AccessControlService.isFranchiseAdmin(loginData.roleId);
		$scope.isCustomerAdmin= AccessControlService.isCustomerAdmin(loginData.roleId);
		$scope.isFTSupervisor= AccessControlService.isFTSupervisor(loginData.roleId);
		$scope.isFTOperator = AccessControlService.isFTOperator(loginData.roleId);
		$scope.isFTInstaller = AccessControlService.isFTInstaller(loginData.roleId);
		$scope.isFTCR = AccessControlService.isFTCR(loginData.roleId);
		$scope.isCL2 = AccessControlService.isCL2(loginData.roleId);
		$scope.isCL3 = AccessControlService.isCL3(loginData.roleId);
		$scope.isFL2 = AccessControlService.isFL2(loginData.roleId);
		
		$scope.openticketStatus={id:0,name:''};
		
		$scope.ticketType = 0;
		$scope.CTticketType = 0;
		$scope.ticketSubType = 0;
		$scope.deviceTypeId = 0;
		$scope.customerId = 0;
		$scope.siteId = 0;
//		$scope.assigneeId = $scope.myticketAssigneeId;
		$scope.ticketState = 0;
		$scope.priority = 0;
		$scope.severity = 0;
		$scope.eta = 0;
		$scope.sortingType = 0;
		$scope.ticketTypeOtherThan = 0;
		$scope.ticketStateOtherThan = 5;
		$scope.openticketStatus.id = 0; //$scope.ticketState
		$scope.search = "";
		$scope.pagination1 = {
				current : 1
		};
		//set default count per page
		$scope.countPerPage = 10;	
		
		//closed tickets parameters
		$scope.CTDeviceTypeId = 0;
		$scope.CTCustomerId = 0;
		$scope.CTSiteId = 0;
//		$scope.CTAssigneeId = $scope.myticketAssigneeId;
		$scope.CTTicketState = 5;
		$scope.CTPriority = 0;
		$scope.CTSeverity = 0;
		$scope.CTEta = 0;
		$scope.CTSortingType = 0;
		$scope.CTticketTypeOtherThan = 0;
		$scope.CTticketStateOtherThan = 0;
//		$scope.openticketStatus.id = 0; //$scope.ticketState
		$scope.CTsearch = "";
		$scope.pagination = {
				currentpage : 1
		};
		//set default count per page
		$scope.closedcountPerPage = 10;
		
		$scope.closedCustomerFilter = 'All Customers';
		var defaultAssignee = $scope.selectedAssignee = $scope.selectedCTAssignee ={id:0,firstName:'All Assignees',lastName:''};
		
		// Ticket states
		$scope.ticketStates = [ {
			id : 1,
			name : 'Open',
			color: '#fb6a6a'
		},{
			id : 2,
			name : 'Acknowledged',
			color: '#e2a94a'
		}, {
			id : 3,
			name : 'Assigned',
			color: '#e2a94a'
		}, {
			id : 4,
			name : 'Restored',
			color: '#4a90e2'
		}, {
			id : 5,
			name : 'Closed',
			color: '#6bc97b'
		} ];
		//get ticket state
		$scope.getTicketState = function(state,ticket) {
			for (var i = 0; i < $scope.ticketStates.length; i++) {
				if (state == $scope.ticketStates[i].id) {
					if(ticket != undefined)
					{
						ticket.selectedColor = $scope.ticketStates[i].color;
					}
					return $scope.ticketStates[i].name;
				}
			}
		};	
		
		$scope.ticketTypes = [{id : 1,name : 'DEVICE'},{id : 2,name : 'SERVICE'},{id : 3,name : 'INSTALLATION'},{id : 4,name : 'AUDIT'}];
		
		//get ticket type
		$scope.getTicketType = function(type){
			for(var i=0;i<$scope.ticketTypes.length;i++){
				if($scope.ticketTypes[i].id == type)
				{
					return $scope.ticketTypes[i];
				}
			}
		};
		
		$scope.ticketCondition = [{id: 0, name:"NONE"},{id: 1, name:"ALARM"},{id: 2, name:"FAULT"}]
		// get ticket condition
		$scope.getTicketCondition = function(condition){
			for(var i=0;i<$scope.ticketCondition.length;i++){
				if($scope.ticketCondition[i].id == condition)
				{
					return $scope.ticketCondition[i].name;
				}
			}
			return '-';
			
		}
		
		/**************************** list all customers *******************************/
		$scope.customers = [];
		var listAllCustomers = function(response) {
			if (response != undefined) {
				console.log(response.data);
				$scope.customers = response.data;
				$scope.totalCustomers = response.total;
			}else{
				$scope.customers = [];
			}
		};
		
		
		// get all customers with status = active =1
		if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTCR || $scope.isFTOperator){
			customerService.getListOfCustomers(1,"", 0, 0,listAllCustomers);
		}
		
		
		/************************* List  Device Types **************************/
    	
    	$scope.deviceTypes = [];
    	$scope.totalDeviceTypes = 0;
    	$scope.selectedDeviceType = {deviceTypeId:0, name : "All Devices"};
    	$scope.CTSelectedDeviceType = {deviceTypeId:0, name : 'All Devices'};
    	
    	deviceService.getDeviceTypes(function(response){
			$scope.deviceTypes = response.data;
			$scope.totaldeviceTypes = response.total;
		});
    	
    	$scope.setDeviceType = function(deviceType){
    		if(deviceType != undefined){
    			$scope.selectedDeviceType = deviceType;
    			$scope.deviceTypeId = deviceType.deviceTypeId;
    		}else{
    			$scope.selectedDeviceType = {deviceTypeId:0,name: "All Devices"};
    			$scope.deviceTypeId = 0;
    		}
    		$scope.getListOfTickets();
    	};
    	
    	$scope.setCTDeviceType = function(deviceType){
    		if(deviceType != undefined){
    			$scope.CTSelectedDeviceType = deviceType;
    			$scope.CTDeviceTypeId = deviceType.deviceTypeId;
    		}else{
    			$scope.CTSelectedDeviceType = {deviceTypeId:0,name: "All Devices"};
    			$scope.CTDeviceTypeId = 0;
    		}
    		$scope.getListOfClosedTickets();
    	};
    	
    	/***********************************************/
    	
		/************************* Get all sites **********************************/
    	
    	$scope.totalSites = 0;
    	$scope.selectedSite = "All Sites";
    	$scope.getsites = function(){
    		spinnerService.showSpinner();
    		var activesites = [];
			siteService.getListOfSites("",
					$scope.refId,$scope.refTypeId, 0,
					0,  function(response){
				var sites = [];
				
				var count=0;
				if(response != null){
					sites = response.data;
//					$scope.totalSites = response.total;
					for (var i = 0; i< response.total; i++){
						if (sites[i].status == 1){
							activesites[count++] = sites[i];
						}
					}
				}
				
				
			});
			return activesites;
    	};
    	$scope.getSitesList = function(){

			if (loginData.userTypeId != 1) {
				if($scope.isCustomerAdmin || $scope.isCL2 || $scope.isFranchiseAdmin){
					$scope.refId = loginData.referenceId; // cust id or Franchisee id
					$scope.refTypeId = loginData.userTypeId; // customer sites -2
				}
				else if($scope.isCL3 || $scope.isFL2){
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
				$scope.refId = $scope.customerId;
				$scope.refTypeId = 0;
				/*if (path.indexOf('/dashboard/franchise') == 0){
					$scope.refTypeId = 3;
				}
				else{
					$scope.refTypeId = 2; //customer sites
				}*/
				}
			}
			
			$scope.sites = $scope.ctsites = $scope.getsites();
		};
//		if(!$scope.isFTOperator){
			$scope.getSitesList();
//		}
		
    	$scope.getTicketslistBySite = function(site){
    		if(site != undefined){
	    		$scope.selectedSite = site.name;
	    		$scope.siteId = site.id;
    		}else{
	    		$scope.siteId = 0;
	    		$scope.selectedSite = 'All Sites'; 
    		}
    		$scope.getListOfTickets();
    	};
    	
    	$scope.getClosedTicketslistBySite = function(site){
    		if(site != undefined){
	    		$scope.closedSiteFilter = site.name;
	    		$scope.CTSiteId = site.id;
    		}else{
    			$scope.closedSiteFilter = 'All Sites'; 
	    		$scope.CTSiteId = 0;
    		}
    		$scope.getListOfClosedTickets();
    	};
    	
    	/******************************* Get all asssignees *****************************/
    	
		/*userService.getListOfUsers("",0, 0,0,0,
				function(response) {
					if(response != null){
							console.log(response.data);
							$scope.users = response.data;
							$scope.totalUsers = response.total;
					}
					else{
						$scope.users = [];
						$scope.totalUsers = 0;
					}
		});
		
		
		
		$scope.getTicketsByAssignee = function(assignee){
			if(assignee != undefined){
	    		$scope.selectedAssignee = assignee;
	    		$scope.assigneeId = assignee.id;
    		}else{
	    		$scope.assigneeId = 0;
	    		$scope.selectedAssignee = defaultAssignee;
    		}
    		$scope.getListOfTickets();
		};
		
		$scope.getClosedTicketsByAssignee = function(assignee){
			if(assignee != undefined){
	    		$scope.selectedCTAssignee = assignee;
	    		$scope.CTAssigneeId = assignee.id;
    		}else{
	    		$scope.CTAssigneeId = 0;
	    		$scope.selectedCTAssignee = defaultAssignee;
	    		
    		}
    		$scope.getListOfClosedTickets();
		};*/
		
    	/******************************* Get all tickets by type ***************************/ 
    	
    	$scope.getTicketslistByTicketType = function(Type,openTicketType){
    		$scope.openTicketType = openTicketType;
    		if(Type == 0){
    			$scope.ticketTypeOtherThan = 0;
    			$scope.ticketType = 0;
    		}
    		else if(Type == 1){
    			$scope.ticketTypeOtherThan = 0;
    			$scope.ticketType = 1;
    		}
    		else {
    			$scope.ticketTypeOtherThan = 1;
    			$scope.ticketType = 0;
    		}
    		$scope.getListOfTickets();
    	};
    	$scope.getClosedTicketslistByTicketType = function(Type,closedTicketType){
    		$scope.closedTicketType = closedTicketType;
    		if(Type == 0){
    			$scope.CTticketTypeOtherThan = 0;
    			$scope.CTticketType = 0;
    		}
    		else if(Type == 1){
    			$scope.CTticketTypeOtherThan = 0;
    			$scope.CTticketType = 1;
    		}
    		else {
    			$scope.CTticketTypeOtherThan = 1;
    			$scope.CTticketType = 0;
    		}
    		$scope.getListOfClosedTickets();
    	};
    	/******************************* Get all tickets by customer ***************************/ 
    	$scope.getTicketslistByCustomer = function(customer){
    		if(customer != undefined){
				$scope.customerFilter = customer.name;
				$scope.customerId =  customer.id ;
				$scope.refTypeId = 2;
			}
    		else{
    			$scope.customerFilter = 'All Customers';
				$scope.customerId =  0 ;
				$scope.refTypeId = 0;
    		}
    		$scope.refId = $scope.customerId;
    		$scope.sites = [];
    		$scope.sites = $scope.getsites();
    		$scope.getListOfTickets();
    	};
    	
    	$scope.getClosedTicketslistByCustomer = function(customer){
    		if(customer != undefined){
				$scope.closedCustomerFilter = customer.name;
				$scope.CTCustomerId =  customer.id ;
				$scope.refTypeId = 2;
			}
    		else{
    			$scope.closedCustomerFilter = 'All Customers';
				$scope.CTCustomerId =  0 ;
				$scope.refTypeId = 0;
    		}
    		$scope.refId = $scope.CTCustomerId;
    		$scope.ctsites = [];
    		$scope.ctsites = $scope.getsites();
    		$scope.getListOfClosedTickets();
    	};
    	
    	/******************************** Get tickets by status **********************************/
    	
    	$scope.getTicketsByStatus = function(status){
    		$scope.openticketStatus = status;
    		$scope.getListOfTickets();
    	};
    	
       /*********************************** Get list of tickets ***********************************/
		
		 $scope.listAllTickets = function(response) {
				if(response != null){
					console.log(response.data);
					$scope.tickets = response.data;
					$scope.totalTickets = response.total;
					console.log("$scope.totalTickets : opn "+ $scope.totalTickets);
				}
				else{
					if($scope.pagination1.current > 1){ 
						// after deleting all entries on current page and pages are >1
						$scope.pagination1.current--;
						$scope.getListOfTickets();
					}
					else{
						$scope.tickets = [];
						$scope.totalTickets = 0;
					}
				}
			};
			
		$scope.getListOfTickets = function(){
			ticketService.getListOfTickets($scope.ticketType,/*$scope.ticketSubType,*/$scope.deviceTypeId,$scope.customerId,$scope.siteId,$scope.
					assigneeId,$scope.openticketStatus.id,$scope.priority,$scope.severity,$scope.eta,$scope.sortingType,$scope.ticketTypeOtherThan,$scope.ticketStateOtherThan,$scope.search,
					$scope.pagination1.current,
					$scope.countPerPage,$scope.listAllTickets);
		};
		
		//call to function on page load to get all event tickets
		$scope.getListOfTickets();

		// handle enter key event on search box
		$scope.enterKeyEvent = function($event,state)
		{
			if($event.which == 13)
			{	
				if(state == 'close'){
					$scope.getListOfClosedTickets();
				}
				else{
					$scope.getListOfTickets();
				}
			}
		};
		//get event tickets when search box is empty on keyup of search box
		$scope.fillEventTicketsTable = function()
		{
			if($scope.search == "")
			{
				$scope.getListOfTickets();
			}
		};
		$scope.fillClosedTicketsTable = function()
		{
			if($scope.CTsearch == "")
			{
				$scope.getListOfClosedTickets();
			}
		};

		
		/******************** Closed tickets ****************/

		$scope.getListOfClosedTickets = function(){
			ticketService.getListOfTickets($scope.CTticketType,/*$scope.ticketSubType,*/$scope.CTDeviceTypeId,$scope.CTCustomerId,$scope.CTSiteId,$scope.
					CTAssigneeId,$scope.CTTicketState,$scope.CTPriority,$scope.CTSeverity,$scope.CTEta,$scope.CTSortingType,$scope.CTticketTypeOtherThan,$scope.CTticketStateOtherThan,$scope.CTsearch,
					$scope.pagination.currentpage,
					$scope.closedcountPerPage,function(response) {
				if(response != null){
					console.log(response.data);
					$scope.closedTickets = response.data;
					$scope.totalClosedTickets = response.total;
					console.log("$scope.totalClosedTickets : closen "+ $scope.totalClosedTickets);
				}
				else{
					if($scope.pagination.currentpage > 1){ 
						// after deleting all entries on current page and pages are >1
						$scope.pagination.currentpage--;
						$scope.getListOfTickets();
					}
					else{
						$scope.closedTickets = [];
						$scope.totalClosedTickets = 0;
					}
				}
			});
		};
		
		$scope.getListOfClosedTickets();
		
		// get tickets after every 10 seconds
		$scope.stop = $interval(function() {
			console.log('=================================in timer my tickets fn======================');
			$scope.getListOfTickets();
			$scope.getListOfClosedTickets();
		}, 10000);
		
		// on location change stop the interval function
		
		$scope.$on('$destroy', function() {
			// clean up stuff
//			alert('ss');
			$interval.cancel($scope.stop);
		});
		/************************************get ticket type ***************/
		// Ticket Action Status
		$scope.ticketStatus = [{id : 1,name : 'NOT_STARTED'},{id : 2,name : 'IN_PROGRESS'},{id : 3,name : 'DONE'}];
		
		// get ticket status
		$scope.getStatus = function(status){
			for(var i=0;i<$scope.ticketStatus.length;i++){
				if($scope.ticketStatus[i].id == status)
				{
					return $scope.ticketStatus[i];
				}
			}
		};
		/*********************************************************************/
		
		// sensors
		$scope.sensors = [{id:1,name:"Gateway"},{id:2,name:"Repeater"},{id:3,name:"Fire Extinguisher"},{id:4,name:"Fire Hydrants"},{id:5,name:"Fire Alarm System"}];
		
		// return the sensor name
		$scope.getSensor = function(sensorType){
			for(var i=0;i<$scope.sensors.length;i++){
				if($scope.sensors[i].id == sensorType)
				{
					return $scope.sensors[i].name;
				}
			}
			return '-';
		};
		/****************************************************************************/
		
		//Export to csv - Author : Karan Rawal
		
		$scope.csvOpenTicketHeaders =  ['Ticket ID','Creation Timestamp','Ticket Type','Device Type','Category','Description','Customer','Site/Location','Expected Time','Ticket State','Restored Timestamp','Assigned To']; // this array contains the headers for csv
		$scope.csvOpenTickets = []; // data for the csv
		
		$scope.csvClosedTicketHeaders =  ['Ticket ID','Closed Timestamp','Ticket Type','Device Type','Category','Description','Customer','Site/Location','Ticket State','Last Assignee']; // this array contains the headers for csv
		$scope.csvClosedTickets = []; // data for the csv
		
		$scope.updateCsvTickets = function(isOpen){
			try{
				var columns = isOpen ? ['id', 'createdDate', 'ticketType', 'deviceType', 'Category',
										'description', 'customerName',  'siteandlocation', 'Expected Time', 
										'state', 'restoredTimestamp', 'assignedTo'] 
									: ['id', 'createdDate', 'ticketType', 'deviceType', 'Category',
										'description', 'customerName', 'siteandlocation', 'state', 'Last Assignee'];
				ticketService.registerCtrlr(this);
				var tickets = ticketService.fetchTicketsForCsv($scope.CTticketType,
					isOpen ? $scope.deviceTypeId : $scope.CTDeviceTypeId,
					isOpen ? $scope.customerId : $scope.CTCustomerId,
					isOpen ? $scope.siteId : $scope.CTSiteId,
					isOpen ? $scope.assigneeId : $scope.CTAssigneeId,
					isOpen ? $scope.openticketStatus.id : $scope.CTTicketState,
					isOpen ? $scope.priority : $scope.CTPriority,
					isOpen ? $scope.severity : $scope.CTSeverity,
					isOpen ? $scope.eta : $scope.CTEta,
					isOpen ? $scope.sortingType : $scope.CTSortingType,
					isOpen ? $scope.ticketTypeOtherThan : $scope.CTticketTypeOtherThan,
					isOpen ? $scope.ticketStateOtherThan : $scope.CTticketStateOtherThan,
					'',
					0,
					0,
					columns);
				return (tickets ? tickets : []);
			}catch(exception){
				console.log(exception);
				console.error("Error fetching " + (isOpen ? "open" : "closed") + " tickets in csv");
				return [];
			}
		}
	}];
});
