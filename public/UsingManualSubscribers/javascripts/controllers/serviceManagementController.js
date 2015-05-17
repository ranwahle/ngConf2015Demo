/**
 * Created by ranwahle on 5/14/15.
 */
(function(angular)
{

    var controller = function(visitorService, $scope, $timeout)
    {
        var self = this;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.visitorService = visitorService;
        this.serviceStands = [];
        var personnelAddedCallback = function(personnel) {
            self.standAdded(personnel);
            },
            personnelAssignmentCallback = function(personnel)
            {
                self.personnelAssigned(personnel);
            };
        this.visitorService.subscribeToStandAdded(personnelAddedCallback);

        this.visitorService.subscribeToPersonnelAssignment(personnelAssignmentCallback);

        $scope.$on('$destroy', function()
        {

        });


    };

    controller.prototype.personnelAssigned = function(personnel)
    {

        var self = this, samePersonnel = this.serviceStands.filter(function(p) {
           return p.id === personnel.id;
        })[0];

        this.serviceStands[this.serviceStands.indexOf(samePersonnel)] = personnel;
        self.$timeout(function() {self.$scope.$apply();});
    };

    controller.prototype.standAdded = function(stand)
    {

        if (!this.serviceStands)
        {
            this.serviceStands = [];
        }

        if (!stand || !stand.length)
            return;

        var self = this;

        this.serviceStands.push.apply(this.serviceStands, stand);

            setTimeout(function() {self.$scope.$apply()}, 0);

    };

    controller.prototype.assign = function(personnel)
    {
        this.visitorService.assign(personnel);
    };

    controller.prototype.addServiceStand = function(  )
    {
        this.visitorService.addServiceStand(this.newServiceStand);
    };


    angular.module('myTurn').controller('serviceManagementController',['visitorService','$scope','$timeout',controller]);
}(window.angular));