/**
 * Created by ranwahle on 5/15/15.
 */

(function(angular)
{
    var controller = function(visitorService, $scope)
    {
        var self = this;

        $scope.$watch(function()
            {
                return visitorService.lastPersonToGo;
            }, function(newValue)
            {
                self.lastPersonToGo = newValue;

            }
        );
        //visitorService.subscribeToPersonnelAssignment(function(personnel)
        //{
        //    if (personnel.customer) {
        //        self.lastPersonToGo = personnel.customer.turnNumber;
        //        setTimeout(function () {
        //            $scope.$apply();
        //        });
        //    }
        //});
    };

    angular.module('myTurn').controller('waitingListController',['visitorService','$scope',controller]);

}(window.angular));