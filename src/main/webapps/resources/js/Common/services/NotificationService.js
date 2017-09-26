define([], function() {
	angular.module('notificationModule', [ 'ngAnimate', 'ui.bootstrap' ,'modalModule'])
			.factory('NotificationService',

			['$uibModal','$timeout','$rootScope',function($uibModal,$timeout,$rootScope) {	

				var open = function(size, noticearg , noticeType,noticeHeading) {
					$rootScope.$broadcast("CloseModals");
					var modalInstance = $uibModal.open({
						animation: true,
						templateUrl : "core/resources/js/Common/templates/notificationTemplate.html",
						size : size,
						windowClass:'nobackground',
//						openedClass:'notification',
						controller : function($scope,$uibModalInstance){
							$scope.data = {
									notice : noticearg,
									type : noticeType,
									heading: noticeHeading
							}; 
							/*$scope.removecssclass = function(){
//								angular.element(document.querySelector('.notification'))[0].parentNode.className = 'modal-content nobackground';
							};*/
							$rootScope.$on("CloseModals", function () {
								console.log("in CloseModals");	
								 $scope.cancel();
								
							});
							
							$scope.ok = function()
							{
								$uibModalInstance.close();
							};
							$scope.cancel = function() {
								$uibModalInstance.dismiss('cancel');
							};
							/*$timeout(
									function() {
										$scope.cancel();
							},2000);*/
						}
					});

					modalInstance.result.then(function() {
						console.log("ok");
					}, function() {
						console.log("cancel");
					});

				};
				
				return {
					show : open
				};

			}]);
});