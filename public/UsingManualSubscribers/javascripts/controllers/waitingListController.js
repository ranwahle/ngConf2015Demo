/**
 * Created by ranwahle on 5/15/15.
 */

(function (angular) {
    var controller = function (visitorService, $scope) {
        var self = this,
            personnelAssignmentCallback = function (personnel) {
                if (personnel.customer) {
                    lastNumberToEnterCallback( personnel.customer.turnNumber);

                }
            },

            lastNumberToEnterCallback = function(lastNumberToEnter)
            {
                self.lastPersonToGo = lastNumberToEnter;
                setTimeout(function () {
                    $scope.$apply();
                });

            }
        visitorService.subscribeToPersonnelAssignment(personnelAssignmentCallback);
        visitorService.subscribeToLastNumberToEnter(lastNumberToEnterCallback);

        $scope.$on('$destroy', function()
        {
            visitorService.unsubscribeToPersonnelAssignment(personnelAssignmentCallback);
            visitorService.unsubscribeToLastNumberToEnter(lastNumberToEnterCallback);
        });
    };

    angular.module('myTurn').controller('waitingListController', ['visitorService', '$scope', controller]);

}(window.angular));