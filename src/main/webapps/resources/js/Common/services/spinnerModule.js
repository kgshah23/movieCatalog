/**
 * 
 */
define([], function() {
	angular.module('spinnerModule', [ 'ngAnimate', 'ui.bootstrap'])
	.factory('spinnerService',

			['$rootScope','$document','$window',function($rootScope,$document,$window) {	

				var showSpinner= function(size) {
					 var body = $document[0].body;
					    body.style.overflow = "hidden !important";
					    angular.element($document[0].body).css('overflow', 'hidden');
					    angular.element($document[0].body).css('opacity', '0.5');
					    angular.element($document[0].body).append('<div id="loaderContainer" class="loaderContainer"></div>');
					    angular.element(body).append('<div class="loader"></div>');
					};
					
					var dismissSpinner = function() {

						 var body = $document[0].body;
						body.style.cssText={"overflow":"visible","opacity":"0.5"};
						 //angular.element($document[0].body).css('overflow', 'visible');
						 
						 var myEl11 = angular.element( document.querySelector( '.loader' ) );
						 myEl11.remove();
						 var myEl = angular.element( document.querySelector( '#loaderContainer' ) );
						 myEl.remove();
						
					};
					return {
						showSpinner : showSpinner,
						dismissSpinner: dismissSpinner
					};
			}]);
			
});