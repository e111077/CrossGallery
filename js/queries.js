$(function() {
  // do queries upon login
  pod.onLogin(function(userId) {
    var $gallery      = $("#gallery");
    // get the template
    var mediaSource   = $('.hidden.templates .mediaTemplate').html();
    var mediaTemplate = Handlebars.compile(mediaSource);
    // get the  comment template
    var commentSource   = $('.hidden.templates .commentTemplate').html();
    var commentTemplate = Handlebars.compile(commentSource);

    // create a query
    var mediaQuery = pod.query();
    // filter for media
    mediaQuery.filter({appName:appVersion, type:"media"});

    // query handle the results
    mediaQuery.onAllResults(function (media) {
      // iterate through each result
      for (var i = 0; i < media.length; i++) {
        // console.log(i);
        var medium = media[i];

        // create a hrefable unique string
        var punctuationAndSlashes = new RegExp("[\.\!/:\,]", "g");
        medium.linkableId = medium._id.replace(punctuationAndSlashes, "");
        // hacking so that fancybox will not crash becasue of template
        medium.fancybox   = "fancybox";

        // handlebars makes the html needed for the insertion
        var mediumHtml    = mediaTemplate(medium);
        // append the media object
        $gallery.append(mediumHtml);
      }
    });
    
    // create a new query for the comments
    var commentQuery  = pod.query();
    // filter for comments
    commentQuery.filter({appName:appVersion, type:"comment"});
    // handle the comment results
    commentQuery.onAllResults(function(comments) {
      // iterate through each comment
      for(var j = 0; j < comments.length; j++) {
        var comment     = comments[j];
        // get the comment html
        var commentHtml = commentTemplate(comment);

        // get the place where we will insert comments for this medium
        var $commentField = $('[ccId="' + comment.mediaId + '"] .comments');
        // put the comment in the correct pedia object
        $commentField.append(commentHtml);
        // console.log(j);
      }
    });

    mediaQuery.start();
    commentQuery.start();
  });
});