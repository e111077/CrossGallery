var app = angular.module('gallery', []);
var owner;
var dataURL;

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

      // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        dataURL = e.target.result;
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

function pushToServer() {
    pod.push({appName:appVersion, dataURL:dataURL});
}

$(document).ready(function() {
  $('.fileSelector').on('change', handleFileSelect);
  console.log($('.fileSelector'));
});