app.controller('CWNerdQuizAddPlayerController', function($scope, $route) {
	$scope.startAddress = undefined;
	$scope.doPairingBuzzer = false;

	$scope.$on("addPlayer", function(event, data) {
		data.scope.setPlayerStartAddressCallback = $scope.setPlayerStartAddress;
	});

	$scope.setPlayerStartAddress = function(startAddress) {
		if ($scope.doPairingBuzzer == true) {
			$scope.startAddress = startAddress;
		}
	}

	$scope.savePlayer = function() {
		$scope.socket.send('{"action" : "savePlayer", "startAddress" : "'
				+ $scope.startAddress + '", "name" : "' + $scope.playerName
				+ '"}');
		$scope.socket.send('{"action" : "getPlayers"}');
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