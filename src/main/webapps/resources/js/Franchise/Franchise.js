'use strict';
define(['angular','franchise_module/controllers/franchiseController','franchise_module/controllers/franchiseDetailsController','angular-route','angular-resource','angular-animate','ui-bootstrap','franchiseServiceModule'], 
            function(angular, franchiseCtrl,franchiseDetailsCtrl){
    angular.module('fireTweetApp.Franchise',['ui.router','ngResource','ngAnimate','ui.bootstrap','franchiseServiceModule'])
        .controller('franchiseeCtrl',franchiseCtrl)
        .controller('franchiseDetailsCtrl',franchiseDetailsCtrl)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard.franchise',{
                  url:'/franchisee',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Franchise/templates/allfranchisees.html',
                              controller:'franchiseeCtrl'
                          }
                  },data: {
                      displayName: 'All Franchisees'
                  }
              })
              .state('common.dashboard.franchise.franchisedetails',{
                  url:'/franchise/:id/:name',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Franchise/templates/franchiseDetails.html',
                              controller : 'franchiseDetailsCtrl'
                          }
                  },
                  data: {
                        displayName: '{{franchiseName}}'
                    },
                    
                    resolve: {
                        franchiseName : function($stateParams) {
                            return $stateParams.name;
                        }
                    }
                    
              }).state('common.dashboard.franchisedetails',{
                  url:'/franchise/:id/:name',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Franchise/templates/franchiseDetails.html',
                              controller : 'franchiseDetailsCtrl'
                          }
                  },
                  data: {
                        displayName: '{{franchiseName}}'
                    },
                    
                    resolve: {
                        franchiseName : function($stateParams) {
                            return $stateParams.name;
                        }
                    }
                    
              }).state('common.dashboard.franchisedetails.sitedetails',{
            	  url:'/site/:siteid/:sitename',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/siteDetails.html'
                          }
                  },
                  data: {
                        displayName: '{{siteName}}'
                    },
                    
                    resolve: {
                    	siteName : function($stateParams) {
                            return $stateParams.sitename;
                        }
                    }
                    
              }).state('common.dashboard.franchise.franchisedetails.sitedetails',{
            	  url:'/site/:siteid/:sitename',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/siteDetails.html'
                          }
                  },
                  data: {
                        displayName: '{{siteName}}'
                    },
                    
                    resolve: {
                    	siteName : function($stateParams) {
                            return $stateParams.sitename;
                        }
                    }
                    
              });
        }); 
});
