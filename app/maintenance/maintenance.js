angular.module('myApp.maintenance', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngMessages',
    'ngAria',
    'ngMaterial'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/maintenance', {
      templateUrl: 'maintenance/maintenance.html',
    });
  }])

  .controller('formControl', function ($scope, $http, $filter) {
    //data model input fields
    const model = {
      selected: false,
      eset: null,
      type: null,
      brand: "",
      serial: "",
      description: "",
      user: null,
      warranty: null,
      lastmaint: null
    }
    $scope.model = angular.copy(model)
    console.log(model)
    console.log($scope.model)

    //read mysql database data
    $http({
      method: 'get',
      url: 'http://localhost:3000/asset'
    }).then(function successCallback(response) {
      // Store response data
      $scope.assetArray = response.data;
    });

    //read data csv
    // const parseOptions = {
    //   header: true,
    //   quoteChar: '"', // quoting character
    //   delimiter: ';',
    //   skipEmptyLines: true, // ignore empty lines
    //   dynamicTyping: true,  // parse numbers automatically
    // };

    // Papa.parse("/maintenance/edyn-pc.csv", {
    //   download: true,
    //   header:true,
    //   dynamicTyping:true,
    //   complete: function(results) {
    //     $scope.results = results.data;
    //     $scope.fields = results.meta.fields;
    //     console.log("delimiter:", results.meta.delimiter);
    //     console.log(results);
    //   }

    // });

    //hardcoded mock data
    // $scope.assetArray = [{ eset: "EDYN-00315", type: "Laptop", brand: "HP", serial: "S/N: 2CE3341P2D",
    // description: "SSD: 240GB, CPU: i5-8250U @ 1.60 GHz, HDD: 1TB, RAM: 8GB, OS: Windows Enterprise 64-bit, GPU: GTX 960", user: "t.kolev", dateAdded: new Date(), warranty: "12.12.2015",  lastmaint: "24.03.2017" }]

    //reset input fields
    $scope.reset = function () {
      $scope.model = angular.copy(model);
    };

    //insert new asset
    $scope.addAsset = function () {
      $scope.model.dateAdded = new Date()
      $scope.model.description = "SSD: " + $scope.model.ssd + ", " + "CPU: " + $scope.model.cpu + ", " + "HDD: " + $scope.model.hdd +
        ", " + "RAM: " + $scope.model.ram + ", " + "OS: " + $scope.model.os + ", " + "GPU: " + $scope.model.gpu
      console.log($scope.assetArray)
      const data = {
        'Name': $scope.model.user,
        'ESET_Number': $scope.model.eset,
        'Type': $scope.model.type,
        'Brand': $scope.model.brand,
        'Serial_service_tag': $scope.model.serial,
        'Description': $scope.model.description,
        'Create_Date': $filter('date')($scope.model.dateAdded, "dd-MM-yyyy"),
        'Warranty': $scope.model.warranty,
        'Maintenance': $scope.model.lastmaint
      }
      console.log(data);
      //write mysql database
      $http.post('http://localhost:3000/asset', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (success) {
        $scope.assetArray.push(data)
        console.log($scope.model)
        $scope.reset()
      }, function (error) {});
    };
    
    //remove asset
    $scope.removeAsset = async function () {
      for (let i = $scope.assetArray.length - 1; i >= 0; i--) {
        if ($scope.assetArray[i].selected) {
          await $http.delete(`http://localhost:3000/asset/${$scope.assetArray[i].ESET_Number}`, null)
          $scope.assetArray.splice(i, 1)
        } 
      }
    };

    //alerts
    $scope.alerts = [];

    $scope.successAlert = function () {
      $scope.alerts.push({
        type: 'success',
        msg: 'Successfully inserted new asset(s).'
      });
    };

    $scope.removeAlert = function () {
      $scope.alerts.push({
        type: 'danger',
        msg: 'Successfully removed asset(s).'
      });
    };

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    //highlight table row onclick

    //asset type filter
    $scope.predicate = function (typeFilter) {
      return function (asset) {
        return !typeFilter || asset.type === typeFilter;
      };
    };

    //remove button validation

  })