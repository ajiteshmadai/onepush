
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

		var pushRequest  = {
			url: OnePushApp.API_URL,
			method: 'GET',
			params : {
				'type' : 'json',
				'query' : 'push',
				'title' : self.title,
				'url' : self.url,
				'tag' : self.tag
			}
		};
		$http(pushRequest).then(function(data) {
			console.debug("Website" + self.url + "pushed successfully");
			self.processPushResponse(data.data);
			self.pushButtonDisabled = false;
		}, function(a, b, c) { 
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