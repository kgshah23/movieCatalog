'use strict';
define(['angular','tickets_module/controllers/TicketsController','tickets_module/controllers/EventTicketsController','tickets_module/controllers/ServiceTicketsController','tickets_module/controllers/TicketDetails','tickets_module/services/TicketService','angular-route','angular-resource','angular-animate','ui-bootstrap'], 
            function(angular, myticketsCtrl,eventticketsCtrl,serviceticketsCtrl,TicketDetailsCntr,TicketService){
    angular.module('fireTweetApp.Tickets',['ui.router','ngResource','ngAnimate','ui.bootstrap'])
        .controller('myticketsCtrl',myticketsCtrl)
        .controller('eventticketsCtrl',eventticketsCtrl)
        .controller('serviceticketsCtrl',serviceticketsCtrl)
        .controller('TicketDetailsCntr',TicketDetailsCntr)
         .factory('TicketService',TicketService)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.dashboard.tickets',{
                  url:'/tickets',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Tickets/templates/mytickets.html'
//                              controller:'myticketsCtrl'
                          }
                  }
              	
              }).state('common.dashboard.tickets.details',{
                  url:'/:tid/details',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Tickets/templates/ticketdetails.html',
                              controller:'TicketDetailsCntr',
                          }
                  }
              	
              }).state('common.dashboard.tickets.details.sitedetails',{
            	  url:'/:id/site/:siteid/:sitename',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/siteDetails.html'
                          }
                  },
                 /* data: {
                        displayName: '{{siteName}}'
                    },*/
                    
                    resolve: {
                    	siteName : function($stateParams) {
                            return $stateParams.sitename;
                        }
                    }
              	
              }).state('common.dashboard.tickets.eventtickets',{
                  url:'/eventtickets',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Tickets/templates/eventtickets.html'
//                              controller:'eventticketsCtrl'
                          }
                  }
              }).state('common.dashboard.tickets.servicetickets.details.sitedetails',{
            	  url:'/:id/site/:siteid/:sitename',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Customers/templates/siteDetails.html'
                          }
                  },
                 /* data: {
                        displayName: '{{siteName}}'
                    },*/
                    
                    resolve: {
                    	siteName : function($stateParams) {
                            return $stateParams.sitename;
                        }
                    }
              	
              }).state('common.dashboard.tickets.servicetickets',{
                  url:'/servicetickets',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Tickets/templates/servicetickets.html',
                              controller:'serviceticketsCtrl'
                          }
                  }
              }).state('common.dashboard.tickets.servicetickets.details',{
                  url:'/:tid/details',
                  views: {
                          'dashboard-content@common.dashboard' : {
                              templateUrl: template_path + 'Tickets/templates/serviceticketdetails.html',
                              controller:'TicketDetailsCntr',
                          }
                  }
              	
              });
        }); 
});
