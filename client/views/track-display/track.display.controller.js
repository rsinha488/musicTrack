angular.module('musictrack').controller('TrackController', TrackController);

function TrackController(trackDataFactory, $routeParams){
    var vm= this;
    var id = $routeParams.id;
    trackDataFactory.trackDisplay(id).then(function(response){
       console.log(response); 
        vm.track = response.data;
        vm.stars = _getStarRating(response.data.rating);
    });
    function _getStarRating(stars) {
        return new Array(stars);
    }
    vm.addGenre = function() {
        var postData = {
            name: vm.name
        };
        if(vm.genreForm.$valid) {
            trackDataFactory.postGenre(id, postData).then(function(response) {
        if (response.status === 200) {
          $route.reload();
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
    };
}
    