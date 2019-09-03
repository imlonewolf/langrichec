(function ($, window) {
    var SITE_PROD_HOSTNAME = "www.langrich.com";
    var SITE_QA_HOSTNAME = "qa.langrich.com";

    window.isProd = isProd;

    $(document).ready(function() {
        initialize();
        initializeActivityVideo();
        initializeUserStories();
        initializeScrollTop();
        initializeEvents();
    });

    function initialize() {
        window.updateIdentity = function () {
            setTimeout(function () {
                window.location.href = "//ja.qaenglishcentral.com/partner/langrich?redirect=/myenglish/lessons&delay=true";
            }, 1800);
        };
    }

    function initializeActivityVideo() {
        var played = false;
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
            played = true;
        };

        var pauseVideo = function (elem) {
            var elem = $(elem);
            var videoElem = elem.find(".activity-video");
            elem.find(".activity-poster").removeClass("d-none");
            videoElem.addClass("d-none");
            videoElem.get(0).pause();
            videoElem.get(0).currentTime = 0;
        };

        var resetVideo = function () {
            $(".activity-thumbnail-video").each(function () {
                played = false;
                pauseVideo(this);
            });
        };

        $( window ).scroll(function() {
            if (!isScrolledIntoView($(".activity-step-video"), true) && !isMobile()) {
                if (played) {
                    resetVideo();
                }
            }

            if (!isScrolledIntoView($(".activity-thumbnail-watch")) && isMobile()) {
                if (played) {
                    pauseVideo($(".activity-thumbnail-watch"));
                }
            }

            if (!isScrolledIntoView($(".activity-thumbnail-learn")) && isMobile()) {
                if (played) {
                    pauseVideo($(".activity-thumbnail-learn"));
                }
            }
            if (!isScrolledIntoView($(".activity-thumbnail-speak")) && isMobile()) {
                if (played) {
                    pauseVideo($(".activity-thumbnail-speak"));
                }
            }
            if (!isScrolledIntoView($(".activity-thumbnail-golive")) && isMobile()) {
                if (played) {
                    pauseVideo($(".activity-thumbnail-golive"));
                }
            }
        });
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


    function initializeEvents() {
        $(".big-banner-button").click(function () {
            trackBigRegisterButton();
            if (!_.has(window, "authenticationModalApp")) {
                return;
            }
            window.authenticationModalApp.zone.run(function () {
                window.authenticationModalApp.app.launchRegister();
            });
        });


        $(".site-header").on("click", ".btn-signin", function () {
            trackLoginButton();
        });


        $(".site-header").on("click", ".btn-register", function () {
            trackRegisterButton();
        });
    }


    function isScrolledIntoView(element, fullyInView){
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }

    function trackBigRegisterButton() {
        console.log("Track big register button >>>");
        if (isProd()) {
            gtag('event', 'Click', {
                'event_category': 'Authentication',
                'event_label': 'register_banner',
                'value': 1
            });
        }
    }

    function trackLoginButton() {
        console.log("Track login button >>>");
        if (isProd()) {
            gtag('event', 'Click', {
                'event_category': 'Authentication',
                'event_label': 'header_login',
                'value': 1
            });
        }
    }

    function trackRegisterButton() {
        console.log("Track register button >>>");
        if (isProd()) {
            gtag('event', 'Click', {
                'event_category': 'Authentication',
                'event_label': 'header_registration',
                'value': 1
            });
        }
    }

    function isMobile()  {
        var userAgent = navigator.userAgent;
        return /Android/i.test(userAgent)
            || /webOS/i.test(userAgent)
            || /iPhone/i.test(userAgent)
            || /iPad/i.test(userAgent)
            || /iPod/i.test(userAgent)
            || /BlackBerry/i.test(userAgent)
            || /Windows Phone/i.test(userAgent);
    }

    function isProd() {
        return window.location.hostname == SITE_PROD_HOSTNAME;
    }

    function isQa() {
        return window.location.hostname == SITE_QA_HOSTNAME;
    }

}($, window));