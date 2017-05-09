/**
* appClientAPI Module
*
* Description
*/
angular.module('appClientAPI', ['ui.router', 'ngResource', 'ngStorage', 'ngMessages', 'appClientAPI.controllers', 'appClientAPI.services']);

angular.module('appClientAPI')
	.config(function($stateProvider,$httpProvider){
    
    $stateProvider
    //rota index
    .state('categorias',{
        url:'/categorias',
        templateUrl:'templates/categoria/list.html',
        controller:'CategoriaListController'
    }) 
    //visualizar 
    .state('viewCategoria',{
       url:'/categoria/:id/view',
       templateUrl:'templates/categoria/view.html',
       controller:'CategoriaViewController'
    })

    //novo
    .state('newCategoria',{
        url:'/categoria/new',
        templateUrl:'templates/categoria/add.html',
        controller:'CategoriaCreateController'
    })

    //editar
    .state('editCategoria',{
        url:'/categoria/:id/edit',
        templateUrl:'templates/categoria/edit.html',
        controller:'CategoriaEditController'
    })

    //logout
    .state('logout',{
        url:'/logout',
        templateUrl:'templates/login/logout.html',
        controller:'LoginController',
        controllerAs: 'vm'
    })    

    //login
    .state('login',{
        url:'/login',
        templateUrl:'templates/login/view.html',
        controller:'LoginController',
        controllerAs: 'vm'
    }); 



}).run(run);

function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }

/*
function($state){
    //pagina incial da aplicação
   $state.go('categorias');
}
*/