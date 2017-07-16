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
	
	$scope.getController = function() {
		if($scope.startAddress == "1,0,0") {
			return "1"
		} else if($scope.startAddress == "32,0,0") {
			return "2"
		} else if($scope.startAddress == "0,4,0") {
			return "3"
		} else if($scope.startAddress == "0,128,0") {
			return "4"
		} else {
			return ""
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