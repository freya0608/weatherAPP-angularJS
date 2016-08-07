var weatherAPP = angular.module('myapp', [
    'ngRoute', 'ngAnimate', 'cityListController', 'bookStoreFilters',
    'bookStoreServices', 'bookStoreDirectives'
]);

weatherAPP.config(function($routeProvider) {
    $routeProvider.when('/cityList', {
        templateUrl: 'tpls/hello.html',
        controller: 'HelloCtrl'
    }).when('/list', {
        templateUrl: 'tpls/bookList.html',
        controller: 'BookListCtrl'
    }).when('/skill', {
            templateUrl: 'tpls/mySkill.html',
            controller: 'MySkillCtrl'
        })
        .otherwise({
            redirectTo: '/hello'
        })
});
