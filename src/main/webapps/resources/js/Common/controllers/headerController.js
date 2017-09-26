define(['angular'], function(angular){
    return ['$scope', '$location','$state', '$log',
            function ($scope, $location,$state, $log) {
    	
    	$scope.isloggedIn = false;
		$scope.firstName = '';
    	$scope.lastName = ''; 
    	
    	/*if(loginData){
    	$scope.isloggedIn = true;
    	$scope.firstName = loginData.firstName;
    	$scope.lastName = loginData.lastName;
    	}*/
    	  
    	  /*if (path.length > 1) {
				$location.path(path);
			} else {
				$location.path("/login");
//				 $state.go('login');
			}*/
    	  $state.go('common.login');
    }];
});
