angular.module('musictrack').factory('trackDataFactory', trackDataFactory);

function trackDataFactory($http){
    return {
        trackList    : trackList,
        trackDisplay : trackDisplay,
        postTrack    : postTrack,
        postGenre    : postGenre

    };
    
    function trackList(){
        return $http.get('/v1/tracks?count=10').then(complete).catch(failed);
    }
    
    function trackDisplay(id){
        return $http.get('/v1/tracks/'+id).then(complete).catch(failed);
    }

    function postTrack(track) {
        console.log('/v1/tracks'+track);
        return $http.post('/v1/tracks'+track).then(complete).catch(failed);
    }

     function postGenre(id, genres) {
         console.log('Here   /v1/' + id + '/genres', genres);
    return $http.post('/v1/' + id + '/genres', genres).then(complete).catch(failed);
  }

    function complete(response) {
        return response;
    }
    
    function failed(error) {
        console.log(error.statusText);
    }
}