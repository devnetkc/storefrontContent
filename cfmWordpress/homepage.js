/*
*
* Author: Ryan Valizan
* Company: cfm Distributors, Inc.
*
*/

function homePageBanners(a, b) { promoSlider(a), lfSlider(b) }

function promoSlider(a) {
    a.show()
    .bxSlider({
        auto: !0, easing: "ease-in-out", pager: !1, autoHover:
            !1, adaptiveHeight: !0, pause: 6e3, speed: 1e3, randomStart: !0
    })
}

function lfSlider(a) {
    var b = a.show()
        .bxSlider({
            auto: !1, controls: !1, easing: "easeInOutSine", pager:
                !0, adaptiveHeight: !0, pause: 4e3, speed: 1e3, randomStart: !1,
            startSlide: 0, loop: !0, useCSS: !1
        });
    lfPopup(a);
    var c = 0;
    a.on("mfpOpen", function () {
        return b.stopAuto(), !1
    }), a.on("mfpClose", function () {
        return b.stopAuto(), !1
    }), $.magnificPopup.instance.next =
        function () {
            return 0 == c && (b.goToNextSlide(), $.magnificPopup.proto.next.call(
                this), 0 == c && (c = 1), setTimeout(function () { c = 0 }, 1e3)), !
                1
        }, $.magnificPopup.instance.prev = function () {
            return 0 == c && (b.goToPrevSlide(), $.magnificPopup.proto.prev.call(
                this), 0 == c && (c = 1), setTimeout(function () { c = 0 }, 1e3)), !
                1
        }
}

function lfPopup(a) {
    a.magnificPopup({
        delegate: "li:not(.bx-clone) a",
        type: "image", closeBtnInside: !1, fixedContentPos: !0, mainClass: "mfp-no-margins mfp-with-zoom",
        image: { verticalFit: !0, markup: '<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div></div></div>' },
        zoom: { enabled: !0, duration: 300 }, cursor: "mfp-zoom-out-cur",
        gallery: { enabled: !0, navigateByImgClick: !1, preload: [0, 1] },
        closeOnContentClick: !0
    })
}

$(document)
    .ready(function () {
        var a = $("#promoBanner"),
            b = $("#lfSlider");
        homePageBanners(a, b)
    });
