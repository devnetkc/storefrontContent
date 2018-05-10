/*
*
* Author: Ryan Valizan
* Company: cfm Distributors, Inc.
*
*/

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
document.domain = "cfmdistributors.com";
var useOrig = 'https://www.cfmdistributors.com"';

if (!parent.location.origin) {
    parent.location.origin = parent.location.protocol + "//" + parent.location.hostname + (parent.location.port ? ':' + parent.location.port : '');
}

var parOrg = parent.location.origin;

function checkOrginOptions() {
    var insideOrig = useOrig;

    var cfmSites = [
        "cfmdistributors.com",
        "cfmkc.com",
        "midwestyork.com"
    ];
    $.each(cfmSites, function (i, loc) {
        if (parOrg.indexOf(loc) > 0) {
            insideOrig = parOrg;
            return false;
        }
    });
    return insideOrig;
}

//alert ("HEEEY  - " + parent.location.protocol);
$(document).ready(function () {

    //set orgin is it http or https
    useOrig = checkOrginOptions();

    //set littleflier update
    littleFlierSpecials();
    pictureAlign();
    parent.postMessage("windowLoad", "*"); //  `*` on any domain

    if (inIframe() === false && (window.opener) !== null) {
        window.opener.postMessage("rdyToClose", "*");
        safariPain();
    }

    $("#browseMenuInvisible").find("li:first-child a").replaceWith(function () {
        return "<span id='applicationNavigationCatalogLabel'>" + this.innerHTML + "</span>";
    });
    $("#searchAllCategoriesContainer a div").unwrap();
    if ($("#centerMainColumn").length !== 0 && $("#requestWholesaleAccountScreen").length === 0) {
        $("#centerMainColumn").find(".buttonGroup").hide();
    }
    $("#searchAllCategoriesButton").html("<p>Categories</p>");
    $("#applicationNavigationCatalogLabel").each(function () {
        var $this = $(this);
        $this.text($this.text().replace(/_/g, ' '));
    });
    var detailinfo = $("#itemDetailInfo");
    var each = detailinfo.find("tr:eq(7)").find("td:eq(2)");
    detailinfo.find("tr:eq(3)").find("td:lt(2)").attr('colspan', 2);
    var tdtext = detailinfo.find("tr:gt(1)").find("td.text");
    tdtext.css("text-align", "right");
    tdtext.attr("colspan", 2);
    each.attr('colspan', 1);
    each.css("text-align", "left");

    $('td[colspan=10]').attr('colspan', 2);
    $('td[colspan=6]').attr('colspan', 0);
    $('td[colspan=9]').attr('colspan', 6);
    $('td[colspan=5]').attr('colspan', 3);
    if ($("#mainContent2ColumnContainer").length !== 0) {
        $('td[colspan=6]').attr('colspan', 3);
        if ($("#cartPageForm").length !== 0) {
            $('td[colspan=3]').attr('colspan', 6);
        }
    }
    var catbut = $("#searchAllCategoriesButton");
    var catcont = $("#searchAllCategoriesContainer");
    var browsMenu = $("#browseMenuInvisible"),
        mobileDevice = false;
    browsMenu.hide();
    eventer(messageEvent, function (e) {

        if (event.origin !== useOrig) {
            return;
        }
        var message = e.data;
        if (message === "dropLogo") {
            $("#homeLogoImage").remove();
        }
        if (message === "mobileTrue") {
            mobileDevice = true;
        }
        if (message === "setInputFocus") {
            if ("autofocus" in $("input")) {
                $('form').find('input[autofocus=autofocus]').filter(':visible:first').focus();
            } else {
                $('form').find('input[type=text],textarea').filter(':visible:first').focus();
            }
        }

        // Listen to message from parent window for width

        if (message.search("screenWidth") !== -1) {
            var rdyData = message.replace("screenWidth", "");

            var scr = 0;

            if (rdyData < 960) {
                scr = rdyData - (rdyData * 0.015);
            } else {
                scr = rdyData - (rdyData * 0.055);
            }

            var scrpx = scr + "px";

            if (scr >= 700 && scr <= 1000) {
                $("body").css({
                    maxWidth: scrpx,
                    minWidth: "300px"
                });
                layout();
            } else if (scr > 1000) {
                $("body").css({
                    maxWidth: scrpx,
                    minWidth: "300px"
                });
                layout();
            } else if (scr < 768) {
                $("body").css({
                    maxWidth: scrpx,
                    minWidth: "300px"
                });
                layout();
            }
        }
        categoriesMenu(mobileDevice, catbut, catcont, browsMenu);
    }, false);

    $(document).on("vmousedown", function (c) {
        parent.postMessage("closeMenu", useOrig); //  `*` on any domain
        var b = $("#searchAllCategoriesContainer");
        if (!b.is(c.target) && b.has(c.target).length === 0) {
            browsMenu.slideUp();
        }
    });

});

