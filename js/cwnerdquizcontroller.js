var app = angular.module('CWNerdQuizApp', []);

app.controller('CWNerdQuizController', function($scope, $rootScope) {
	$scope.players = [];
	
	$rootScope.socket = new WebSocket("ws://127.0.0.1:9000");
	$rootScope.socket.onopen = function() {
	   console.log("Connected!");
	   isopen = true;
	   $rootScope.socket.send('{"action" : "getPlayer"}');
	}
	
	$rootScope.socket.onmessage = function(e) {
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
	
	$rootScope.socket.onclose = function(e) {
	   console.log("Connection closed.");
	   socket = null;
	   isopen = false;
	}
	
   $scope.initBuzzer = function() {
		$rootScope.socket.send('{"action" : "initBuzzer"}');
	}
});