//angular.module('musictrack').directive('trackRating', trackRating);
//<track-rating> use in html
//
//function trackRating(){
//    return {
//        restrict: 'E',
//        template: '<span ng-repeat="stars in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }} </span>',
//        bindToController:true,
//        controller: 'TrackController',
//        controllerAs: 'vm',
//        scope: {
//            stars: '@'
//        }
//    }
//}

angular.module('musictrack').component('trackRating', {
    bindings: {
        stars:'@'
    },
    template: '<span ng-repeat="stars in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }} </span>',
    controller: 'TrackController',
    controllerAs: 'vm'
});