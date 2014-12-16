var todoAngularControllers = angular.module('todoAngularControllers', []);

//controleur des todos.
todoAngularControllers.controller('TodoController', ['$scope', '$modal', '$routeParams', 'store',
  function ($scope, $modal, $routeParams, store) {
    
    //récupération des todos dans le Store
    var listTodos = $scope.listTodos = store.listTodos;

    //Listener des modifs de la route pour appliquer les filtres adéquats
    $scope.$on('$routeChangeSuccess', function () {
            var filtreStatus = $scope.filtreStatus = $routeParams.filtreStatus || '';

            //application des filtres
            $scope.filtreStatus = (filtreStatus === 'active') ?
                { status: false } : (filtreStatus === 'completed') ?
                { status: true } : null;
        });
      
    //ajout d'un todo
    $scope.addTodo = function(){

    	var newTodo = {
            text: $scope.newTodo.text ,
            status: false
        };

        //envoi du todo au module de storage pour sauvegarde
        store.insert(newTodo);

    }

    //change le statut d'un todo
    $scope.todoDone = function(todo){

        if (todo.status === false) {
            todo.status = true;
        }else{
            todo.status = false;
        }
        //envoi de la modification au module de storage
        store.put(todo, listTodos.indexOf(todo));
    }

    //gestion de la modale de modification d'un todo (voir controller de la modale plus bas)
    $scope.open = function(todo){
        //instancie une nouvelle modale et lui passe les données
        var modalInstance = $modal.open({
            templateUrl: 'app/partials/modalContent.html',
            controller: 'ModalInstanceController',
            size: 'lg',
            resolve : {
                todo: function(){
                    return todo
                }
            }
        });

        //récupération des données issues de la modale si Ok et envoi au store pour sauvegarde
        modalInstance.result.then(function (modTodo){
            store.put(modTodo, listTodos.indexOf(modTodo));
        });

        
    }

    //suppression du todo passé en paramètre
    $scope.delTodo = function(todo){

         store.delete(todo);
        
    }

}]);


//controleur de la modale de modification

todoAngularControllers.controller('ModalInstanceController', ['$scope', '$modalInstance','todo',
    function($scope, $modalInstance, todo){

        $scope.todo = todo;

        //action de modification
        $scope.modTodo = function(){
        $scope.todo.text = $scope.modTodo.text;

        }

        //action à réaliser si fermeture de la modale via le bouton Ok
        $scope.ok = function () {
        $modalInstance.close($scope.modTodo());
        };

        //fermeture de la modale sans prise en compte des changements
        $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        };

    }]);