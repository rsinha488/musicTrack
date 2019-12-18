angular.module('musictrack').controller('GenresController', GenresController);

function GenresController(genreDataFactory, $routeParams){
    var vm= this;
    var id = $routeParams.id;
    vm.title = 'Tracks Genre';
    genreDataFactory.genreList(id).then(function(response){
       console.log(response); 
        vm.tracks = response.data;
    });
}