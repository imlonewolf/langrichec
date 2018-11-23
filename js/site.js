(function ($) {
    $(document).ready(function() {
        initialize();
        initializeActivityVideo();
        initializeUserStories();
        initializeScrollTop();
        initializeBannerRegister();
    });

    function initialize() {
        window.updateIdentity = function () {
        };
    }

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
        elem.each(function (i) {
            var storyItem = $(this);
            var messageElem = storyItem.find(".user-message");

            storyItem.attr("data-index", i);
            storyItem.addClass("d-none");
            bindEventUserMessage(storyItem);
            messageElem.addClass("d-none");
            items.push(storyItem);
        });

        function hasNext() {
            if (currentPage < (totalItem - 1)) {
                return true;
            }
            return false;
        }

        function hasPrevious() {
            if (currentPage <= 0) {
                return false;
            }

            return true;
        }

        function getNext() {
            getData(currentPage + 1);
        }

        function getPrevious() {
            getData(currentPage - 1);
        }

        function bindEventUserMessage(elem) {
            var seeMoreWrapElem = elem.find(".see-more");
            var seeMoreElem = elem.find(".see-more-link");
            var seeLessElem = elem.find(".see-less");

            seeLessElem.addClass("d-none");
            seeMoreElem.click(function () {
                seeMoreWrapElem.addClass("d-none");
                seeLessElem.removeClass("d-none");
                elem.find(".user-message").removeClass("d-none");
            });

            seeLessElem.click(function () {
                seeLessElem.addClass("d-none");
                seeMoreWrapElem.removeClass("d-none");
                elem.find(".user-message").addClass("d-none");
            });
        }


        function getData(page) {
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
        }

        function checkPreviousNav() {
            previousNavElem.removeClass("disable-nav");
            if (!hasPrevious()) {
                previousNavElem.addClass("disable-nav");
            }
        }

       function checkNextNav() {
            nextNavElem.removeClass("disable-nav");
            if (!hasNext()) {
                nextNavElem.addClass("disable-nav");
            }
        }

        function checkNavState() {
            checkNextNav();
            checkPreviousNav();
        }

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

    function initializeScrollTop() {
        $(".back-to-top").click(function () {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    }


    function initializeBannerRegister() {
        $(".big-banner-button").click(function () {
            if (!_.has(window, "authenticationModalApp")) {
                return;
            }
            window.authenticationModalApp.zone.run(function () {
                window.authenticationModalApp.app.launchRegister();
            });
        });
    }
}($));