var pod = crosscloud.connect();

function getAllImages(scope) {
    scope.media = [];
    pod.query().pattern({appName:"CrossGallery"}).onAllResults(function(items) {
        var mediaList = items.media;

        for (var i = 0; i < mediaList.length; i++) {
            source.media.push({media : mediaList[i]});
        }
    }).start();
}