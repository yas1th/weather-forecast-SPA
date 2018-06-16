weatherApp.controller('homeController',["$scope","cityService","$location",function($scope,cityService,$location){
    $scope.city = cityService.city;
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });
    $scope.submit = function(){
        $location.path('forecast');
    };
}]);

weatherApp.controller('forecastController',["$scope","cityService","$resource","$routeParams","$http",function($scope,cityService,$resource,$routeParams,$http){
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weatherApiKey = "f76908e643acf962a28c26b7c23641ed";
    $scope.url = "http://api.openweathermap.org/data/2.5/forecast?q="+$scope.city+'&cnt='+$scope.days+'&appid='+$scope.weatherApiKey;
    $http.get($scope.url).then(function(response){
        console.log(response.data);
        $scope.weatherData = response.data;
    }).catch(function(err){
        console.log(err);
    });
    console.log($scope.url);
    console.log($scope.weatherData);
    $scope.convertToCentigrade = function(degK) {
        console.log($scope.days+'\n');
        console.log(degK);
        return Math.round((0.45 * (degK - 273)) + 32);   
    };
    $scope.convertToDate = function(dt) { 
        return new Date(dt * 1000);    
    };
}]); 