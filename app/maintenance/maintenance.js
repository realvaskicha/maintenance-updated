angular.module('myApp.maintenance', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngMessages',
    'ngAria',
    'ngMaterial'
  ])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/maintenance', {
      templateUrl: 'maintenance/maintenance.html',
    });
  }])

//   .filter("undeFilter",function(){
//   return function(input){
//          switch(input){
//          case undefined:
//          return "";
//   }
// }})

.controller ('formControl', function($scope) {
  //data model input fields
    const model = { selected: false,  eset: null, type: null, brand: "", serial: "", description: "", user: null, warranty: null, lastmaint: null }
    $scope.model = angular.copy(model)
    console.log(model)
    console.log($scope.model)
    
  //read data csv
    // const parseOptions = {
    //   header: true,
    //   quoteChar: '"', // quoting character
    //   delimiter: ';',
    //   skipEmptyLines: true, // ignore empty lines
    //   dynamicTyping: true,  // parse numbers automatically
    // };

    Papa.parse("/maintenance/edyn-pc.csv", {
      download: true,
      header:true,
      dynamicTyping:true,
      complete: function(results) {
        $scope.results = results.data;
        $scope.fields = results.meta.fields;
        console.log("delimiter:", results.meta.delimiter);
        console.log(results);
      }
      
    });

    //mock data asset array
    $scope.assetArray = [{ eset: "EDYN-00315", type: "Laptop", brand: "HP", serial: "S/N: 2CE3341P2D",
    description: "SSD: 240GB, CPU: i5-8250U @ 1.60 GHz, HDD: 1TB, RAM: 8GB, OS: Windows Enterprise 64-bit, GPU: GTX 960", user: "t.kolev", dateAdded: new Date(), warranty: "12.12.2015",  lastmaint: "24.03.2017" }]

    //reset function
    $scope.reset = function() {
      $scope.model = angular.copy(model);
    };

    //insert asset
    $scope.addAsset = function() {
      $scope.model.dateAdded = new Date()
      $scope.model.description = "SSD: " + $scope.model.ssd + ", " + "CPU: " + $scope.model.cpu + ", " + "HDD: " + $scope.model.hdd + ", " + "RAM: " + $scope.model.ram + ", " + "OS: " + $scope.model.os + ", " + "GPU: " + $scope.model.gpu
      $scope.assetArray.push($scope.model)
      console.log($scope.assetArray)
      $scope.reset()
    };

    //remove asset
    $scope.removeAsset = function(){
      var arrayAsset = [];
      angular.forEach($scope.assetArray, function(value) {
        if (!value.selected) {
          arrayAsset.push(value);
        }
      });
      $scope.assetArray = arrayAsset;
    };
    
    //alerts
    $scope.alerts = []; 

    $scope.successAlert = function() {
      $scope.alerts.push({type: 'success', msg: 'Successfully inserted new asset(s).'});
    };

    $scope.removeAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Successfully removed asset(s).'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    //$scope.submit = function(asset){
    // alert(JSON.stringify(asset));
    //}

    //highlight table row onclick

    //type filter
    $scope.predicate = function (typeFilter) {
      return function (asset) {
        return !typeFilter || asset.type === typeFilter;
      };
    };

    //remove button validation
    
    //pagination
    $(document).ready(function () {
      //Pagination full
      $('#paginationFull').DataTable({
        "pagingType": "full"
      });
    });
  }
)