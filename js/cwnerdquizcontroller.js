var app = angular.module('CWNerdQuizApp', []);

app.controller('CWNerdQuizController', function($scope, $rootScope) {
	$scope.players = [];
	
	$rootScope.senderSocket = new WebSocket("ws://127.0.0.1:9000");
	$rootScope.senderSocket.onopen = function() {
	   console.log("senderSocket Connected!");
	   $rootScope.senderSocket.send('{"action" : "getPlayer"}');
	}
	
	$rootScope.recieverSocket = new WebSocket("ws://127.0.0.1:4711");
	$rootScope.recieverSocket.onopen = function() {
	   console.log("recieverSocket Connected!");
	}
	
	$rootScope.recieverSocket.onmessage = function(e) {
		console.log(e.data)
		
		if (typeof e.data == "string") {
			response = e.data.replace(new RegExp('\'', 'g'), '"');
			message = jQuery.parseJSON(response)
			console.log(message)
			if(message.action == "getPlayer") {
				$scope.players = message.player;
			}
	   }
	}
	
	$rootScope.senderSocket.onclose = function(e) {
	   console.log("senderSocket Connection closed.");
	   senderSocket = null;
	}
	
	$rootScope.recieverSocket.onclose = function(e) {
	   console.log("recieverSocket Connection closed.");
	   recieverSocket = null;
	}
	
   $scope.initBuzzer = function() {
		$rootScope.senderSocket.send('{"action" : "initBuzzer"}');
	}
});