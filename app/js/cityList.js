/**
 * Created by Freya on 2016/7/31.
 */
var app = angular.module('myapp',[]);
app.controller('cityListController',['$scope','$http',function ($scope,$http) {
    var cityList = [];
    var cityId =[];
    // var JSON_CALLBACK=function (data) {
    //     console.log('data:',data);
    // };
    $scope.editCity = function () {
        $http({
            method:'GET',
            url:'app/json/cityList.json'
        }).then(function(res){

            cityList = res.data;
        });
        for(var i = 0;i<cityList.length;i++){
            if(cityList[i].d2 === $scope.city){
                console.log("city:",$scope.city);
                cityId = cityList[i].d1;
                console.log("id"+cityId);
                // testString = '<resp><a>It Works!</a></resp>';   // get some xml (string or document/node)
                // result = xmlToJSON.parseString(testString);   // parse
                // console.log(result);
                // $http.jsonp('http://wthrcdn.etouch.cn/WeatherApi?citykey='+cityId,
                //     {headers:{'Accept':"application/xml",'Content-Type':"application/xml"},
                //         responseType:'text'}).success(function(res){
                //    console.log("res:",res);
                //     var detail = res.data;
                //       $scope.weather = xmlToJSON.parseString(detail);
                //     console.log($scope.weather);
                // });
                $http({method:'JSONP',
                    url:'http://wthrcdn.etouch.cn/WeatherApi?citykey='+cityId+'&callback=JSON_CALLBACK',
                    headers:{
                        "Accept":"application/xml",
                        "Content-Type":"application/xml"
                    },
                    responseType:"text"
                }).success(function (res) {
                    console.log(arguments);
                })
            }
        }
    };
}]);

