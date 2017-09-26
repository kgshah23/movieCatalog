'use strict';
define(['angular','reports_module/controllers/ReportsController','angular-route','angular-resource','angular-animate','ui-bootstrap','reportSeviceModule'], 
            function(angular, reportsCtrl){
    angular.module('fireTweetApp.Reports',['ui.router','ngResource','ngAnimate','ui.bootstrap','reportSeviceModule'])
        .controller('reportsCtrl', reportsCtrl)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard.reports',{
                  url:'/reports',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Reports/templates/reports.html',
                              controller:'reportsCtrl'
                          }
                  }
              });
        }); 
});
