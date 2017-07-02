app.controller('CWNerdQuizWebSocketController', function($scope, $rootScope) {
	
	$rootScope.socket = new WebSocket("ws://127.0.0.1:9000/ws");
	$rootScope.socket.onopen = function() {
	   console.log("socket Connected!");
	   $rootScope.socket.send('{"action" : "getPlayers"}');
	   $rootScope.socket.send('{"action" : "getQuizzes"}');
   }
	
	$rootScope.socket.onmessage = function(e) {
		console.log("client recieved: " + e.data)
		
		if (typeof e.data == "string") {
			response = e.data.replace(new RegExp('\'', 'g'), '"');
			message = jQuery.parseJSON(response)
			console.log(message)
			if(message.action == "getPlayers") {
				if($scope.setPayersCallback != undefined) {
					message.players.sort($scope.sortPlayerByPoints)
					$scope.setPayersCallback(message.players);
				}
			} else if(message.action == "getQuizzes") {
				if($scope.setQuizzesCallback != undefined) {
					message.quizzes.sort()
					$scope.setQuizzesCallback(message.quizzes);
				}
			} else if(message.action == "selectQuiz") {
				if($scope.setSelectedQuizCallback != undefined) {
					$scope.setSelectedQuizCallback(jQuery.parseJSON(message.quiz).quiz);
				}
			}
			
			
	   }
	}
	
	$rootScope.socket.onclose = function(e) {
	   console.log("socket Connection closed.");
	   $rootScope.socket = null;
	}

});