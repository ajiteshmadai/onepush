
"use strict";
var OnePushApp = OnePushApp || angular.module("OnePush", []);

OnePushApp.controller("PushController", [ '$http', function($http) {
	var self = this;
	self.pushWebsite = function() {

		if (!self.title || !self.url || !self.tag) {
			self.pushMessage = "Please enter all information" 
			return false;
		}

		self.pushButtonDisabled = true;
		console.debug("Pushing website");
		$http.post(OnePushApp.API_URL, {
			params : {
				'type' : 'json',
				'query' : 'push',
				'title' : self.title,
				'url' : self.url,
				'tag' : self.tag
			}
		}).success(function(data) {
			console.debug("Website" + self.url + "pushed successfully");
			self.processPushResponse(data);
			self.pushButtonDisabled = false;
		}).error(function(a, b, c) {
			console.error("Error occured when pushing website list", a, b, c);
			self.pushButtonDisabled = false;
		});
	};

	self.processPushResponse = function(data) {

		switch (data.status) {
		case "403":
		default:
			self.pushMessage = data.message;
			break;
		

		}
	};

}

]);