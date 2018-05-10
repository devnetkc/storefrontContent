/*
*
* Author: Ryan Valizan
* Company: cfm Distributors, Inc.
*
*/

$(document).bind('mobileinit', function () {
    $.mobile.loadingMessage = false;
    $.mobile.ajaxEnabled = false;
    $.mobile.autoInitializePage = false;
});
$(document).ready(function () {
    //starting Nav functions
    startNav();
});
function startNav() {
    var a = $("#mainMenu"),
        ulSubMenu = a.find("ul.sub-menu"),
        sideLogo = $("#sideLogoPhone"),
        wprMenu_bar = $("#wprmenu_bar"),
        wprMenu_barCSS = wprMenu_bar.css("display");


    if (userIE === "true" && IELTE10 === "true") { iePopUp(); }
    ulSubMenu.hide();
    a.find("li:has(ul) > a").replaceWith(function () {
        return '<span class="frontSpan"></span>' + this.innerHTML + '<span class="backSpan"></span>';
    });
    selectNav();
    missionFluid(a, sideLogo);
    sideLogoPhone(sideLogo);
    scrollToTop(wprMenu_bar);

    //start dialog box for suggesting IE8 replacement
    function iePopUp() {
        if ($.cookie("iePopUpWindow") === 1) { return; } else {
            vex.dialog.buttons.YES.text = 'Not Right Now';
            $.cookie("iePopUpWindow", "1", { expires: 15 });
            vex.dialog.alert({
                message: "<p id='ieMessage'>cfmdistributors.com performs best with Google Chrome or Mozilla Firefox.<br />Click a link below to get started using a more compatible browser.</p>", buttons: [$.extend({}, vex.dialog.buttons.Chrome, {
                    text: '', className: 'chrome',
                    click: function ($vexContent, event) {
                        $vexContent.data().vex.value = false;
                        $.removeCookie("iePopUpWindow");
                        window.open("https://www.google.com/intl/en/chrome/browser/#brand=CHMB&utm_campaign=en&utm_source=en-ha-na-us-sk&utm_medium=ha");
                        return vex.close($vexContent.data().vex.id);
                    }
                }), $.extend({}, vex.dialog.buttons.FireFox, {
                    text: '', className: 'fireFox',
                    click: function ($vexContent, event) {
                        $vexContent.data().vex.value = false;
                        $.removeCookie("iePopUpWindow");
                        window.open("http://www.mozilla.org/en-US/firefox/new/");
                        return vex.close($vexContent.data().vex.id);
                    }
                }), $.extend({}, vex.dialog.buttons.YES, { text: 'No Thanks', className: 'vex-dialog-button-primary notNow' })]
            });
            $(".fireFox").after("<div id='browserDownload'><p>Download: </p></div>");
            $(".vex-dialog-form").before('<div id="vexHeader"><p>An Important Message from cfm Distributors!</p></div>');
        }
    }
    function selectNav() {
        var menuMenu = $("#menu-menu"),
            menuMenuLI = menuMenu.find("li"),
            menuMenuDirLI = "#menu-menu > li",
            menuMenuLISelector = menuMenuLI.parent(menuMenu),
            mMLastChild = menuMenuLISelector.last(),
            mMLargerMenu = "#mainMenu > .menu-menu-container > ul > li:last-child  ul  li",
            sideArrow = 'sideArrow',
            setClasses = menuMenuLI.has("ul").addClass(sideArrow),
            setCSS = userOS ? setClasses.parent(menuMenu).css({
                /* Commenting this css change out because IE100 seems to not want it now...again...May5,2017 ~RV

                'top': '25px',

                */
                'padding-right': '20px'
            }) : setClasses.parent(menuMenu).css({ 'padding-right': '20px' });
        $(mMLargerMenu).removeClass(sideArrow).addClass('lastSideArrow');
        //menuMenu.css({'display':'inherit'});
        //menuMenu.css({'display':'inline'});

        if (mobileTest) {
            //alert("hi ted");
            setCSS;

            mobile_N_Win8Nav();

        }

        else {
            //alert("hi teddy");

            mainNav();
            if (LTEIE9 === 'true') {
                mMLastChild.css("border-right", "none").find("ul li ul").css("left", "-180px");
            }
        }


        function mainNav() {
            menuMenuLI.hover(function () {
                var t = $(this),
                    subThis = $("ul.sub-menu:first", this);
                if (t.is(menuMenuDirLI)) {
                    subThis.stop(true, true).delay(200).slideDown(200);
                } else {
                    if (t.is(mMLargerMenu)) {
                        subThis.stop(true, true).delay(300).show("slide", { direction: "right" }, "200");
                    } else {
                        subThis.stop(true, true).delay(300).show("slide", { direction: "left" }, "200");
                    }
                }

            }, function () {
                var t = $(this),
                    subThis = $("ul.sub-menu:first", this);
                if (t.is(menuMenuDirLI)) {
                    subThis.stop(true, true).delay(200).slideUp(200);
                } else {
                    if (t.is(mMLargerMenu)) {
                        subThis.stop(true, true).delay(300).hide("slide", { direction: "right" }, "200");
                    } else {
                        subThis.stop(true, true).delay(300).hide("slide", { direction: "left" }, "200");
                    }
                }
            });
        }
        function mobile_N_Win8Nav() {
            $(document).on("touchend", function (e) {
                if (!a.is(e.target) && a.has(e.target).length === 0) {
                    menuMouseDownOut();
                } else {
                    menuMouseOver_Down(e);
                }
            });
        }
        function menuMouseOver_Down(e) {
            if (wprMenu_barCSS === "none") {
                var t = $(e.target),
                    siblings = t.siblings(),
                    c = t.children("ul.sub-menu"),
                    f = $("ul.sub-menu:first", e.target).stop(true, true);
                if (t.find("ul:first").css("display") === "none") {
                    if (t.is(menuMenuDirLI)) {
                        siblings.find("ul.sub-menu").slideUp("slow");
                        f.delay(200).slideDown(200);
                    } else if (t.is(mMLargerMenu)) {
                        siblings.find("ul.sub-menu").hide("slide", { direction: "left" }, "200");
                        f.delay(300).show("slide", { direction: "right" }, "200");
                    }
                    else {
                        siblings.find("ul.sub-menu").hide("slide", { direction: "left" }, "200");
                        f.delay(200).show("slide", { direction: "left" }, "200");
                    }
                }
                setTimeout(function () {
                    if (c.css("display") === "none") {
                        t.find(".sub-menu").css("display", "none");
                    }
                }, 700);
            }
        }
        function menuMouseDownOut() {
            ulSubMenu.slideUp();
        }
    }
}

