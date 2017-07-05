app.controller('CWNerdQuizQuestionController', function($scope, $route) {

	$scope.$on('openQuestion', function(event, data) {
		$scope.question = data.question;
		$scope.points = data.points;
		$scope.colorClass = data.colorClass;
	});
});