/**
 * Created by Aruna Dhumal on 5/2/16.
 */

'use strict';
var path;
define(
		[ 'common_module/controllers/CommonController', 'modalModule',
				'login_module/services/resetPasswordService',
				'common_module/controllers/ServerResponseController',
				'dashboard_module/Dashboard', 'login_module/Login',
				'notificationModule', 'errorHandlerModule',
				'accessControlModule', 'spinnerModule', 'contactServiceModule','deviceServiceModule'],
		function(commonCtrl, modalInstanceCtrl, resetPasswordService,
				ServerResponseCtrl) {
			angular
					.module(
							'fireTweetApp',
							[ 'fireTweetApp.Dashboard', 'fireTweetApp.Login',
									'modalModule', 'notificationModule',
									'errorHandlerModule',
									'accessControlModule', 'spinnerModule',
									'angularUtils.directives.uiBreadcrumbs',
									'contactServiceModule','ngIdle','deviceServiceModule','ngCsv','ngFileSaver'])
					.controller('CommonCtrl', commonCtrl)
					.controller('ServerResponseCtrl', ServerResponseCtrl)
					.factory('resetPasswordService', resetPasswordService)
					.factory('focus', function($timeout, $window) {
					    return function(id) {
					      // timeout makes sure that it is invoked after any other event has been triggered.
					      // e.g. click events that need to run before the focus or
					      // inputs elements that are in a disabled state but are enabled when those events
					      // are triggered.
					      $timeout(function() {
					        var element = $window.document.getElementById(id);
					        if(element)
					          element.focus();
					      });
					    };
					  })
					.config(
							function(TitleProvider,IdleProvider,$stateProvider, $httpProvider,$urlRouterProvider,$locationProvider) {
								TitleProvider.enabled(false);
								IdleProvider.idle(900); //900 - 15mins
								IdleProvider.timeout(10);
//								$urlRouterProvider.otherwise('/404');

								 $urlRouterProvider.rule(function ($injector, $location) {
								       //what this function returns will be set as the $location.url
								        var path = $location.path(), normalized = path.toLowerCase();
								        if (path != normalized) {
								            //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
								            $location.replace().path(normalized);
								        }
								    });
//							    $locationProvider.html5Mode(true);
								$stateProvider
										.state(
												'common',
												{
													url : '/',
													views : {
														'@' : {
															templateUrl : template_path
																	+ 'Common/templates/layout.html',
															controller : 'CommonCtrl'
														},
														'server-response@common' : {
															templateUrl : template_path
																	+ 'Common/templates/serverResponse.html',
															controller : 'ServerResponseCtrl'
														},
														'footer@common' : {
															templateUrl : template_path
																	+ 'Common/templates/footer.html'
														},

													},
													data : {
														displayName : false
													}

												});

							}).run(
							function($state, $location, $log) {
								path = new String($location.path());
								$log.info(path.length + 'path=' + path + 'url:'
										+ $location.url());
								$state.go('common');
							});
			angular.bootstrap(document, [ 'fireTweetApp' ]);
		});
