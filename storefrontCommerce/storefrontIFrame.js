/*
*
* Author: Ryan Valizan
* Company: cfm Distributors, Inc.
*
*/

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	document.domain = "cfmdistributors.com";
	docdomain = document.domain;
	var useOrig = "https://store.cfmdistributors.com";
//	var useOrig = "*";
	docdomain = document.domain;
	var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

    $(document).ready (function (){
        var b = $("#mainMenu"), ul = b.find("li:has(ul)"), ulSub = ul.find("ul.sub-menu"),
            estore = document.getElementById('estore'), estorejQuery = $("#estore");
		var loadD = $("#loading_dialog");
        loadD.loading();
        windowWidth(estore);
        $(window).resize(function (e) {windowWidth(estore);});
        $(window).on('orientationchange', function(event) {
            windowWidth(estore);
        });
        
            function windowWidth(estore) {            
            var scr = $(window).width()+"screenWidth";
            estore.contentWindow.postMessage( scr,"*");  //  `*` on any domain
            estore.contentWindow.postMessage( "dropLogo" ,"*");
			if (mobileTest === true) { estore.contentWindow.postMessage( "mobileTrue" ,"*");}
    }
        estorejQuery.iFrameResize({
            autoResize: true,
            log: false,
            checkOrigin: false,
            enablePublicMethods: true,
            hheightCalculationMethod: LTEIE9 ? 'max' : 'lowestElement',
            sizeHeight: true,
            sizeWidth: true});

        //watch for touch events from mobile estore

        // Listen to message from child window indicating to close menu
        eventer(messageEvent,function(e) {
			
		//alert(docdomain + ' - use:' + useOrig + ' - event:' + e.origin + ' - message:' + e.data);
		//var tpe = (e.origin !== useOrig) ? 'true' : 'false';
		//alert(e.origin + ' !== ' + useOrig + ' = ' + tpe);
			if (e.origin !== useOrig) {return;}
            if (e.data === "windowLoad") {
				//alert("testWindowload");
                loadD.loading("loadStop");
                windowWidth(estore);
				estore.contentWindow.postMessage( "setInputFocus","*");  //  `*` on any domain
				
				//estorejQuery.focus();
				//estorejQuery.contents().focus();
            }
            if (e.data === "logIn") {
                if(eStoreSearch !== 'https://store.cfmdistributors.com/storefrontCommerce/') 
                {$.cookie('searchNeedLogin', '1');}
            }
            if (e.data === "loggedIn") {
                if ($.cookie('searchNeedLogin') === "1") {
                    $.removeCookie('searchNeedLogin');
                    estorejQuery.attr('src',eStoreSearch);
                }
                eStoreSearch = 'https://store.cfmdistributors.com/storefrontCommerce/';
            }
            else if (e.data === "closeMenu") {
                ulSub.slideUp();
                ul.removeClass("downArrow").addClass("sideArrow");
            } 
        },false);    
    });</script><script>var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	document.domain = "cfmdistributors.com";
	docdomain = document.domain;
	var useOrig = "https://store.cfmdistributors.com";
//	var useOrig = "*";
	docdomain = document.domain;
	var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

    $(document).ready (function (){
        var b = $("#mainMenu"), ul = b.find("li:has(ul)"), ulSub = ul.find("ul.sub-menu"),
            estore = document.getElementById('estore'), estorejQuery = $("#estore");
		var loadD = $("#loading_dialog");
        loadD.loading();
        windowWidth(estore);
        $(window).resize(function (e) {windowWidth(estore);});
        $(window).on('orientationchange', function(event) {
            windowWidth(estore);
        });
        
            function windowWidth(estore) {            
            var scr = $(window).width()+"screenWidth";
            estore.contentWindow.postMessage( scr,"*");  //  `*` on any domain
            estore.contentWindow.postMessage( "dropLogo" ,"*");
			if (mobileTest === true) { estore.contentWindow.postMessage( "mobileTrue" ,"*");}
    }
        estorejQuery.iFrameResize({
            autoResize: true,
            log: false,
            checkOrigin: false,
            enablePublicMethods: true,
            hheightCalculationMethod: LTEIE9 ? 'max' : 'lowestElement',
            sizeHeight: true,
            sizeWidth: true});

        //watch for touch events from mobile estore

        // Listen to message from child window indicating to close menu
        eventer(messageEvent,function(e) {
			
		//alert(docdomain + ' - use:' + useOrig + ' - event:' + e.origin + ' - message:' + e.data);
		//var tpe = (e.origin !== useOrig) ? 'true' : 'false';
		//alert(e.origin + ' !== ' + useOrig + ' = ' + tpe);
			if (e.origin !== useOrig) {return;}
            if (e.data === "windowLoad") {
				//alert("testWindowload");
                loadD.loading("loadStop");
                windowWidth(estore);
				estore.contentWindow.postMessage( "setInputFocus","*");  //  `*` on any domain
				
				//estorejQuery.focus();
				//estorejQuery.contents().focus();
            }
            if (e.data === "logIn") {
                if(eStoreSearch !== 'https://store.cfmdistributors.com/storefrontCommerce/') 
                {$.cookie('searchNeedLogin', '1');}
            }
            if (e.data === "loggedIn") {
                if ($.cookie('searchNeedLogin') === "1") {
                    $.removeCookie('searchNeedLogin');
                    estorejQuery.attr('src',eStoreSearch);
                }
                eStoreSearch = 'https://store.cfmdistributors.com/storefrontCommerce/';
            }
            else if (e.data === "closeMenu") {
                ulSub.slideUp();
                ul.removeClass("downArrow").addClass("sideArrow");
            } 
        },false);    
    });