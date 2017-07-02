app.controller('CWNerdQuizAddPlayerController', function($scope, $route) {
	$scope.startAddress = undefined;
	$scope.doPairingBuzzer = false;
	
	socket = new WebSocket("ws://127.0.0.1:9000/ws");
	socket.onmessage = function(e) {
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
		socket.send('{"action" : "savePlayer", "startAddress" : "' + $scope.startAddress + '", "name" : "' + $scope.playerName + '"}');
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