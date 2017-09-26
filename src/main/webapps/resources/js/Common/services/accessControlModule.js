define([], function() {
	var mod = angular.module('accessControlModule',[]);
	mod.factory('AccessControlService',
			function() {

				return {
					isAdmin : function(roleId) {
						
						switch (roleId) {
						case 1:
						case 6:
						case 9:
							return true;
						default:
							return false;
						}
					},
					
					isFTAdmin : function(roleId){
						if (roleId == 1)
							return true;
						return false;
					},

					isCustomerAdmin : function(roleId) {
						if (roleId == 6)
							return true;
						return false;
					},
					
					isFranchiseAdmin : function(roleId) {
						if (roleId == 9)
							return true;
						return false;
					},
					
					isFTSupervisor: function(roleId) {
						if (roleId == 2)
							return true;
						return false;
					},
					isFTOperator: function(roleId) {
						if (roleId == 4)
							return true;
						return false;
					},
					isFTInstaller: function(roleId) {
						if (roleId == 3)
							return true;
						return false;
					},
					isFTCR : function(roleId) {
						if (roleId == 5)
							return true;
						return false;
					},
					isCL2: function(roleId) {
						if (roleId == 7)
							return true;
						return false;
					},
					isCL3: function(roleId) {
						if (roleId == 8)
							return true;
						return false;
					},
					isFL2: function(roleId) {
						if (roleId == 10)
							return true;
						return false;
					},
					
					

				};
			});
});