   /*
*
* Author: Ryan Valizan
* Company: cfm Distributors, Inc.
*
*/

$j(document).ready(function () {
   	if (inIframe() === false && (window.opener) !== null) {
	   window.opener.postMessage("rdyToClose", "*");
	   safariPain();
   	}
   });
   
   function safariPain() {

   // Listen to message from parent window for width

   eventer(messageEvent, function(e) {
	   //if (event.origin !== useOrig) {return;}
	   if (e.data == "closeWindow") {
		   if (inIframe() !== true) {
			   window.close();
		   }
	   }
   });
}