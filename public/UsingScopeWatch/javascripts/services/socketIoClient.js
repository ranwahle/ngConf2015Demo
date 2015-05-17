/**
 * Created by ranwahle on 5/6/15.
 */

(function(angular)
{
    var factory = function() {
        var socket = io.connect(),
            subscribers = {},
            runSuscribers = function(subject, data)
            {
                if (!subscribers[subject])
                    return;
                subscribers[subject].forEach(function(callBack)
                {
                    callBack(data);
                });
            };

        socket.on('yourNumber', function(number)
        {
            runSuscribers('enqueue', number);

        });

        socket.on('personnelAssigned', function(personnel)
        {
            runSuscribers('personnelAssigned', personnel);
        });

        socket.on('personnel', function(stands)
        {
            runSuscribers('standAdded', stands);
        });

        socket.on('standAdded', function(stand)
        {
            runSuscribers('standAdded', [stand]);
        });

        socket.on('lastNumberToEnter', function(customerNumber)
        {
            runSuscribers('lastNumberToEnter', customerNumber);
        });

        return {
            subscribe: function (subject, callback) {
                if (!subscribers[subject])
                {
                    subscribers[subject] = [];
                }
                subscribers[subject].push(callback);
            },

            unsubscribe: function (subject, callback) {
                subscribers.splice(subscribers[subject].indexOf(callback), 1);
            },
            enqueue: function (person) {
                socket.emit('enqueue', person, function(number)
                {
                    runSuscribers('enqueue', number);
                });
            },
            addServiceStand: function(serviceStand)
            {
                socket.emit('addStand', serviceStand);
            },

            assign: function(personnel)
            {
                socket.emit('assign', personnel);
            }


        }
    }

    angular.module('myTurn').factory('socketIoClient',[factory]);


}(window.angular) );


