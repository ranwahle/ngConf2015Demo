/**
 * Created by ranwahle on 5/14/15.
 */
(function(angular)
{
    var service = function(socketIoClient){
        this.subscribe = function( callback)
        {
            socketIoClient.subscribe('enqueue',callback);
        };

        this.subscribeToStandAdded = function(callback)
        {

            socketIoClient.subscribe('standAdded',callback);
        };

        this.unsubscribeToStandAdded = function(callback)
        {
          socketIoClient.unsubscribe('standAdded', callback);
        };

        this.subscribeToPersonnelAssignment = function(callback)
        {
          socketIoClient.subscribe('personnelAssigned', callback);
        };

        this.unsubscribeToPersonnelAssignment = function(callback)
        {
            socketIoClient.unsubscribe('personnelAssigned', callback);
        };
        this.subscribeToLastNumberToEnter = function(callback)
        {
            socketIoClient.subscribe('lastNumberToEnter', callback);
        }

        this.unsubscribeToLastNumberToEnter = function(callback)
        {
            socketIoClient.unsubscribe('lastNumberToEnter', callback);
        }

        this.assign = function(personnel)
        {
            socketIoClient.assign(personnel);
        };

        this.enqueue = function(visitor)
        {
          socketIoClient.enqueue(visitor);
        };

        this.addServiceStand = function(serviceStand)
        {
          socketIoClient.addServiceStand(serviceStand);
        };
    };

    angular.module('myTurn').service('visitorService',['socketIoClient',service]);

}(window.angular));