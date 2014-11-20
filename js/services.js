pod = crosscloud.connect();
angular.module('CrossGallery.controllers', []).
    factory('crossCloudAPIService', function($q) {
        crossCloud = {};

        crossCloud.requestAllMediaData = function() {
            return $q(function(resolve, reject) {
                pod.query().filter({appName:"CrossGallery_v0.1"}).onAllResults(function(item){console.log("Asdf");resolve(item)}).start();
            });
        };

        return crossCloud;
    }
);