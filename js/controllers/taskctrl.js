app.controller('TaskCtrl', ['$scope', '$rootScope', '$location', 'angularFire', '$window', 'authService', function ($scope, $rootScope, $location, angularFire, $window, authService) {	
	console.log($location.host());

	var listId = $location.path();
	console.log(listId);

	var tasksRef = new Firebase('https://listify.firebaseio.com/lists' +listId + '/incomplete');
	$scope.tasks = [];
	angularFire(tasksRef, $scope, "tasks");

	var completedTasksRef = new Firebase('https://listify.firebaseio.com/lists' + listId + '/completed');
	$scope.completedTasks = [];		
	angularFire(completedTasksRef, $scope, "completedTasks");

	$rootScope.$on("login", function(event, user) {		
        var userRef = new Firebase('https://listify.firebaseio.com/lists' +listId + '/users/')
        console.log(user.uid);
        $scope.users = [];
        $scope.users.push({user: user.uid});
		angularFire(userRef, $scope, "users");        
    });

	var newTodo = {};

	$scope.createNewList = function()	{
		if (/^ *$/.test($scope.newListName)) return;

		$window.open('/#' + $scope.newListName);
		$scope.newListName = '';
	}

	// Adds a task to $scope.tasks and attaches a timestamped id
	$scope.addTask = function(event)	{
		var key = event.char || event.keyCode,	// Firefox support
			target = event.target || event.srcElement;

		if (key != 13 || (/^ *$/.test(target.value))) return;
		
		newTodo.value = $scope.todo;
		newTodo.id = new Date().getUTCMilliseconds() + Math.floor(Math.random())*2;

		$scope.tasks.push({task: newTodo.value, id: newTodo.id});
		$scope.todo = "";
	}

	// Marks a task as complete and pushes it to $scope.completedTasks
	$scope.completeTask = function(index)	{
		$scope.tasks.splice(index, 1);
		$scope.completedTasks.push(this.task);		
	}

	// Deletes a task from the list
	$scope.removeTask = function(index)	{
		$scope.tasks.splice(index, 1);
	}

	// Removes all archived completed tasks
	$scope.clearCompletedTasks = function(event)	{
		event.preventDefault();
		$scope.completedTasks = [];
	}
}]);