(function($) {
    "use strict";

    navManu()
    niceScroll();
    isotope()
    venobox();
    counterUp()
    wow()


    /*====== Active Plugins ======

        1 Nav Manu

        2 Nice Scroll

        3 Isotope

        4 Venobox

        5 Counter Up

        6 Wow

    =============================*/

})(jQuery);


/*=====================
    1 Nav Manu
=======================*/
function navManu() {
    var manuBtn = ".side-nav .manu-btn";
    var manuBtnIcon = ".side-nav .manu-btn span";
    var manuItem = ".side-nav .main-manu ul";
    var overlay = ".side-nav div.overlay";
    $(manuBtn).click(function() {
        $(manuBtnIcon).toggleClass("active");
        $(manuItem).toggleClass("active");
        $(overlay).toggleClass("active");
    })
    $(overlay).click(function() {
        $(manuBtnIcon).removeClass("active");
        $(manuItem).removeClass("active");
        $(overlay).removeClass("active");
    })
}
/*=====================
    2 Nice Scroll
=======================*/
function niceScroll() {
    $("html").niceScroll({
        zindex: "20",
        scrollspeed: 50,
        mousescrollstep: 50,
        iframeautoresize: true,
        cursorminheight: 32,
        enablemouselockapi: true,
        cursorfixedheight: false,
        hidecursordelay: 400,
        enablescrollonselection: true,
        cursordragspeed: 0.3,
    });
}

/*==================
    3 Isotope
==================*/
function isotope() {
    "use strict";
    var portfolioFilterBtn = $('.portfolio-demo-btn button'),
        portfolioGalleryWrap = $('.portfolio-demo-btn');

    // Porfolio Filtering Click Events
    portfolioFilterBtn.on("click", function() {
        portfolioFilterBtn.removeClass('active');
        $(this).addClass('active');
    });

    // Portfolio Masonary Gallery
    portfolioGalleryWrap.imagesLoaded(function() {
        var $grid = $('.portfolio-demo').isotope({
            itemSelector: '.portfolio-item',
            percentPosition: true,
        });
        portfolioGalleryWrap.on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
    });
}


/*==================
    4 Venobox
==================*/
function venobox() {
    "use strict";
    var popup = $(".venobox");
    $(popup).venobox();
}

/*==================
    5 Counter Up
==================*/
function counterUp() {
    "use strict";
    $(".counter").counterUp({
        delay: 10,
        time: 1000
    });
}


/*==================
    6 Wow
==================*/
function wow() {
    "use strict";
    wow = new WOW({
        animateClass: "animate__animated",
        offset: 0,
    });
    wow.init();
}