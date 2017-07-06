app.controller('CWNerdQuizQuestionController', function($scope, $route, $interval) {

	
	
	$scope.$on('openQuestion', function(event, data) {
		$scope.question = data.question;
		$scope.points = data.points;
		$scope.colorClass = data.colorClass;
		$scope.countdown = 30;
		$scope.playerMusic = true;
	});

	$interval(function() {
		$scope.countdown = $scope.countdown - 1;
	}, 1000);
});