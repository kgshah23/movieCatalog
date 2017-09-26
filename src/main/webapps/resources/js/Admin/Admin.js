'use strict';
define(['angular','admin_module/controllers/ManageCustomersController','admin_module/controllers/manageFranchiseeController','admin_module/controllers/ManageUsersController','admin_module/services/userService','angular-route','angular-resource','angular-animate','ui-bootstrap','customerServiceModule'], 
            function(angular, manageCustomersCtrl,manageFranchiseeCtrl,manageusersCtrl,userService){
    angular.module('fireTweetApp.Admin',['ui.router','ngResource','ngAnimate','ui.bootstrap','angularUtils.directives.dirPagination','customerServiceModule'])
        .controller('manageCustomersCtrl', manageCustomersCtrl)
        .controller('manageFranchiseeCtrl', manageFranchiseeCtrl)
        .controller('manageusersCtrl', manageusersCtrl)
        .factory('userService',userService)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard.admin',{
                  url:'/admin',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Admin/templates/managecustomers.html',
                              controller : ['$scope','$state','$location','$cookieStore','$log','AccessControlService',function($scope, $state,$location,$cookieStore,$log,AccessControlService){
                            	  var loginData = $cookieStore.get('loginData');
                            	  if(AccessControlService.isFranchiseAdmin(loginData.roleId) || AccessControlService.isCustomerAdmin(loginData.roleId)){
                            		  $state.go('common.dashboard.admin.users');
                            	  }
                            	 
                              }]
                          },
                  }
              }).state('common.dashboard.admin.users',{
                  url:'/users',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Admin/templates/manageusers.html'
                          },
                  }
              })
              .state('common.dashboard.admin.franchisee',{
                  url:'/franchisee',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Admin/templates/manageFranchisee.html'
                          },
                  }
              });
        }); 
});
