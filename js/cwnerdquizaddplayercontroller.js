app.controller('CWNerdQuizAddPlayerController', function($scope, $rootScope) {
	$scope.startAddress = undefined;
	$scope.doPairingBuzzer = false;
	
	$rootScope.socket.onmessage = function(e) {
	   if (typeof e.data == "string") {
		  message = JSON.stringify(e.data)
		  if($scope.doPairingBuzzer == true) {
			  $scope.startAddress = e.data;
		  } else {
			  console.log(message)
		  }
	   }
	}
	
	$scope.savePlayer = function() {
		$rootScope.socket.send('{"action" : "savePlayer", "startAddress" : "' + $scope.startAddress + '", "name" : "' + $scope.playerName + '"}');
	}
	
	$scope.startPairingBuzzer = function() {
		$scope.startAddress = undefined;
		$scope.doPairingBuzzer = true;
	}
	
	$scope.stopPairingBuzzer = function() {
		$scope.doPairingBuzzer = false;
	}
});