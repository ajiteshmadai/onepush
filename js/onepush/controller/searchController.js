/**
 * 
 */
var OnePushApp = OnePushApp || angular.module("OnePush", []);

OnePushApp.controller("SearchController", [ '$http', function($http) {

	var self = this;
	
	//self.websiteList = [];
	
	
	self.fetchWebsiteList = function() {
		console.debug("Fetching website list");
		$http.get(OnePushApp.API_URL, {
			params : {
				'type' : 'json',
				'query' : 'list_websites'
			}
		}).success(function(data) {
			console.debug("Website list loaded successfully");
			if(data && data.websites) {
				self.websiteList = data.websites;
			}
		}).error(function(a, b, c) {
			console.error("Error occured when fetching website list",a,b,c);
		});
	};
	
	self.fetchWebsiteList();
	self.websiteListStr = JSON.stringify(self.websiteList);
	
	

} ]);