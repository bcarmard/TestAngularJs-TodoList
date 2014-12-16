//initialisation du module de l'app et injection des dépendences
var todoAngularApp = angular.module('todoAngularApp', [
  'ngRoute',
  'ui.bootstrap',
  'todoAngularControllers',
  'todoAngularFilters',
  'todoAngularStorage'
]);

//définition des routes
todoAngularApp.config(['$routeProvider',
    function($routeProvider){
	    $routeProvider.
			when('/todos',{
				templateUrl: 'app/partials/todo-list.html',
				controller: 'TodoController',
				resolve: {
					store: function (todoStorage) {
						//on récupère le module qui gère le localstorage
						return todoStorage.get().then(function () {
    						return todoStorage;
						});
					}
				}
			}).
			when('/todos/:filtreStatus',{
				templateUrl: 'app/partials/todo-list.html',
				controller: 'TodoController',
				resolve: {
					store: function (todoStorage) {
						//on récupère le module qui gère le localstorage
						return todoStorage.get().then(function () {
    						return todoStorage;
						});
					}
				}
			}).
			otherwise({
				redirectTo: '/todos'
			});	
    }]);