/**
 * Created by freya on 2016/8/7 0007.
 */

var app=angular.module('myapp',['ui.bootstrap']);
app.controller('indexController',function($scope,$http,$uibModal,$log,$timeout){
    // $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalCity.html',
            controller: 'ModalCityCtrl',
            resolve: {
                cityLists: function () {
                    return cityList;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log('selected:',selectedItem);
            $scope.selected = selectedItem;
            console.log($scope.selected.d1);
            loadData();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    var  cityList=[];
    var loadList= function(){
        console.log("6666");
        $http({
            method:'GET',
            url:'app/json/cityList.json'
        }).then(function(res){
            cityList = res.data;
        });
    };
    loadList();
    var loadData = function(){
        var detail=[];
        console.log("d1",$scope.selected.d1);
        $http({method:'JSONP',
            url:'http://wthrcdn.etouch.cn/weather_mini?citykey='
            +$scope.selected.d1+'&callback=JSON_CALLBACK',
            headers:{
                "Accept":"application/xml",
                "Content-Type":"application/xml"
            },
            responseType:"text"
        }).success(function (res) {
            $scope.weather = res.data;
            $scope.today = $scope.weather.forecast[0];
            $scope.forecasts = $scope.weather.forecast;
            
            console.log("forecast",$scope.weather.forecast);
             console.log(res.data);
        });
    };
    
    $scope.inputCity = function () {
        ok();
    };
    
    $scope.checkRefresh =function () {
        if($scope.refreshLoading) return;
        $scope.refreshLoading=true;
        $timeout(function () {
            loadList();
            $scope.refreshLoading=false;
            },2000);
    }



    
    
});

angular.module('myapp').controller('ModalCityCtrl',
    function ($scope, $uibModalInstance, cityLists) {
    $scope.cityLists = cityLists;
    $scope.ok = function (selected) {
        if(!selected && !selected.d2){
            return;
        }
        $uibModalInstance.close(selected);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