function categoriesMenu(mobileDevice, catbut, catcont, browsMenu) {
    if (mobileDevice === true) {
        catbut.on("mousedown", function () {
            browsMenu.slideToggle();
        });
        catbut.on("vmousedown", function () {
            browsMenu.slideToggle();
        });
    } else {
        catcont.hover(function () {
            browsMenu.stop(true, true).delay(200).slideDown();
        },
            function () {
                browsMenu.stop(true, true).delay(200).slideUp();
            });
    }
}

function checkOutScreen(bodyWidth) {
    if ($("#checkoutScreen").length !== 0) {
        styleWidth(bodyWidth);
        var cols75 = $('textarea[cols=75]');
        var maxlength62 = $('textarea[maxlength=62]');
        var productParentDiv = $(".orderTotalsContainer").prev("div");
        maxlength62.css("width", "100%");
        cols75.css("width", "100%");
        cols75.removeAttr('cols');
        $("<div id='productsListing'></div>").appendTo(productParentDiv);
        productParentDiv.find(".standardTable").detach().appendTo("#productsListing");
        $("#displayCheckout").prev().css("color", "#FFD700");
    }
}

function twoColumnLayout(bodyWidth) {
    if ($("#mainContent2ColumnContainer").length !== 0) {
        if ($("#cartPageForm").length !== 0) {
            //alert ("cart");
            $('td[colspan=3]').attr('colspan', 6);
            $(".standardTable td").css("width", "11%");
            $(".standardTableContainer").css("width", "100%");

            //styleWidth(bodyWidth);
            if (bodyWidth <= 768) {
                //var accountBar = document.getElementById ("accountBar");
                //$("#rightMainColumnPadding").children("div:first").hide();
                //$("#lineItemAddPanel").hide();
                //var accchild = $("#accountBar").children("div").not(":first");
                //accchild.hide();
                //$("#accountBarToggleImage").hide();
                //var togglePanel = $("#accountBar").children("div:eq(0)");
                //togglePanel.css("cursor", "pointer");
                //togglePanel.attr("onclick", "");
                //$("#accountBar").hover(function() {
                //   accchild.stop(true,true).slideToggle();
                //});
                //$('head').append('<link rel="stylesheet" href="https://cfmdistributors.com/css/le768.css" type="text/css" />');
                $(".standardTable td").css("width", "60px");
            }

        }
        if ($("#specialsItemListScreen").length !== 0) {
            styleWidthSpecials(bodyWidth);
            if (bodyWidth <= 640) {
                styleWidth(bodyWidth);
            }
        } else {
            styleWidth(bodyWidth);
        }

    }
}

function threeColumnLayout(bodyWidth) {
    if ($("#mainContent3ColumnContainer").length !== 0) {
        //alert (bodyWidth);
        styleWidth(bodyWidth);
    }
}

function styleWidth(bodyWidth) {
    var rightColumn = $('#rightMainColumn');
    var leftColumn = $('#leftMainColumn');
    var browseMenu = $("#searchAllCategoriesContainer");
    var accountMenuSelect = $('#accountMenu select');
    var subCategories = $("#subCategories select");
    var mainCategories = $("#mainCategories select");
    var le768 = $("#le768");
    var le568 = $("#le568");
    if (bodyWidth <= 768) {
        $('head').append('<link id="le768" rel="stylesheet" href="https://cfmdistributors.com/css/le768.css" type="text/css" />');
        //alert (bodyWidth + "+" + 768);

        if (bodyWidth <= 720) {
            $('head').append('<link id="le568" rel="stylesheet" href="https://cfmdistributors.com/css/le568.css" type="text/css" />');
            $('#leftMainColumn').insertAfter('#centerMainColumn');
            $('td[colspan=3]').attr('colspan', 1);
            mobileMenus(accountMenuSelect, subCategories, mainCategories);
            rightColumn.css("display", "none");
            leftColumn.css("display", "none");
            browseMenu.css("display", "none");
            accountMenuSelect.css("display", "block");
            subCategories.css("display", "block");
            mainCategories.css("display", "block");

        }
    }

    if (bodyWidth > 768) {
        le768.remove();
        le568.remove();
    } else if (bodyWidth > 720) {
        le568.remove();
        $('#centerMainColumn').insertAfter('#leftMainColumn');
        $('td[colspan=1]').attr('colspan', 3);
        rightColumn.css("display", "inline-block");
        leftColumn.css("display", "block");
        browseMenu.css("display", "inline-block");
        accountMenuSelect.css("display", "none");
        subCategories.css("display", "none");
        mainCategories.css("display", "none");
    }
}

