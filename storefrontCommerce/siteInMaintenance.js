/*
*
* Author: Ryan Valizan
* Company: cfm Distributors, Inc.
*
*/

var infoMsg = '<span style="color:#6d2d2d;font-size: 28px;">www.cfmdistributors.com is undergoing maintenance at this time</span><br><span style="color: rgba(78, 66, 66, 0.71); font-size: 20px;">We appologize for this inconvience.<br> Our eStorefront Online Shopping is still available for your convience while we are performing work on our site.</span>', 
	goForBarney = false;
	
function checkSiteStatus(){	
	if (jQuery.cookie('seenStatus') !== true && goForBarney === true) {
		if (wasReferred(document.referrer)) {
			notie.alert(4, infoMsg, 10);
			jQuery.cookie('seenStatus', true, { path: '/', domain: 'cfmdistributors.com' });
		}
	}
}

// get the referring site to make sure it wasn't a direct access call
function wasReferred(x) {
    return x !== "http://store.cfmdistributors.com" ? true : false;
}