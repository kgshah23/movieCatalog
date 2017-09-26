'use strict';

var contextpath = getContextPath();
var template_path = contextpath + '/resources/js/';
var baseUrl;
var timeout;
require
		.config({
			baseUrl : contextpath + '/resources',
			waitSeconds : 0,

			paths : {
				'angular' : 'lib/angular',
				'filesaver': 'lib/filesaver',
				'Blob': 'lib/Blob',
				'angular-route' : 'lib/angular-ui-router.min',
				'angular-resource' : 'lib/angular-resource.min',
				'ui-bootstrap' : 'lib/ui-bootstrap-tpls',
				'angular-animate' : 'lib/angular-animate',
				'ngCookies' : 'lib/angular-cookies',
				'dirPagination' : 'lib/dirPagination',
				'ngSanitize' : 'lib/angular-sanitize',
				'select' : 'lib/select',
				'fireTweetApp' : 'js/Common/app',
				'common_module' : 'js/Common',
				'login_module' : 'js/Login',
				'dashboard_module' : 'js/Dashboard',
				'admin_module' : 'js/Admin',
				'customers_module' : 'js/Customers',
				'inventory_module' : 'js/Inventory',
				'reports_module' : 'js/Reports',
				'tickets_module' : 'js/Tickets',
				'modalModule' : 'js/Common/controllers/ModalInstanceController',
				'notificationModule' : 'js/Common/services/NotificationService',
				'errorHandlerModule' : 'js/Common/services/ErrorHandlerModule',
				'accessControlModule' : 'js/Common/services/accessControlModule',
				'customerServiceModule' : 'js/Customers/services/customerServiceModule',
				'spinnerModule' : 'js/Common/services/spinnerModule',
				'uiBreadcrumbs' : 'lib/ui-breadcrumbs',
				'contactServiceModule' : 'js/Common/services/contactServiceModule',
				'franchise_module' : 'js/Franchise',
				'franchiseServiceModule' : 'js/Franchise/services/franchiseServiceModule',
				'siteServiceModule' : 'js/Customers/services/siteServiceModule',
				'contractServiceModule' : 'js/Customers/services/contractServiceModule',
				'reportSeviceModule': 'js/Reports/services/reportService',
				'angularFileUpload' : 'lib/angular-file-upload',
				'fileUploadModule' : 'js/Common/services/fileUploadModule',
				'locationServiceModule' : 'js/Customers/services/locationServiceModule',
				'angular-drop' : 'lib/angular-drop',
				'getUsersByRoleServiceModule' : 'js/Common/services/getUsersByRoleServiceModule',
				'inventoryServiceModule' : 'js/Inventory/services/inventoryServiceModule',
				'angular-idle' : 'lib/angular-idle',
				'deviceServiceModule' : 'js/Common/services/deviceServiceModule',
				'angular-filesaver': 'lib/angular-filesaver',
					'ngCsv' : 'lib/ng-csv.min'
			},

			shim : {
				'angular' : {
					exports : 'angular'
				},
				'angular-filesaver':{
					deps: ['angular','filesaver','Blob'],
					exports: 'angular-filesaver',
				},
				'filesaver':{
					exports: 'filesaver'
				},
				'Blob':{
					exports: 'Blob',
				},
				'dirPagination' : {
					deps : [ 'angular' ],
					exports : 'dirPagination'
				},
				'angular-route' : {
					deps : [ 'angular' ],
					exports : 'ngRoute'
				},
				'angular-resource' : {
					deps : [ 'angular' ]
				},
				'angular-animate' : {
					deps : [ 'angular' ],
					exports : 'ngAnimate'
				},
				'ngCookies' : {
					deps : [ 'angular' ],
					exports : 'ngCookies'
				},
				'ui-bootstrap' : {
					deps : [ 'angular' ]
				},
				'ngSanitize':{
					deps : [ 'angular' ],
					exports : 'ngSanitize'
				},
				'ngCsv':{
					deps : ['ngSanitize'],
					exports : 'ngCsv'
				},
				'select':{
					deps : [ 'angular' ],
//					exports : 'ui.select'
				},
				'fireTweetApp' : {
					deps : [ 'angular', 'ngCookies', 'angular-route',
							'angular-resource', 'ui-bootstrap',
							'dirPagination', 'angular-animate', 'uiBreadcrumbs','angular-idle','angular-filesaver','ngCsv']
				},
				'modalModule' : {
					deps : [ 'angular', 'angular-animate' ],
					exports : 'modalModule'
				},
				'notificationModule' : {
					deps : [ 'angular', 'angular-animate' ],
					exports : 'notificationModule'
				},
				'errorHandlerModule' : {
					deps : [ 'notificationModule' ],
					exports : 'errorHandlerModule'
				},
				'accessControlModule' : {
					deps : [ 'angular' ],
					exports : 'accessControlModule'
				},
				'customerServiceModule' : {
					deps : [ 'angular' ],
					exports : 'customerServiceModule'
				},
				'spinnerModule' : {
					deps : [ 'angular' ],
					exports : 'spinnerModule'
				},
				'uiBreadcrumbs' : {
					deps : [ 'angular-route' ],
					exports : 'uiBreadcrumbs'
				},
				'contactServiceModule' : {
					deps : [ 'angular' ],
					exports : 'contactServiceModule'
				},
				'reportSeviceModule': {
					deps : [ 'angular' ],
					exports : 'reportSeviceModule'
				},
				'franchiseServiceModule' : {
					deps : [ 'angular' ],
					exports : 'franchiseServiceModule'
				},
				'siteServiceModule' : {
					deps : [ 'angular' ],
					exports : 'siteServiceModule'
				},
				'angularFileUpload' : {
					deps : ['angular'],
					exports : 'angularFileUpload'
				},
				'fileUploadModule':{
					deps : ['angularFileUpload']
				},
				'locationServiceModule' : {
					deps : [ 'angular' ],
					exports : 'locationServiceModule'
				},
				'angular-drop' : {
					deps : ['angular'],
					exports : 'angular-drop'
				},
				'inventoryServiceModule' : {
					deps : [ 'angular' ],
					exports : 'inventoryServiceModule'
				},
				'angular-idle' : {
					deps : ['angular'],
					exports : 'angular-idle'
				},
				'deviceServiceModule' : {
					deps : ['angular'],
					exports : 'deviceServiceModule'
				}

			},
			priority : [ "angular" ],
			deps : [ 'fireTweetApp' ]

		});

function getContextPath() {
	baseUrl = window.location.pathname;
	return baseUrl.substring(0, window.location.pathname.indexOf("/", 2));
}