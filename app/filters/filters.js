//module gérant les filtres
angular.module('todoAngularFilters',[])
	
	//filtre de l'affichage du statut
	.filter('checkmark', function(){
		return function(input){
			return input ? '\u2713  Terminée' : '\u2718  A faire';
		};
	})
	//filtre gérant le texte du bouton de switch du statut d'une tâche
	.filter('doneButton', function(){
		return function(input){
			return input ? "A faire" : "C'est fait !";
		};
	});