define([ 'angular' ], function(angular) {
	return [ '$scope', '$location', '$state', '$uibModal','userService', '$log', 'Idle','$cookieStore','$location','NotificationService','$rootScope','$timeout','$document',
			function($scope, $location, $state, $uibModal,userService, $log, Idle,$cookieStore,$location,NotificationService,$rootScope,$timeout,$document) {

		
				/************* ngIdle - Karan ***********/
				console.log(Idle);
				
				
				
				$scope.$on('IdleStart', function() {
					console.log('idle start');
				});
				
				$scope.$on('IdleEnd', function() {
					console.log('idle end');
			    });

			    $scope.$on('IdleTimeout', function() {
			    	 
			    	 userService.logoutUser(function(response){
			    		 $cookieStore.remove('loginData');
				    	 $cookieStore.remove('loggedin');
	    				 $location.path("/login");
	 	    			 Idle.unwatch();
		    			 NotificationService.show("md","You have been disconnected for being inactive.","danger","Logout");
			    	 });
	    			 
	    			 if(timeout!=undefined){
	    				 $timeout.cancel($rootScope.timeoutPromise);
	    			 }
	    			 
	    			
			    	
			    });
				
			   $scope.clickOutsideMsg = function(){
			    	 $rootScope.$broadcast('clickevent');
			    };
				
				
				/************* ngIdle - end **************/
		
				$scope.open = function(size, template, dataarg, callbackarg,$event,makeStatic) {
					if($event != undefined)
					{
						$event.target.blur();
					}
					var modalInstance = $uibModal.open({
						size : size,
						animation : false,
						templateUrl : template,
						controller : 'ModalInstanceController',
						backdrop  : makeStatic == undefined? 'none' : makeStatic,
						keyboard  : false,
						resolve : {
							data : function() {
								var data = {
									data : dataarg,
									template : template.split('.')[0],
									callback : callbackarg
								};
								return data;
							}
						}
					});

					modalInstance.result.then(function() {
						console.log("ok");
					}, function() {
						if(dataarg.cancelFunc != undefined){
							dataarg.cancelFunc();
						}
						console.log("cancel");
					});

				};

				if (path.length > 1) {
					$location.path(path);
				} else {
					$location.path("/login");
				}
			} ];
});
