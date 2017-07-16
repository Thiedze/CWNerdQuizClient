app.controller('CWNerdQuizQuestionController', function($scope, $route,
		$interval) {

	$scope.$on('openQuestion', function(event, data) {
		$scope.question = data.question;
		$scope.points = data.points;
		$scope.colorClass = data.colorClass;
		$scope.countdown = 30;
		$scope.playerMusic = true;
		$scope.players = data.players;
		$scope.selectedPlayer = undefined;
		$scope.playerChoose = false;

		data.scope.setPlayerPressBuzzerCallback = $scope.setPlayerPressBuzzer;
		$scope.start();
	});

	$scope.setPlayerPressBuzzer = function(input) {
		if ($scope.playerChoose == false) {
			for (var index = 0; index < $scope.players.length; index++) {
				if ($scope.selectedPlayer == undefined
						&& $scope.players[index].buzzerAddress == input) {
					$scope.selectedPlayer = $scope.players[index];
				}
			}
		} else {
			
		}
	}

	$scope.countdownFunction = function() {
		if ($scope.selectedPlayer != undefined & $scope.playerChoose == false) {
			$scope.countdown = 10;
			$scope.playerChoose = true;
			$scope.start();
		}

		$scope.countdown = $scope.countdown - 1;
		if ($scope.countdown < 0) {

		}
	};

	$scope.$on('$destroy', function() {
		$scope.stop();
	});

	$scope.stop = function() {
		$interval.cancel($scope.counter);
	};

	$scope.start = function() {
		$scope.stop();
		$scope.counter = $interval($scope.countdownFunction, 1000);
	};
});