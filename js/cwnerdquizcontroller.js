var app = angular.module('CWNerdQuizApp', [ 'ngRoute' ]);

app.controller('CWNerdQuizController', function($scope, $rootScope) {
	$scope.players = undefined;
	$scope.quizzes = undefined;
	$scope.selectedQuiz = undefined;

	$scope.setPayersCallback = function(players) {
		$scope.players = players;
	}

	$scope.setQuizzesCallback = function(quizzes) {
		$scope.quizzes = quizzes;
	}

	$scope.setSelectedQuizCallback = function(selectedQuiz) {
		$scope.selectedQuiz = selectedQuiz;
		$scope.pivotKey = Object.keys($scope.selectedQuiz.categories)[0];
	}

	$scope.initBuzzer = function() {
		$scope.socket.send('{"action" : "initBuzzer"}');
	}

	$scope.selectQuiz = function(quiz) {
		$rootScope.socket.send('{"action" : "selectQuiz", "quiz" : "' + quiz
				+ '"}');
	}

	$scope.selectQuestion = function(questions, points, colorClass) {
		$scope.$broadcast('openQuestion', {
			question : questions[points],
			points : points,
			colorClass : colorClass
		})
	}

	$scope.sortPlayerByPoints = function(player1, player2) {
		if (player1.points == player2.points) {
			return player1.name - player2.name;
		} else {
			return player1.points + player2.points
		}
	}

});