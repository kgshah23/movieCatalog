/**
 * 
 */
define(['angular'],function(){
	 return ['$scope', '$timeout','$rootScope',function($scope, $timeout,$rootScope){
	$scope.showResponse = function(obj)
	{
		$scope.notice = obj.Response;
		$scope.type = obj.Type;
		if(obj.color != undefined)
		{
			$scope.color = obj.color;
		}
		else
		{
			$scope.color = "white";
		}
	}
	//hide server response div on click of document	
	$rootScope.$on("clickevent", function (event,obj) {
		console.log("in clickevent");	
		$scope.isServerResponse = false;
	});
	 
	$scope.isServerResponse = false;
		$scope.$on("myEvent", function (event,obj) {
		
		  $scope.isServerResponse = true;
		  $scope.showResponse(obj);
		  $timeout(function(){ $scope.showResponse({Response: "" , Type: ""});  $scope.isServerResponse = false; }, 5000);
		});
	 }];
	 
})
