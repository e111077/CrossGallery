appVersion = "CrossGallery_v0.4";
pod = crosscloud.connect();

$(document).ready(function() {
    jQuery('.fancybox').fancybox({
        margin      : [20, 80, 20, 80],
        helpers : {
            title   : {
                type: 'outside'
            },
            thumbs  : {
                width   : 50,
                height  : 50
            },
            fitToView : true,   
        }
    });

    /*
    * Replace all SVG images with inline SVG
    */
    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    $('#selectImage').on('click', function() {
        var uploadDiv = $('.upload');
        if (uploadDiv.hasClass('hidden')) {
            uploadDiv.transition('slide down');
        }
    });

    $(document).on('click', '.comment.submission .submit.button', function() {
        var commentField = $(this).parent().children(".input").children()[0]
        var comment = commentField.value;
        var mediaId = $(this).attr("mediaId");

        pod.push({appName:appVersion, type:"comment",content:comment,mediaId:mediaId}, function(commentObject){
            var comments = $(this).parent().parent().children(".comments");

            // get the comment html from the template
            var commentSource   = $('.hidden.templates .commentTemplate').html();
            var commentTemplate = Handlebars.compile(commentSource);
            var commentHtml = commentTemplate(commentObject);

            comments.innerHTML = comments.innerHTML + commentHtml;
            commentField.value = "";

        })

    

        }
    );
});