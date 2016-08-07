/**
 * Created by freya on 2016/8/7 0007.
 */

var app=angular.module('myapp',['ui.bootstrap']);
app.controller('indexController',function($scope,$http,$uibModal,$log){

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
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
    var  cityList=[];
    var loadList= function(){
        $http({
            method:'GET',
            url:'json/cityList.json'
        }).then(function(res){
            cityList = res.data;
            //console.log(res.data);
        })
    };
    loadList();



    var loadData = function(cb){
        var cityId =[];
        var detail=[];

        for(var i=0;i<cityList.length;i++){
            cityId = cityList[i].d1;
            console.log(cityList[0].d1);
            $http.jsonp('http://wthrcdn.etouch.cn/WeatherApi?citykey='+cityId).then(function(res){
                detail = res.data;
                console.log(res.data);
            });
            if(cb) cb(cityList);
        }

    }

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

angular.module('myapp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

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

