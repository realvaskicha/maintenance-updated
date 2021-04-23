angular.module('myApp.maintenance', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/maintenance', {
      templateUrl: 'maintenance/maintenance.html',
    });
  }])

.controller ('formControl', function($scope) {
    const model = { eset: "", type: "", brand: "", serial: "", ssd: "", cpu: "", hdd: "", ram: "", os: "", gpu: "", user: "", warranty: "", lastmaint: "" }
    $scope.model = angular.copy(model)
    console.log(model)
    console.log($scope.model)

    $scope.assetArray = [{ eset: "EDYN-00315", type: "Laptop", brand: "HP", serial: "S/N: 2CE3341P2D",
    ssd: "240GB", cpu: "i5-8250U @ 1.60 GHz", hdd: "1TB", ram: "8GB", os: "Windows Enterprise 64-bit", gpu: "GTX 960", user: "t.kolev", dateAdded: new Date(), warranty: "12.12.2015",  lastmaint: "24.03.2017" }]
    
    $scope.reset = function() {
      $scope.model = angular.copy(model);
    };

    $scope.addAsset = function() {
      $scope.model.dateAdded = new Date()
      $scope.assetArray.push($scope.model)
      console.log($scope.assetArray)
      $scope.reset()
    };

    $scope.alertInsert = function() {
      alert('Asset inserted into the database.')
    };

    $scope.alertRemove = function() {
      alert('Asset removed from the database.');
    }
    $scope.hidden=true;

    $scope.hideInput = function() {
      $scope.hidden = !$scope.hidden;
    }
  
  //$scope.submit = function(asset){
  // alert(JSON.stringify(asset));
  //}

    $scope.removeAsset = function(){
      var arrayAsset = [];
      angular.forEach($scope.assetArray, function(value) {
        if (!value.Remove) {
          arrayAsset.push(value);
        }
      });
      $scope.assetArray = arrayAsset;
    }
  }
);

