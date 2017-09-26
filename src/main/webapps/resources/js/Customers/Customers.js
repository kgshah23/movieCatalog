'use strict';
define(['angular','customers_module/controllers/CustomersController','customers_module/controllers/CustomerDetailsController','customers_module/controllers/SiteDetailsController','common_module/controllers/SiteTableController','customers_module/directives/draggableDirective','angular-route','angular-resource','angular-animate','ui-bootstrap','customerServiceModule','siteServiceModule','contractServiceModule','fileUploadModule','locationServiceModule','angular-drop','ngSanitize','select','getUsersByRoleServiceModule'], 
            function(angular, customersCtrl,customerDetailsCtrl,siteDetailsCtrl,siteTableCtrl,draggableDirective){
    angular.module('fireTweetApp.Customers',['ui.router','ngResource','ngAnimate','ui.bootstrap','customerServiceModule','siteServiceModule','contractServiceModule','fileUploadModule','locationServiceModule','ui.drop','ngSanitize','ui.select','getUsersByRoleServiceModule'])
        .controller('customersCtrl',customersCtrl)
        .controller('customerDetailsCtrl',customerDetailsCtrl)
        .controller('siteDetailsCtrl',siteDetailsCtrl)
        .controller('siteTableCtrl',siteTableCtrl)
		.directive('myDraggable',draggableDirective)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard.customers',{
                  url:'/customers',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/allcustomers.html',
                              controller:'customersCtrl'
                          }
                  },data: {
                      displayName: 'All Customers'
                  }
              }).state('common.dashboard.customerdetails',{
                  url:'/customer/:id/:name',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/customerDetails.html',
                              controller : 'customerDetailsCtrl'
                          }
                  },
                  data: {
                        displayName: '{{customerName}}'
                    },
                    
                    resolve: {
                        customerName : function($stateParams) {
                            return $stateParams.name;
                        }
                    }
                    
              })
              .state('common.dashboard.customers.customerdetails',{
                  url:'/customer/:id/:name',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/customerDetails.html',
                              controller : 'customerDetailsCtrl'
                          }
                  },
                  data: {
                        displayName: '{{customerName}}'
                    },
                    
                    resolve: {
                        customerName : function($stateParams) {
                            return $stateParams.name;
                        }
                    }
                    
              }).state('common.dashboard.customers.customerdetails.sitedetails',{
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
                    
              }).state('common.dashboard.sites',{
                  url:'/sites',
                  views: {
                      'dashboard-content@common.dashboard' : {
                    	  templateUrl: template_path + 'Common/templates/siteTable.html'
                      }
                  },data: {
                      displayName: 'All Sites'
                  }
              }).state('common.dashboard.sites.sitedetails',{
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
                    
              }).state('common.dashboard.customerdetails.sitedetails',{
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
        }).filter('propsFilter', function() {
  		  return function(items, props) {
  		    var out = [];
  		
  		    if (angular.isArray(items)) {
  		      items.forEach(function(item) {
  		        var itemMatches = false;
  		
  		        var keys = Object.keys(props);
  		        for (var i = 0; i < keys.length; i++) {
  		          var prop = keys[i];
  		          var text = props[prop].toLowerCase();
  		          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
  		            itemMatches = true;
  		            break;
  		          }
  		        }
  		
  		        if (itemMatches) {
  		          out.push(item);
  		        }
  		      });
  		    } else {
  		      // Let the output be the input untouched
  		      out = items;
  		    }
  		
  		    return out;
  		  };
          }); 
});
