'use strict';
define(['login_module/controllers/LoginController','login_module/services/resetPasswordService','login_module/services/loginService'], 
            function(loginCtrl,resetPasswordService,loginService){
    angular.module('fireTweetApp.Login',['ui.router','ngResource','ngAnimate','ui.bootstrap','ngCookies'])
        .controller('LoginCtrl', loginCtrl)
        .factory('resetPasswordService',resetPasswordService)
        .factory('loginService',loginService)
        .config(function($stateProvider, $httpProvider){
              $stateProvider.state('common.login',{
                  url:'login',
                  views: {
	                	  'header@common' : { 
	                		  templateUrl:  template_path + 'Common/templates/header.html',
	                		  controller:'LoginCtrl'
	                	  },
                          'main-content@common' : {
                              templateUrl: template_path + 'Login/templates/login.html'
                          }
                  }
              });
        }); 
});