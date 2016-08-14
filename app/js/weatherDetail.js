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
        $http({
            method:'GET',
            url:'app/json/cityList.json'
        }).then(function(res){
            cityList = res.data;
            $scope.selected = cityList[0];
            loadData();
        });
    };
    loadList();
    var loadData = function(){
        console.log("d1",$scope.selected);
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

    $scope.checkRefresh =function () {
        $scope.refreshLoading=true;

        loadData();
        $timeout(function () {
            $scope.refreshLoading=false;
            },1000);
        console.log($scope.refreshLoading);

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
    $scope.inputCity = function () {
        console.log($scope.city);
        for(var i=0;i<cityLists.length;i++){
            if($scope.city === cityLists[i].d2){
                $scope.selected = cityLists[i];
                $uibModalInstance.close($scope.selected);
            }
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

