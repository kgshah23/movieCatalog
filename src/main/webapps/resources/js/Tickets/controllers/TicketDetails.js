/**
 * 
 */
define(['angular'], function(angular){
    return ['$scope','$state','TicketService','AccessControlService','$cookieStore','userService','siteService','$filter',
            function ($scope,$state,TicketService,AccessControlService,$cookieStore,userService,siteService,$filter) {
    	
    		//Ticket Id
    		$scope.id = $state.params.tid;
    		console.log($scope.id);
    		
    		// Hide and show logic
    		$scope.saveDisable = true; 
    		$scope.FieldDisable = true; 
    		$scope.statusdisabled = true;
    		$scope.editTicketDetails = true;
    		var loginData = $cookieStore.get('loginData');
    		$scope.loginData = loginData;
    		//role based access
//    		$scope.isFTUsers = (loginData.userTypeId ==1) ? true : false;
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
    		
			$scope.save = function($event){
				$scope.open('md','ticketChangeComment.html',$scope.ticket,$scope.saveInfo,$event,true);
			}
			
			// save Info after click on the save button
    		$scope.saveInfo = function(comment){
    			$scope.submitted = true;
    			if($scope.ticketInfo.$valid){
    				$scope.saveDisable = true; 
            		$scope.FieldDisable = true;
            		$scope.statusdisabled = true;
        			$scope.nositeUsers = true;
            		TicketService.updateTicketDetails($scope.ticket.id,$scope.SelectedState.id,$scope.ticket.siteLocationDeviceId,
            				$scope.ticket.siteId,$scope.ticket.assigneeId,$scope.ticket.eta,$scope.SelectedticketStatus.id,
    						comment,$scope.ticket.description,$scope.ticket.serialNumber,function(response){
        				console.log("update ticket success");
        				$scope.getTicketDetails();
        				$scope.getTicketHistory();
            		});
    			}
    			
    		};
    		
    		$scope.cancelInfo = function(){
    			$scope.saveDisable = true; 
        		$scope.FieldDisable = true;
        		$scope.statusdisabled = true;
        		$scope.editTicketDetails = false;
        		$scope.submitted = false;
        		$scope.nositeUsers = true;
        		$scope.ticket =  JSON.parse($scope.oldTicketData);
        		$scope.SelectedState = $scope.getTicketState($scope.ticket.state);
				//set action status of ticket
				$scope.SelectedticketStatus = $scope.getTicketStatus($scope.ticket.ticketStatus);
				$scope.ticketassignee = 'Select Assignee';
				for (siteuser in $scope.siteusers){
					if($scope.siteusers[siteuser].id == $scope.ticket.assigneeId){
						$scope.ticketassignee =  $scope.siteusers[siteuser].firstName + " " + $scope.siteusers[siteuser].lastName;
						break;
					}
				}
    		};
    		// Ticket states
    		$scope.states = [{id:1,name:"OPEN"},{id:2,name:"ACKNOWLEDGED"},{id:3,name:"ASSIGNED"},{id:4,name:"RESTORED"},{id:5,name:"CLOSED"}];
    	
			// sensors
    		$scope.sensors = [{id:1,name:"Gateway"},{id:2,name:"Repeater"},{id:3,name:"Fire Extinguisher"},{id:4,name:"Hydrant and Sprinkler System"},{id:5,name:"Fire Alarm System"}];
    		
    		// Ticket Action Status
    		$scope.ticketStatus = [{id : 1,name : 'NOT STARTED'},{id : 2,name : 'IN PROGRESS'},{id : 3,name : 'DONE'}];
    		
    		// set Ticket Action Status
    		$scope.setTicketActionState = function(ticket_status){
    			$scope.SelectedticketStatus = ticket_status;
    		};
    		
    		// set Ticket State
    		$scope.setTicketState = function(state){
    			$scope.SelectedState = state;
    		};
    		
    		// GET Site users 
    		$scope.keyword = "";
//    		$scope.siteId = $scope.ticket.siteId; // TODO remove hardcoded site id
    		$scope.roleId = 0;
    		$scope.userTypeId = 0;
    		$scope.pageStart = 0;
    		$scope.pageCount = 0;
    		$scope.siteusers = [];
    		$scope.ticket = [];
    		$scope.ticketassignee = 'Select Assignee';
    		$scope.nositeUsers = true;
    		
    		// Get  ticket details
    		$scope.getTicketDetails = function(){
    			$scope.submitted = false;
    			TicketService.getTicket($scope.id,function(response){

    				console.log(response);
        			console.log("success");
        			$scope.ticket = response;
    				
    				$scope.siteId =  $scope.ticket.siteId; // Site Id
    				
    				$scope.BOQDownload();
    				$scope.AuditDownload();
    				
    				$scope.oldTicketData = angular.toJson($scope.ticket);
    				// set selected state of ticket
    				$scope.SelectedState = $scope.getTicketState($scope.ticket.state);
    				//set action status of ticket
    				$scope.SelectedticketStatus = $scope.getTicketStatus($scope.ticket.ticketStatus);
    				
    				//enable edit button if ticket is assigned to logged in user or if user is ftadmin / operator/ supervisor
    				if(loginData.userId == $scope.ticket.assigneeId || $scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator  ){
    	    			$scope.editTicketDetails = false;
    				}
    				
    				if($scope.ticket.siteId != 0){
    					TicketService.getSiteUsers($scope.keyword,$scope.ticket.siteId,$scope.roleId,$scope.userTypeId,$scope.pageStart,$scope.pageCount,function(response){
    		    			if(response != null){
    		    				$scope.siteusers = response.data;
    		    				for (siteuser in $scope.siteusers){
    	        					if($scope.siteusers[siteuser].id == $scope.ticket.assigneeId){
    	        						$scope.ticketassignee =  $scope.siteusers[siteuser].firstName + " " + $scope.siteusers[siteuser].lastName;
    	        						break;
    	        					}
    	        				}
    		    			}
    		    			else{
    		    				$scope.siteusers = [];
    		    				$scope.ticketassignee = 'No users found for site.';
    		    			}
    		    		});
    				}
    				else{
    				if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator){
					userService.getListOfUsers("",$scope.ticket.referenceId,0,0,0,
							function(response) {
								if(response != null){
										console.log(response.data);
										$scope.siteusers = response.data;
//										$scope.totalUsers = response.total;
										for (siteuser in $scope.siteusers){
				        					if($scope.siteusers[siteuser].id == $scope.ticket.assigneeId){
				        						$scope.ticketassignee =  $scope.siteusers[siteuser].firstName + " " + $scope.siteusers[siteuser].lastName;
				        						break;
				        					}
				        				}
								}
								else{
										$scope.siteusers = [];
//										$scope.totalUsers = 0;
									}
							});
					
    				}
				}
    				
    				
    				
        		});
    		};
    		
    		$scope.getTicketDetails();
    		
			 // Enable Form fields on the click on edit button 
			 $scope.enableFormFields = function(){
				 $scope.saveDisable = false;
				 $scope.editTicketDetails = true;
				 $scope.statusdisabled = false;
				 if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator){
					 $scope.FieldDisable = false;
					 if($scope.siteusers.length){
						 $scope.nositeUsers = false;
					 }
					 
				 }
			 };		

			 
    		$scope.setSiteuser = function(siteuser){
    			$scope.siteuser = siteuser;
    			console.log($scope.siteuser);
    			$scope.ticket.assignee = siteuser.firstName + " " + siteuser.lastName;
    			$scope.ticket.assigneeId = $scope.siteuser.id;
    			$scope.ticketassignee = $scope.ticket.assignee;
    		};
    		
    		// get sensor details
    		TicketService.getSensorDetails($scope.id,function(response){
    			console.log("Sensor details success");
    			if(response != null)
    			{
    				$scope.sensor = response;
    				console.log($scope.sensor);
    			}
    			
    		});
    		
    		// get Ticket history
    		$scope.getTicketHistory = function(){
    			TicketService.getTicketHistory($scope.id,function(response){
        			console.log("History details success");
        			if(response != null)
        			{
    	    			$scope.ticketHistory = response.data;
    					console.log($scope.ticketHistory);
        			}
        			else{
        				$scope.ticketHistory = [];
        			}
        		});
    		};
    		
    		$scope.getTicketHistory();
    		
    		// return the current state of the ticket
    		$scope.getTicketState = function(ticketstate){
    			for(var i=0;i<$scope.states.length;i++){
    				if($scope.states[i].id == ticketstate)
    				{
    					return $scope.states[i];
    				}
    			}
    		};
    		
    		// return the current status of the ticket
    		$scope.getTicketStatus = function(ticketstatus){
    			for(var i=0;i<$scope.ticketStatus.length;i++){
    				if($scope.ticketStatus[i].id == ticketstatus)
    				{
    					return $scope.ticketStatus[i];
    				}
    			}
    		};
    		
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
    		
    		
    		/************************GET TICKET EXPENSE*********************************************/
    		
    		// get ticket expense details
    		$scope.id = $state.params.tid; // Ticket Id
    		$scope.getTicketExpenseDeatils = function(){
    			if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator)
    			{
    				TicketService.getTicketExpense(0,$scope.id,0,0,function(response){
        				if(response != null)
        				{
        					$scope.ticketexpense = response.data;
        				}
        				
        				console.log("expense success");
        				console.log(response);
        			})
    			}
    			else
    			{
    				TicketService.getTicketExpense(loginData.userId,$scope.id,0,0,function(response){
        				if(response != null)
        				{
        					$scope.ticketexpense = response.data;
        				}
        				
        				console.log("expense success");
        				console.log(response);
        			})
    			}
    			
    		}
    		
    		$scope.getTicketExpenseDeatils();
    		/***************************************************************************/
    		
    		
    		// Ticket types
    		$scope.Tickettypes = [{id:0,name:"All"},{id:1,name:"Device"},{id:2,name:"Service"},{id:3,name:"Installation"},{id:4,name:"Audit"}];
    		
    		// return the sensor name
    		$scope.getTicketType = function(Type){
    			for(var i=0;i<$scope.Tickettypes.length;i++){
    				if($scope.Tickettypes[i].id == Type)
    				{
    					return $scope.Tickettypes[i];
    				}
    			}
    		};
    		
    		/***************************************CSV BOQ***************************************/
    		$scope.getBoqDeviceTypes = function(siteBoq) {
				$scope.siteBoq.gateway = 0;
				$scope.siteBoq.repeater = 0;
				$scope.siteBoq.FE = 0;
				$scope.siteBoq.FH = 0;
				$scope.siteBoq.FAS = 0;
				if(siteBoq != undefined){
					for(var i=0;i<$scope.siteBoq.siteBoqResponse.length;i++)
					{
						switch($scope.siteBoq.siteBoqResponse[i].name)
						{
						case "Gateway":
										$scope.siteBoq.gateway = $scope.siteBoq.siteBoqResponse[i].quantity;
										break;
						case "Repeater":
										$scope.siteBoq.repeater = $scope.siteBoq.siteBoqResponse[i].quantity;
										break;
						case "FES":
										$scope.siteBoq.FE = $scope.siteBoq.siteBoqResponse[i].quantity;
										break;
						case "HSS":
										$scope.siteBoq.FH = $scope.siteBoq.siteBoqResponse[i].quantity;
										break;
						default:
										$scope.siteBoq.FAS = $scope.siteBoq.siteBoqResponse[i].quantity;
						}
					}
				}
				
				$scope.siteBoq.total = $scope.siteBoq.gateway + $scope.siteBoq.repeater + $scope.siteBoq.FE + $scope.siteBoq.FH +  $scope.siteBoq.FAS ;
			};
			
			
    		$scope.BOQDownload = function(){
    			siteService
				.getSiteBoq(
						$scope.siteId,
						function(response) {
							if (response != null) {
								$scope.siteBoq = response;
								$scope.getBoqDeviceTypes(response);
								$scope.updateCsvBOQ();
								
							}
						});
    		}
    		
    		
    		$scope.csvHeaders =  ['Auditor','Audit Date','Gateways','Repeaters','Fire Extinguishers','Fire Hydrants','Fire Alarm Systems','Total'];; // this array contains the headers for csv
			$scope.updateCsvBOQ = function(){
				
				$scope.csvSiteBOQ = []; // data for the csv
				
				try{
				
						//temporary row
						var temp1 = {
							'auditor' : $scope.siteBoq.auditor,
							'Audit Date':  ($scope.siteBoq.auditDate)? $filter('date')(new Date($scope.siteBoq.auditDate), "dd/MM/yyyy"):"", 
							'Gateways' : $scope.siteBoq.gateway,
							'Repeaters' : $scope.siteBoq.repeater,
							'Fire Extinguishers' : $scope.siteBoq.FE,
							'Fire Hydrants' : $scope.siteBoq.FH,
							'Fire Alarm Systems' :  $scope.siteBoq.FAS,
							'Total' : $scope.siteBoq.total,
						}
						
						$scope.csvSiteBOQ.push(temp1);//pushing the temporary row in array
						console.log($scope.csvSiteBOQ);
					
				}catch(exception){
					console.log(exception);
					console.error("In sites inventories update csv");
				}
			}
			
			/*********************************CSV AUDIT**********************************/
			$scope.AuditDownload = function(){
    			siteService
				.getSiteAudit(
						$scope.siteId,
						function(response) {
							if (response != null) {
								$scope.siteAudit = response;
								$scope.updateCsvAudit();
							}
						});
    		}
			
			$scope.csvHeaders1 =  ['Audit Date','Site Remark','Product Type','Status','Location Remark','Comment'];; // this array contains the headers for csv
			$scope.updateCsvAudit = function(){
				
				$scope.csvSiteAudit = []; // data for the csv
				try{
					
					for(i=0;i<$scope.siteAudit.siteAuditDeviceResponse.length;i++)
					{
						//temporary row
						var temp = {
							'Audit Date': ($scope.siteAudit.auditDate)? $filter('date')(new Date($scope.siteAudit.auditDate), "dd/MM/yyyy"):"",
							'Site Remark' : $scope.siteAudit.remarks,
							'Product Type': ($scope.siteAudit.siteAuditDeviceResponse[i].productTypeId == 1)? "FES":($scope.siteAudit.siteAuditDeviceResponse[i].productTypeId == 2)?"HSS":"FAS",
							'Status': ($scope.siteAudit.siteAuditDeviceResponse[i].status == 1)? "FUNCTIONAL":"NON_FUNCTIONAL",
							'Location Remark': $scope.siteAudit.siteAuditDeviceResponse[i].location,
							'Comment': $scope.siteAudit.siteAuditDeviceResponse[i].remarks,
						}
						
						$scope.csvSiteAudit.push(temp);//pushing the temporary row in array
				}
						console.log($scope.csvSiteAudit);
				}catch(exception){
					console.log(exception);
					console.error("In sites inventories update csv");
				}
			}
    		
    }];
});
