(function ($) {
    $(document).ready(function() {
        initializeActivityVideo();
    });

    function initializeActivityVideo() {
        $(".activity-thumbnail-video").click(function (elem) {
            resetVideo();
            playVideo(this);
        });

        var playVideo = function (elem) {
            var elem = $(elem);
            var videoElem = elem.find(".activity-video");
            elem.find(".activity-poster").addClass("d-none");
            videoElem.removeClass("d-none");
            videoElem.get(0).play();
        };

        var resetVideo = function () {
            $(".activity-thumbnail-video").each(function () {
                var elem = $(this);
                var videoElem = elem.find(".activity-video");
                elem.find(".activity-poster").removeClass("d-none");
                videoElem.addClass("d-none");
                videoElem.get(0).pause();
                videoElem.get(0).currentTime = 0;
            });
        };
    }
}($));