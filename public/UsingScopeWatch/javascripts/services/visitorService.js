/**
 * Created by ranwahle on 5/14/15.
 */
(function(angular)
{
    var service = function(socketIoClient, $rootScope, $timeout){

        var self = this;

            socketIoClient.subscribe('enqueue',function(placeInline)
            {
                self.placeInline = placeInline;
                $timeout(function() {
                    $rootScope.$apply();
                });
            });




            socketIoClient.subscribe('standAdded',function(personnel)
            {
                if (!self.serviceStands)
                {
                    self.serviceStands = [];
                }

                if (!personnel || !personnel.length)
                    return;



                self.serviceStands.push.apply(self.serviceStands, personnel);
                $timeout(function() {
                    $rootScope.$apply();
                });
            });


        //  socketIoClient.unsubscribe('standAdded', callback);



          socketIoClient.subscribe('personnelAssigned', function(personnel)
          {
              var samePersonnel = self.serviceStands.filter(function(p) {
                  return p.id === personnel.id;
              })[0];

              self.serviceStands[self.serviceStands.indexOf(samePersonnel)] = personnel;
              if (personnel.customer)
                  self.lastPersonToGo = personnel.customer.turnNumber;
              $timeout(function() {
                  $rootScope.$apply();
              });
          });

        socketIoClient.subscribe('lastNumberToEnter', function(lastNumberToEnter)
        {
            self.lastPersonToGo = lastNumberToEnter;
            $timeout(function () {
                $rootScope.$apply();
            });

        })




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

    angular.module('myTurn').service('visitorService',['socketIoClient','$rootScope','$timeout',service]);

}(window.angular));