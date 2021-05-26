myApp.directive('datepicker', function() {
    return {
       restrict: 'A',
       require: 'ngModel',
       compile: function() {
          return {
             pre: function(scope, element, attrs, ngModelCtrl) {
                // Initialize the date-picker
                $(element).datepicker({
                   format: 'dd/mm/yyyy'
                }).on('changeDate', function(ev) {
                   // Binds the changes back to the controller
                   // I also found that event.format() returns the string
                   // I wasn't aware of that. Sure beats using the date object and formatting yourself.
                   ngModelCtrl.$setViewValue(ev.format('dd/mm/yyyy'));
 
                   // I HATE using $apply, but I couldn't get it to work without
                   scope.$apply();
                });
             }
          }
       }
    }
 });