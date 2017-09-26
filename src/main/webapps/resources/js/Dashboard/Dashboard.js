'use strict';
define(['dashboard_module/controllers/DashboardController','common_module/services/updateProfile','common_module/directives/passwordmatch','admin_module/Admin','tickets_module/Tickets',
        'inventory_module/Inventory','customers_module/Customers','reports_module/Reports','franchise_module/Franchise'], 
            function(dashboardCtrl,updateProfile,ngMatch){
    angular.module('fireTweetApp.Dashboard',['fireTweetApp.Admin','fireTweetApp.Inventory','fireTweetApp.Customers','fireTweetApp.Reports','fireTweetApp.Tickets','fireTweetApp.Franchise'])
        .controller('DashboardCtrl', dashboardCtrl)
         .factory('updateProfile',updateProfile)
         .directive('compareTo',ngMatch)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard',{
                  url:'dashboard',
                  views: {
	                	  'header@common' : { 
	                		  templateUrl: template_path + 'Dashboard/templates/dashboard_header.html',
	                		  controller:'DashboardCtrl'
	                	  },
                          'main-content@common' : {
                              templateUrl: template_path + 'Dashboard/templates/dashboard.html',
                             /* controller:'DashboardCtrl'*/
                          },
                          /*'dashboard-header@common.dashboard' : {
                        	  templateUrl: template_path + 'Dashboard/templates/dashboard_header.html',
                        	  controller:'DashboardCtrl'
                          }*/
                  },
                  data: {
                      displayName: false
                  }
              }
             );
        }); 
});
