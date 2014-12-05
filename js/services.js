pod = crosscloud.connect();
angular.module('CrossGallery.controllers', []).
    factory('crossCloudAPIService', function($q) {
        crossCloud = {};

        crossCloud.requestAllMediaData = function() {
            var deferred = $q.defer();
            pod.query().filter({appName:appVersion, type:"media"}).onAllResults(function(item){
              console.log("first Search", item);
              item.comments = [];

              pod.query().filter({appName:appVersion, type:"comment", mediaId:item._id}).onAllResults(function(comment) {
                console.log("second search", comment);
                item.comments.push(comment);
                console.log("itemsasdfsadf", item);
                deferred.notify(item);

              }).start();
            }).start();

            return deferred.promise;
        };

        return crossCloud;
    }
);