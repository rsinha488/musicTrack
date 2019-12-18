angular.module('musictrack').controller('TracksController', TracksController);

function TracksController(trackDataFactory){
    var vm= this;
    vm.title = 'Music Tracks';
    trackDataFactory.trackList().then(function(response){
       console.log(response); 
        vm.tracks = response.data;
    });
    
    vm.addTrack =function() {
        var postData = {
            title: vm.title,
            rating: vm.rating,
            genres: vm.genres
        };
        console.log(postData);
        if (vm.trackForm.$valid) {
            trackDataFactory.postTrack(postData).then(function(response) {
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
