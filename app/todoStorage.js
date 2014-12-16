var todoAngularStorage = angular.module('todoAngularStorage', []);


//récupération du bon module de Storage (pour laisser la possibilité d'ajouter une autre façon de persister les données)
todoAngularStorage.factory('todoStorage', ['$injector',
	 function ($injector) {
        'use strict';
       	return $injector.get('localStorage');
    }]);

//Module de persistance des données via LocalStorage
todoAngularStorage.factory('localStorage',['$q', function($q) {
        'use strict';

        //Constante de paramétrage du localStorage
        var STORAGE_ID = 'todoAngularLocalStorage';

        //initialisation du store
        var store = {
            listTodos: [],

            //récupérer depuis le local storage
            _getFromLocalStorage: function(){
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            //enregistrer dans le local storage
            _saveToLocalStorage: function (listTodos) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(listTodos));
            },

            //supprimer un Todo
            delete: function (todo) {
                //instanciation de l'API Deferred
                var deferred = $q.defer();

                //suppression du Todo
                store.listTodos.splice(store.listTodos.indexOf(todo), 1);

                //maj du localStorage
                store._saveToLocalStorage(store.listTodos);
                deferred.resolve(store.listTodos);

                //renvoi des données
                return deferred.promise;
            },

            //récupérer les todos
            get: function () {

                //instanciation de l'API Deferred
                var deferred = $q.defer();

                //récupération des Todos
                angular.copy(store._getFromLocalStorage(), store.listTodos);
                deferred.resolve(store.listTodos);

                //renvoi des données
                return deferred.promise;

            },

            //remplacer un Todo dans le localStorage (Utilisé lors des modifications)
            put: function (todo, index) {
                //instanciation de l'API Deferre
				var deferred = $q.defer();

                //modification de la tâche ciblée
				store.listTodos[index] = todo;

                //maj du localStorage
				store._saveToLocalStorage(store.listTodos);
				deferred.resolve(store.listTodos);

                //renvoi des données
				return deferred.promise;
			},

            //ajouter un todo à la fin de la todo list  
            insert: function (todo) {

                //instanciation de l'API Deferred
                var deferred = $q.defer();

                //ajout de la tâche à la fin des Todos
                store.listTodos.push(todo);

                //maj du localStorage
                store._saveToLocalStorage(store.listTodos);
                deferred.resolve(store.listTodos);

                //renvoi des données
                return deferred.promise;

            }
      };

      return store;
}]);