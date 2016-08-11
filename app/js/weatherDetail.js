/**
 * Created by freya on 2016/8/7 0007.
 */

var app=angular.module('myapp',['ui.bootstrap']);
app.controller('indexController',function($scope,$http,$uibModal,$log){
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalCity.html',
            controller: 'ModalCityCtrl',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    var  cityList=[];
    var loadList= function(){
        console.log("6666")
        $http({
            method:'GET',
            url:'app/json/cityList.json'
        }).then(function(res){
            cityList = res.data;
            $scope.cityLists = cityList;
            console.log(cityList[0].d4);

        });
    };
    loadList();
    var loadData = function(cb){
        var cityId =[];
        var detail=[];
        for(var i=0;i<cityList.length;i++){
            cityId = cityList[i].d1;
            $scope.cityLists = cityList[i].d4;
            console.log(cityList[0].d1);
            console.log("d4",cityList[0].d4);
            $http.jsonp('http://wthrcdn.etouch.cn/WeatherApi?citykey='+cityId).then(function(res){
                detail = res.data;
                console.log(res.data);
            });
            if(cb) cb(cityList);
        }
    };
    $scope.forecast = function(){
        var cb = function(cityList){
            var forecastWeather =cityList.data;
            for(var i=0;i<forecastWeather.forecast.length;i++){
                $scope.today = forecastWeather.forecast[0];
                $scope.tomorrow = forecastWeather.forecast[1];
                $scope.third = forecastWeather.forecast[2];
            }
        };
        loadData(cb);
    }
});

angular.module('myapp').controller('ModalCityCtrl',
    function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

