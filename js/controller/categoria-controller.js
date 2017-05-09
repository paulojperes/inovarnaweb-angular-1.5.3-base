angular.module('appClientAPI.controllers',[])

.controller('CategoriaListController',function($scope,$state,popupService,$window,Categoria){

    $scope.categorias=Categoria.query();

    $scope.deleteCategoria=function(categoria){
        if(popupService.showPopup('Deseja realmente apagar?'))
        {
            categoria.$delete(function(){
                $window.location.href='';
            });
        }
    }

})
.controller('CategoriaViewController',function($scope,$stateParams,Categoria){

    $scope.categoria=Categoria.get({id:$stateParams.id});

})
.controller('CategoriaCreateController',function($scope,$state,$stateParams,Categoria, $http){

    $scope.categoria=new Categoria();

    $scope.addCategoria=function()
    {     

        $http.post('http://localhost/www/apiTeste/categorias/', $scope.categoria)
                .then(
                   function(response){
                      
                   }, 
                   function(response){
                     // failure callback
                   }
                );
        $state.go('categorias');
    }

})
.controller('CategoriaEditController',function($scope,$state,$stateParams,Categoria){
    
    $scope.updateCategoria=function(){
        $scope.categoria.$update(function(){
            $state.go('categorias');
        });
    };

    $scope.loadCategoria=function(){
        $scope.categoria=Categoria.get({id:$stateParams.id});
    };

    $scope.loadCategoria();
});