angular.module('musictrack').factory('genreDataFactory', genreDataFactory);

function genreDataFactory($http){
    return {
        genreList    : genreList

    };
    
    function genreList(id){
        return $http.get('/v1/'+id+'/genres').then(complete).catch(failed);
    }
    
    function complete(response) {
        return response;
    }
    
    function failed(error) {
        console.log(error.statusText);
    }
}