function styleWidthSpecials(bodyWidth) {
    if (bodyWidth <= 800 || bodyWidth !== 0) {
        $('head').append('<link id="specials768" rel="stylesheet" href="https://cfmdistributors.com/css/specials768.css" type="text/css" />');
    }
    var specials768 = $("#specials768");
    if (bodyWidth > 800 || bodyWidth === 0) {
        specials768.remove();
    }
}

function layout() {
    var bodyWidth = $("body").css("maxWidth").replace(/\D+$/, "");
    if (bodyWidth === 0) {
        bodyWidth = $(window).width();
    }
    if ($("#eStoreHeader").length === 0) {
        $("<div id='eStoreHeader'></div>").insertBefore("#masthead");
        $("#userAccountInfo").detach().appendTo("#eStoreHeader");
    }
    twoColumnLayout(bodyWidth);
    threeColumnLayout(bodyWidth);
    checkOutScreen(bodyWidth);
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function safariPain() {

    // Listen to message from parent window for width

    eventer(messageEvent, function (e) {
        //if (event.origin !== useOrig) {return;}
        if (e.data == "closeWindow") {
            if (inIframe() !== true) {
                window.close();
            }
        }
    });
}

function littleFlierSpecials() {

    var link = $('a#navBarSpecialsLink');
    var specialsHeading = $("#specialsHeading");
    var linkText = link.text();
    var month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var d = new Date();
    var n = month[d.getMonth()];
    link.text(linkText.replace("Specials", n + " Little Flyer"));
    if (specialsHeading.length) {
        specialsHeading.text(n + " Little Flyer");
    }
}

//this function will align the pictures during search
function pictureAlign() {
    $(".standardTable tr:even").find("td:first").css("text-align", "center");
}

//mobile menu selctor section

function mobileMenus(accountMenuSelect, subCategories, mainCategories) {
    if ($("#accountMenu").length === 0) {
        $("<div id='accountMenu' class='mobielMenus'></div>").insertAfter("#cartInfo");
        mobileAccount();
    }
    if ($("#subCategories").length === 0 && $("#refineByCategoryContainer").length !== 0) {
        $("<div id='subCategories' class='mobielMenus'></div>").insertAfter("#searchAllCategoriesContainer");
        mobilesubCat();
    }
    if ($("#mainCategories").length === 0) {
        $("<div id='mainCategories' class='mobielMenus'></div>").insertBefore("#searchAllCategoriesContainer");
        mobileMainCat();
    }
    valueToLink(accountMenuSelect, subCategories, mainCategories);
}
//change menu value's to working links
function valueToLink() {
    $(document).on('change', '#accountMenu select', function () {
        window.location = $(this).find("option:selected").val();
    });
    $(document).on('change', '#subCategories select', function () {
        window.location = $(this).find("option:selected").val();
    });
    $(document).on('change', '#mainCategories select', function () {
        window.location = $(this).find("option:selected").val();
    });
}
//mobile account menu for estore
function mobileAccount() {
    // Create the dropdown base
    $("<select />").appendTo("#accountMenu");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Account Options"
    }).appendTo("#accountMenu select");

    // Populate dropdown with menu items
    $("#myAccountPanel a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("#accountMenu select");
    });
}
//mobile subcategories menu for estore
function mobilesubCat() {
    // Create the dropdown base
    $("<select />").appendTo("#subCategories");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Refine by Category"
    }).appendTo("#subCategories select");

    // Populate dropdown with menu items
    $("#categorySidebarList a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("#subCategories select");
    });
}
//mobile subcategories menu for estore
function mobileMainCat() {
    // Create the dropdown base
    $("<select />").appendTo("#mainCategories");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Categories"
    }).appendTo("#mainCategories select");

    // Populate dropdown with menu items
    $("#browseMenuInvisible a").each(function () {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("#mainCategories select");
    });
}