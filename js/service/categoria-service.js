angular.module('appClientAPI.services',[])
	.factory('Categoria',function($resource){
    	
    	return $resource('http://localhost/www/apiTeste/categorias/:id',{id:'@id'},{
        	update: {
            	method: 'PUT'
        	}       

    	});
    
	})
	.service('popupService',function($window){
	    this.showPopup=function(message){
	        return $window.confirm(message);
	    }
	});