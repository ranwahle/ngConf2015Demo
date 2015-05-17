/**
 * Created by ranwahle on 5/14/15.
 */
(function(angular)
{

    var controller = function(visitorService,$scope)
    {
        var self = this,
            turnChangeCallback = function(number)
            {
                self.turnChangeCallback(number);
            };

        this.visitorService = visitorService;
      visitorService.subscribe(turnChangeCallback);
        this.$scope = $scope;

        $scope.$on('$destroy', function()
        {
            visitorService.unsubscribe(turnChangeCallback);
        });
    };

    controller.prototype.turnChangeCallback = function(newTurn)
    {
        this.placeInLine = newTurn;
        var self = this;
        setTimeout(function() {self.$scope.$apply();}, 0);
    };

    controller.prototype.enqueue = function()
    {
        this.visitorService.enqueue(this.visitor);
    };

    angular.module('myTurn').controller('visitorController', ['visitorService','$scope',controller]);

}(window.angular));