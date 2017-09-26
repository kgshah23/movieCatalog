define(['angular'], function(angular){
    return ['$scope','customerService','siteService','reportService','$filter','$cookieStore','AccessControlService',
            function ($scope,customerService,siteService,reportService,$filter,$cookieStore,AccessControlService) {
    		
    	$scope.status = 1; // Active
    	$scope.keyword = "";
    	$scope.countPerPage = 10;
    	$scope.pagination = {
    			current: 1
    	};
    	$scope.TicketType = [{"id":1,"name":"DEVICE"},{"id":2,"name":"SERVICE"},{"id":3,"name":"INSTALLATION"},{"id":4,"name":"AUDIT"}];
    	$scope.TicketState = [{"id":1,"name":"OPEN"},{"id":2,"name":"ACKNOWLEDGED"},{"id":3,"name":"ASSIGNED"},{"id":4,"name":"RESTORED"},{"id":4,"name":"CLOSE"}];
    	$scope.selectedCustomer = {"id":0,"name":"All Customers"};
    	$scope.selectedSite = {"id":0,"name":"All Sites"};
    	$scope.aging = 3; //By default
    	$scope.submitted = false;
    	$scope.showCustomer = false;
    	$scope.sites = [];
    	
    	var loginData = $cookieStore.get('loginData');
		$scope.loginData = loginData;
		
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
		
    		/****************get list of all customers****************/
    	$scope.getAllCustomers = function(){
    		customerService.getListOfCustomers($scope.status,$scope.keyword,0,0,function(response){
        		$scope.customers = response.data;
        	})
    	}
    	
    	if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTCR)
    	{
    		$scope.showCustomer = true;
    		$scope.getAllCustomers();
    	}
    	
    	
    	/******************set selected customer name***************/
    	$scope.getReportlistByCustomer = function(customer){
    		if(customer != undefined){
    			$scope.selectedCustomer = customer;
    			$scope.customerFilter = customer.name;
    		}
    		else{
    			$scope.customerFilter = "All Customers";
    			$scope.selectedCustomer = {"id":0,"name":"All Customers"};
    		}
    	}
    	
    	/*****************get all Sites *******************************/
    	$scope.getAllSitesForCustomers = function(){
    		if($scope.isCustomerAdmin || $scope.isCL2)
    		{
    			console.log($scope.loginData);
    			siteService.getListOfSites($scope.keyword,$scope.loginData.referenceId,2,0,0,function(response){
            		$scope.sites = response.data;
            	})
    		}
    		else if($scope.isCL3){
    			console.log($scope.loginData);
    			siteService.getListOfSites($scope.keyword,$scope.loginData.userId,1,0,0,function(response){
            		$scope.sites = response.data;
            	})
            	
    		}
    		else
    		{
    			siteService.getListOfSites($scope.keyword,0,0,0,0,function(response){
            		$scope.sites = response.data;
            	})
    		}
    		
    	}
    	$scope.getAllSitesForCustomers();
    		
    	/**************set selected site name****************************/
    	$scope.getReportlistBySite = function(site){
    		if(site != undefined){
    			$scope.selectedSite = site;
    			$scope.siteFilter = site.name;
    		}
    		else{
    			$scope.siteFilter = "All Sites";
    			$scope.selectedSite = {"id":0,"name":"All Sites"};
    		}
    	}
    	
    	/***************set ticket State**********************************/
    	$scope.getReportByState = function(obj){
    		$scope.openticketStatus = obj;
    	}
    	/***************get report after click on the apply button ***********/
    	$scope.getReport = function(){
    		if($scope.aging != null)
    		{
    			var siteID = [];
    			
    			if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator)
    			{
    				siteID.push($scope.selectedSite.id);
    				reportService.getReport($scope.keyword,$scope.selectedCustomer.id,siteID,$scope.aging,0,0,function(response){
            			if(response != null)
            			{
            				$scope.reports = response.data;
                			$scope.total = response.total;
            			}
            			else
            			{
            				$scope.reports =[];
                			$scope.total =0;
            			}
            			$scope.updateCSVReport();
            			
            		})
        		
        		}
    			else if($scope.isCustomerAdmin || $scope.isCL2)
    			{
    				siteID.push($scope.selectedSite.id);
    				reportService.getReport($scope.keyword,$scope.loginData.referenceId,siteID,$scope.aging,0,0,function(response){
            			if(response != null)
            			{
            				$scope.reports = response.data;
                			$scope.total = response.total;
            			}
            			else
            			{
            				$scope.reports =[];
                			$scope.total =0;
            			}
            			$scope.updateCSVReport();
            			
            		})
    			}
    			else if($scope.isCL3)
    			{
    				
    				siteService.getListOfSites($scope.keyword,$scope.loginData.userId,1,0,0,function(response){
    					console.log(response);
                		$scope.sites = response.data;
                		console.log($scope.sites);
                		
                		if($scope.selectedSite.id != 0)
        				{
        					siteID.push($scope.selectedSite.id);
        				}
        				else
        				{
        					for(var i=0;i <($scope.sites).length;i++){
            					siteID.push($scope.sites[i].id);
            				}
        				}
                		console.log(siteID);
                		
        				reportService.getReport($scope.keyword,$scope.loginData.referenceId,siteID,$scope.aging,0,0,function(response){
                			if(response != null)
                			{
                				$scope.reports = response.data;
                    			$scope.total = response.total;
                			}
                			else
                			{
                				$scope.reports =[];
                    			$scope.total =0;
                			}
                			$scope.updateCSVReport();
                			
                		})
                	});
    				
    				/*console.log($scope.sites);
            		
            		if($scope.selectedSite.id != 0)
    				{
    					siteID.push($scope.selectedSite.id);
    				}
    				else
    				{
    					for(var i=0;i <($scope.sites).length;i++){
        					siteID.push($scope.sites[i].id);
        				}
    				}
    				*/
    				
    			}
    			$scope.submitted = false;
    		}
    			
    	}
    	$scope.getReport();
    	
    	/***************get report PDF ***********/
    	$scope.getReportPDF = function(){
    		var loginData = $cookieStore.get('loginData');
    		console.log(loginData);
    		var siteID = [];
    		if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator)
    		{
    			siteID.push($scope.selectedSite.id);
    			window.open(baseUrl+"api/ticket/reportByAging?siteId="+siteID+"&custId="+$scope.selectedCustomer.id+"&agingInDays="+$scope.aging+"&grant_type=access_token&access_token="+loginData.access_token,'_self');
    		}
    		else if($scope.isCustomerAdmin || $scope.isCL2)
    		{
    			siteID.push($scope.selectedSite.id);
    			window.open(baseUrl+"api/ticket/reportByAging?siteId="+siteID+"&custId="+$scope.loginData.referenceId+"&agingInDays="+$scope.aging+"&grant_type=access_token&access_token="+loginData.access_token,'_self');
    		}
    		else if($scope.isCL3)
    		{
    			if($scope.selectedSite.id != 0)
				{
					siteID.push($scope.selectedSite.id);
				}
				else
				{
					for(var i=0;i<$scope.sites.length;i++){
    					siteID.push($scope.sites[i].id);
    				}
				}
    			window.open(baseUrl+"api/ticket/reportByAging?siteId="+siteID+"&custId="+$scope.loginData.referenceId+"&agingInDays="+$scope.aging+"&grant_type=access_token&access_token="+loginData.access_token,'_self');
    		}
    		
    	}
    	/***********************get report on page change******************/
    	$scope.getReportOnPage = function(){
    		var siteID = [];
    		if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator)
			{
				siteID.push($scope.selectedSite.id);
				reportService.getReport($scope.keyword,$scope.selectedCustomer.id,siteID,$scope.aging,($scope.pagination.current-1)*$scope.countPerPage,$scope.countPerPage,function(response){
        			if(response != null)
        			{
        				$scope.reports = response.data;
            			$scope.total = response.total;
        			}
        			else
        			{
        				$scope.reports =[];
            			$scope.total =0;
        			}
        			
        		})
    		
    		}
			else if($scope.isCustomerAdmin || $scope.isCL2)
			{
				siteID.push($scope.selectedSite.id);
				reportService.getReport($scope.keyword,$scope.loginData.referenceId,siteID,$scope.aging,($scope.pagination.current-1)*$scope.countPerPage,$scope.countPerPage,function(response){
        			if(response != null)
        			{
        				$scope.reports = response.data;
            			$scope.total = response.total;
        			}
        			else
        			{
        				$scope.reports =[];
            			$scope.total =0;
        			}
        			
        		})
			}
			else if($scope.isCL3)
			{

				if($scope.selectedSite.id != 0)
				{
					siteID.push($scope.selectedSite.id);
				}
				else
				{
					for(var i=0;i<$scope.sites.length;i++){
    					siteID.push($scope.sites[i].id);
    				}
				}
				
				
				reportService.getReport($scope.keyword,$scope.loginData.referenceId,siteID,$scope.aging,($scope.pagination.current-1)*$scope.countPerPage,$scope.countPerPage,function(response){
        			if(response != null)
        			{
        				$scope.reports = response.data;
            			$scope.total = response.total;
        			}
        			else
        			{
        				$scope.reports =[];
            			$scope.total =0;
        			}
        			
        		})
			}
    		/*if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator)
			{
	    		reportService.getReport($scope.keyword,$scope.selectedCustomer.id,$scope.selectedSite.id,$scope.aging,($scope.pagination.current-1)*$scope.countPerPage,$scope.countPerPage,function(response){
	    			if(response != null)
	    			{
	    				$scope.reports = response.data;
	        			$scope.total = response.total;
	    			}
	    			
	    		})
			}
    		else
    		{
    			reportService.getReport($scope.keyword,$scope.loginData.referenceId,$scope.selectedSite.id,$scope.aging,($scope.pagination.current-1)*$scope.countPerPage,$scope.countPerPage,function(response){
	    			if(response != null)
	    			{
	    				$scope.reports = response.data;
	        			$scope.total = response.total;
	    			}
	    			
	    		})
    		}*/
    	}
    	
    	/****************get ticket Type*********************************/
    	$scope.getTicketType = function(id){
    		for(var i=0;i<$scope.TicketType.length;i++){
    			if($scope.TicketType[i].id == id){
    				return $scope.TicketType[i].name;
    			}
    		}
    	}
    	/****************get ticket State*********************************/
    	$scope.getTicketState = function(id){
    		for(var i=0;i<$scope.TicketState.length;i++){
    			if($scope.TicketState[i].id == id){
    				return $scope.TicketState[i].name;
    			}
    		}
    	}
    	/***********Enter key press on search***************************/
    	$scope.enterKeyEvent = function(){
    		var siteID = [];
    			if($scope.isFTAdmin || $scope.isFTSupervisor || $scope.isFTOperator)
    			{
    				siteID.push($scope.selectedSite.id);
    				reportService.getReport($scope.keyword,$scope.selectedCustomer.id,siteID,$scope.aging,0,$scope.countPerPage,function(response){
            			if(response != null)
            			{
            				$scope.reports = response.data;
                			$scope.total = response.total;
            			}
            			else
            			{
            				$scope.reports =[];
                			$scope.total =0;
            			}
            			
            		})
        		
        		}
    			else if($scope.isCustomerAdmin || $scope.isCL2)
    			{
    				siteID.push($scope.selectedSite.id);
    				reportService.getReport($scope.keyword,$scope.loginData.referenceId,siteID,$scope.aging,0,$scope.countPerPage,function(response){
            			if(response != null)
            			{
            				$scope.reports = response.data;
                			$scope.total = response.total;
            			}
            			else
            			{
            				$scope.reports =[];
                			$scope.total =0;
            			}
            			
            		})
    			}
    			else if($scope.isCL3)
    			{

    				if($scope.selectedSite.id != 0)
    				{
    					siteID.push($scope.selectedSite.id);
    				}
    				else
    				{
    					for(var i=0;i<$scope.sites.length;i++){
        					siteID.push($scope.sites[i].id);
        				}
    				}
    				
    				
    				reportService.getReport($scope.keyword,$scope.loginData.referenceId,siteID,$scope.aging,0,$scope.countPerPage,function(response){
            			if(response != null)
            			{
            				$scope.reports = response.data;
                			$scope.total = response.total;
            			}
            			else
            			{
            				$scope.reports =[];
                			$scope.total =0;
            			}
            			
            		})
    			
    		}
    		
    			/*reportService.getReport($scope.keyword,$scope.selectedCustomer.id,$scope.selectedSite.id,$scope.aging,0,$scope.countPerPage,function(response){
        			if(response != null)
        			{
        				$scope.reports = response.data;
            			$scope.total = response.total;
        			}
        			else
        			{
        				$scope.reports = [];
            			$scope.total = 0;
        			}
        			
        		})*/
    		//}
    	}
    	/*****************************CSV ****************************/
		
		$scope.csvHeaders =  ['Ticket ID','Timestamp','Ticket Type','Device Type','Ticket State','Description','Customer','Site','Assigned To']; // this array contains the headers for csv
		$scope.updateCSVReport = function(){
			
			$scope.csvReport = []; // data for the csv
			console.log($scope.reports);
			try{
			
				for(var i=0;i<$scope.reports.length;i++)
				{
					//temporary row
					for(var j=0;j<$scope.TicketType.length;j++){
		    			if($scope.TicketType[j].id == $scope.reports[i].ticketType){
		    				$scope.TicketTypeName = $scope.TicketType[j].name;
		    			}
		    		}
					for(var j=0;j<$scope.TicketState.length;j++){
		    			if($scope.TicketState[j].id == $scope.reports[i].state){
		    				$scope.TicketStateName =  $scope.TicketState[j].name;
		    			}
		    		}
					var temp1 = {
						'Ticket ID' : "T"+$scope.reports[i].id ,
						'Timestamp':  ($scope.reports[i].createdDate)? $filter('date')(new Date($scope.reports[i].createdDate), "dd/MM/yyyy HH:mm:ss"):"", 
						'Ticket Type' : $scope.TicketTypeName,
						'Device Type' : $scope.reports[i].deviceName,
						'Ticket State' : $scope.TicketStateName,
						'Description' : $scope.reports[i].description,
						'Customer' :  $scope.reports[i].customerName,
						'Site' : $scope.reports[i].siteName,
						'Assigned To' : $scope.reports[i].assignee,
					}
					
					$scope.csvReport.push(temp1);//pushing the temporary row in array
				}	
					console.log($scope.csvReport);
				
			}catch(exception){
				console.log(exception);
				console.error("In report update csv");
			}
		}
		
    }];
});
