(function ($) {
    $(document).ready(function() {
        initializeActivityVideo();
        initializeUserStories();
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


    function initializeUserStories() {
        var LIMIT_STORIES = 3;
        var elem = $(".story-item");
        var totalItem = Math.ceil(elem.length / LIMIT_STORIES);
        var previousNavElem = $(".previous-story-nav");
        var nextNavElem = $(".next-story-nav");
        var currentPage = 0;

        var items = [];
        elem.each(function (i, elem) {
            var storyItem = $(this);
            storyItem.attr("data-index", i);
            storyItem.addClass("d-none");
            items.push(storyItem);
        });


        var hasNext = function () {
            if (currentPage < (totalItem - 1)) {
                return true;
            }
            return false;
        };

        var hasPrevious = function () {
            if (currentPage <= 0) {
                return false;
            }

            return true;
        };

        var getNext = function () {
            getData(currentPage + 1);
        };

        var getPrevious = function () {
            getData(currentPage - 1);
        };

        var getData = function (page) {
            currentPage = page;
            var currentItems = _.slice(items, page * LIMIT_STORIES, (page + 1) * LIMIT_STORIES);
            var indexes = _.map(currentItems, function (e) {
                return e.attr("data-index");
            });
            elem.each(function () {
                var currentElem = $(this);
                var index = currentElem.attr("data-index");
                if (_.includes(indexes, index)) {
                    currentElem.removeClass("d-none");
                } else {
                    currentElem.addClass("d-none");
                }
            });
        };

        var checkPreviousNav = function () {
            previousNavElem.removeClass("disable-nav");
            if (!hasPrevious()) {
                previousNavElem.addClass("disable-nav");
            }
        };

        var checkNextNav = function () {
            nextNavElem.removeClass("disable-nav");
            if (!hasNext()) {
                nextNavElem.addClass("disable-nav");
            }
        };

        var checkNavState = function () {
            checkNextNav();
            checkPreviousNav();
        };

        initialize();

        function initialize() {
            getData(currentPage);
            checkNavState();
        }



        nextNavElem.click(function () {
            if (hasNext()) {
                getNext();
            }
            checkNavState();
        });

        previousNavElem.click(function () {
            if (hasPrevious()) {
                getPrevious();
            }
            checkNavState();
        });
    }
}($));