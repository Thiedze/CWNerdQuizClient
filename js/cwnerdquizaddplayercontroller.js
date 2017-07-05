app.controller('CWNerdQuizAddPlayerController', function($scope, $route) {
	$scope.startAddress = undefined;
	$scope.doPairingBuzzer = false;

	$scope.setPlayerStartAddressCallback = function(startAddress) {
		if ($scope.doPairingBuzzer == true) {
			$scope.startAddress = startAddress;
		} else {
			console.log(message)
		}
	}

	$scope.savePlayer = function() {
		$scope.socket.send('{"action" : "savePlayer", "startAddress" : "'
				+ $scope.startAddress + '", "name" : "' + $scope.playerName
				+ '"}');
		$route.reload()
	}

	$scope.startPairingBuzzer = function() {
		$scope.startAddress = undefined;
		$scope.doPairingBuzzer = true;
	}

	$scope.stopPairingBuzzer = function() {
		$scope.doPairingBuzzer = false;
	}
});