/**
 * Created by ranwahle on 5/14/15.
 */
(function(angular)
{

    var controller = function(visitorService,$scope)
    {
        var self = this;
        this.visitorService = visitorService;

        this.$scope = $scope;
        $scope.$watch(function()
            {
                return visitorService.placeInline;
            }, function(newValue)
            {
                self.placeInLine = newValue;

            }
        );
    };



    controller.prototype.enqueue = function()
    {
        this.visitorService.enqueue(this.visitor);
    };

    angular.module('myTurn').controller('visitorController', ['visitorService','$scope',controller]);

}(window.angular));