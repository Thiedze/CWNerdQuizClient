var app = angular.module('CWNerdQuizApp', ['ngRoute']);

app.controller('CWNerdQuizController', function($scope) {
	$scope.players = [];
	
	socket = new WebSocket("ws://127.0.0.1:9000/ws");
	socket.onopen = function() {
	   console.log("socket Connected!");
	   socket.send('{"action" : "getPlayers"}');
	   socket.send('{"action" : "getQuizzes"}');
   }
	
	socket.onmessage = function(e) {
		console.log("client recieved: " + e.data)
		
		if (typeof e.data == "string") {
			response = e.data.replace(new RegExp('\'', 'g'), '"');
			message = jQuery.parseJSON(response)
			console.log(message)
			if(message.action == "getPlayers") {
				$scope.players = message.players;
				$scope.players.sort($scope.sortPlayerByPoints)
			} else if(message.action == "getQuizzes") {
				$scope.quizzes = message.quizzes;
				$scope.quizzes.sort();
			}
			
			
	   }
	}
	
	socket.onclose = function(e) {
	   console.log("socket Connection closed.");
	   socket = null;
	}
	
   $scope.initBuzzer = function() {
		socket.send('{"action" : "initBuzzer"}');
	}
	
	$scope.selectQuiz = function(quiz) {
		socket.send('{"action" : "selectQuiz", "quiz" : "' + quiz + '"}');
	}
	
	$scope.sortPlayerByPoints = function(player1, player2) {
		if(player1.points == player2.points) {
			return player1.name - player2.name;
		} else {
			return player1.points + player2.points
		}
	}
});

app.directive('quizTable', function() {
	return {
		templateUrl : 'html/cwquiztable.html',
		controller : "CWNerdQuizTableController"
	}
})