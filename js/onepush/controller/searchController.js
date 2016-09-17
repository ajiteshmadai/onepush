/**
 * 
 */
var OnePushApp = OnePushApp || angular.module("OnePush", []);

OnePushApp.controller("SearchController", [ '$http', function($http) {

	var self = this;
	
	self.fetchWebsiteList = function() {
		console.debug("Fetching website list");
		$http.get(OnePushApp.API_URL, {
			params : {
				'type' : 'json',
				'query' : 'list_websites'
			}
		}).success(function(data) {
			
			self.processWebsiteList(data);
			
		}).error(function(a, b, c) {
			console.error("Error occured when fetching website list",a,b,c);
		});
	};
	
	self.processWebsiteList = function(data) {
		
		console.debug("Website list loaded successfully");
		if(data && data.websites) {
			self.totalNoOfWebsites = data.websites.length;
			if(self.totalNoOfWebsites > 10) {
				self.websiteList = data.websites.slice(0,10);
			} else {
				self.websiteList = data.websites;
			}
			
		} else {
			console.error("Data recieved in incorrect format");
		}
		
	};
	
	
	self.fetchWebsiteList();
	
	

} ]);