//resize header fluidly
function missionFluid(a, sideLogo) {
    $(".missionHeaderQuote").fitText(2.0, { minFontSize: '12px', maxFontSize: '22px' });
    if (mobileTest) {
        $(".smResize").fitText(1.6, { minFontSize: '9px', maxFontSize: '12px' });
        $(".missionResize").fitText(4.2, { minFontSize: '7px', maxFontSize: '14px' });
        $(".LoginSloganResize").fitText(2.0, { minFontSize: '8px', maxFontSize: '22px' });
    } else {
        $(".smResize").fitText(1.6, { minFontSize: '10px', maxFontSize: '14px' });
        $(".missionResize").fitText(3.4, { minFontSize: '9px', maxFontSize: '14px' });
        $(".LoginSloganResize").fitText(2.0, { minFontSize: '11px', maxFontSize: '22px' });
    }
    sideLogo.fitText(1.5, { minFontSize: '9px', maxFontSize: '12px' });
    a.fitText(1.0, { minFontSize: '9px', maxFontSize: '14px' });
}
function sideLogoPhone(slp) {
    var blbar = $("#largeLogo");
    var bottom = blbar.position().top + blbar.outerHeight(true);
    slp.css({ opacity: 0 }); //hide your div initially
    $(window).scroll(function () {
        if ($(window).scrollTop() === 0 & slp.css('opacity') === 1) {
            slp.stop(true, true).fadeTo("fast", 0); //reached the desired point -- show div
        } else if ($(window).scrollTop() > bottom) { //scrolled past the other div?
            slp.stop(true, true).fadeTo("slow", 1); //reached the desired point -- show div
        } else if ($(window).scrollTop() <= bottom) { //scrolled past the other div?
            slp.stop(true, true).fadeTo("fast", 0); //reached the desired point -- show div
        }
    });
}

function scrollToTop(wprMenu_bar) {
    $("a[href='#top']").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    //set up tags for scrolling
    wprMenu_bar.each(function () {
        $(this).wrapInner("<a href='#top'></a>");
    });
}
function setIframeheight(id) {
    var idJ = $(id),
        DivWidth = idJ.width();
    DivWidth = (DivWidth * 100) / 76;
    idJ.css({ 'height': DivWidth.toFixed(0) });
}