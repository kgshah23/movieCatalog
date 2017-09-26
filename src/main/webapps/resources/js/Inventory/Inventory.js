'use strict';
define(['angular','inventory_module/controllers/InventoryController','inventory_module/controllers/InventoryUnallottedController','angular-route','angular-resource','angular-animate','ui-bootstrap','inventoryServiceModule'], 
            function(angular, inventoryCtrl,inventoryUnallottedCtrl){
    angular.module('fireTweetApp.Inventory',['ui.router','ngResource','ngAnimate','ui.bootstrap','inventoryServiceModule'])
        .controller('inventoryCtrl',inventoryCtrl)
        .controller('inventoryUnallottedCtrl',inventoryUnallottedCtrl)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard.inventory',{
                  url:'/inventory',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Inventory/templates/inventory_allotted.html',
                              controller:'inventoryCtrl'
                          }
                  }
              }).state('common.dashboard.inventory.unallotted',{
                  url:'/unalloted',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Inventory/templates/inventory_unallotted.html',
                              controller: 'inventoryUnallottedCtrl'
                          }
                  }
              });
        }); 
});
