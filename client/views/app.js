angular.module('musictrack', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'views/tracks-list/tracks.html',
            controller: TracksController,
            controllerAs:'vm'
        })
        .when('/track/:id', {
            templateUrl: 'views/track-display/track.html',
            controller: TrackController,
            controllerAs:'vm'
        })
        .when('/:id/genres', {
            templateUrl: 'views/genres-list/genres.html',
            controller: GenresController,
            controllerAs:'vm'
        });
}
